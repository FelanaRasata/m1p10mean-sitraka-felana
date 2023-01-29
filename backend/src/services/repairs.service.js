import createError from 'http-errors'
import { Settings } from '../config/settings.js'
import { CarDiagnosis } from '../models/car_diagnosis.schema.js'
import { Repair } from '../models/repairs.schema.js'
import { EXPENSES } from '../utils/constants.js'
import { customLabels, isEmpty, toDocumentFormat } from '../utils/utils.js'
import { CarService } from './cars.service.js'


const temp = CarDiagnosis


export class RepairService {

    constructor() {

        this.settings = new Settings()
        this.carService = new CarService()

    }


    async find(query, options) {

        query = Object.assign(isEmpty(query) ? {} : query, {
            deleted: false
        })

        options = Object.assign(isEmpty(options) ? {} : options, {
            lean: true,
            allowDiskUse: true,
            customLabels: customLabels(),
            populate: {
                path: 'car_diagnosis',
                populate: {
                    path: 'diagnosisRepairs.repairType',
                    model: 'RepairType'
                }
            }
        })

        return await Repair.paginate(query, options)

    }


    async findById(repairId) {

        if (isEmpty(repairId)) throw createError(409, 'No repair ID found')

        return Repair
            .findOne({_id: repairId, deleted: false})
            .populate('car')
            .populate({
                path: 'car_diagnosis',
                populate: {
                    path: 'diagnosisRepairs.repairType',
                    model: 'RepairType'
                }
            })
            .lean()

    }


    async updateDiagnosisState(repairId, price) {

        let currentRepair = await Repair.findById(repairId)
        if (!currentRepair['carDroppedOffAt'] || currentRepair['carDroppedOffAt'] === null || typeof currentRepair['carDroppedOffAt'] === 'undefined')
            throw createError(409, 'The car has not been dropped off')

        currentRepair.price = price

        currentRepair.diagnosedAt = new Date()

        await currentRepair.save()

        return await this.findById(repairId)
    }


    async financeValidate(repairId) {

        let currentRepair = await Repair.findById(repairId)

        currentRepair.inProgressAt = new Date()

        await currentRepair.save()

        return await this.findById(repairId)
    }
    async dropOffCar(carId) {

        const car = await this.carService.findById(carId)

        if (isEmpty(car)) throw createError(409, 'Car not found.')

        const createdRepair = new Repair(toDocumentFormat({
            car: car._id,
            carDroppedOffAt: new Date()
        }))

        await createdRepair.save()

        return await this.findById(createdRepair._id)

    }


    // Update a repair by ID
    async initRepair(repairId, repairData) {

        if (isEmpty(repairId)) throw createError(409, 'No repair ID found')

        let currentRepair = await Repair.findById(repairId)

        if (isEmpty(currentRepair) || currentRepair?.deleted) throw createError(409, 'No repair found')

        currentRepair.selectedRepairs = repairData.selectedRepairs
        let price = repairData.car_diagnosis.price

        for (const repairItem of repairData.selectedRepairs) {

            const repairType = repairData.car_diagnosis.diagnosisRepairs.find(element => element.repairType._id === repairItem)

            price += isEmpty(repairType) ? 0 : (repairType.repairCost * (1 + EXPENSES.manpower))

        }

        currentRepair.price = price
        currentRepair.initiatedAt = repairData.initiatedAt

        await currentRepair.save()

        return await this.findById(repairId)

    }


    async delete(repairId) {

        if (isEmpty(repairId)) throw createError(409, 'No repair ID found')

        const currentRepair = await Repair.findById(repairId)

        if (isEmpty(currentRepair)) throw createError(409, 'No repair found')

        currentRepair.deleted = true

        await currentRepair.save()

        return await this.findById(repairId)

    }

}

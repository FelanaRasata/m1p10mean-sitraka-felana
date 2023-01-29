import createError from 'http-errors'
import { Settings } from '../config/settings.js'
import { Repair } from '../models/repairs.schema.js'
import { EXPENSES } from '../utils/constants.js'
import { customLabels, isEmpty, sendEmail, toDocumentFormat } from '../utils/utils.js'
import { CarService } from './cars.service.js'
import { UserService } from './users.service.js'
import { exit_ticket } from '../utils/html_formatter.js'


export class RepairService {

    constructor() {

        this.settings = new Settings()
        this.carService = new CarService()
        this.userService = new UserService()

    }


    async find(query, options) {

        query = Object.assign(isEmpty(query) ? {} : query, {
            deleted: false
        })

        options = Object.assign(isEmpty(options) ? {} : options, {
            lean: true,
            allowDiskUse: true,
            customLabels: customLabels(),
            populate: [
                {
                    path: 'car'
                },
                {
                    path: 'car_diagnosis',
                    populate: {
                        path: 'diagnosisRepairs.repairType',
                    }
                },
                {
                    path: 'selectedRepairs.repairType',
                    model: 'RepairType'
                }
            ]
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
            .populate({
                path: 'selectedRepairs.repairType',
                model: 'RepairType'
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


    async paidRepair(repairId) {

        let currentRepair = await Repair.findById(repairId)

        if (!currentRepair.diagnosedAt) {
            throw new createError(409, 'The car has not been diagnosed')
        } else if (!currentRepair.carRepairedAt) {
            throw new createError(409, 'The car is not not repaired yet')
        }

        currentRepair.paidAt = new Date()

        await currentRepair.save()

        return await this.findById(repairId)
    }


    async validateExitCar(repairId) {

        let currentRepair = await Repair.findById(repairId)

        // if (!currentRepair.paidAt) {
        //     throw new createError(409, 'The repair is not not paid')
        // }
        currentRepair.carTakenBackAt = new Date()

        await currentRepair.save()

        let repair = await this.findById(repairId)

        let user = await this.userService.findById(repair.car.customer)

        console.log(user)

        await sendEmail(["rasatadiamondra@gmail.com"], 'Exit Voucher', exit_ticket(repair.car.carNumber, user), true)

        return repair
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

        console.log('<<<<<<<<<<<<', repairData.selectedRepairs)

        currentRepair.selectedRepairs = repairData.selectedRepairs
        let price = repairData.car_diagnosis.price
        let allNotPart = 1

        for (const repairItem of repairData.selectedRepairs) {

            const repairType = repairData.car_diagnosis.diagnosisRepairs.find(element => element.repairType._id === repairItem.repairType)

            if (isEmpty(repairType)) {

                price += repairType.repairCost * (1 + EXPENSES.manpower)

                allNotPart *= repairType.repairType.carPart ? 0 : 1

            }

        }

        currentRepair.price = price
        currentRepair.initiatedAt = new Date(repairData.initiatedAt)

        if (allNotPart) currentRepair.inProgressAt = new Date()

        await currentRepair.save()

        return await this.findById(repairId)

    }


    // Update a repair by ID
    async proceedRepair(repairId, repairData) {

        if (isEmpty(repairId)) throw createError(409, 'No repair ID found')

        let currentRepair = await Repair.findById(repairId)

        if (isEmpty(currentRepair) || currentRepair?.deleted) throw createError(409, 'No repair found')

        currentRepair.selectedRepairs = repairData.selectedRepairs

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

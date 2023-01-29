import createError from 'http-errors'
import { Settings } from '../config/settings.js'
import { CarDiagnosis } from '../models/car_diagnosis.schema.js'
import { Car } from '../models/cars.schema.js'
import { EXPENSES } from '../utils/constants.js'
import { customLabels, isEmpty, toDocumentFormat } from '../utils/utils.js'
import { RepairService } from './repairs.service.js'


export class CarDiagnosisService {

    constructor() {

        this.settings = new Settings()
        this.repairService = new RepairService()

    }


    async create(carDiagnosisData) {

        const createdCarDiagnosis = new CarDiagnosis(toDocumentFormat(carDiagnosisData))

        await createdCarDiagnosis.save()

        return await this.findById(createdCarDiagnosis._id)

    }


    async carDiagnosis(carDiagnosisCreateData) {

        let carDiagnosis = {}

        carDiagnosis.diagnosisRepairs = []

        carDiagnosis.price = EXPENSES.diagnosis
        carDiagnosis.repair = carDiagnosisCreateData.repair

        for (let diagnosisRepair of carDiagnosisCreateData.diagnosisRepairs) {

            carDiagnosis.diagnosisRepairs.push({
                repairType: diagnosisRepair.repairType._id,
                quantity: diagnosisRepair.quantity
            })

        }

        const currentCarDiagnosis = await this.create(carDiagnosis)

        await this.repairService.updateDiagnosisState(carDiagnosis.repair, carDiagnosis.price)

        return currentCarDiagnosis

    }


    async find(query, options) {

        query = Object.assign(isEmpty(query) ? {} : query, { deleted: false })

        options = Object.assign(isEmpty(options) ? {} : options, {
            lean: true,
            allowDiskUse: true,
            customLabels: customLabels()
        })

        return await Car.paginate(query, options)

    }


    async findById(carId) {

        if (isEmpty(carId)) throw createError(409, 'No car ID found')

        return Car
            .findOne({ _id: carId, deleted: false })
            .lean()

    }


}

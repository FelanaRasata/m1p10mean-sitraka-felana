import { Settings } from '../config/settings.js'
import { customLabels, isEmpty, toDocumentFormat } from '../utils/utils.js'
import createError from 'http-errors'
import { Car } from '../models/cars.schema.js'
import { CarDiagnosis } from '../models/car_diagnosis.schema.js'
import { RepairService } from './repairs.service.js'
import { DiagnosisPercentageService } from './diagnosis_percentage.service.js'


export class CarDiagnosisService {

    constructor() {

        this.settings = new Settings()
        this.repairService = new RepairService()
        this.diagnosisPercentageService = new DiagnosisPercentageService()

    }


    async create(carDiagnosisData) {

        const createdCarDiagnosis = new CarDiagnosis(toDocumentFormat(carDiagnosisData))

        await createdCarDiagnosis.save()

        return await this.findById(createdCarDiagnosis._id)

    }


    async carDiagnosis(carDiagnosisCreateData) {
        let carDiagnosis = {}

        carDiagnosis.diagnosisRepairs = []

        carDiagnosis.price = 0
        carDiagnosis.repair = carDiagnosisCreateData.repair

        for (let diagnosisRepair of carDiagnosisCreateData.diagnosisRepairs) {

            carDiagnosis.price += diagnosisRepair.quantity * diagnosisRepair.repairType.repairCost

            carDiagnosis.diagnosisRepairs.push({
                repairType: diagnosisRepair.repairType._id,
                quantity: diagnosisRepair.quantity
            })

        }

        // Calcul price par rapport %

        await this.calculatePriceOfDiagnostic(carDiagnosis)

        const currentCarDiagnosis = await this.create(carDiagnosis)

        await this.repairService.carDiagnosis(carDiagnosis.repair, carDiagnosis.price)

        return currentCarDiagnosis

    }


    async calculatePriceOfDiagnostic(carDiagnosis) {
        const price = carDiagnosis.price

        const diagnosisPercentage = await this.diagnosisPercentageService.findOne()
        carDiagnosis.price = price * diagnosisPercentage.percentage
    }


    async find(query, options) {

        query = Object.assign(isEmpty(query) ? {} : query, {deleted: false})

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
            .findOne({_id: carId, deleted: false})
            .lean()

    }


}

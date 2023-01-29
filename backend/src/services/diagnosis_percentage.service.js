import createError from 'http-errors'
import { Settings } from '../config/settings.js'
import { Car } from '../models/cars.schema.js'
import { isEmpty, toDocumentFormat } from '../utils/utils.js'
import { DiagnosisPercentage } from '../models/diagnosis_percentage.schema.js'


export class DiagnosisPercentageService {

    constructor() {

        this.settings = new Settings()

    }


    async findById(diagnosisPercentageId) {

        return DiagnosisPercentage
            .findOne({_id: diagnosisPercentageId, deleted: false})
            .lean()

    }

    async create(diagnosisPercentageData) {


        const createdDiagnosisPercentageData = new DiagnosisPercentage(toDocumentFormat(diagnosisPercentageData))

        await createdDiagnosisPercentageData.save()

        return await this.findById(createdDiagnosisPercentageData._id)

    }

    async findOne() {

        const foundDiagnosisPercentage = await DiagnosisPercentage
            .findOne()
            .lean()

        if (isEmpty(foundDiagnosisPercentage)) throw createError(409, 'No Diagnosis Percentage')

        return foundDiagnosisPercentage

    }





}

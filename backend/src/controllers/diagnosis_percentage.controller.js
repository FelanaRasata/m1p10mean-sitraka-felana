import { validationMiddleware } from '../middlewares/validation.middleware.js'
import { toResponseEntity } from '../utils/utils.js'
import { CarDiagnosisCreateDto, CarDiagnosisCreateVS } from '../dto/car_diagnosis.dto.js'
import { Router } from 'express'
import { CarDiagnosisService } from '../services/car_diagnosis.service.js'
import { DiagnosisPercentageService } from '../services/diagnosis_percentage.service.js'


const router = Router()

const diagnosisPercentageService = new DiagnosisPercentageService()

router.post('/', async (request, response) => {

    try {

        const diagnosisPercentageData = request.body

        const diagnosisPercentage = await diagnosisPercentageService.create(diagnosisPercentageData)

        response.status(200).json(toResponseEntity(200, 'Diagnosis Percentage has created', diagnosisPercentage))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

export { router as DiagnosisPercentageRouter }

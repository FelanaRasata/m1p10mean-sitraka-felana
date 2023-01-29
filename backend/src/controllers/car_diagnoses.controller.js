import { validationMiddleware } from '../middlewares/validation.middleware.js'
import { toResponseEntity } from '../utils/utils.js'
import { CarDiagnosisCreateDto, CarDiagnosisCreateVS } from '../dto/car_diagnosis.dto.js'
import { Router } from 'express'
import { CarDiagnosisService } from '../services/car_diagnosis.service.js'


const router = Router()

const carDiagnosisService = new CarDiagnosisService()

router.post('/', validationMiddleware(CarDiagnosisCreateVS, CarDiagnosisCreateDto), async (request, response) => {

    try {

        const carDiagnosisCreateData = request.body

        const carDiagnosis = await carDiagnosisService.createDiagnosis(carDiagnosisCreateData)

        response.status(200).json(toResponseEntity(200, 'Car Diagnosis has created', carDiagnosis))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

export { router as CarDiagnosesRouter }

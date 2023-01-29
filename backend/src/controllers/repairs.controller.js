import { Router } from 'express'
import { CarDto, CarVS } from '../dto/cars.dto.js'
import { authentication } from '../middlewares/authentication.middleware.js'
import { validationMiddleware } from '../middlewares/validation.middleware.js'
import { RepairService } from '../services/repairs.service.js'
import { isEmpty, toResponseEntity } from '../utils/utils.js'


const router = Router()

const repairService = new RepairService()

router.get('/', async (request, response) => {

    try {

        const optionsData = isEmpty(request.query.options) ? {pagination: false} : JSON.parse(request.query.options)

        const queryData = isEmpty(request.query.query) ? {} : JSON.parse(request.query.query)

        const repairs = await repairService.find(queryData, optionsData)

        response.status(200).json(toResponseEntity(200, 'Repairs Car.', repairs))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.get('/:repair_id', async (request, response) => {

    try {

        const repair = await repairService.findById(request.params.repair_id)

        response.status(200).json(toResponseEntity(200, 'Repairs Car.', repair))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.get('/:repair_id', async (request, response) => {

    try {

        const repairId = request.params.repair_id

        const cars = await repairService.findById(repairId)

        response.status(200).json(toResponseEntity(200, 'Repair Card.', cars))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.post('/init/:car_id/', authentication, async (request, response) => {

    try {

        const carId = request.params.car_id
        const repair = await repairService.initRepair(carId)

        response.status(200).json(toResponseEntity(200, 'Repair has created', repair))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.put('/diagno/:repair_id', async (request, response) => {

    try {

        const carId = request.params.car_id
        const repair = await repairService.initRepair(carId)

        response.status(200).json(toResponseEntity(200, 'Repair has created', repair))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.put('/:repair_id', async (request, response) => {

    try {

        const repairData = request.body
        const repairId = request.params.repair_id
        const repairState = request.query.repair_state
        const repair = await repairService.update(repairId, repairData, repairState)

        response.status(200).json(toResponseEntity(200, 'Repair has updated', repair))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})



router.delete('/:repair_id', async (request, response) => {

    try {

        const repairId = request.params.repair_id
        const repair = await repairService.delete(repairId)

        response.status(200).json(toResponseEntity(200, 'Repair has deleted', repair))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

export { router as RepairsRouter }

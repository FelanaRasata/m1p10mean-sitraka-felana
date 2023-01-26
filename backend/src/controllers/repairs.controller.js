import {Router} from 'express'
import {validationMiddleware} from '../middlewares/validation.middleware.js'
import {isEmpty, toResponseEntity} from '../utils/utils.js'
import {CarDto, CarVS} from "../dto/cars.dto.js";
import {RepairService} from "../services/repairs.service.js";
import {RepairDto, RepairVS} from "../dto/repairs.dto.js";


const router = Router()

const repairService = new RepairService()

router.get('', async (request, response) => {

    try {

        const optionsData = isEmpty(request.params.options) ? {pagination: false} : JSON.parse(request.params.options);

        const queryData = isEmpty(request.params.query) ? {} : JSON.parse(request.params.query);

        const cars = await repairService.find(queryData, optionsData)

        response.status(200).json(toResponseEntity(200, 'Repairs Car.', cars))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.post('/create', validationMiddleware(RepairVS, RepairDto), async (request, response) => {

    try {

        const repairData = request.body
        const repair = await repairService.create(repairData)

        response.status(200).json(toResponseEntity(200, 'Repair has created', repair))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.put('/update', validationMiddleware(CarVS, CarDto), async (request, response) => {

    try {

        const repairData = request.body
        const repairId = request.params.repair_id;
        const repairState = request.params.repair_state;
        const repair = await repairService.update(repairId, repairData, repairState)

        response.status(200).json(toResponseEntity(200, 'Repair has updated', repair))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.delete('/delete', async (request, response) => {

    try {

        const repairId = request.params.repair_id;
        const repair = await repairService.delete(repairId)

        response.status(200).json(toResponseEntity(200, 'Repair has deleted', repair))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

export {router as RepairRouter}

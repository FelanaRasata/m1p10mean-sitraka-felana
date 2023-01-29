import { Router } from 'express'
import { RepairTypeDto, RepairTypeVS } from '../dto/repair_types.dto.js'
import { validationMiddleware } from '../middlewares/validation.middleware.js'
import { RepairTypeService } from '../services/repair_types.service.js'
import { isEmpty, toResponseEntity } from '../utils/utils.js'


const router = Router()

const repairTypeService = new RepairTypeService()

router.get('/', async (request, response) => {

    try {

        const optionsData = isEmpty(request.query.options) ? { pagination: false } : JSON.parse(request.query.options)

        const queryData = isEmpty(request.query.query) ? {} : JSON.parse(request.query.query)

        const cars = await repairTypeService.find(queryData, optionsData)

        response.status(200).json(toResponseEntity(200, 'Repair\'s Type.', cars))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.post('/', validationMiddleware(RepairTypeVS, RepairTypeDto), async (request, response) => {

    try {

        const repairData = request.body
        const repair = await repairTypeService.create(repairData)

        response.status(200).json(toResponseEntity(200, 'Repair has created', repair))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

export { router as RepairTypesRouter }

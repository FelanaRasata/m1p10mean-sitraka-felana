import { Router } from 'express'
import { authentication } from '../middlewares/authentication.middleware.js'
import { RepairService } from '../services/repairs.service.js'
import { isEmpty, toResponseEntity } from '../utils/utils.js'


const router = Router()

const repairService = new RepairService()

router.get('/', async (request, response) => {

    try {

        const optionsData = isEmpty(request.query.options) ? { pagination: false } : JSON.parse(request.query.options)

        const queryData = isEmpty(request.query.query) ? {} : JSON.parse(request.query.query)

        const repairs = await repairService.find(queryData, optionsData)

        response.status(200).json(toResponseEntity(200, 'Repairs Car.', repairs))

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

router.post('/drop_off_car/:car_id/', authentication, async (request, response) => {

    try {

        const carId = request.params.car_id
        const repair = await repairService.dropOffCar(carId)

        response.status(200).json(toResponseEntity(200, 'Repair has created', repair))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.put('/proceed/:repair_id', authentication, async (request, response) => {

    try {

        const repairId = request.params.repair_id
        const repairDto = request.body
        const repair = await repairService.proceedRepair(repairId, repairDto)

        response.status(200).json(toResponseEntity(200, 'Repair proceeded', repair))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.put('/finish/:repair_id', authentication, async (request, response) => {

    try {

        const repairId = request.params.repair_id
        const repairDto = request.body
        const repair = await repairService.finishRepair(repairId, repairDto)

        response.status(200).json(toResponseEntity(200, 'Repair proceeded', repair))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.put('/finance/validate/:repair_id', async (request, response) => {

    try {

        const repairId = request.params.repair_id
        const repair = await repairService.financeValidate(repairId)

        response.status(200).json(toResponseEntity(200, 'Repair is in progress', repair))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.put('/paid/:repair_id', async (request, response) => {

    try {

        const repairId = request.params.repair_id
        const repair = await repairService.paidRepair(repairId)

        response.status(200).json(toResponseEntity(200, 'Repair is paid', repair))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.put('/car_back/:repair_id', async (request, response) => {

    try {

        const repairId = request.params.repair_id
        const repair = await repairService.validateExitCar(repairId)

        response.status(200).json(toResponseEntity(200, 'Car is taken back', repair))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.put('/init/:repair_id', authentication, async (request, response) => {

    try {

        const repairData = request.body
        const repairId = request.params.repair_id
        const repair = await repairService.initRepair(repairId, repairData)

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

import { Router } from 'express'
import { CarDto, CarVS } from '../dto/cars.dto.js'
import { authentication } from '../middlewares/authentication.middleware.js'
import { validationMiddleware } from '../middlewares/validation.middleware.js'
import { CarService } from '../services/cars.service.js'
import { isEmpty, toResponseEntity } from '../utils/utils.js'


const router = Router()

const carService = new CarService()

router.get('', authentication, async (request, response) => {
// router.get('', async (request, response) => {

    try {

        const optionsData = isEmpty(request.params.options) ? { pagination: false } : JSON.parse(request.params.options)

        const customer = request.user
        const queryData = { customer: customer._id }

        // const id = "63cce33697ca556feba7cb69";

        const cars = await carService.find(queryData, optionsData)
        // const cars = await carService.findByCustomer(id, optionsData)

        response.status(200).json(toResponseEntity(200, 'Cars Customer.', cars))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.post('/create', validationMiddleware(CarVS, CarDto), async (request, response) => {

    try {

        const carData = request.body
        const car = await carService.create(carData)

        response.status(200).json(toResponseEntity(200, 'Car has created', car))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.put('/update/:car_id', validationMiddleware(CarVS, CarDto), async (request, response) => {

    try {

        const carData = request.body
        const carId = request.params.car_id
        const car = await carService.update(carId, carData)

        response.status(200).json(toResponseEntity(200, 'Car has updated', car))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.delete('/delete/:car_id', async (request, response) => {

    try {

        const carId = request.params.car_id
        const car = await carService.delete(carId)

        response.status(200).json(toResponseEntity(200, 'Car has deleted', car))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

export { router as CarsRouter }

import {Router} from 'express'
import {validationMiddleware} from '../middlewares/validation.middleware.js'
import {toResponseEntity} from '../utils/utils.js'
import {CarDto, CarVS} from "../dto/cars.dto.js";
import {CarService} from "../services/cars.service.js";


const router = Router()

const carService = new CarService()

router.get('/list/:customer', async (request, response) => {

    try {

        const customer = request.params.customer
        const cars = await carService.findByCustomer(customer)

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
        const carId = request.params.car_id;
        const car = await carService.update(carId,carData)

        response.status(200).json(toResponseEntity(200, 'Car has updated', car))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.delete('/delete/:car_id',async (request, response) => {

    try {

        const carId = request.params.car_id;
        const car = await carService.delete(carId)

        response.status(200).json(toResponseEntity(200, 'Car has deleted', car))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

export { router as CarRouter }

import createError from 'http-errors'
import { Settings } from '../config/settings.js'
import { Car } from '../models/cars.schema.js'
import { customLabels, isEmpty, toDocumentFormat } from '../utils/utils.js'
import { UserService } from './users.service.js'


export class CarService {

    constructor() {

        this.settings = new Settings()
        this.userService = new UserService()

    }


    async create(carData) {

        const customer = await this.userService.findById(carData.customer)

        if (isEmpty(customer)) throw createError(409, 'Customer not found.')

        const createdCar = new Car(toDocumentFormat(carData))

        await createdCar.save()

        return await this.findById(createdCar._id)

    }


    async find(query, options) {

        query = Object.assign(isEmpty(query) ? {} : query, { deleted: false })

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
            .findOne({ _id: carId, deleted: false })
            .lean()

    }


    async update(carId, carData) {

        if (isEmpty(carId)) throw createError(409, 'No car ID found')

        const carCurrent = await Car.findById(carId)

        if (carCurrent.deleted) throw createError(409, 'The car is already deleted')

        carCurrent.carNumber = carData.carNumber
        carCurrent.brand = carData.brand

        await carCurrent.save()

        return await this.findById(carId)

    }


    async delete(carId) {

        if (isEmpty(carId)) throw createError(409, 'No car ID found')

        const currentCar = await Car.findById(carId)

        if (isEmpty(currentCar)) throw createError(409, 'No car found')

        currentCar.deleted = true

        await currentCar.save()

        return await this.findById(carId)

    }

}

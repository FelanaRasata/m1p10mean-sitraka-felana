import {Settings} from '../config/settings.js'
import {Car} from '../models/cars.schema.js'
import {customLabels, isEmpty, toDocumentFormat} from '../utils/utils.js'
import {User} from "../models/users.schema.js";
import {UserService} from "./users.service.js";


export class CarService {

    constructor() {

        this.settings = new Settings()
        this.userService = new UserService()

    }


    // Create a new car
    async create(carData) {

        const customer = await this.userService.findById(carData.customer);

        if (isEmpty(customer)) throw new Error("Customer not found.")

        const createdCar = new Car(toDocumentFormat(carData))

        await createdCar.save()

        return await this.findById(createdCar._id)

    }


    // Get all cars with pagination
    async find(query, options) {

        query = Object.assign(isEmpty(query) ? {} : query, {deleted: false})

        console.log(query)

        options = Object.assign(isEmpty(options) ? {} : options, {
            lean: true,
            allowDiskUse: true,
            customLabels: customLabels()
        })

        return await Car.paginate(query, options)

    }


    // Get cars customer with pagination
    async findByCustomer(customerId) {

        const query = {customer: customerId}

        return this.find(query)

    }


    // Get a single car by ID
    async findById(carId) {

        if (isEmpty(carId)) throw new Error('No car ID found')

        return Car
            .findOne({_id: carId, deleted: false})
            .lean()

    }


    // Update a car by ID
    async update(carId, carData) {

        if (isEmpty(carId)) throw new Error("No car ID found")

        const carCurrent = await Car.findById(carId);

        if (carCurrent.deleted) throw new Error("The car is already deleted")

        carCurrent.carNumber = carData.carNumber
        carCurrent.brand = carData.brand

        await carCurrent.save()

        return await this.findById(carId)

    }


    // Delete a car by ID
    async delete(carId) {

        if (isEmpty(carId)) throw new Error('No car ID found')

        const currentCar = await Car.findById(carId)

        if (isEmpty(currentCar)) throw new Error('No car found')

        currentCar.deleted = true

        await currentCar.save()

        return await this.findById(carId)

    }

}

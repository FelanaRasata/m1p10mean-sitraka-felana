import {Settings} from '../config/settings.js'
import {customLabels, isEmpty, toDocumentFormat} from '../utils/utils.js'
import {CarService} from "./cars.service.js";
import {Repair} from "../models/repairs.schema.js";
import {Error} from "mongoose";
import {ERepairState} from "../utils/static_enums.js";
import {Car} from "../models/cars.schema.js";


export class RepairService {

    constructor() {

        this.settings = new Settings()
        this.carService = new CarService()

    }


    // Create a new car
    async create(repairData) {

        const car = await this.carService.findById(repairData.car);

        if (isEmpty(car)) throw new Error("Car not found.")

        if (isEmpty(repairData.carDroppedOffAt))
            repairData.carDroppedOffAt = new Date()

        const createdRepair = new Repair(toDocumentFormat(repairData))

        await createdRepair.save()

        return await this.findById(createdRepair._id)

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

        return await Repair.paginate(query, options)

    }


    // Get a single car by ID
    async findById(repairId) {

        if (isEmpty(repairId)) throw new Error('No car ID found')

        return Repair
            .findOne({_id: repairId, deleted: false})
            .lean()

    }


    // Update a car by ID
    async update(repairId, repairData, repairState) {

        if (isEmpty(repairId)) throw new Error("No repair ID found")

        const repairCurrent = await Car.findById(repairId);

        if (repairCurrent.deleted) throw new Error("The repair is already deleted")

        repairCurrent.price = repairData.price
        repairCurrent.repairType = repairData.repairType

        if (repairState === ERepairState.DIAGNO) {

            if (isEmpty(repairData.diagnosedAt))
                repairCurrent.carDroppedOffAt = new Date()

            if (isEmpty(repairData.carDroppedOffAt))
                throw new Error("The car is not dropped off")

        } else if (repairState === ERepairState.INIT) {

            if (isEmpty(repairData.initiatedAt))
                repairCurrent.carDroppedOffAt = new Date()

            if (isEmpty(repairData.diagnosedAt))
                throw new Error("The car has not diagnosed")

        } else if (repairState === ERepairState.PROGRESS) {

            if (isEmpty(repairData.inProgressAt))
                repairCurrent.carDroppedOffAt = new Date()

            if (isEmpty(repairData.initiatedAt))
                throw new Error("The repair has not initiated")

        } else if (repairState === ERepairState.REPAIRED) {

            if (isEmpty(repairData.carRepairedAt))
                repairCurrent.carDroppedOffAt = new Date()

            if (isEmpty(repairData.inProgressAt))
                throw new Error("The repair is not in progress")

        } else if (repairState === ERepairState.PAID) {

            if (isEmpty(repairData.paidAt))
                repairCurrent.carDroppedOffAt = new Date()

            if (isEmpty(repairData.diagnosedAt)
                || isEmpty(repairData.carRepairedAt)
            )
                throw new Error("The car is not diagnosed or repaired")

        } else if (repairState === ERepairState.TAKEN_BACK) {

            if (isEmpty(repairData.carTakenBackAt))
                repairCurrent.carDroppedOffAt = new Date()

            if (isEmpty(repairData.paidAt)
            )
                throw new Error("The repair is not paid")

        }

        await repairCurrent.save()

        return await this.findById(repairId)

    }


    // Delete a car by ID
    async delete(repairId) {

        if (isEmpty(repairId)) throw new Error('No repair ID found')

        const currentRepair = await Repair.findById(repairId)

        if (isEmpty(currentRepair)) throw new Error('No repair found')

        currentRepair.deleted = true

        await currentRepair.save()

        return await this.findById(repairId)

    }

}

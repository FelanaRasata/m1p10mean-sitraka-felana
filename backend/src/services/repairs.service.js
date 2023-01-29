import createError from 'http-errors'
import * as _ from 'lodash'
import { Settings } from '../config/settings.js'
import { Repair } from '../models/repairs.schema.js'
import { ERepairState } from '../utils/static_enums.js'
import { customLabels, isEmpty, toDocumentFormat } from '../utils/utils.js'
import { CarService } from './cars.service.js'


export const UPDATE_TYPE = ['DIAGNO', 'INIT', 'PROGRESS', 'REPAIRED', 'PAID', 'TAKEN_BACK']

const REPAIR_ATTRIBUTES = {
    DIAGNO: {current: 'diagnosedAt', previous: ['carDroppedOffAt']},
    INIT: {current: 'initiatedAt', previous: ['diagnosedAt']},
    PROGRESS: {current: 'inProgressAt', previous: ['initiatedAt']},
    REPAIRED: {current: 'carRepairedAt', previous: ['inProgressAt']},
    PAID: {current: 'paidAt', previous: ['diagnosedAt', 'carRepairedAt']},
    TAKEN_BACK: {current: 'carTakenBackAt', previous: ['paidAt']},
}

const ERROR_MESSAGES = {
    carDroppedOffAt: 'the car has not been dropped off',
    diagnosedAt: 'the car has not been diagnosed yet',
    initiatedAt: 'the repair is not initiated',
    inProgressAt: 'the repairs has not began',
    carRepairedAt: 'the car was not repaired yet',
    paidAt: 'the repair has not been paid',
}


export class RepairService {

    constructor() {

        this.settings = new Settings()
        this.carService = new CarService()

    }


    async create(repairData) {

        const car = await this.carService.findById(repairData.car)

        if (isEmpty(car)) throw createError(409, 'Car not found.')

        if (isEmpty(repairData.carDroppedOffAt))
            repairData.carDroppedOffAt = new Date()

        const createdRepair = new Repair(toDocumentFormat(repairData))

        await createdRepair.save()

        return await this.findById(createdRepair._id)

    }


    async find(query, options) {

        query = Object.assign(isEmpty(query) ? {} : query, {deleted: false})

        options = Object.assign(isEmpty(options) ? {} : options, {
            lean: true,
            allowDiskUse: true,
            customLabels: customLabels()
        })

        return await Repair.paginate(query, options)

    }


    async findById(repairId) {

        if (isEmpty(repairId)) throw createError(409, 'No repair ID found')

        return Repair
            .findOne({_id: repairId, deleted: false})
            .lean()

    }


    applyChangesOnCurrentRepair(currentRepair, repairState, repairData) {

        const stateKey = UPDATE_TYPE.find(item => item === repairState)

        if (isEmpty(stateKey)) throw Error('No state found.')

        const currentField = REPAIR_ATTRIBUTES[stateKey]

        if (isEmpty(currentField)) throw Error('No field found.')

        const errMessages = []

        for (const mustHave of currentField.previous) {

            if (isEmpty(currentRepair[mustHave]))
                errMessages.push(ERROR_MESSAGES[mustHave])

        }

        if (!isEmpty(errMessages)) {

            const errMessage = errMessages.join(' and ')

            throw createError(errMessage[0].toUpperCase() + (errMessage.split('').slice(1)).join(''))

        }

        currentRepair[currentField.current] = new Date()

        return currentRepair

    }


    // Update a repair by ID
    async update(repairId, repairData, repairState) {

        if (isEmpty(repairId)) throw createError(409, 'No repair ID found')

        let currentRepair = await Repair.findById(repairId)

        if (isEmpty(currentRepair) || currentRepair?.deleted) throw createError(409, 'No repair found')

        currentRepair.price = repairData.price
        currentRepair.repairType = repairData.repairType

        currentRepair = this.applyChangesOnCurrentRepair(currentRepair, repairState, repairData)

        /*if (repairState === ERepairState.DIAGNO) {

            if (isEmpty(repairData.diagnosedAt))
                repairCurrent.diagnosedAt = new Date()

            if (isEmpty(repairData.carDroppedOffAt))
                throw createError(409, 'The car has not been dropped off')

        } else if (repairState === ERepairState.INIT) {

            if (isEmpty(repairData.initiatedAt))
                repairCurrent.initiatedAt = new Date()

            if (isEmpty(repairData.diagnosedAt))
                throw createError(409, 'The car has not diagnosed')

        } else if (repairState === ERepairState.PROGRESS) {

            if (isEmpty(repairData.inProgressAt))
                repairCurrent.inProgressAt = new Date()

            if (isEmpty(repairData.initiatedAt))
                throw createError(409, 'The repair has not initiated')

        } else if (repairState === ERepairState.REPAIRED) {

            if (isEmpty(repairData.carRepairedAt))
                repairCurrent.carRepairedAt = new Date()

            if (isEmpty(repairData.inProgressAt))
                throw createError(409, 'The repair is not in progress')

        } else if (repairState === ERepairState.PAID) {

            if (isEmpty(repairData.paidAt))
                repairCurrent.paidAt = new Date()

            if (isEmpty(repairData.diagnosedAt) || isEmpty(repairData.carRepairedAt))
                throw createError(409, 'The car is not diagnosed or repaired')

        } else if (repairState === ERepairState.TAKEN_BACK) {

            if (isEmpty(repairData.carTakenBackAt))
                repairCurrent.carTakenBackAt = new Date()

            if (isEmpty(repairData.paidAt))
                throw createError(409, 'The repair is not paid')

        }*/

        await currentRepair.save()

        return await this.findById(repairId)

    }


    async delete(repairId) {

        if (isEmpty(repairId)) throw createError(409, 'No repair ID found')

        const currentRepair = await Repair.findById(repairId)

        if (isEmpty(currentRepair)) throw createError(409, 'No repair found')

        currentRepair.deleted = true

        await currentRepair.save()

        return await this.findById(repairId)

    }

}

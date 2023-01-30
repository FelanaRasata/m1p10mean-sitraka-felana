import createError from 'http-errors'
import { Settings } from '../config/settings.js'
import { Repair } from '../models/repairs.schema.js'
import { EXPENSES } from '../utils/constants.js'
import { exit_voucher, invoice } from '../utils/html_formatter.js'
import { convertHtmlToPdf, customLabels, isEmpty, sendEmail, toDocumentFormat } from '../utils/utils.js'
import { CarService } from './cars.service.js'
import { UserService } from './users.service.js'


export class RepairService {

    constructor() {

        this.settings = new Settings()
        this.carService = new CarService()
        this.userService = new UserService()

    }


    async find(query, options) {

        query = Object.assign(isEmpty(query) ? {} : query, {
            deleted: false
        })

        options = Object.assign(isEmpty(options) ? {} : options, {
            lean: true,
            allowDiskUse: true,
            customLabels: customLabels(),
            populate: [
                {
                    path: 'car'
                },
                {
                    path: 'car_diagnosis',
                    populate: {
                        path: 'diagnosisRepairs.repairType',
                    }
                },
                {
                    path: 'selectedRepairs.repairType',
                    model: 'RepairType'
                }
            ]
        })

        return await Repair.paginate(query, options)

    }


    async findById(repairId) {

        if (isEmpty(repairId)) throw createError(409, 'No repair ID found')

        return Repair
            .findOne({_id: repairId, deleted: false})
            .populate('car')
            .populate({
                path: 'car_diagnosis',
                populate: {
                    path: 'diagnosisRepairs.repairType',
                    model: 'RepairType'
                }
            })
            .populate({
                path: 'selectedRepairs.repairType',
                model: 'RepairType'
            })
            .lean()

    }


    async downloadInvoice(repairId) {

        if (isEmpty(repairId)) throw createError(409, 'No repair ID found')

        const repair = Repair
            .findOne({_id: repairId, deleted: false})
            .populate('customer')
            .populate('car')
            .populate({
                path: 'car_diagnosis',
                populate: {
                    path: 'diagnosisRepairs.repairType',
                    model: 'RepairType'
                }
            })
            .populate({
                path: 'selectedRepairs.repairType',
                model: 'RepairType'
            })
            .lean()

        if (isEmpty(repair)) throw createError(409, 'No repair found')

        return await convertHtmlToPdf(invoice(repair))

    }


    async updateDiagnosisState(repairId, price) {

        let currentRepair = await Repair.findById(repairId)
        if (!currentRepair['carDroppedOffAt'] || currentRepair['carDroppedOffAt'] === null || typeof currentRepair['carDroppedOffAt'] === 'undefined')
            throw createError(409, 'The car has not been dropped off')

        currentRepair.price = price

        currentRepair.diagnosedAt = new Date()

        await currentRepair.save()

        return await this.findById(repairId)
    }


    async financeValidate(repairId) {

        let currentRepair = await Repair.findById(repairId)

        currentRepair.inProgressAt = new Date()

        await currentRepair.save()

        return await this.findById(repairId)
    }


    async paidRepair(repairId) {

        let currentRepair = await Repair.findById(repairId)

        if (!currentRepair.diagnosedAt) {
            throw new createError(409, 'The car has not been diagnosed')
        } else if (!currentRepair.carRepairedAt) {
            throw new createError(409, 'The car is not not repaired yet')
        }

        currentRepair.paidAt = new Date()

        await currentRepair.save()

        return await this.findById(repairId)
    }


    async validateExitCar(repairId) {

        let currentRepair = await Repair.findById(repairId)

        // if (!currentRepair.paidAt) {
        //     throw new createError(409, 'The repair is not not paid')
        // }
        currentRepair.carTakenBackAt = new Date()

        await currentRepair.save()

        let repair = await this.findById(repairId)

        let user = await this.userService.findById(repair.car.customer)

        console.log(user)

        await sendEmail([user.emailAddress], 'Exit Voucher', exit_voucher(repair.car.carNumber, user), true)

        return repair
    }


    async dropOffCar(carId) {

        const car = await this.carService.findById(carId)

        if (isEmpty(car)) throw createError(409, 'Car not found.')

        const createdRepair = new Repair(toDocumentFormat({
            car: car._id,
            carDroppedOffAt: new Date()
        }))

        await createdRepair.save()

        return await this.findById(createdRepair._id)

    }


    // Update a repair by ID
    async initRepair(repairId, repairData) {

        if (isEmpty(repairId)) throw createError(409, 'No repair ID found')

        let currentRepair = await Repair.findById(repairId)

        if (isEmpty(currentRepair) || currentRepair?.deleted) throw createError(409, 'No repair found')

        currentRepair.selectedRepairs = repairData.selectedRepairs
        let price = repairData.car_diagnosis.price
        let allNotPart = 1

        for (const repairItem of repairData.selectedRepairs) {

            const repairType = repairData.car_diagnosis.diagnosisRepairs.find(element => element.repairType._id === repairItem.repairType)

            if (!isEmpty(repairType)) {

                price += (repairType.repairType.repairCost * repairType.quantity) * (1 + EXPENSES.manpower)

                allNotPart *= repairType.repairType.carPart ? 0 : 1

            }

        }


        currentRepair.price = price

        currentRepair.initiatedAt = new Date(repairData.initiatedAt)

        if (allNotPart === 1) currentRepair.inProgressAt = new Date()

        await currentRepair.save()

        return await this.findById(repairId)

    }


    // Update a repair by ID
    async proceedRepair(repairId, repairData) {

        if (isEmpty(repairId)) throw createError(409, 'No repair ID found')

        let currentRepair = await Repair.findById(repairId)

        if (isEmpty(currentRepair) || currentRepair?.deleted) throw createError(409, 'No repair found')

        currentRepair.selectedRepairs = repairData.selectedRepairs

        await currentRepair.save()

        return await this.findById(repairId)

    }


    // Update a repair by ID
    async finishRepair(repairId, repairData) {

        if (isEmpty(repairId)) throw createError(409, 'No repair ID found')

        let currentRepair = await Repair.findById(repairId)

        if (isEmpty(currentRepair) || currentRepair?.deleted) throw createError(409, 'No repair found')

        currentRepair.selectedRepairs = repairData.selectedRepairs
        currentRepair.carRepairedAt = new Date(repairData.carRepairedAt)

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


    async timeRepair() {
        return Repair.aggregate([
            {
                $match: {
                    carTakenBackAt : {$ne : null}
                }
            },
            {
                $group: {
                    _id: null,
                    totalDifference: {$sum: {$subtract: ['$carTakenBackAt', '$carDroppedOffAt']}}
                }
            },

        ]).exec()

        /*return Repair.aggregate([
                    {
                        $match: {
                            carTakenBackAt : {$ne : null}
                        }
                    },
                    {
                        $project: {
                            _id: "$_id",
                            totalDifference:  {$subtract: ['$carTakenBackAt', '$carDroppedOffAt']}
                        }
                    },

                ]).exec()*/
    }


    async countRepair() {
        return Repair.countDocuments({
            carTakenBackAt : {$ne : null},
            deleted: false
        })
    }


    async averageRepairTime() {

        const time = await this.timeRepair()

        const count = await this.countRepair()

        const average = (time[0].totalDifference / count)

        return {
            millisecond : average.toFixed(2),
            hour: (average/3600000).toFixed(2),
            day: (average / (3600000*24)).toFixed(2)
        }

    }


    async turnoverByMonth() {
        return Repair.aggregate([
            {
                $group: {
                    _id: {
                        year: {$year: '$paidAt'},
                        month: {$month: '$paidAt'}
                    },
                    total: {$sum: '$price'}
                },


            },
            {
                $sort: {
                    _id: 1,
                },
            },
            {'$limit': 12}
        ])
    }


    async completeTurnover() {

        let dates = this.createArrayDate()

        let turnoverMonth = await this.turnoverByMonth()

        console.log(dates)

        for (let date of dates) {
            const element = turnoverMonth.find(element => element._id.year === date._id.year && element._id.month === date._id.month)

            if (!isEmpty(element))
                date.total = element.total
        }

        return dates

    }


    createArrayDate() {
        const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
        const currentYear = new Date().getFullYear()
        const currentMonth = new Date().getMonth() + 1

        const years = [currentYear - 1, currentYear]

        const index = months.findIndex(item => item === currentMonth)

        let dates = []

        for (let i = 0; i < months.length; i++) {
            let temp
            if (i <= index) {
                temp = {
                    _id: {
                        year: years[1],
                        month: months[i]
                    },
                    total: 0
                }
            } else {
                temp = {
                    _id: {
                        year: years[0],
                        month: months[i]
                    },
                    total: 0
                }
            }
            dates.push(temp)
        }

        dates.sort((a, b) => a._id.year - b._id.year)

        return dates
    }


    async benefitByMonth() {

        const expenses = EXPENSES.salaries + EXPENSES.rent + EXPENSES.others

        let turnoverMonth = await this.completeTurnover()

        for (let turnover of turnoverMonth) {
            turnover.total = turnover.total - expenses
        }

        return turnoverMonth

    }

}

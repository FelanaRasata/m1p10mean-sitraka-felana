import { customLabels, isEmpty, toDocumentFormat } from '../utils/utils.js'
import { Repair } from '../models/repairs.schema.js'
import { RepairType } from '../models/repair_types.schema.js'
import createError from 'http-errors'


export class RepairTypeService {

    async find(query, options) {

        query = Object.assign(isEmpty(query) ? {} : query, {deleted: false})

        options = Object.assign(isEmpty(options) ? {} : options, {
            lean: true,
            allowDiskUse: true,
            customLabels: customLabels()
        })

        return await RepairType.paginate(query, options)

    }


    async create(repairTypeData) {

        if (isEmpty(repairTypeData.carPart))
            repairTypeData.carPart = false

        const createdRepair = new Repair(toDocumentFormat(repairTypeData))

        await createdRepair.save()

        return await this.findById(createdRepair._id)

    }


    async findById(repairTypeId) {

        if (isEmpty(repairTypeId)) throw createError(409, 'No repair ID found')

        return RepairType
            .findOne({_id: repairTypeId, deleted: false})
            .lean()

    }

}

import { customLabels, isEmpty } from '../utils/utils.js'
import { Repair } from '../models/repairs.schema.js'
import { RepairType } from '../models/repair_types.schema.js'


export class RepairTypeService {

    async find(query, options) {

        query = Object.assign(isEmpty(query) ? {} : query, {deleted: false})

        console.log(query)

        options = Object.assign(isEmpty(options) ? {} : options, {
            lean: true,
            allowDiskUse: true,
            customLabels: customLabels()
        })

        return await RepairType.paginate(query, options)

    }
}

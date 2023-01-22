import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { baseModel } from '../utils/utils.js'


const RepairTypeSchema = new mongoose.Schema(
    baseModel({
        _id: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true,
            unique: true
        },
        repairCost: {
            type: Number,
            required: true,
            validate: {
                validator: (value) => value > 0,
                message: (props) => `${props.value} is not a valid price.`
            }
        },
        carPart: {
            type: Boolean,
            default: true,
            required: true
        }
    }),
    {
        timestamps: true,
        _id: false
    }
)

RepairTypeSchema.plugin(paginate)

export const RepairType = mongoose.model('RepairType', RepairTypeSchema, 'repair_types')

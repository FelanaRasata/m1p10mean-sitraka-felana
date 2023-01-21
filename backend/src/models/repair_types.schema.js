import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { baseModel } from '../utils/utils.js'


const RepairTypeSchema = new mongoose.Schema(
    baseModel({
        _id: {
            type: String,
            required: true
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
    }),
    {
        timestamps: true,
        _id: false
    }
)

// Add paginate plugin
RepairTypeSchema.plugin(paginate)

module.exports = mongoose.model('RepairType', RepairTypeSchema, 'repair_types')

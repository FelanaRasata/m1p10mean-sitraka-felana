import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { baseModel } from '../utils/utils.js'


const RepairSchema = new mongoose.Schema(
    baseModel({
        _id: {
            type: String,
            required: true,
            unique: true
        },
        car: {
            type: String,
            ref: 'Car',
            required: true
        },
        price: {
            type: Number,
            required: true,
            validate: {
                validator: (value) => value > 0,
                message: (props) => `${props.value} is not a valid price.`
            }
        },
        repairType: [{
            type: String,
            ref: 'RepairType',
            required: true
        }]
    }),
    {
        timestamps: true,
        _id: false
    }
)

RepairSchema.plugin(paginate)

module.exports = mongoose.model('Repair', RepairSchema, 'repairs')

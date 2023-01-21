import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { baseModel } from '../utils/utils.js'


const RentSchema = new mongoose.Schema(
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
        price: {
            type: Number,
            required: true,
            validate: {
                validator: (value) => value > 0,
                message: (props) => `${props.value} is not a valid price.`
            }
        },
        repairTypeId: {
            type: String,
            ref: 'RepairType',
            required: true
        }
    }),
    {
        timestamps: true,
        _id: false
    }
)

// Add paginate plugin
RentSchema.plugin(paginate)

module.exports = mongoose.model('Rent', RentSchema, 'car_parts')

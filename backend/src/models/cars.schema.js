import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { baseModel } from '../utils/utils.js'


const CarSchema = new mongoose.Schema(
    baseModel({
        _id: {
            type: String,
            required: true,
            unique: true
        },
        carNumber: {
            type: String,
            required: true,
            unique: true
        },
        brand: {
            type: String,
            required: true,
        },
        customer: {
            type: String,
            ref: 'User',
            required: true
        }
    }),
    {
        timestamps: true,
        _id: false
    }
)

CarSchema.plugin(paginate)

export const Car = mongoose.model('Car', CarSchema, 'cars')

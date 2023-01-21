import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { baseModel } from '../utils/utils.js'


const CarSchema = new mongoose.Schema(
    baseModel({
        _id: {
            type: String,
            required: true
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
        userId: {
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

// Add paginate plugin
CarSchema.plugin(paginate)

module.exports = mongoose.model('Car', CarSchema, 'cars')

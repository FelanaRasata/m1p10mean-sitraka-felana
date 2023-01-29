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
            default: 0,
            validate: {
                validator: (value) => value >= 0,
                message: (props) => `${props.value} is not a valid price.`
            }
        },
        selectedRepairs: [
            {
                repairType: {
                    type: String,
                    ref: 'RepairType',
                    required: true
                },
                checked: {
                    type: Boolean,
                    required: true,
                    default: false
                }
            },
        ],
        carDroppedOffAt: {
            type: Date,
            required: true
        },
        diagnosedAt: {
            type: Date,
            required: false
        },
        initiatedAt: {
            type: Date,
            required: false
        },
        inProgressAt: {
            type: Date,
            required: false
        },
        carRepairedAt: {
            type: Date,
            required: false
        },
        paidAt: {
            type: Date,
            required: false
        },
        carTakenBackAt: {
            type: Date,
            required: false
        },
    }),
    {
        timestamps: true,
        _id: false
    }
)

RepairSchema.plugin(paginate)

export const Repair = mongoose.model('Repair', RepairSchema, 'repairs')

import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { baseModel } from '../utils/utils.js'


const CarDiagnosisSchema = new mongoose.Schema(
    baseModel({
        _id: {
            type: String,
            required: true,
            unique: true
        },
        price: {
            type: Number,
            required: true
        },
        repair: {
            type: String,
            ref: 'Repair',
            required: true
        },
        diagnosisRepairs: [
            {
                repairType: {
                    type: String,
                    ref: 'RepairType',
                    required: true
                },
                quantity: {
                    type: Number,
                    required: true,
                    default: 1
                }
            }
        ],
    }),
    {
        timestamps: true,
        _id: false
    }
)


CarDiagnosisSchema.plugin(paginate)

export const CarDiagnosis = mongoose.model('CarDiagnosis', CarDiagnosisSchema, 'car_diagnoses')

import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'


const ManPowerSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            required: true,
            unique: true
        },
        percentage: {
            type: Number,
            required: true,
            validate: {
                validator: (value) => value >= 0 && value <= 1,
                message: (props) => `${props.value} is not a valid percentage.`
            }
        }
    },
    {
        timestamps: true,
        _id: false
    }
)

ManPowerSchema.plugin(paginate)

export const ManPower = mongoose.model('ManPower', ManPowerSchema, 'man_power')

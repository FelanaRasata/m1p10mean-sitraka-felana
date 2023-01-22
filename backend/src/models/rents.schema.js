import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'


const RentSchema = new mongoose.Schema(
    {
        _id: {
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
        }
    },
    {
        timestamps: true,
        _id: false
    }
)

RentSchema.plugin(paginate)

export const Rent = mongoose.model('Rent', RentSchema, 'car_parts')

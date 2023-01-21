import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'


const SalarySchema = new mongoose.Schema(
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

SalarySchema.plugin(paginate)

module.exports = mongoose.model('Salary', SalarySchema, 'salaries')

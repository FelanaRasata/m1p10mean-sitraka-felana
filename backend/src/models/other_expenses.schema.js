import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'


const OtherExpensesSchema = new mongoose.Schema(
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

OtherExpensesSchema.plugin(paginate)

export const OtherExpenses = mongoose.model('OtherExpenses', OtherExpensesSchema, 'other_expenses')

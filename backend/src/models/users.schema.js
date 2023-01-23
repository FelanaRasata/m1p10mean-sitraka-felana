import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import paginate from 'mongoose-paginate-v2'
import { EUserType } from '../utils/static_enums.js'
import { baseModel, isEmpty } from '../utils/utils.js'


const UserSchema = new mongoose.Schema(
    baseModel({
        _id: {
            type: String,
            required: true,
            unique: true
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        userName: {
            type: String,
            required: true
        },
        type: {
            type: String,
            enum: EUserType,
            default: EUserType.CUS
        },
        emailAddress: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String
        },
    }),
    {
        timestamps: true,
        _id: false
    }
)

UserSchema.pre('save', async function (next) {

    // only hash the password if it has been modified (or is new)
    if (!this.isModified('password') || isEmpty(this.password)) return next()

    // Random additional data
    const salt = await bcrypt.genSalt(10)

    // Replace the password with the hash
    this.password = await bcrypt.hash(this.password, salt)

    return next()

})

// Used for logging in
UserSchema.methods.comparePassword = async function (pwdToCompare) {

    try {

        return await bcrypt.compare(pwdToCompare, this.password)

    } catch (error) {

        console.log(error)

        return false

    }

}

UserSchema.plugin(paginate)

export const User = mongoose.model('User', UserSchema, 'users')
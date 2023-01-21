import { isEmpty } from 'class-validator'
import mongoose from 'mongoose'
import { customLabels } from '../utils/utils.js'


const User = mongoose.model('User')


export class UserService {

    // Create a new user
    static async create(userData) {

        try {

            const user = new User(userData)

            return await user.save()

        } catch (error) {

            throw error

        }

    }


    // Get all users with pagination
    static async find(query, options) {

        try {

            query = isEmpty(query) ? {} : query

            options = Object.assign(isEmpty(options) ? {} : options, {
                select: '-password',
                lean: true,
                allowDiskUse: true,
                customLabels: customLabels()
            })

            return await User.paginate(
                { ...query },
                { ...options },
            )

        } catch (error) {

            throw error

        }

    }


    // Get a single user by ID
    static async findById(userId) {

        try {

            return await User
                .findById(userId)
                .select('-password')
                .lean()

        } catch (error) {

            throw error

        }

    }


    // Update a user by ID
    static async update(userId, userData) {

        try {

            return await User
                .findByIdAndUpdate(userId, userData, { new: true })
                .select('-password')
                .lean()

        } catch (error) {

            throw error

        }

    }


    // Delete a user by ID
    static async delete(userId) {

        try {

            return await User.findByIdAndDelete(userId)

        } catch (error) {

            throw error

        }

    }

}
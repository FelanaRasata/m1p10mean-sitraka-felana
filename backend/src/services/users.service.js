import { Settings } from '../config/settings.js'
import { User } from '../models/users.schema.js'
import { EUserType } from '../utils/static_enum.js'
import { customLabels, generateToken, isEmailValid, isEmpty, toDocumentFormat } from '../utils/utils.js'


export class UserService {

    constructor() {

        this.settings = new Settings()

    }


    async signIn(signInData) {

        if (isEmpty(signInData)) throw new Error('Please fill all the inputs')

        if (!isEmailValid(signInData.emailAddress)) throw new Error('Incorrect email address.')

        const user = await User.findOne({ emailAddress: signInData.emailAddress })

        if (isEmpty(user)) throw new Error('Email address not found.')

        const isMatching = await user.comparePassword(String(signInData.password))

        if (!isMatching) throw new Error('Incorrect password')

        const token = generateToken({ user_id: user._id }, this.settings.expiresIn)

        return { token: token, user_type: user.type }

    }


    // Create a new user
    async create(userData) {

        if (!isEmailValid(userData.emailAddress)) throw new Error('Incorrect email address.')

        if (userData.type !== EUserType.CUS) throw new Error('Incorrect user type.')

        const createdUser = new User(toDocumentFormat(userData))

        await createdUser.save()

        return await this.findById(createdUser._id)

    }


    // Get all users with pagination
    async find(query, options) {

        query = Object.assign(isEmpty(query) ? {} : query, { deleted: false })

        options = Object.assign(isEmpty(options) ? {} : options, {
            select: '-password',
            lean: true,
            allowDiskUse: true,
            customLabels: customLabels()
        })

        return await User.paginate(query, options)

    }


    // Get a single user by ID
    async findById(userId) {

        if (isEmpty(userId)) throw new Error('No user ID found')

        return User
            .findOne({ _id: userId, deleted: false })
            .select('-password')
            .lean()

    }


    // Update a user by ID
    async update(userId, userData) {

        /**
         * Never use combined method like this `findByIdAndUpdate`, I used it because this method will never be used
         * I MEAN NEVER USE COMBINED METHOD PLEASE
         * I MEAN NEVER USE COMBINED METHOD PLEASE
         * I MEAN NEVER USE COMBINED METHOD PLEASE
         * I MEAN NEVER USE COMBINED METHOD PLEASE
         * */
        return User
            .findByIdAndUpdate(userId, userData, { new: true })
            .select('-password')
            .lean()

    }


    // Delete a user by ID
    async delete(userId) {

        if (isEmpty(userId)) throw new Error('No user ID found')

        const currentUser = await User.findById(userId)

        if (isEmpty(currentUser)) throw new Error('No user found')

        currentUser.deleted = true

        await currentUser.save()

        return await this.findById(userId)

    }

}

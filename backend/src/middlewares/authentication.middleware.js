import { isEmpty } from 'class-validator'
import { TokenExpiredError } from 'jsonwebtoken'
import { UserService } from '../services/users.service.js'
import { retrieveTokenData } from '../utils/utils.js'


export const authentication = async (request, response, next) => {

    try {

        const verificationResponse = await retrieveTokenData(request)
        const userService = new UserService()
        const userId = verificationResponse.user_id
        const foundUser = await userService.findById(userId)

        if (!isEmpty(foundUser)) {

            request.user = foundUser
            next()

        } else {

            next(new Error('Session not found'))

        }

    } catch (error) {

        if (error instanceof TokenExpiredError) {

            next(new Error('Session expired'))

        } else {

            console.error(error)
            next(new Error('Session not found'))

        }


    }

}

import pkg from 'jsonwebtoken'
import { UserService } from '../services/users.service.js'
import { logger } from '../utils/logger.js'
import { isEmpty, retrieveTokenData } from '../utils/utils.js'


const { JsonWebTokenError } = pkg


export const authentication = async (request, response, next) => {

    try {

        const verificationResponse = await retrieveTokenData(request)
        const userService = new UserService()
        const userId = verificationResponse.userId
        const foundUser = await userService.findById(userId)

        if (!isEmpty(foundUser)) {

            request.user = foundUser
            next()

        } else {

            const error = new Error('Session not found')
            next(error)

        }

    } catch (error) {

        if (error instanceof JsonWebTokenError) {

            logger.error(error)
            const err = new Error('Session expired')
            next(err)

        } else {

            logger.error(error)
            const err = new Error('Session not found')
            next(err)

        }

    }

}

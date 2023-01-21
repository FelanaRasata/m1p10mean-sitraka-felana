import { Router } from 'express'
import { authentication } from '../middlewares/authentication.middleware.js'
import { validationMiddleware } from '../middlewares/validation.middleware.js'
import { SignInDto, UserDto } from '../models/dto/users.dto.js'
import { UserService } from '../services/users.service.js'
import { toResponseEntity } from '../utils/utils.js'


const router = Router()

const userService = new UserService()

router.get('/sign_in', validationMiddleware(SignInDto), async (request, response) => {

    try {

        const signInData = Object.assign(new SignInDto(), request.body)
        const responseData = await userService.signIn(signInData)

        response.status(200).json(toResponseEntity(200, 'User created', responseData))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.get('/sign_up', validationMiddleware(UserDto), async (request, response) => {

    try {

        const userData = Object.assign(new UserDto(), request.body)
        const user = await userService.create(userData)

        const tokenData = await userService.signIn({
            emailAddress: user.emailAddress,
            password: userData.password
        })

        response.status(200).json(toResponseEntity(200, 'Sign up - success', tokenData))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.get('/logged_in_user', authentication, async (request, response) => {

    try {

        response.status(200).json(toResponseEntity(200, 'User created', request.user))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

export { router as SessionRouter }
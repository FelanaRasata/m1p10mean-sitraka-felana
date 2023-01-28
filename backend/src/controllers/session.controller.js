import { Router } from 'express'
import { SignInDto, SignInVS, UserDto, UserVS } from '../dto/users.dto.js'
import { authentication } from '../middlewares/authentication.middleware.js'
import { validationMiddleware } from '../middlewares/validation.middleware.js'
import { UserService } from '../services/users.service.js'
import { toResponseEntity } from '../utils/utils.js'


const router = Router()

const userService = new UserService()

router.post('/sign_in', validationMiddleware(SignInVS, SignInDto), async (request, response) => {

    try {

        const signInData = request.body
        const responseData = await userService.signIn(signInData)

        response.status(200).json(toResponseEntity(200, 'User created', responseData))

    } catch (error) {

        response.status(200).json(toResponseEntity(409, String(error)))

    }

})

router.post('/sign_up', validationMiddleware(UserVS, UserDto), async (request, response) => {

    try {

        const userData = request.body
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

    response.status(200).json(toResponseEntity(200, 'User created', request.user))

})

export { router as SessionRouter }
import { Router } from 'express'
import { UserService } from '../services/users.service.js'


const router = Router()

const userService = new UserService()

router.get('/', (request, response) => {

    response.status(200).json({
        status: 200,
        data: [],
        message: 'Data found'
    })

})

export { router as UserRouter }
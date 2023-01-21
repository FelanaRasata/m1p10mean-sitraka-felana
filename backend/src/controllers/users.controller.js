import { Router } from 'express'


const router = Router()

router.get('/', (request, response) => {

    response.status(200).json({
        status: 200,
        data: [],
        message: 'Data found'
    })

})

export { router as UserRouter }
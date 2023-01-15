import { Router } from 'express'
import { index } from '../utils/html_formatter.js'


const router = Router()

router.get('/', async (request, response) => {

    try {

        response.status(200).send(index())

    } catch (err) {

        response.status(500).send(`Error: ${err}`)

    }

})

export { router as DefaultRouter }
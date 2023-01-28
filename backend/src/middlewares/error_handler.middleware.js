import { toResponseEntity } from '../utils/utils.js'


export const errorHandlerMiddleware = (error, request, response, next) => {

    console.log('\n================================')
    console.log(error.message)
    console.log('================================\n')

    response.status(200).json(toResponseEntity(error.status, error.message))

}
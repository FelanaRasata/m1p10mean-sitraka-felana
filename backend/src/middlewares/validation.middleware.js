import { validate } from 'class-validator'


export const validationMiddleware = (
    type,
    value = 'body',
    skipMissingProperties = false,
    whitelist = true,
    forbidNonWhitelisted = true,
) => {

    return (req, res, next) => {
        const instance = Object.assign(new type(), req[value])

        validate(instance, {
            skipMissingProperties,
            whitelist,
            forbidNonWhitelisted
        }).then((errors) => {

            if (errors.length > 0) {

                console.error('-------------------- Request body error --------------------\n', errors, '\n\'-------------------- Request body error --------------------\'')
                const message = errors.map((error) => Object.values(error.constraints)).join(', ')

                next(new Error(message))

            } else {

                next()

            }

        })

    }

}


export const validationMiddleware = (schema, Class) => {

    return async (req, res, next) => {

        const { body } = req

        try {

            await schema.validate(body, { abortEarly: false })
            req.body = new Class(body)
            next()

        } catch (err) {

            const errors = err.inner.map(e => {

                return {
                    path: e.path,
                    message: e.message
                }

            })

            res.status(400).json({ errors })

        }
    }

}


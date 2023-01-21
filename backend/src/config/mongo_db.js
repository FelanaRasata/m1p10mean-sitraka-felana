import mongoose from 'mongoose'


async function connectWithMongoose(databaseUri) {

    try {

        console.log('-------------------- DB CONNECTION - ATTEMPT --------------------')

        mongoose.set('strictQuery', false)
        await mongoose.connect(databaseUri)

        console.log('-------------------- DB CONNECTION - SUCCEED --------------------')

        return true

    } catch (error) {

        console.log(`-------------------- DB CONNECTION - FAILED --------------------\n${error}\n-------------------- DB CONNECTION - FAILED --------------------`)

        return false

    }

}


export { connectWithMongoose }
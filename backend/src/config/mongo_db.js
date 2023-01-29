import mongoose from 'mongoose'


async function connectWithMongoose(databaseUri) {

    try {

        mongoose.set('strictQuery', false)

        await mongoose.connect(databaseUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        console.log('MongoDB Connected...')

    } catch (error) {

        console.log(`MongoDB Connection failed due to:\n${error}\n`)
        process.exit(1)

    }

}


export { connectWithMongoose }
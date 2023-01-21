export class Settings {

    port = process.env.PORT || 3200

    mongodbUri = process.env.MONGODB_URI || ''

}
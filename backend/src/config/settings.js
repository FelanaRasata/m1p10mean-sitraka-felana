import 'dotenv/config'

export class Settings {

    port = process.env.PORT || 3200

    mongodbUri = process.env.MONGODB_URI || ''

    expiresIn = process.env.EXPIRES_IN || '30d'

    secretKey = process.env.SECRET_KEY || 'secret_key'

    encryptionKey = process.env.ENCRYPTION_KEY || 'encryption_key'

}
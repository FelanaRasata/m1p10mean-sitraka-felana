import bodyParser from 'body-parser'
import cors from 'cors'
import { config } from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { connectWithMongoose } from './config/mongo_db.js'
import { Settings } from './config/settings.js'
import { DefaultRouter } from './controllers/default.controller.js'
import { UserRouter } from './controllers/users.controller.js'


config()


class Server {

    settings

    app


    constructor(routes) {

        this.app = express()
        this.settings = new Settings()
        this.setupMiddlewares()
        this.setupRoutes(routes)

    }


    setupMiddlewares() {

        // Use morgan for http log
        this.app.use(helmet())
        this.app.use(morgan('dev'))
        this.app.use(bodyParser.json({ limit: 1024 * 1024 * 10, type: 'application/json' }))
        this.app.use(bodyParser.urlencoded({ extended: false, limit: 1024 * 1024 * 10 }))
        this.app.use(cors({ origin: '*' }))

    }


    setupRoutes(routes) {

        for (const route of routes)
            this.app.use(route.path, route.router)

    }


    run() {

        this.app.listen(this.settings.port, async () => {

            console.log(`
██       █████  ██    ██ ███    ██  ██████ ██   ██ ███████ ██████  ██ ██ ██ 
██      ██   ██ ██    ██ ████   ██ ██      ██   ██ ██      ██   ██ ██ ██ ██ 
██      ███████ ██    ██ ██ ██  ██ ██      ███████ █████   ██   ██ ██ ██ ██ 
██      ██   ██ ██    ██ ██  ██ ██ ██      ██   ██ ██      ██   ██          
███████ ██   ██  ██████  ██   ████  ██████ ██   ██ ███████ ██████  ██ ██ ██ 
            `)

            if (!(await connectWithMongoose(this.settings.mongodbUri))) {

                process.exit(1)

            }

        })

    }

}


const server = new Server([
    { path: '/', router: DefaultRouter },
    { path: '/users', router: UserRouter }
])

server.run()
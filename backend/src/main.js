import bcrypt from 'bcrypt'
import bodyParser from 'body-parser'
import cors from 'cors'
import {config} from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import {connectWithMongoose} from './config/mongo_db.js'
import {Settings} from './config/settings.js'
import {DefaultRouter} from './controllers/default.controller.js'
import {SessionRouter} from './controllers/session.controller.js'
import {CarRouter} from "./controllers/cars.controller.js";


config()


class Server {


    constructor(routes) {

        this.app = express()
        this.settings = new Settings()
        this.setupMiddlewares()
        this.setupRoutes(routes)

    }


    setupMiddlewares() {

        // Use morgan for http log
        this.app.use(morgan('dev'))
        this.app.use(bodyParser.json({limit: 1024 * 1024 * 10, type: 'application/json'}))
        this.app.use(bodyParser.urlencoded({extended: false, limit: 1024 * 1024 * 10}))
        this.app.use(helmet())
        this.app.use(cors({origin: '*'}))

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

            await connectWithMongoose(this.settings.mongodbUri)

        })

    }

}


const server = new Server([
    {path: '/', router: DefaultRouter},
    {path: '/auth', router: SessionRouter},
    {path: '/cars', router: CarRouter},
])

server.run()

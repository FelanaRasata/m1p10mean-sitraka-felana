import bodyParser from 'body-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'
import { connectWithMongoose } from './config/mongo_db.js'
import { Settings } from './config/settings.js'
import { CarsRouter } from './controllers/cars.controller.js'
import { DefaultRouter } from './controllers/default.controller.js'
import { RepairsRouter } from './controllers/repairs.controller.js'
import { SessionRouter } from './controllers/session.controller.js'
import { errorHandlerMiddleware } from './middlewares/error_handler.middleware.js'
import { RepairTypesRouter } from './controllers/repair_types.controller.js'
import { CarDiagnosisRouter } from './controllers/car_diagnosis.controller.js'
import { DiagnosisPercentageRouter } from './controllers/diagnosis_percentage.controller.js'


class Server {


    constructor(routes) {

        this.app = express()
        this.settings = new Settings()
        this.setupMiddlewares()
        this.setupRoutes(routes)
        this.app.use(errorHandlerMiddleware)

    }


    setupMiddlewares() {

        // Use morgan for http log
        this.app.use(morgan('dev'))
        this.app.use(bodyParser.json({ limit: 1024 * 1024 * 10, type: 'application/json' }))
        this.app.use(bodyParser.urlencoded({ extended: false, limit: 1024 * 1024 * 10 }))
        this.app.use(helmet())
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

            await connectWithMongoose(this.settings.mongodbUri)

        })

    }

}


const server = new Server([
    { path: '/', router: DefaultRouter },
    { path: '/auth', router: SessionRouter },
    { path: '/cars', router: CarsRouter },
    { path: '/repairs', router: RepairsRouter },
    { path: '/repair_types', router: RepairTypesRouter },
    { path: '/car_diagnosis', router: CarDiagnosisRouter },
    { path: '/diagnosis_percentage', router: DiagnosisPercentageRouter },
])

server.run()

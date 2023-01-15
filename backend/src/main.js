import { config } from 'dotenv'
import express from 'express'
import { Settings } from './config/settings.js'
import { DefaultRouter } from './controllers/default.controller.js'


config()


class Server {

    settings

    app

    port


    constructor(routes) {

        this.app = express()
        this.settings = new Settings()
        this.port = this.settings.port
        this.setupRoutes(routes)

    }

    setupRoutes(routes) {

        for (const route of routes)
            this.app.use(route.path, route.router)

    }

    run() {

        this.app.listen(this.port, () => {

            console.log(`
██       █████  ██    ██ ███    ██  ██████ ██   ██ ███████ ██████  ██ ██ ██ 
██      ██   ██ ██    ██ ████   ██ ██      ██   ██ ██      ██   ██ ██ ██ ██ 
██      ███████ ██    ██ ██ ██  ██ ██      ███████ █████   ██   ██ ██ ██ ██ 
██      ██   ██ ██    ██ ██  ██ ██ ██      ██   ██ ██      ██   ██          
███████ ██   ██  ██████  ██   ████  ██████ ██   ██ ███████ ██████  ██ ██ ██ 
            `)

        })

    }

}


const server = new Server([
    { path: '/', router: DefaultRouter }
])

server.run()
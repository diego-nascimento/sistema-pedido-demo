const express = require('express')
const routes = require('./routes')
const cors = require('cors')
require('./database')
require('dotenv').config()

class server{
    constructor(){
        this.server = express()
        this.midwares()
        this.routes()
    }

    midwares(){
        
        this.server.use(express.json())
        this.server.use('/file', express.static('uploads'))
        this.server.use(cors())
    }

    routes(){
        this.server.use(routes)
    }
}

module.exports = new server().server
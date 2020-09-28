
const mongoose = require('mongoose')
require('dotenv').config()

class database {
    constructor(){
        this.init()
    }
    init(){
        this.connection = mongoose.connect('mongodb+srv://diego:diego123456qwer@cluster0-fmgux.mongodb.net/entrega-demo?retryWrites=true&w=majority',{
            useUnifiedTopology: true,
            useNewUrlParser: true
        }
        )
    }
}

module.exports = new database()
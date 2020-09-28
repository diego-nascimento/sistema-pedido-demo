const nodemailer = require('nodemailer')
const mailConfig = require('../config/mail')
const path = require('path')
const exphbs = require('express-handlebars')
const nodemailerhbs = require('nodemailer-express-handlebars')
class mail {
  constructor(){
    const {host, port, secure, auth} = mailConfig
    this.transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: auth.user ? auth: null
    })
    this.configureTemplates()
  }

  configureTemplates(){
    const viewpath = path.resolve(__dirname, '..', '..', 'src', 'views', 'emails')
    this.transporter.use('compile', nodemailerhbs({
      viewEngine: exphbs.create({
        layoutsDir: path.resolve(viewpath, 'layouts'),
        partialsDir:path.resolve(viewpath, 'partials'),
        defaultLayout: 'default',
        extname: '.hbs'
      }),
      viewPath: viewpath,
      extName: '.hbs'
    })

    )
  }

  sendMail(message){
    return this.transporter.sendMail({
      ...mailConfig.default,
      ...message
    })
  }
}

module.exports = new mail()
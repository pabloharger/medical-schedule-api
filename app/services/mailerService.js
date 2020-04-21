const nodemailer = require('nodemailer')
const ejs = require('ejs')
const path = require('path')

exports.sendMail = async (req, to, subject, view, data) => {
  try {
    // Creating transport instance
    const transport = {
      host: 'smtp.gmail.com',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASSWORD
      }
    }

    // Creating a Nodemailer Transport instance
    const transporter = nodemailer.createTransport(transport)

    transporter.verify((error, success) => {
      if (error) {
        throw Object.assign(
          new Error(error),
          { code: 402 }
        )
      }
    })

    const template = path.join(__dirname, '..', '..', 'views', 'emails', view)

    // ejs.filters.t = req.polyglot.t
    // ejs.filters.t = (key) => console.log('teste') // req.polyglot.t(key)
    ejs.renderFile(
      template,
      Object.assign(
        {},
        data,
        {
          t: (phrase) => req.polyglot.t(phrase)
        }),
      (error, data) => {
        if (error) {
          throw Object.assign(new Error(), { status: 500, message: error.message })
        } else {
          var mainOptions = {
            from: process.env.MAIL_USER,
            to: to,
            subject: subject,
            html: data
          }

          transporter.sendMail(mainOptions, function (err, info) {
            if (err) {
              throw Object.assign(
                new Error(err),
                { code: 402 }
              )
            }
          })
        }
      }
    )
  } catch (error) {
    throw Object.assign(new Error(), { status: 500, message: error.message })
  }
}

const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const bodyParser = require('body-parser')
const {
  authRoute,
  userRoute,
  dentistRoute,
  patientRoute,
  scheduleRoute
} = require('./routes')
const verify = require('./routes/verifyToken')

const app = express()

// fetch form data from the request.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes Middleware
app.use('/api/v1', authRoute)
app.use('/api/v1', verify, userRoute)
app.use('/api/v1', verify, dentistRoute)
app.use('/api/v1', verify, patientRoute)
app.use('/api/v1', verify, scheduleRoute)

// Assign the port
var port = process.env.port || 3000
app.listen(port, () => console.log('server running at port ' + port))

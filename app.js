const dotenv = require('dotenv')
dotenv.config()

const express = require('express')
const bodyParser = require('body-parser')
const createLocaleMiddlewate = require('express-locale')
const startPolyglot = require('./app/utilities/startPolyglot')
const { authRoute, userRoute, doctorRoute, patientRoute, scheduleRoute } = require('./app/routes')
const verify = require('./app/controllers/').auth.verifyToken

const app = express()

// fetch form data from the request.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Get the user's locale, and set a default in case there's none
app.use(createLocaleMiddlewate({
  priority: ['accept-language', 'default'],
  degault: 'en'
}))

// Start polyglot and set the language in the req with the phrases to be used
app.use(startPolyglot)

const baseRoute = '/api/v1'

// Routes Middleware
app.use(`${baseRoute}/auth`, authRoute)
app.use(`${baseRoute}/user`, verify, userRoute)
app.use(`${baseRoute}/doctor`, verify, doctorRoute)
app.use(`${baseRoute}/patient`, verify, patientRoute)
app.use(`${baseRoute}/schedule`, verify, scheduleRoute)

// Assign the port
var port = process.env.PORT || 3000
app.listen(port, () => console.log(`server running at port ${port}`))

// TODO(PH): i18n php site
// TODO(PH): Change findAll to findPk and findOne
// TODO(PH): Implement logOut
// TODO(PH): Add docker data base script
// TODO(PH): create roles to the operations ????

console.log('===>1')
const express = require('express')
console.log('===>2')
const bodyParser = require('body-parser')
console.log('===>3')
const authRoute = require('./routes/auth')
console.log('===>4')
const userRoute = require('./routes/user')
console.log('===>5')
const dotenv = require('dotenv')
console.log('===>6')
const verify = require('./routes/verifyToken')
console.log('===>7')

dotenv.config()
console.log('===>8', process.env.DATABASE_URL)

const app = express()
// fetch form data from the request.
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// Routes Middleware
app.use('/api/v1', authRoute)
app.use('/api/v1', verify, userRoute)

// Assign the port
var port = process.env.port || 3000
app.listen(port, () => console.log('server running at port ' + port))

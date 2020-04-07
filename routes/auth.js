const router = require('express').Router()
const userModel = require('../models').user
const util = require('./util')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const { userValidation, loginValidation } = require('../validation')

/**
 * Registrate a new user
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.post('/auth', async (req, res) => {
  // Fields validation
  const { error } = userValidation(req.body)

  // If it is an error, returns it with a 400 status
  if (error) return util.handleError(res.status(500), error)

  // Check if the user is already in the database
  const user = await userModel.findAll({ where: { email: req.body.email } })
    .then(data => data[0])
    .catch(err => util.handleError(res.status(500), err))

  // If user already exists return error
  if (user) return util.handleResponse(res.status(400), {}, 'Email already exists')

  // Hash password
  const salt = await bcrypt.genSalt(10)
  req.body.password = await bcrypt.hash(req.body.password, salt)

  // insert new user
  userModel.create(req.body)
    .then(data => util.handleResponse(res.status(201), { id: data.id }))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Log in
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.post('/auth/signin', async (req, res) => {
  // Fields validation
  const { error } = loginValidation(req.body)

  // If it is an error, returns it with a 400 status
  if (error) util.handleError(res.status(500), error)

  // Check if the user is already in the database
  const user = await userModel.findAll({ where: { email: req.body.email } })
    .then(data => data[0])
    .catch(err => util.handleError(res.status(500), err))

  // If user already exists return error
  if (!user) return util.handleResponse(res.status(400), {}, 'Invalid email or password')

  // Check if password is correct
  const validPass = await bcrypt.compare(req.body.password, user.password)

  if (!validPass) return util.handleResponse(res.status(400), {}, 'Invalid email or password')

  // Create and sign a token
  const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET)

  // res.header('auth-token', token).send(token)

  return util.handleResponse(res.header('auth-token', token).status(200), { token })
})

module.exports = router

const userModel = require('../models/').user
const util = require('./util')
const bcrypt = require('bcryptjs')
const userTokenActionController = require('./userTokenActions')

/**
 * Return a hashed password
 * @param  {string} password
 */
exports.getHashedPassword = async (password) => {
  // Hash password
  const salt = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, salt)
}

/**
 * Send activation email
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.checkIfEmailExists = async (req) => {
  try {
    // Check if the user is in the database
    const user = await userModel.findOne({ where: { email: req.body.email } })
      .then(data => data)
      .catch(error => { throw Object.assign(new Error(), { status: 401, message: error.message }) })

    // If user doesn't exists return error
    if (!user) {
      throw Object.assign(new Error(), { status: 401, message: req.polyglot.t('validation.account.unregisteredEmail') })
    }

    return user
  } catch (error) {
    throw Object.assign(new Error(), { status: error.status, message: error.message })
  }
}

/**
 * Get a list of user
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.get = (req, res) => {
  userModel.findAll({
    where: Object.assign(req.query, req.body),
    attributes: {
      exclude: ['password']
    }
  })
    .then(data => util.handleResponse(res.status(200), data))
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Get a user by Id
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.getById = (req, res) => {
  // get user by id
  userModel.findOne({
    where: { id: req.params.id },
    attributes: {
      exclude: ['password']
    }
  })
    .then(data => util.handleResponse(res.status(200), data))
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Registrate a new user
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.signUp = async (req, res) => {
  try {
    // Check if the user is already in the database
    let user = await userModel.findOne({ where: { email: req.body.email } })
      .then(data => data)
      .catch(error => { throw Object.assign(new Error(), { status: 401, message: error.message }) })

    // If user already exists return error
    if (user) return util.handleResponse(res.status(400), {}, req.polyglot.t('validation.account.emailAlreadyRegistered'))

    // Hash password
    req.body.password = await this.getHashedPassword(req.body.password)

    // insert new user
    user = await userModel.create(req.body)
      .then(user => user)
      .catch(error => { throw Object.assign(new Error(), { status: 500, message: error.message }) })

    await userTokenActionController.sendActivationEmail(req)

    // Select user to return excluding password
    user = await userModel.findOne({
      where: { id: user.id },
      attributes: {
        exclude: ['password']
      }
    })
      .then(data => data)
      .catch(error => { throw Object.assign(new Error(), { status: 500, message: error.message }) })

    util.handleResponse(res.status(201), { user })
  } catch (error) {
    util.handleError(res.status(error.status), error)
  }
}

/**
 * Put a user
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.put = (req, res) => {
  // update user by id
  userModel.update(req.body, { where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(201), data))
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Delete a new user
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.delete = (req, res) => {
  // delete user by id
  userModel.destroy({ where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
}

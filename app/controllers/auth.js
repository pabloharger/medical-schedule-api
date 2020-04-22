const util = require('./util')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const userModel = require('../models/').user
const userTokenActionModel = require('../models').userTokenAction
const userController = require('../controllers/user')
const userTokenActionController = require('../controllers/userTokenActions')

const checkForgottenTokenPasswordInternal = async (req) => {
  // Check if the user is already in the database
  const userToken = await userTokenActionModel.findOne({ where: { token: req.body.token } })
    .then(data => data)
    .catch(error => { throw Object.assign(new Error(), { status: 500, message: error }) })

  // If token doesn't exists return error
  if (!userToken) {
    throw Object.assign(new Error(), { status: 400, message: req.polyglot.t('validation.token.doesNotExists') })
  }

  // If token is valid
  if (userToken.status !== 0 || userToken.action !== 0) {
    throw Object.assign(new Error(), { status: 400, message: req.polyglot.t('validation.token.invalid') })
  }

  // Getting user to return
  const user = await userModel.findOne({ where: { id: userToken.idUser } })
    .then(data => data)
    .catch(error => { throw Object.assign(new Error(), { status: error.code, message: error.message }) })

  return user
}

/**
 * Registrate a new user
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 * @param  {callBack} next Callback mathod
 */
exports.verifyToken = async (req, res, next) => {
  try {
    const token = req.header('auth-token')
    if (!token) {
      throw Object.assign(new Error(), { status: 401, message: req.polyglot.t('validation.auth.accessDenied') })
    }

    try {
      const verified = jwt.verify(token, process.env.TOKEN_SECRET)
      req.user = verified
      next()
    } catch (error) {
      throw Object.assign(new Error(), { status: 401, message: error.message })
    }
  } catch (error) {
    util.handleError(res.status(error.status), error)
  }
}

/**
 * Resend activation email
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.sendActivationEmail = async (req, res) => {
  try {
    await userTokenActionController.sendActivationEmail(req)
    return util.handleResponse(res.status(201), {}, req.polyglot.t('info.email.hasBeenSent'))
  } catch (error) {
    util.handleError(res.status(error.status), error)
  }
}

/**
 * Log in
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.signIn = async (req, res) => {
  try {
    // Check if the user is already in the database
    const user = await userModel.findOne({ where: { email: req.body.email } })
      .then(data => data)
      .catch(error => {
        throw Object.assign(new Error(), { status: 500, message: error.message })
      })

    // If user not exists return error
    if (!user) return util.handleResponse(res.status(400), {}, req.polyglot.t('validation.signin.invalidEmailOrPassword'))

    // If user is not activated
    if (!user.activated) return util.handleResponse(res.status(400), {}, req.polyglot.t('validation.account.notActivated'))

    // Check if password is correct
    const validPass = await bcrypt.compare(req.body.password, user.password)

    if (!validPass) return util.handleResponse(res.status(400), {}, req.polyglot.t('validation.signin.invalidEmailOrPassword'))

    // Create and sign a token
    const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET)

    // res.header('auth-token', token).send(token)
    return util.handleResponse(res.header('auth-token', token).status(200), { token, user: user })
  } catch (error) {
    return util.handleError(res.status(error.status), error)
  }
}

/**
 * Forgot Password
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.forgotPassword = async (req, res) => {
  try {
    return await userTokenActionController.sendForgotPasswordEmail(req, res)
  } catch (error) {
    util.handleError(res.status(error.status), error)
  }
}

/**
 * Check Forgot Password Token
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.checkForgottenPasswordToken = async (req, res) => {
  checkForgottenTokenPasswordInternal(req)
    .then(data => util.handleResponse(res.status(201), data))
    .catch(error => util.handleError(res.status(error.status), error))
}

/**
 * Reset Forgoten Password
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.resetForgottenPassword = async (req, res) => {
  try {
    // check if the token is valid
    const user = await checkForgottenTokenPasswordInternal(req)

    // hash password
    req.body.password = await userController.getHashedPassword(req.body.password)

    // Update password
    await userModel.update({ password: req.body.password }, { where: { id: user.id } })

    // Inativate all instances of recovery requests from this user -> status 0 active - 1 inactive
    await userTokenActionModel.update({ status: 1 }, { where: { idUser: user.id, status: 0 } })
    return util.handleResponse(res.status(201), req.polyglot.t('info.password.hasBeenUpdated'))
  } catch (error) {
    return util.handleError(res.status(error.status), error)
  }
}

/**
 * Activate account
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.activateAccount = async (req, res) => {
  try {
    // Check if the user is already in the database
    const userToken = await userTokenActionModel.findOne({ where: { token: req.body.token } })
      .then(data => data)
      .catch(error => { throw Object.assign(new Error(), { status: 500, message: error }) })

    if (!userToken || userToken.action !== 1) {
      throw Object.assign(new Error(), { status: 401, message: req.polyglot.t('validation.token.invalid') })
    }

    // Check if the user is in the database
    const user = await userModel.findByPk(userToken.idUser)
      .catch(error => { throw Object.assign(new Error(), { status: 401, message: error.message }) })

    if (!user) {
      throw Object.assign(new Error(), { status: 401, message: req.polyglot.t('validation.token.invalid') })
    }

    if (user.activated) {
      throw Object.assign(new Error(), { status: 401, message: req.polyglot.t('validation.account.alreadyActivated') })
    }

    // Inativate all instances of recovery requests from this user -> status 0 active - 1 inactive
    await userTokenActionModel.update({ status: 1 }, { where: { idUser: user.id, id: userToken.id } })
      .catch(err => {
        throw Object.assign(new Error(), { status: 500, message: err })
      })

    // Update user
    await userModel.update({ activated: true }, { where: { id: user.id } })

    return util.handleResponse(res.status(201), req.polyglot.t('info.account.activatedSuccesfully'))
  } catch (error) {
    util.handleError(res.status(error.status), error)
  }
}

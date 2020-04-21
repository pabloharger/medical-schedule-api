const mailerService = require('../services/mailerService')
const userTokenActionModel = require('../models').userTokenAction
const userController = require('./user')
const util = require('./util')

/**
 * Return a random token
 */
const generateToken = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

/**
 * Send activation email
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.sendActivationEmail = async (req) => {
  try {
    const user = await userController.checkIfEmailExists(req)

    if (user.activated) {
      throw Object.assign(new Error(), { status: 401, message: req.polyglot.t('validation.account.alreadyActivated') })
    }

    // Generate a new token
    const token = generateToken()

    // Inativate all instances of recovery requests from this user -> status 0 active - 1 inactive
    await userTokenActionModel.update({ status: 1 }, { where: { idUser: user.id, status: 0, action: 1 } })
      .catch(err => {
        throw Object.assign(new Error(), { status: 500, message: err })
      })

    // insert new user token
    await userTokenActionModel.create({
      idUser: user.id,
      token,
      action: 1,
      status: 0
    })
      .catch(err => { throw Object.assign(new Error(), { status: 500, message: err }) })

    try {
      await mailerService.sendMail(
        req,
        user.email,
        req.polyglot.t('email.subject.activateAccount'),
        'activate.ejs',
        {
          link: `${process.env.HOST_URL}/account/activate/${token}`,
          name: user.firstName
        }
      )
    } catch (error) {
      throw Object.assign(new Error(), { status: 500, message: error.message })
    }
  } catch (error) {
    throw Object.assign(new Error(), { status: error.status, message: error.message })
  }
}

exports.sendForgotPasswordEmail = async (req, res) => {
  try {
    const user = await userController.checkIfEmailExists(req)

    // Inativate all instances of recovery requests from this user -> status 0 active - 1 inactive
    await userTokenActionModel.update({ status: 1 }, { where: { idUser: user.id, status: 0, action: 0 } })
      .catch(err => {
        throw Object.assign(new Error(), { status: 500, message: err })
      })

    // Generate a new token
    const token = generateToken()

    // insert new user
    await userTokenActionModel.create({
      idUser: user.id,
      token,
      action: 0,
      status: 0
    })
      .then(data => {
        mailerService.sendMail(
          req,
          user.email,
          req.polyglot.t('email.forgot.subject.forgotPassword'),
          'forgot.ejs',
          {
            link: `${process.env.HOST_URL}/account/forgot/reset/${token}`,
            name: user.firstName
          }
        )
        util.handleResponse(res.status(201), {}, req.polyglot.t('info.email.hasBeenSent'))
      })
      .catch(err => {
        throw Object.assign(new Error(), { status: 500, message: err })
      })
  } catch (error) {
    return util.handleError(res.status(error.status), error)
  }
}

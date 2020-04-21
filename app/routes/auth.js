const router = require('express').Router()
const { auth } = require('../controllers')
const validator = require('../validator')
const { procErr } = require('../utilities/processErrors')

/**
 * Log in
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
// router.post('/signin', auth.signIn)
router.post('/signin', validator('auth.signIn'), procErr, auth.signIn)

/**
 * Forgot Password
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.post('/forgot', validator('auth.forgotPassword'), procErr, auth.forgotPassword)

/**
 * Check Forgot Password Token
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/forgot/check', validator('auth.verifyToken'), procErr, auth.checkForgottenPasswordToken)

/**
 * Reset Forgoten Password
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.post('/forgot/reset', validator('auth.resetForgottenPassword'), procErr, auth.resetForgottenPassword)

/**
 * Resend activation email
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.post('/account/activation/resend', validator('auth.sendActivationEmail'), procErr, auth.sendActivationEmail)

/**
 * Activate account
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.post('/account/activation', validator('auth.activateAccount'), procErr, auth.activateAccount)

module.exports = router

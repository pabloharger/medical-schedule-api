const router = require('express').Router()
const { user } = require('../controllers')
const validator = require('../validator')
const { procErr } = require('../utilities/processErrors')

/**
 * Get a list of user
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/', user.get)

/**
 * Get a user by Id
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/:id', user.getById)

/**
 * Post a new user
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.post('/', validator('auth.signUp'), procErr, user.signUp)

/**
 * Put a user
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.put('/:id', user.put)

/**
 * Delete a new user
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.delete('/:id', user.delete)

module.exports = router

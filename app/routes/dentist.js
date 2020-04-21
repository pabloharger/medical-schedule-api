const router = require('express').Router()
const { dentist } = require('../controllers')
const validator = require('../validator')
const { procErr } = require('../utilities/processErrors')

/**
 * Get a list of dentist
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/', dentist.get)

/**
 * Get a dentist by Id
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/:id', dentist.getById)

/**
 * Post a new dentist
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.post('/', validator('dentist.post'), procErr, dentist.post)

/**
 * Put a dentist
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.put('/:id', validator('dentist.put'), procErr, dentist.put)

/**
 * Delete a new dentist
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.delete('/:id', dentist.delete)

module.exports = router

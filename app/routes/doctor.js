const router = require('express').Router()
const { doctor } = require('../controllers')
const validator = require('../validator')
const { procErr } = require('../utilities/processErrors')

/**
 * Get a list of doctor
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/', doctor.get)

/**
 * Get a doctor by Id
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/:id', doctor.getById)

/**
 * Post a new doctor
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.post('/', validator('doctor.post'), procErr, doctor.post)

/**
 * Put a doctor
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.put('/:id', validator('doctor.put'), procErr, doctor.put)

/**
 * Delete a new doctor
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.delete('/:id', doctor.delete)

module.exports = router

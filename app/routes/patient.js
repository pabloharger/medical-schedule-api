const router = require('express').Router()
const { patient } = require('../controllers')
const validator = require('../validator')
const { procErr } = require('../utilities/processErrors')

/**
 * Get a list of patient
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/', patient.get)

/**
 * Get a patient by Id
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/:id', patient.getById)

/**
 * Post a new patient
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.post('/', validator('patient.post'), procErr, patient.post)

/**
 * Put a patient
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.put('/:id', validator('patient.put'), procErr, patient.put)

/**
 * Delete a new patient
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.delete('/:id', patient.delete)

module.exports = router

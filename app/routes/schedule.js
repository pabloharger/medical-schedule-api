const router = require('express').Router()
const { schedule } = require('../controllers')
const validator = require('../validator')
const { procErr } = require('../utilities/processErrors')

/**
 * Get a list of schedule
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/', schedule.get)

/**
 * Get a schedule by Id
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/:id', schedule.getById)

/**
 * Post a new schedule
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.post('/', validator('schedule.post'), procErr, schedule.post)

/**
 * Put a schedule
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.put('/:id', validator('schedule.put'), procErr, schedule.put)

/**
 * Delete a new schedule
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.delete('/:id', schedule.delete)

module.exports = router

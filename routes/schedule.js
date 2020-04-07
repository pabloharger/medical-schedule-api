const router = require('express').Router()
const scheduleModel = require('../models').schedule
const util = require('./util')

/**
 * Get a list of schedule
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/schedule', (req, res) => {
  scheduleModel.findAll()
    // TODO(PH): Exclude response password
    .then(data => util.handleResponse(res.status(200), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Get a schedule by Id
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/schedule/:id', (req, res) => {
  // get schedule by id
  scheduleModel.findAll({ where: { id: req.params.id } })
    // TODO(PH): Exclude response password
    .then(data => util.handleResponse(res.status(200), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Post a new schedule
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.post('/schedule', (req, res) => {
  // insert schedule
  scheduleModel.create(req.body)
    // TODO(PH): Exclude response password
    .then(data => util.handleResponse(res.status(201), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Put a schedule
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.put('/schedule/:id', (req, res) => {
  // update schedule by id
  scheduleModel.update(req.body, { where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Delete a new schedule
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.delete('/schedule/:id', (req, res) => {
  // delete schedule by id
  scheduleModel.destroy({ where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Patch a schedule
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.patch('/schedule/:id', (req, res) => {
  // Update some fields in schedule by id
  scheduleModel.update(req.body, { where: { id: req.params.id } })
    // TODO(PH): Exclude response password
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
})

module.exports = router

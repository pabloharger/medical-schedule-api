const router = require('express').Router()
const dentistModel = require('../models').dentist
const util = require('./util')

/**
 * Get a list of dentist
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/dentist', (req, res) => {
  dentistModel.findAll()
    // TODO(PH): Exclude response password
    .then(data => util.handleResponse(res.status(200), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Get a dentist by Id
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/dentist/:id', (req, res) => {
  // get dentist by id
  dentistModel.findAll({ where: { id: req.params.id } })
    // TODO(PH): Exclude response password
    .then(data => util.handleResponse(res.status(200), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Post a new dentist
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.post('/dentist', (req, res) => {
  // insert dentist
  dentistModel.create(req.body)
    // TODO(PH): Exclude response password
    .then(data => util.handleResponse(res.status(201), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Put a dentist
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.put('/dentist/:id', (req, res) => {
  // update dentist by id
  dentistModel.update(req.body, { where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Delete a new dentist
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.delete('/dentist/:id', (req, res) => {
  // delete dentist by id
  dentistModel.destroy({ where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Patch a dentist
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.patch('/dentist/:id', (req, res) => {
  // Update some fields in dentist by id
  dentistModel.update(req.body, { where: { id: req.params.id } })
    // TODO(PH): Exclude response password
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
})

module.exports = router

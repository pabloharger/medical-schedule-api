const router = require('express').Router()
const patientModel = require('../models').patient
const util = require('./util')

/**
 * Get a list of patient
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/patient', (req, res) => {
  patientModel.findAll()
    // TODO(PH): Exclude response password
    .then(data => util.handleResponse(res.status(200), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Get a patient by Id
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/patient/:id', (req, res) => {
  // get patient by id
  patientModel.findAll({ where: { id: req.params.id } })
    // TODO(PH): Exclude response password
    .then(data => util.handleResponse(res.status(200), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Post a new patient
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.post('/patient', (req, res) => {
  // insert patient
  patientModel.create(req.body)
    // TODO(PH): Exclude response password
    .then(data => util.handleResponse(res.status(201), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Put a patient
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.put('/patient/:id', (req, res) => {
  // update patient by id
  patientModel.update(req.body, { where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Delete a new patient
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.delete('/patient/:id', (req, res) => {
  // delete patient by id
  patientModel.destroy({ where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Patch a patient
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.patch('/patient/:id', (req, res) => {
  // Update some fields in patient by id
  patientModel.update(req.body, { where: { id: req.params.id } })
    // TODO(PH): Exclude response password
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
})

module.exports = router

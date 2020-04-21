const patientModel = require('../models/').patient
const util = require('./util')

/**
 * Get a list of patient
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.get = (req, res) => {
  patientModel.findAll({ where: util.replaceOperators(req.body) })
    .then(data => util.handleResponse(res.status(200), data))
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Get a patient by Id
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.getById = (req, res) => {
  // get patient by id
  patientModel.findOne({ where: { id: req.params.id } })
    .then(data => {
      return util.handleResponse(res.status(200), data)
    })
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Post a new patient
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.post = (req, res) => {
  // insert patient
  patientModel.create(req.body)
    .then(data => util.handleResponse(res.status(201), data))
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Put a patient
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.put = (req, res) => {
  patientModel.update(req.body, { where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(201), data))
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Delete a new patient
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.delete = (req, res) => {
  patientModel.destroy({ where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
}

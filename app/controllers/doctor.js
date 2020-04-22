const doctorModel = require('../models/').doctor
const util = require('./util')

/**
 * Get a list of doctor
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.get = (req, res) => {
  doctorModel.findAll({ where: util.replaceOperators(req.body) })
    .then(data => util.handleResponse(res.status(200), data))
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Get a doctor by Id
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.getById = (req, res) => {
  // get doctor by id
  doctorModel.findOne({ where: { id: req.params.id } })
    .then(data => {
      return util.handleResponse(res.status(200), data)
    })
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Post a new doctor
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.post = (req, res) => {
  // insert doctor
  doctorModel.create(req.body)
    .then(data => util.handleResponse(res.status(201), data))
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Put a doctor
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.put = (req, res) => {
  doctorModel.update(req.body, { where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(201), data))
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Delete a new doctor
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.delete = (req, res) => {
  doctorModel.destroy({ where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
}

const dentistModel = require('../models/').dentist
const util = require('./util')

/**
 * Get a list of dentist
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.get = (req, res) => {
  dentistModel.findAll({ where: util.replaceOperators(req.body) })
    .then(data => util.handleResponse(res.status(200), data))
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Get a dentist by Id
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.getById = (req, res) => {
  // get dentist by id
  dentistModel.findOne({ where: { id: req.params.id } })
    .then(data => {
      return util.handleResponse(res.status(200), data)
    })
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Post a new dentist
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.post = (req, res) => {
  // insert dentist
  dentistModel.create(req.body)
    .then(data => util.handleResponse(res.status(201), data))
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Put a dentist
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.put = (req, res) => {
  dentistModel.update(req.body, { where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(201), data))
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Delete a new dentist
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.delete = (req, res) => {
  dentistModel.destroy({ where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
}

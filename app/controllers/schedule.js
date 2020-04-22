const scheduleModel = require('../models').schedule
const doctorModel = require('../models').doctor
const patientModel = require('../models').patient
const util = require('./util')

/**
 * Get a list of schedule
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.get = (req, res) => {
  scheduleModel.findAll({
    include: [
      {
        model: doctorModel,
        as: 'doctor'
      },
      {
        model: patientModel,
        as: 'patient'
      }
    ],
    where: util.replaceOperators(Object.assign(req.query, req.body))
  })
    .then(data => util.handleResponse(res.status(200), data))
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Get a schedule by Id
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.getById = (req, res) => {
  // get schedule by id
  scheduleModel.findOne({
    where: { id: req.params.id },
    include: [
      {
        model: doctorModel,
        as: 'doctor'
      },
      {
        model: patientModel,
        as: 'patient'
      }
    ]
  })
    .then(data => util.handleResponse(res.status(200), data))
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Post a new schedule
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.post = (req, res) => {
  // insert schedule
  scheduleModel.create(req.body)
    .then(async data => {
      const schedule = await scheduleModel.findOne({
        include: [
          {
            model: doctorModel,
            as: 'doctor'
          },
          {
            model: patientModel,
            as: 'patient'
          }
        ],
        where: { id: data.id }
      })
        .then(data => data)
        .catch(err => util.handleError(res.status(500), err))

      util.handleResponse(res.status(201), schedule)
    })
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Put a schedule
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.put = (req, res) => {
  // update schedule by id
  scheduleModel.update(req.body, { where: { id: req.params.id } })
    .then(async data => {
      const schedule = await scheduleModel.findOne({
        include: [
          {
            model: doctorModel,
            as: 'doctor'
          },
          {
            model: patientModel,
            as: 'patient'
          }
        ],
        where: { id: req.params.id }
      })
        .then(data => data)
        .catch(err => util.handleError(res.status(500), err))

      util.handleResponse(res.status(201), schedule)
    })
    .catch(err => util.handleError(res.status(500), err))
}

/**
 * Delete a new schedule
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
exports.delete = (req, res) => {
  // delete schedule by id
  scheduleModel.destroy({ where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
}

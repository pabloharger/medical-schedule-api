const router = require('express').Router()
const userModel = require('../models').user
const util = require('./util')

/**
 * Get a list of user
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/user', (req, res) => {
  userModel.findAll()
    // TODO(PH): Exclude response password
    .then(data => util.handleResponse(res.status(200), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Get a user by Id
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.get('/user/:id', (req, res) => {
  // get user by id
  userModel.findAll({ where: { id: req.params.id } })
    // TODO(PH): Exclude response password
    .then(data => util.handleResponse(res.status(200), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Post a new user
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.post('/user', (req, res) => {
  // insert user
  userModel.create(req.body)
    // TODO(PH): Exclude response password
    .then(data => util.handleResponse(res.status(201), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Put a user
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.put('/user/:id', (req, res) => {
  // update user by id
  userModel.update(req.body, { where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Delete a new user
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.delete('/user/:id', (req, res) => {
  // delete user by id
  userModel.destroy({ where: { id: req.params.id } })
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
})

/**
 * Patch a user
 * @param  {Request}  req The HTTP Request
 * @param  {Response} res The HTTP Response
 */
router.patch('/user/:id', (req, res) => {
  // Update some fields in user by id
  userModel.update(req.body, { where: { id: req.params.id } })
    // TODO(PH): Exclude response password
    .then(data => util.handleResponse(res.status(204), data))
    .catch(err => util.handleError(res.status(500), err))
})

module.exports = router

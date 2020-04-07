const jwt = require('jsonwebtoken')
const util = require('./util')

module.exports = (req, res, next) => {
  const token = req.header('auth-token')
  if (!token) util.handleError(res.status(401), 'Access denided')
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch (err) {
    util.handleError(res.status(400), 'Invalid Token')
  }
}

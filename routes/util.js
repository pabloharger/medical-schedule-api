const util = {
  handleResponse: (res, data, message = 'Success') => {
    res.set('Content-Type', 'application/json')
    res.json({
      status: {
        code: res.statusCode,
        message: message
      },
      response: data
    })
  },
  handleError: (res, err) =>
    util.handleResponse(res, err, err.message)
}

module.exports = util

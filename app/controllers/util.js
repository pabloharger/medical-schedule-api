const { Op } = require('sequelize')

const operatorsMap = { // Add additional operators as needed.
  $substring: Op.substring,
  $between: Op.between
}

const util = {
  formattedResponse: (status, message, data) => {
    return {
      status: {
        code: status,
        message
      },
      response: data
    }
  },
  handleResponse: (res, data, message = 'Success') => {
    res.set('Content-Type', 'application/json')
    res.json(util.formattedResponse(res.statusCode, message, data))
  },
  handleError: (res, err) => {
    util.handleResponse(res, err, err.message)
  },
  replaceOperators: (oldObject) => {
    const newObject = {}
    for (const key in oldObject) {
      const value = oldObject[key]

      if (operatorsMap[key]) {
        newObject[operatorsMap[key]] = (value === 'object' ? util.replaceOperators(value) : value) // Recurse
      } else {
        if (typeof value === 'object') {
          newObject[key] = util.replaceOperators(value) // Recurse
        } else if (operatorsMap[key]) {
          const op = operatorsMap[key]
          newObject[op] = value
        } else {
          newObject[key] = value
        }
      }
    }
    return newObject
  }
}

module.exports = util

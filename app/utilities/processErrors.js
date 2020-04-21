const { validationResult } = require('express-validator')
// const fromEntries = require('object.fromentries')
const util = require('../controllers/util')

const translateMessages = (errObj, req) => {
  // Convert the errObj to Array
  const errArr = Object.entries(errObj)

  let arrRet = {}
  // For each array(err), compare the error msg with the polyglot phrases, and replace it
  errArr.forEach(err => {
    const phrase = req.polyglot.phrases[err[1].msg]
    if (phrase) err[1].msg = phrase
    arrRet = util.formattedResponse(400, phrase, err[1])
  })

  // return fromEntries(errArr)
  return arrRet
}

exports.procErr = (req, res, next) => {
  // Verifies if there were validation error added to the request
  const validationError = validationResult(req)
  // if there were errores in the validation
  if (validationError.isEmpty()) {
    // If no errors, go!
    next()
  } else {
    // Return the result of the function bellow
    return res.status(400).send(translateMessages(validationError.mapped(), req))
  }
}

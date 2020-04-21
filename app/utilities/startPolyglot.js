const Polyglot = require('node-polyglot')
const { messages } = require('../i18n/i18n')

function startPolyglot (req, res, next) {
  // Get the locale from express-locale
  const locale = req.locale.language

  // Start Polyglot and add it to the req
  req.polyglot = new Polyglot()

  // Decide wich phrases for polyglot
  switch (locale) {
    case 'es':
      req.polyglot.extend(messages.es)
      break
    case 'pt':
      req.polyglot.extend(messages.pt)
      break
    default:
      req.polyglot.extend(messages.en)
      break
  }
  next()
}

module.exports = startPolyglot

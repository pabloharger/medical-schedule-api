const Joi = require('@hapi/joi')

/**
 * User validation
 * @param  {Request body}  data The request body JSON
 */
const userValidation = data => {
  const schema = Joi.object({
    firstName: Joi.string()
      .required(),
    lastName: Joi.string()
      .required(),
    email: Joi.string()
      .min(6)
      .required()
      .email(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .min(6)
      .required(),
    repeat_password: Joi.ref('password')
  }).with('password', 'repeat_password')

  return schema.validate(data)
}

/**
 * Login validation
 * @param  {Request body}  data The request body JSON
 */
const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .email(),
    password: Joi.string()
      .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$'))
      .required()
  })

  return schema.validate(data)
}

module.exports.userValidation = userValidation
module.exports.loginValidation = loginValidation

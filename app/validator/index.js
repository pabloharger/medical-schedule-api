const { check } = require('express-validator')

const validators = {
  email:
    check('email')
      .exists().withMessage('field.email.required')
      .not().isEmpty().withMessage('field.email.required')
      .isEmail().withMessage('field.email.valid'),
  password:
    check('password')
      .exists().withMessage('field.password.required')
      .not().isEmpty().withMessage('field.password.required'),
  password_confirmation:
    check('password_confirmation')
      .custom((value, { req }) => {
        if (value !== req.body.password) { throw new Error('field.password.match') }
        return true
      }),
  token:
    check('token')
      .exists().withMessage('validation.somethingWorngHappened')
      .not().isEmpty().withMessage('validation.somethingWorngHappened'),
  firstName: {
    post:
      check('firstName')
        .exists().withMessage('field.firstName.required')
        .not().isEmpty().withMessage('field.firstName.required'),
    put:
      check('firstName')
        .exists().withMessage('field.firstName.required')
        .not().isEmpty().withMessage('field.firstName.required')
        .optional()
  },
  lastName: {
    post:
      check('lastName')
        .exists().withMessage('field.lastName.required')
        .not().isEmpty().withMessage('field.lastName.required'),
    put:
      check('lastName')
        .exists().withMessage('field.lastName.required')
        .not().isEmpty().withMessage('field.lastName.required')
        .optional()
  },
  schedule: {
    post: {
      idDentist:
        check('idDentist')
          .isNumeric().withMessage('field.idDentist.valid')
          .exists().withMessage('field.idDentist.required')
          .not().isEmpty().withMessage('field.idDentist.required'),
      idPatient:
        check('idPatient')
          .isNumeric().withMessage('field.idPatient.valid')
          .exists().withMessage('field.idPatient.required')
          .not().isEmpty().withMessage('field.idPatient.required'),
      dateTimeBegin:
        check('dateTimeBegin')
          .exists().withMessage('field.dateTimeBegin.required')
          .not().isEmpty().withMessage('field.dateTimeBegin.required'),
      dateTimeEnd:
        check('dateTimeEnd')
          .exists().withMessage('field.dateTimeEnd.required')
          .not().isEmpty().withMessage('field.dateTimeEnd.required')
    },
    put: {
      idDentist:
        check('idDentist')
          .isNumeric().withMessage('field.idDentist.valid')
          .exists().withMessage('field.idDentist.required')
          .not().isEmpty().withMessage('field.idDentist.required')
          .optional(),
      idPatient:
        check('idPatient')
          .isNumeric().withMessage('field.idPatient.valid')
          .exists().withMessage('field.idPatient.required')
          .not().isEmpty().withMessage('field.idPatient.required')
          .optional(),
      dateTimeBegin:
        check('dateTimeBegin')
          .exists().withMessage('field.dateTimeBegin.required')
          .not().isEmpty().withMessage('field.dateTimeBegin.required')
          .optional(),
      dateTimeEnd:
        check('dateTimeEnd')
          .exists().withMessage('field.dateTimeEnd.required')
          .not().isEmpty().withMessage('field.dateTimeEnd.required')
          .optional()
    }
  }
}

function validator (functionName) {
  switch (functionName) {
    case 'auth.signIn': {
      return [
        validators.email,
        validators.password
      ]
    }
    case 'auth.signUp': {
      return [
        validators.firstName.post,
        validators.lastName.post,
        validators.email,
        validators.password,
        validators.password_confirmation
      ]
    }
    case 'auth.resetForgottenPassword': {
      return [
        validators.token,
        validators.password,
        validators.password_confirmation
      ]
    }
    case 'auth.verifyToken': {
      return [validators.token]
    }
    case 'auth.activateAccount': {
      return [validators.token]
    }
    case 'auth.sendActivationEmail': {
      return [validators.email]
    }
    case 'auth.forgotPassword': {
      return [validators.email]
    }
    case 'dentist.post': {
      return [
        validators.firstName.post,
        validators.lastName.post
      ]
    }
    case 'dentist.put': {
      return [
        validators.firstName.put,
        validators.lastName.put
      ]
    }
    case 'patient.post': {
      return [
        validators.firstName.post,
        validators.lastName.post
      ]
    }
    case 'patient.put': {
      return [
        validators.firstName.put,
        validators.lastName.put
      ]
    }
    case 'schedule.post': {
      return [
        validators.schedule.post.idDentist,
        validators.schedule.post.idPatient,
        validators.schedule.post.dateTimeBegin,
        validators.schedule.post.dateTimeEnd
      ]
    }
    case 'schedule.put': {
      return [
        validators.schedule.put.idDentist,
        validators.schedule.put.idPatient,
        validators.schedule.put.dateTimeBegin,
        validators.schedule.put.dateTimeEnd
      ]
    }
  }
}

module.exports = validator

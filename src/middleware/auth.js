require('dotenv')
const jwt = require('jsonwebtoken')

module.exports = {
  authorizationEngineer: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, process.env.JWT_KEY, (error, result) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          res.status(400).send({
            success: false,
            message: error.message
          })
        } else {
          if (result.ac_level === 0) {
            next()
          } else {
            res.status(400).send({
              success: false,
              message: 'you cant access!'
            })
          }
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'Please login first!'
      })
    }
  },

  authorizationCompany: (req, res, next) => {
    let token = req.headers.authorization
    if (token) {
      token = token.split(' ')[1]
      jwt.verify(token, process.env.JWT_KEY, (error, result) => {
        if ((error && error.name === 'JsonWebTokenError') || (error && error.name === 'TokenExpiredError')) {
          res.status(400).send({
            success: false,
            message: error.message
          })
        } else {
          if (result.ac_level === 1) {
            next()
          } else {
            res.status(400).send({
              success: false,
              message: 'you cant access!'
            })
          }
        }
      })
    } else {
      res.status(400).send({
        success: false,
        message: 'Please login first!'
      })
    }
  }
}

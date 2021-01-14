const bycrpt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv')

const { getAllAcModel, createAcModel, getAcByIdModel, updateAcModel, checkAcModel } = require('../models/account')

module.exports = {

  getAllAc: async (req, res) => {
    try {
      const result = await getAllAcModel()
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list account!',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'acc not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  },

  getAcById: async (req, res) => {
    try {
      const { acId } = req.params

      const result = await getAcByIdModel(acId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'account',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'account not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  // updateAcc: async (req, res) => {
  //   try {
  //     const { acId } = req.params

  //     if (req.body.ac_name.trim() && req.body.ac_email.trim() && req.body.ac_phone.trim() && req.body.ac_password.trim()) {
  //       const resultSelect = await getAcByIdModel(acId)
  //       if (resultSelect.length) {
  //         const resultUpdate = await updateAcModel(req.body, acId)
  //         if (resultUpdate.affectedRows) {
  //           res.status(200).send({
  //             success: true,
  //             message: 'account with id has been updated!'
  //           })
  //         } else {
  //           res.status(400).send({
  //             success: false,
  //             message: 'account failed to update'
  //           })
  //         }
  //       } else {
  //         res.status(404).send({
  //           success: false,
  //           message: 'account not found!'
  //         })
  //       }
  //     } else {
  //       res.status(400).send({
  //         success: false,
  //         message: 'all fields must be fill!'
  //       })
  //     }
  //   } catch (error) {
  //     res.status(500).send({
  //       success: false,
  //       message: 'internal server error!'
  //     })
  //   }
  // },

  updateAcc: async (req, res) => {
    const { acId } = req.params
    const { acName, acEmail, acPhone, acPassword } = req.body
    const salt = bycrpt.genSaltSync(10)
    const encryptPassword = bycrpt.hashSync(acPassword, salt)
    const data = {
      ac_name: acName,
      ac_email: acEmail,
      ac_phone: acPhone,
      ac_password: encryptPassword,
      ac_update_at: new Date()
    }

    try {
      if (acName.trim() && acEmail.trim() && acPhone.trim() && acPassword.trim()) {
        const resultSelect = await getAcByIdModel(acId)
        if (resultSelect.length) {
          const resultUpdate = await updateAcModel(data, acId)
          if (resultUpdate.affectedRows) {
            res.status(200).send({
              success: true,
              message: 'update account success'
            })
          } else {
            res.status(400).send({
              success: false,
              message: 'update account failed!'
            })
          }
        } else {
          res.status(404).send({
            success: false,
            message: 'account not found'
          })
        }
      } else {
        res.status(400).send({
          success: false,
          message: 'all fields must be fill'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  createAc: async (req, res) => {
    const { acName, acEmail, acPhone, acPassword, acLevel, acPerusahaan, acJabatan } = req.body
    const salt = bycrpt.genSaltSync(10)
    const encryptPassword = bycrpt.hashSync(acPassword, salt)
    const data = {
      ac_name: acName,
      ac_email: acEmail,
      ac_phone: acPhone,
      ac_password: encryptPassword,
      ac_level: acLevel,
      cn_perusahaan: acPerusahaan,
      cn_jabatan: acJabatan,
      ac_created_at: new Date()
    }

    try {
      const checkEmail = await checkAcModel(acEmail)
      if (checkEmail.length === 0) {
        const result = await createAcModel(data)
        res.status(200).send({
          success: true,
          message: 'success add account!',
          data: result
        })
      } else {
        res.status(400).send({
          success: false,
          message: 'email has been registered!!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  loginAc: async (req, res) => {
    try {
      const { ac_email, ac_password } = req.body
      const dataAccount = await checkAcModel(ac_email)
      if (dataAccount.length >= 1) {
        const checkPassword = bycrpt.compareSync(ac_password, dataAccount[0].ac_password)
        if (checkPassword) {
          const { ac_id, ac_email, ac_level } = dataAccount[0]
          let payload = {
            ac_id,
            ac_email,
            ac_level
          }
          const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: '1h' })
          payload = { ...payload, token }
          res.status(200).send({
            success: true,
            message: 'success login!',
            data: payload
          })
        } else {
          res.status(400).send({
            success: false,
            message: 'wrong password!'
          })
        }
      } else {
        res.status(400).send({
          success: false,
          message: 'email/account not registered!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'bad request'
      })
    }
  }
}

const { getAllAcModel, createAcModel, getAcByIdModel, updateAcModel } = require('../models/account')

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

  createAc: async (req, res) => {
    try {
      const result = await createAcModel(req.body)

      console.log(result)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'success create account!'
        })
      } else {
        res.status(400).send({
          success: false,
          message: 'failed create account!'
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

  updateAcc: async (req, res) => {
    try {
      const { acId } = req.params

      if (req.body.ac_name.trim() && req.body.ac_email.trim() && req.body.ac_phone.trim() && req.body.ac_password.trim()) {
        const resultSelect = await getAcByIdModel(acId)
        if (resultSelect.length) {
          const resultUpdate = await updateAcModel(req.body, acId)
          if (resultUpdate.affectedRows) {
            res.status(200).send({
              success: true,
              message: 'account with id has been updated!'
            })
          } else {
            res.status(400).send({
              success: false,
              message: 'account failed to update'
            })
          }
        } else {
          res.status(404).send({
            success: false,
            message: 'account not found!'
          })
        }
      } else {
        res.status(400).send({
          success: false,
          message: 'all fields must be fill!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  }
}

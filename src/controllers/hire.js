const { getHireModel, createHireModel, getHireByProjectIdModel, updateHireStatusModel, getHireByIdModel, getHireByEnIdModel, deleteHireModel } = require('../models/hire')

module.exports = {

  getHire: async (req, res) => {
    try {
      const result = await getHireModel()

      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list hire',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'data not found'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  deleteHire: async (req, res) => {
    try {
      const { hrId } = req.params
      const resultSelect = await getHireByIdModel(hrId)
      if (resultSelect.length) {
        const resultDelete = await deleteHireModel(hrId)
        if (resultDelete.affectedRows) {
          res.status(200).send({
            success: true,
            message: 'hire has been deleted!'
          })
        } else {
          res.status(400).send({
            success: false,
            message: 'failed to delete'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'hire not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  },

  createHire: async (req, res) => {
    try {
      const result = await createHireModel(req.body)

      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'create hire success'
        })
      } else {
        res.status(400).send({
          success: false,
          message: 'create hire failed'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  getHireByProjectId: async (req, res) => {
    try {
      const { pjId } = req.params

      const result = await getHireByProjectIdModel(pjId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'data hire:',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'data hire not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  updateHireStatus: async (req, res) => {
    try {
      const { hrId } = req.params
      const setData = {
        hr_status: req.body.hr_status,
        hr_date_confirm: new Date()
      }

      const resultSelect = await getHireByIdModel(hrId)

      if (resultSelect.length) {
        const resultUpdate = await updateHireStatusModel(hrId, setData)

        if (resultUpdate.affectedRows) {
          res.status(200).send({
            success: true,
            message: 'success update hire status'
          })
        } else {
          res.status(400).send({
            success: false,
            message: 'update hire status failed'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'hire data not found'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  getHireByEnId: async (req, res) => {
    try {
      const { enId } = req.params

      const result = await getHireByEnIdModel(enId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'data hire:',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'data hire not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  }

}

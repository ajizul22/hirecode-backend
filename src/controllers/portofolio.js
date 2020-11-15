const { getPortModel, createPortModel, getPortByIdModel, deletePortModel, updatePortModel, getPortByIdEnModel } = require('../models/portofolio')

module.exports = {

  getPort: async (req, res) => {
    try {
      const result = await getPortModel()
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list portofolio!',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'portofolio not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  },

  createPort: async (req, res) => {
    try {
      const result = await createPortModel(req.body)

      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'success add portofolio'
        })
      } else {
        res.status(400).send({
          success: false,
          message: 'create portofolio failed!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  getPortById: async (req, res) => {
    try {
      const { portId } = req.params

      const result = await getPortByIdModel(portId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list portofolio!',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'portofolio not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  deletePort: async (req, res) => {
    try {
      const { portId } = req.params
      console.log(req.params)

      const resultSelect = await getPortByIdModel(portId)
      if (resultSelect.length) {
        const resultDelete = await deletePortModel(portId)
        if (resultDelete.affectedRows) {
          res.status(200).send({
            success: true,
            message: 'delete portofolio success!'
          })
        } else {
          res.status(400).send({
            success: false,
            message: 'failed to delete portofolio!'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'portofoio not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  },

  updatePort: async (req, res) => {
    try {
      const { portId } = req.params

      const resultSelect = await getPortByIdModel(portId)
      if (resultSelect.length) {
        const resultUpdate = await updatePortModel(portId, req.body)

        if (resultUpdate.affectedRows) {
          res.status(200).send({
            success: true,
            message: 'success update portofolio'
          })
        } else {
          res.status(400).send({
            success: false,
            message: 'update portofolio failed'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'portofolio not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  },

  getPortByIdEnModel: async (req, res) => {
    try {
      const { enId } = req.params

      const result = await getPortByIdEnModel(enId)

      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list skill',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'skill not found'
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

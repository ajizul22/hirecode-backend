const { createExModel, getAllExModel, getExByIdModel, deleteExModel, updateExModel, getExByEnIdModel } = require('../models/experience')

module.exports = {
  createEx: async (req, res) => {
    try {
      const { enId, exPosisi, exPerusahaan, exStart, exEnd, exDesc } = req.body

      const result = await createExModel(enId, exPosisi, exPerusahaan, exStart, exEnd, exDesc)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'success to add experience!'
        })
      } else {
        res.status(400).send({
          success: false,
          message: 'failed to add experience'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  },

  getAllEx: async (req, res) => {
    try {
      const result = await getAllExModel()
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list experience',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'experience not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  },

  getExById: async (req, res) => {
    try {
      const { exId } = req.params

      const result = await getExByIdModel(exId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list experience',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'experience not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  deleteEx: async (req, res) => {
    try {
      const { exId } = req.params

      const resultSelect = await getExByIdModel(exId)
      if (resultSelect.length) {
        const resultDelete = await deleteExModel(exId)
        if (resultDelete.affectedRows) {
          res.status(200).send({
            success: true,
            message: 'experience has been deleted!'
          })
        } else {
          res.status(400).send({
            success: false,
            message: 'failed to delete experience!'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'experience not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  updateEx: async (req, res) => {
    try {
      const { exId } = req.params
      const { enId, exPosisi, exPerusahaan, exStart, exEnd, exDesc } = req.body

      if (enId.trim() && exPosisi.trim() && exPerusahaan.trim() && exStart.trim() && exEnd.trim() && exDesc.trim()) {
        const resultSelect = await getExByIdModel(exId)

        if (resultSelect.length) {
          const resultUpdate = await updateExModel(enId, exPosisi, exPerusahaan, exStart, exEnd, exDesc, exId)

          if (resultUpdate.affectedRows) {
            res.status(200).send({
              success: true,
              message: 'experience has been update!'
            })
          } else {
            res.status(400).send({
              success: false,
              message: 'experience failed to update!'
            })
          }
        } else {
          res.status(404).send({
            success: false,
            message: 'experience not found!'
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

  getExByEnId: async (req, res) => {
    try {
      const { enId } = req.params

      const result = await getExByEnIdModel(enId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list experience',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'experience not found!'
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

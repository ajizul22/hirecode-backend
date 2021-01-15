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
      const setData = {
        en_id: req.body.en_id,
        pr_aplikasi: req.body.pr_aplikasi,
        pr_deskripsi: req.body.pr_deskripsi,
        pr_link_pub: req.body.pr_link_pub,
        pr_link_repo: req.body.pr_link_repo,
        pr_tp_kerja: req.body.pr_tp_kerja,
        pr_tipe: req.body.pr_tipe,
        pr_gambar: req.file === undefined ? '' : req.file.filename
      }
      const result = await createPortModel(setData)

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
      const image = req.file === undefined ? resultSelect[0].pr_gambar : req.file.filename

      const data = req.body
      const setData = {
        ...data,
        pr_gambar: image
      }
      if (resultSelect.length) {
        const resultUpdate = await updatePortModel(portId, setData)

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
          message: 'list portofolio',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'portofolio not found'
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

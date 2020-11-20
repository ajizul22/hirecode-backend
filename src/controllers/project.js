const { createProjectModel, getProjectModel, getProjectByIdModel, deleteProjectModel, updateProjectModel, getProjectByCnIdModel } = require('../models/project')

module.exports = {

  createProject: async (req, res) => {
    try {
      const setData = {
        cn_id: req.body.cn_id,
        pj_nama_project: req.body.pj_nama_project,
        pj_deskripsi: req.body.pj_deskripsi,
        pj_deadline: req.body.pj_deadline,
        pj_gambar: req.file === undefined ? '' : req.file.filename
      }
      const result = await createProjectModel(setData)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'success create project!'
        })
      } else {
        res.status(400).send({
          success: false,
          message: 'failed to create project'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  },

  updateProject: async (req, res) => {
    try {
      const { pjId } = req.params

      const setData = {
        pj_nama_project: req.body.pj_nama_project,
        pj_deskripsi: req.body.pj_deskripsi,
        pj_deadline: req.body.pj_deadline,
        pj_updated_at: new Date(),
        pj_gambar: req.file === undefined ? '' : req.file.filename
      }

      const resultSelect = await getProjectByIdModel(pjId)

      if (resultSelect.length) {
        const resultUpdate = await updateProjectModel(setData, pjId)

        if (resultUpdate.affectedRows) {
          res.status(200).send({
            success: true,
            message: 'project has been updated!'
          })
        } else {
          res.status(400).send({
            success: false,
            message: 'project failed to update!'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'project not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  },

  getProject: async (req, res) => {
    try {
      const result = await getProjectModel()
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list project',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'project not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  },

  getProjectById: async (req, res) => {
    try {
      const { pjId } = req.params

      const result = await getProjectByIdModel(pjId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'project List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'project not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  deleteProject: async (req, res) => {
    try {
      const { pjId } = req.params

      const resultSelect = await getProjectByIdModel(pjId)
      if (resultSelect.length) {
        const resultDelete = await deleteProjectModel(pjId)

        if (resultDelete.affectedRows) {
          res.status(200).send({
            success: true,
            message: 'project has been deleted!'
          })
        } else {
          res.status(400).send({
            success: false,
            message: 'project failed to delete!'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'project not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  },

  getProjectByCnId: async (req, res) => {
    try {
      const { cnId } = req.params

      const result = await getProjectByCnIdModel(cnId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'project List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'project not found!'
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

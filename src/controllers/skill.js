const { getAllSkillModel, createSkillModul, deleteSkillModul, getSkillByIdModul, updateSkillModel, getSkillByIdEnModel } = require('../models/skill')

module.exports = {

  getAllSkill: async (req, res) => {
    try {
      const result = await getAllSkillModel()
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list skill',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'skill not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  },

  createSkill: async (req, res) => {
    try {
      const { enId, skNamaSkill } = req.body
      const result = await createSkillModul(enId, skNamaSkill)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'skill has been add!'
        })
      } else {
        res.status(400).send({
          success: false,
          message: 'failed to add skill'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  deleteSkill: async (req, res) => {
    try {
      const { skId } = req.params
      const resultSelect = await getSkillByIdModul(skId)
      if (resultSelect.length) {
        const resultDelete = await deleteSkillModul(skId)
        if (resultDelete.affectedRows) {
          res.status(200).send({
            success: true,
            message: 'skill has been deleted!'
          })
        } else {
          res.status(400).send({
            success: false,
            message: 'skill failed to delete'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'skill not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  getSkillById: async (req, res) => {
    try {
      const { skId } = req.params

      const result = await getSkillByIdModul(skId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list skill',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'skill not found!'
        })
      }
    } catch (error) {
      req.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  updateSkill: async (req, res) => {
    try {
      const { skId } = req.params

      if (req.body.en_id.trim() && req.body.sk_nama_skill.trim()) {
        const resultSelect = await getSkillByIdModul(skId)

        if (resultSelect.length) {
          const resultUpdate = await updateSkillModel(skId, req.body)

          if (resultUpdate.affectedRows) {
            res.status(200).send({
              success: true,
              message: 'update skill success'
            })
          } else {
            res.status(400).send({
              success: false,
              message: 'update skill failed'
            })
          }
        } else {
          res.status(404).send({
            success: false,
            message: 'skill not found!'
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

  getSkillByIdEn: async (req, res) => {
    try {
      const { enId } = req.params

      const result = await getSkillByIdEnModel(enId)

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

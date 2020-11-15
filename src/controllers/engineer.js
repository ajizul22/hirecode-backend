const { getAllEngModel, getEngByIdModel, updateEngModel } = require('../models/engineer')

module.exports = {

  getAllEng: async (req, res) => {
    try {
      const { search } = req.query

      let searchKey = ''
      let searchValue = ''

      if (typeof search === 'object') {
        searchKey = Object.keys(search)[0]
        searchValue = Object.values(search)[0]
      } else {
        searchKey = 'en_job_title'
        searchValue = search || ''
      }
      const result = await getAllEngModel(searchKey, searchValue)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Engineer List!',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'engineer not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  },

  getEngById: async (req, res) => {
    try {
      const { enId } = req.params

      const result = await getEngByIdModel(enId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'List Engineer',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'engineer not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  updateEng: async (req, res) => {
    try {
      const { enId } = req.params
      const resultSelect = await getEngByIdModel(enId)

      if (resultSelect.length) {
        const resultUpdate = await updateEngModel(enId, req.body)

        if (resultUpdate.affectedRows) {
          res.status(200).send({
            success: true,
            message: 'engineer has been updated!'
          })
        } else {
          res.status(400).send({
            success: false,
            message: 'failed to update engineer!'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'engineer not found!'
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

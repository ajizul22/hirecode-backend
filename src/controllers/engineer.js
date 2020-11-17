const { getAllEngModel, getEngByIdModel, updateEngModel, getSearchEngModel } = require('../models/engineer')

module.exports = {

  getAllEng: async (req, res) => {
    try {
      let { search, limit, page, filter } = req.query
      let searchValue = ''
      if (typeof search === 'object') {
        searchValue = Object.values(search)[0]
      } else {
        searchValue = search || ''
      }
      // const searchValue = Object.values(search)[0]
      if (!limit) {
        limit = 10
      } else {
        limit = parseInt(limit)
      }
      if (!page) {
        page = 1
      } else {
        page = parseInt(page)
      }
      const offset = (page - 1) * limit

      const result = await getSearchEngModel(searchValue, limit, offset, filter)

      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list engineer',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'engineer not found'
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

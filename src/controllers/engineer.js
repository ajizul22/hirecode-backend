const { getDetailEngModel, getEngByIdModel, updateEngModel, getSearchEngModel, getEngIdByAcIdModel } = require('../models/engineer')

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
      console.log(result)

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
          message: `Data Engineer id ${enId}`,
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'engineer not found!'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  updateEng: async (req, res) => {
    try {
      const { enId } = req.params
      const setData = {
        en_job_title: req.body.en_job_title,
        en_job_type: req.body.en_job_type,
        en_domisili: req.body.en_domisili,
        en_deskripsi: req.body.en_deskripsi,
        en_update_at: new Date(),
        en_ft_profil: req.file === undefined ? '' : req.file.filename
      }
      const resultSelect = await getEngByIdModel(enId)

      if (resultSelect.length) {
        const resultUpdate = await updateEngModel(enId, setData)

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
  },

  getEngIdByAcId: async (req, res) => {
    try {
      const { acId } = req.params
      const result = await getEngIdByAcIdModel(acId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Engineer with id ${acId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: `engineer with id ${acId} not found`
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  },

  getDetailEng: async (req, res) => {
    let { limit, page } = req.query

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

    try {
      const result = await getDetailEngModel(limit, offset)

      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list Engineer',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'engineer not found'
        })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  }
}

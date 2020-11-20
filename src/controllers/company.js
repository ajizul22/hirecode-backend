const { getCompanyModel, getCompanyByIdModel, updateCompanyModel } = require('../models/company')

module.exports = {

  getCompany: async (req, res) => {
    try {
      const result = await getCompanyModel()
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list company!',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'company not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error!'
      })
    }
  },

  getCompanyById: async (req, res) => {
    try {
      const { cnId } = req.params
      const result = await getCompanyByIdModel(cnId)

      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'list company',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'company not found!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server error'
      })
    }
  },

  updateCompany: async (req, res) => {
    try {
      const { cnId } = req.params
      const setData = {
        cn_perusahaan: req.body.cn_perusahaan,
        cn_jabatan: req.body.cn_jabatan,
        cn_bidang: req.body.cn_bidang,
        cn_kota: req.body.cn_kota,
        cn_deskripsi: req.body.cn_deskripsi,
        cn_instagram: req.body.cn_instagram,
        cn_linkedin: req.body.cn_linkedin,
        cn_updated_at: new Date(),
        cn_ft_profil: req.file === undefined ? '' : req.file.filename
      }
      const resultSelect = await getCompanyByIdModel(cnId)
      if (resultSelect.length) {
        const resultUpdate = await updateCompanyModel(cnId, setData)

        if (resultUpdate.affectedRows) {
          res.status(200).send({
            success: true,
            message: 'update company success!'
          })
        } else {
          res.status(400).send({
            success: false,
            message: 'update company failed!'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'company not found!'
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

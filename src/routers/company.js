const Router = require('express')
const { getCompany, getCompanyById, updateCompany } = require('../controllers/company')

const router = Router()

router.get('/', getCompany)
router.get('/:cnId', getCompanyById)
router.put('/:cnId', updateCompany)

module.exports = router

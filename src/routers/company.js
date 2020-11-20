const Router = require('express')
const { getCompany, getCompanyById, updateCompany } = require('../controllers/company')
const { authorizationCompany } = require('../middleware/auth')

const router = Router()

const uploadImage = require('../middleware/multer')

router.get('/', getCompany)
router.get('/:cnId', getCompanyById)
router.put('/:cnId', authorizationCompany, uploadImage, updateCompany)

module.exports = router

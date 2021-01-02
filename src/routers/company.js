const Router = require('express')
const { getCompany, getCompanyById, updateCompany, getCompanyIdByAcId } = require('../controllers/company')
const { authorizationCompany } = require('../middleware/auth')

const router = Router()

const uploadImage = require('../middleware/multer')

router.get('/', getCompany)
router.get('/:cnId', getCompanyById)
router.put('/:cnId', authorizationCompany, uploadImage, updateCompany)
router.get('/account/:acId', getCompanyIdByAcId)

module.exports = router

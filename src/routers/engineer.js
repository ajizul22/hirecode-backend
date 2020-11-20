const { Router } = require('express')

const { getAllEng, getEngById, updateEng } = require('../controllers/engineer')
const { authorizationEngineer, authorizationCompany } = require('../middleware/auth')

const router = Router()

const uploadImage = require('../middleware/multer')

router.get('/', authorizationCompany, getAllEng)
router.get('/:enId', getEngById)
router.put('/:enId', authorizationEngineer, uploadImage, updateEng)

module.exports = router

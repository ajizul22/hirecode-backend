const { Router } = require('express')

const { getAllEng, getEngById, updateEng, getEngIdByAcId, getDetailEng } = require('../controllers/engineer')
const { authorizationEngineer } = require('../middleware/auth')

const router = Router()

const uploadImage = require('../middleware/multer')

router.get('/', getAllEng)
router.get('/detail', getDetailEng)
router.get('/:enId', getEngById)
router.put('/:enId', authorizationEngineer, uploadImage, updateEng)
router.get('/account/:acId', getEngIdByAcId)

module.exports = router

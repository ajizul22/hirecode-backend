const { Router } = require('express')

const { getAllEng, getEngById, updateEng } = require('../controllers/engineer')

const router = Router()

router.get('/', getAllEng)
router.get('/:enId', getEngById)
router.put('/:enId', updateEng)

module.exports = router

const { Router } = require('express')

const { createEx, getAllEx, getExById, deleteEx, updateEx, getExByEnId } = require('../controllers/experience')

const router = Router()

router.post('/', createEx)
router.get('/', getAllEx)
router.get('/detail/:exId', getExById)
router.delete('/:exId', deleteEx)
router.put('/:exId', updateEx)
router.get('/:enId', getExByEnId)

module.exports = router

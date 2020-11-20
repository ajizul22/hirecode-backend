const { Router } = require('express')

const { createEx, getAllEx, getExById, deleteEx, updateEx, getExByEnId } = require('../controllers/experience')
const { authorizationEngineer } = require('../middleware/auth')

const router = Router()

router.post('/', authorizationEngineer, createEx)
router.get('/', getAllEx)
router.get('/detail/:exId', getExById)
router.delete('/:exId', authorizationEngineer, deleteEx)
router.put('/:exId', authorizationEngineer, updateEx)
router.get('/:enId', getExByEnId)

module.exports = router

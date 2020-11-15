const Router = require('express')
const { getPort, createPort, getPortById, deletePort, updatePort, getPortByIdEnModel } = require('../controllers/portofolio')

const router = Router()

router.get('/', getPort)
router.post('/', createPort)
router.get('/detail/:portId', getPortById)
router.delete('/:portId', deletePort)
router.put('/:portId', updatePort)
router.get('/:enId', getPortByIdEnModel)

module.exports = router

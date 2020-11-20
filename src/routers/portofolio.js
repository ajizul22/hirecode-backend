const Router = require('express')
const { getPort, createPort, getPortById, deletePort, updatePort, getPortByIdEnModel } = require('../controllers/portofolio')
const { authorizationEngineer } = require('../middleware/auth')

const router = Router()

const uploadImage = require('../middleware/multer')

router.get('/', getPort)
router.post('/', authorizationEngineer, uploadImage, createPort)
router.get('/detail/:portId', getPortById)
router.delete('/:portId', authorizationEngineer, deletePort)
router.put('/:portId', authorizationEngineer, uploadImage, updatePort)
router.get('/:enId', getPortByIdEnModel)

module.exports = router

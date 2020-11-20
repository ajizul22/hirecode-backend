const { Router } = require('express')
// const multer = require('multer')
const { createProject, getProject, getProjectById, deleteProject, updateProject, getProjectByCnId } = require('../controllers/project')
const { authorizationCompany } = require('../middleware/auth')
const uploadImage = require('../middleware/multer')

const router = Router()

router.post('/', authorizationCompany, uploadImage, createProject)
router.get('/', getProject)
router.get('/detail/:pjId', getProjectById)
router.delete('/:pjId', authorizationCompany, deleteProject)
router.put('/:pjId', authorizationCompany, uploadImage, updateProject)
router.get('/:cnId', authorizationCompany, getProjectByCnId)

module.exports = router

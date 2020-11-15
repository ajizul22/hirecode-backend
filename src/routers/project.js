const { Router } = require('express')
const { createProject, getProject, getProjectById, deleteProject, updateProject, getProjectByCnId } = require('../controllers/project')

const router = Router()

router.post('/', createProject)
router.get('/', getProject)
router.get('/detail/:pjId', getProjectById)
router.delete('/:pjId', deleteProject)
router.put('/:pjId', updateProject)
router.get('/:cnId', getProjectByCnId)

module.exports = router

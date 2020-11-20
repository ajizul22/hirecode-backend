const { Router } = require('express')
const { createHire, getHire, getHireByProjectId, updateHireStatus, getHireByEnId } = require('../controllers/hire')
const { authorizationCompany, authorizationEngineer } = require('../middleware/auth')

const router = Router()

router.get('/', getHire)
router.post('/', authorizationCompany, createHire)
router.get('/project/:pjId', authorizationCompany, getHireByProjectId)
router.put('/:hrId', authorizationEngineer, updateHireStatus)
router.get('/engineer/:enId', authorizationEngineer, getHireByEnId)

module.exports = router

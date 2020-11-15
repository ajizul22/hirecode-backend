const { Router } = require('express')
const { createHire, getHire, getHireByProjectId, updateHireStatus, getHireByEnId } = require('../controllers/hire')

const router = Router()

router.get('/', getHire)
router.post('/', createHire)
router.get('/project/:pjId', getHireByProjectId)
router.put('/:hrId', updateHireStatus)
router.get('/engineer/:enId', getHireByEnId)

module.exports = router

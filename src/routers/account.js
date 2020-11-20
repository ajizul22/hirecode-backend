const { Router } = require('express')
// import controller file
const { getAllAc, createAc, getAcById, updateAcc, loginAc } = require('../controllers/account')

const router = Router()

router.get('/', getAllAc)
router.post('/register', createAc)
router.get('/:acId', getAcById)
router.put('/:acId', updateAcc)
router.post('/login', loginAc)

module.exports = router

const { Router } = require('express')
// import controller file
const { getAllAc, createAc, getAcById, updateAcc } = require('../controllers/account')

const router = Router()

router.get('/', getAllAc)
router.post('/', createAc)
router.get('/:acId', getAcById)
router.put('/:acId', updateAcc)

module.exports = router

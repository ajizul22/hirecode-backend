const { Router } = require('express')

const { getAllSkill, createSkill, deleteSkill, getSkillById, updateSkill, getSkillByIdEn } = require('../controllers/skill')
const { authorizationEngineer } = require('../middleware/auth')

const router = Router()

router.get('/', getAllSkill)
router.post('/', authorizationEngineer, createSkill)
router.delete('/:skId', authorizationEngineer, deleteSkill)
router.get('/detail/:skId', getSkillById)
router.put('/:skId', authorizationEngineer, updateSkill)
router.get('/:enId', getSkillByIdEn)

module.exports = router

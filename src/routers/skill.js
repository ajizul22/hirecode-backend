const { Router } = require('express')

const { getAllSkill, createSkill, deleteSkill, getSkillById, updateSkill, getSkillByIdEn } = require('../controllers/skill')

const router = Router()

router.get('/', getAllSkill)
router.post('/', createSkill)
router.delete('/:skId', deleteSkill)
router.get('/detail/:skId', getSkillById)
router.put('/:skId', updateSkill)
router.get('/:enId', getSkillByIdEn)

module.exports = router

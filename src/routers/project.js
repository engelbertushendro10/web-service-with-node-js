const { Router } = require('express')
const { getAllProject, getProjectById, createProject } = require('../controller/project')

const router = Router()

router.get('/', getAllProject)
router.get('/:projectId', getProjectById)
router.post('/', createProject)
// router.put('/:projectId', )
// router.patch('/:projectId', )
// router.delete('/:projectId', )

module.exports = router

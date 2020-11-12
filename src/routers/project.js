const { Router } = require('express')
const { getAllProject, getProjectById, createProject, deleteProject, putProject, patchProject } = require('../controller/project')

const router = Router()

router.get('/', getAllProject)
router.get('/:projectId', getProjectById)
router.post('/', createProject)
router.put('/:projectId', putProject)
router.patch('/:projectId', patchProject)
router.delete('/:projectId', deleteProject)

module.exports = router

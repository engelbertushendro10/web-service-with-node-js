const { Router } = require('express')
const { getAllProject, getAllProjectById, createProject } = require('../controller/project')

const router = Router()

router.get('/', getAllProject)
router.get('/:projectId', getAllProjectById)
router.post('/', createProject)
router.put('/:projectId')
router.patch('/:projectId')
router.delete('/:projectId')

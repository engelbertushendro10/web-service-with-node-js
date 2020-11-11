const { getAllProjectModel, getAllProjectByIdModel, createProjectModel } = require('../models/project')
module.exports = {
  getAllProject: (req, res) => {
    const { search, limit, page } = req.query
    let searchKey = ''
    let searchValue = ''

    if (typeof search === 'object') {
      searchKey = Object.keys(search)[0]
      searchValue = Object.values(search)[0]
    } else {
      searchKey = 'project_name'
      searchValue = search || ''
    }

    if (!limit) {
      limit = 50
    } else {
      limit = parseInt(limit)
    }

    if (!page) {
      page = 1
    } else {
      page = parseInt(page)
    }

    const offset = (page - 1) * limit

    getAllProjectModel(searchKey, searchValue, limit, offset, result => {
      if (result.length) {
        res.status(200).send({
          success: true,
          message: 'Project list',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'item not found'
        })
      }
    })
  },
getProjectById: async (req, res) => {
    try {
      const { projectId } = req.params

      const result = await getAllProjectByIdModel(projectId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Project with id ${projectId}`,
          data: result[0]
        })
      }else {
        res.status(404).send({
          success: false,
          message: 'Data With id' + projectId + 'not found'
        })
      }
    } catch (error) {
      console.log(error)
      req.status(500).send({
        success: false,
        message: 'Internal Server Error!'
      })
    }
  },
  createProject: async (req, res) => {
    try {
      const { projecName, projecDesc, projectType } = req.body
      const result = await createProjectModel(projectName, projectDesc, projectType)

      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'Success Add Data'
        })
      }else {
        res.status(404).send({
          success: false,
          message: 'Submit Data Failed !'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'internal server eror'
      })
    }
  }
}

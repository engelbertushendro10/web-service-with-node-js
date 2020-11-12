const { getAllProjectModel, getProjectByIdModel, createProjectModel, deleteProjectModel, putProjectModel, patchProjectModel } = require('../models/project')

module.exports = {
  getAllProject: (req, res) => {
    let { search, limit, page } = req.query
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
          message: 'Project List',
          data: result
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Item project not found!'
        })
      }
    })
  },
  getProjectById: async (req, res) => {
    try {
      const { projectId } = req.params

      const result = await getProjectByIdModel(projectId)
      if (result.length) {
        res.status(200).send({
          success: true,
          message: `Project with id ${projectId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          success: false,
          message: 'Data project with id ' + projectId + ' not found'
        })
      }
    } catch (error) {
      console.log(error)
      req.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  createProject: async (req, res) => {
    try {
      const { projectName, projectDesc, projectType } = req.body
      const result = await createProjectModel(projectName, projectDesc, projectType)
      if (result.affectedRows) {
        res.status(200).send({
          success: true,
          message: 'Success add project!'
        })
      } else {
        res.status(400).send({
          success: false,
          message: 'Submit project failed!'
        })
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Internal Server Error!'
      })
    }
  },
  deleteProject: async (req, res) => {
    try {
      const { projectId } = req.params

      const resultSelect = await getProjectByIdModel(projectId)
      if (resultSelect.length) {
        const resultDelete = await deleteProjectModel(projectId)
        if (resultDelete.affectedRows) {
          res.status(200).send({
            success: true,
            message: `Item project id ${projectId} has been deleted!`
          })
        } else {
          res.status(404).send({
            success: false,
            message: 'Item project failed to delete!'
          })
        }
      } else {
        res.status(404).send({
          success: false,
          message: 'Data project with id ' + projectId + ' not found'
        })
      }
    } catch (error) {
      console.log(error)
      req.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  putProject: async (req, res) => {
    try {
      const { projectId } = req.params
      const { projectName, projectDesc, projectType } = req.body

      if (projectName.trim() && projectDesc.trim() && projectType.trim()) {
        const resultSelect = await getProjectByIdModel(projectId)
        if (resultSelect.length) {
          const resultUpdate = await putProjectModel(projectName, projectDesc, projectType, projectId)
          if (resultUpdate.affectedRows) {
            res.status(200).send({
              success: true,
              message: `Project with id ${projectId} has been update`
            })
          } else {
            res.status(404).send({
              success: false,
              message: 'Failed to update data!!'
            })
          }
        } else {
          res.status(404).send({
            success: false,
            message: 'Data project with id ' + projectId + ' not found'
          })
        }
      } else {
        res.status(400).send({
          success: false,
          message: 'All field must be filled!'
        })
      }
    } catch (error) {
      console.log(error)
      req.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  },
  patchProject: async (req, res) => {
    try {
      const { projectId } = req.params
      const {
        project_name = '',
        project_desc = '',
        project_type = ''
      } = req.body

      if (project_name.trim() || project_desc.trim() || project_type.trim()) {
        const resultSelect = await getProjectByIdModel(projectId)
        if (resultSelect.length) {
          const dataColumn = Object.entries(req.body).map(item => {
            const queryDynamic = parseInt(item[1]) > 0 ? `${item[0] = item[1]}` : `${item[0]}='${item[1]}'`
            return queryDynamic
          })

          const resultUpdate = await patchProjectModel(dataColumn, projectId)
          if (resultUpdate.affectedRows) {
            res.status(200).send({
              success: true,
              message: `Project with id ${projectId} has been updated!`
            })
          } else {
            res.status(400).send({
              success: false,
              message: 'Failed to update data project'
            })
          }
        } else {
          res.status(404).send({
            success: false,
            message: `Project with id ${projectId} not found`
          })
        }
      } else {
        res.status(400).send({
          success: false,
          message: 'Some field must be filled!'
        })
      }
    } catch (error) {
      console.log(error)
      req.status(500).send({
        success: false,
        message: 'Internal server error!'
      })
    }
  }
}

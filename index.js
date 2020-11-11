require('dotenv').config()
const express = require('express')
const db = require('./src/helpers/db')
const bodyParser = require('body-parser')
const app = express()
const projectRouter = require('./src/routers/project')
const port = process.env.PORT

// Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use('/project', projectRouter)

app.get('/', (_request, response) => {
  response.send('Backend by Android2!')
})

app.delete('/project/:projectId', (req, res) => {
  const { projectId } = req.params

  db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (_err, result, _fields) => {
    if (result.length) {
      db.query(`DELETE FROM project WHERE project_id = ${projectId}`, (_err, result, _fields) => {
        if (result.affectedRows) {
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
      })
    } else {
      res.status(404).send({
        success: false,
        message: 'Data project not found!'
      })
    }
  })
})

app.put('/project/:projectId', (req, res) => {
  const { projectId } = req.params
  const { projectName, projectDesc, projectType } = req.body

  if (projectName.trim() && projectDesc.trim() && projectType.trim()) {
    db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (_err, result, _fields) => {
      if (result.length) {
        db.query(`UPDATE project SET project_name = '${projectName}', project_desc = '${projectDesc}', project_type = '${projectType}' WHERE project_id = ${projectId} `, (_err, result, _fields) => {
          if (result.affectedRows) {
            res.status(200).send({
              success: true,
              message: `Project with id ${projectId} has been update`
            })
          } else {
            res.status(400).send({
              success: false,
              message: 'Failed to update data!'
            })
          }
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Project with id ${projectId} not found`
        })
      }
    })
  } else {
    res.status(400).send({
      success: false,
      message: 'All field must be filled!'
    })
  }
})

app.patch('/project/:projectId', (req, res) => {
  const { projectId } = req.params
  const {
    project_name = '',
    project_desc = '',
    project_type = ''
  } = req.body

  if (project_name.trim() || project_desc.trim() || project_type.trim()) {
    db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (_err, result, _fields) => {
      if (result.length) {
        const dataColumn = Object.entries(req.body).map(item => {
          const queryDynamic = parseInt(item[1]) > 0 ? `${item[0] = item[1]}` : `${item[0]}='${item[1]}'`
          return queryDynamic
        })

        db.query(`UPDATE project SET ${dataColumn} WHERE project_id = ${projectId}`, (_err, result, _fields) => {
          if (result.affectedRows) {
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
        })
      } else {
        res.status(404).send({
          success: false,
          message: `Project with id ${projectId} not found`
        })
      }
    })
  } else {
    res.status(400).send({
      success: false,
      message: 'Some field must be filled!'
    })
  }
})

app.listen(port, () => {
  console.log(`Listen app backend on port ${port}`)
})

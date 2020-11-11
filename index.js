require('dotenv').config()
const bodyParser = require('body-parser')
const db = require('./src/helpers/db')
const express = require('express')
const app = express()
const port = process.env.PORT

app.use(bodyParser.urlencoded({ extended: false }))

app.get('/', (_req, res) => {
  res.send('Backend-android')
})

app.get('/project', (_req, res) => {
  db.query('SELECT * FROM project', (err, result, _fields) => {
    if (!err) {
      if (result.length) {
        res.status(200).send({
          succes: true,
          message: 'Project List',
          data: result
        })
      } else {
        res.status(400).send({
          succes: true,
          message: 'Project list not found'
        })
      }
    } else {
      res.status(500).send({
        succes: false,
        message: 'internal server errror'
      })
    }
  })
})

app.post('/project', (req, res) => {
  const { projectName, projectDesc, projectType } = req.body
  db.query(` INSERT INTO project (project_name, project_desc, project_type)
        VALUES('${projectName}', '${projectDesc}', '${projectType}')`, (err, result, _fields) => {
    if (!err) {
      if (result.affectedRows) {
        res.status(200).send({
          succes: true,
          message: 'sukses menambahkan project'
        })
      } else {
        res.status(400).send({
          succes: false,
          message: 'submit project failed'
        })
      }
    } else {
      res.status(500).send({
        succes: false,
        message: 'internal server error'
      })
    }
  })
})

app.delete('/project/:projectId', (req, res) => {
  const { projectId } = req.params
  db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (_err, result, fields) => {
    if (result.length) {
      db.query(`DELETE FROM project WHERE project_id = ${projectId}`, (_err, result, fields) => {
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

app.put('/project/:project:projectId', (req, res) => {
  const { projectId } = req.params
  const { projectName, projectDesc, projectType } = req.body

  if (projectName.trim() && projectDesc.trim() && projectType.trim()) {
    db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (_err, result, fields) => {
      if (result.length) {
        db.query(`UPDATE project SET project_name = '${projectName}', '${projectDesc}', '${projectType}' WHERE project_id = ${projectId} `, (_err, result, fields) => {
          if (result.affectedRows) {
            res.status(200).send({
              succes: true,
              message: `project with id ${projectId} berhasil Update`
            })
          } else {
            res.status(400).send({
              succes: false,
              message: 'kesalahan dalam update data'
            })
          }
        })
      } else {
        res.status(404).send({
          succes: false,
          message: 'Data tidak ditemukan'
        })
      }
    })
  } else {
    res.status(500).send({
      succes: false,
      message: 'semua field harus terisi'
    })
  }
})

app.patch('/project/:projectId', (req, res) => {
  const { projectId } = req.params
  const {
    projectName = '',
    projectDesc = '',
    projectType = ''
  } = req.body

  if (projectName.trim() || projectDesc.trim() || projectType.trim()) {
    db.query('SELECT * FROM project WHERE project_id = ${projecId}', (_err, result, _fields) => {
      if (result.length) {
        const dataColumn = Object.entries(req.body).map(item => {
          return parseInt(item[1]) > 0 ? `${item[0] = item[1]}` : `${item[0]} = '${item[1]}'`
        })
        db.query(` UPDATE project SET ${dataColumn} WHERE project_id = ${projectId}`, (_err, result, fields) => {
          if (result.affectedRows) {
            res.status(200).send({
              succes: true,
              message: `data dengan ${projectId} telah di update`
            })
          } else {
            res.status(400).send({
              succes: false,
              message: 'failed to update data'
            })
          }
        })
      } else {
        res.status(404).send({
          succes: false,
          message: 'data not found'
        })
      }
    })
  } else {
    res.status(400).send({
      succes: false,
      message: 'Semua field harus Terisi'
    })
  }
})

app.get('/project/:projectId', (req, res) => {
  const { projectId } = req.params

  db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (err, result, fields) => {
    if (!err) {
      if (result.length) {
        res.status(200).send({
          succes: true,
          message: `project dengan id ${projectId}`,
          data: result[0]
        })
      } else {
        res.status(404).send({
          succes: false,
          message: 'data project with id' + projectId + 'not found'
        })
      }
    } else {
      res.status(500).send({
        succes: false,
        message: 'Internal Server Eror'
      })
    }
  })
})

app.listen(port, () => {
  console.log(`Server Berjalan Pada Port ${port}`)
})

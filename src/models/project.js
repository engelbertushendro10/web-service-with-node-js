const db = require('../helpers/db')

module.exports = {
  getAllProjectModel: (searchKey, searchValue, limit, offset, callback) => {
    db.query(`SELECT * FROM project WHERE ${searchKey} LIKE '%${searchValue}%' LIMIT ${limit} OFFSET ${offset}`, (err, result, _fields) => {
      if (!err) {
        callback(result)
      } else {
        callback(err)
      }
    })
  },
  getProjectByIdModel: (projectId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  createProjectModel: (projectName, projectDesc, projectType) => {
    return new Promise((resolve, reject) => {
      const query = `INSERT INTO project (project_name, project_desc, project_type) VALUES 
        ('${projectName}', '${projectDesc}', '${projectType}')`
      db.query(query, (err, result, _fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },
  putProjectByIdModel: function (projectId, req) {
    return new Promise((resolve, reject) => {
      const { projectId } = req.params
      const { projectName, projectDesc, projectType } = req.body
      const query = `SELECT * FROM project WHERE project_id = ${projectId}`
      const queryPut = `UPDATE project SET project_name = '${projectName}', '${projectDesc}', '${projectType}'`

      if (projectName.trim() && projectDesc.trim() && projectType.trim()) {
        db.query(query, (err, result, fields) => {
          if (result.length) {
            db.queryPut(queryPut, (_err, result, fields) => {
              if (!err) {
                resolve(result)
              } else {
                reject(new Error(err))
              }
            })
          }
        })
      }
    })
  }
}

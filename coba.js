// putProjectByIdModel: (projectId) => {
//   return new Promise((resolve, reject) => {
//     const { projectId } = req.params
//     const { projectName, projectDesc, projectType } = req.body
//     if (projectName.trim() && projectDesc.trim() && projectType.trim()) {
//       db.query(`SELECT * FROM project WHERE project_id = ${projectId}`, (_err, result, fields) => {
//         if (result.length) {
//           db.query(`UPDATE project SET project_name = '${projectName}', '${projectDesc}', '${projectType}' WHERE project_id = ${projectId} `, (_err, result, fields) => {
//             if (!err) {
//               resolve(result)
//             } else {
//               reject(new Error(err))
//             }
//           })
//         }
//       })
//     }
//   })
// }

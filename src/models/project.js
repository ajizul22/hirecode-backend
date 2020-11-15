const db = require('../helpers/db')

module.exports = {

  createProjectModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
            INSERT
            INTO project
            SET ?
        `

      db.query(query, data, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getProjectModel: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM project', (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getProjectByIdModel: (pjId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM project WHERE pj_id = ${pjId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteProjectModel: (pjId) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM project WHERE pj_id = ${pjId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateProjectModel: (data, pjId) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE project 
        SET ?
        WHERE pj_id = ${pjId}
      `

      db.query(query, data, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getProjectByCnIdModel: (cnId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM project WHERE cn_id = ${cnId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

}

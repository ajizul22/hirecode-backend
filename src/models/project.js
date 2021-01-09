const db = require('../helpers/db')

module.exports = {

  createProjectModel: (setData) => {
    return new Promise((resolve, reject) => {
      const query = `
            INSERT
            INTO project
            SET ?
        `

      db.query(query, setData, (err, result, fields) => {
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
      db.query('SELECT * FROM project pj JOIN company cn ON (pj.cn_id = cn.cn_id)', (err, result, fields) => {
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
      db.query(`SELECT * FROM project pj JOIN company cn ON (pj.cn_id = cn.cn_id) WHERE pj.pj_id = ${pjId}`, (err, result, fields) => {
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

  updateProjectModel: (setData, pjId) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE project 
        SET ?
        WHERE pj_id = ${pjId}
      `

      db.query(query, setData, (err, result, fields) => {
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

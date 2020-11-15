const db = require('../helpers/db')

module.exports = {

  getHireModel: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM hire', (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  createHireModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO hire
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

  getHireByIdModel: (hrId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM hire WHERE hr_id = ${hrId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateHireStatusModel: (hrId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE hire
      SET ?
      WHERE hr_id = ${hrId}
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

  getHireByProjectIdModel: (pjId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM hire WHERE pj_id = ${pjId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getHireByEnIdModel: (enId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM hire WHERE en_id = ${enId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

}

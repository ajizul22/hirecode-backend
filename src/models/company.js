const db = require('../helpers/db')

module.exports = {

  createCompanyModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
            INSERT INTO company
            SET ?
            `
      db.query(query, data, (err, result, Fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getCompanyModel: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM company', (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getCompanyByIdModel: (cnId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM company WHERE cn_id = ${cnId}`, (err, result, fields) => {
        if(!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateCompanyModel: (cnId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE company
        SET ?
        WHERE cn_id = ${cnId}
      `

      db.query(query, data, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

}

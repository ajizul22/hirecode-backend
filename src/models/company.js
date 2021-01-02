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
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateCompanyModel: (cnId, setData) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE company
        SET ?
        WHERE cn_id = ${cnId}
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

  getCompanyIdByAcIdModel: (acId) => {
    return new Promise((resolve, reject) => {
      const query = `
      SELECT 
      ac.ac_id,
      cn.cn_id,
      ac.ac_name,
      ac.ac_email
      FROM account ac 
      JOIN company cn 
      ON ac.ac_id = cn.ac_id 
      WHERE ac.ac_id = ${acId}`

      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

}

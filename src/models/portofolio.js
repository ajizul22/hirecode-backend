const db = require('../helpers/db')

module.exports = {

  getPortModel: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM portofolio', (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  createPortModel: (setData) => {
    return new Promise((resolve, reject) => {
      const query = `
      INSERT INTO portofolio
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

  getPortByIdModel: (portId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM portofolio WHERE pr_id = ${portId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deletePortModel: (portId) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM portofolio WHERE pr_id = ${portId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updatePortModel: (portId, setData) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE portofolio
        SET ?
        WHERE pr_id = ${portId}
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

  getPortByIdEnModel: (enId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM portofolio WHERE en_id = ${enId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

}

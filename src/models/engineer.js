const db = require('../helpers/db')

module.exports = {

  // getAllEngModel: (searchKey, SearchValue, limit, offset) => {
  //   return new Promise((resolve, reject) => {
  //     const query = `
  //       SELECT * FROM engineer
  //       WHERE ${searchKey} LIKE '%${SearchValue}%' LIMIT ${limit} OFFSET ${offset}
  //     `

  //     db.query(query, (err, result, fields) => {
  //       if (!err) {
  //         resolve(result)
  //       } else {
  //         reject(new Error(err))
  //       }
  //     })
  //   })
  // },

  getAllEngModel: (searchKey, searchValue) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM engineer WHERE ${searchKey} LIKE '%${searchValue}%'`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  createEngModel: (acId) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO engineer
        SET ?
      `

      db.query(query, { ac_id: acId }, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getEngByIdModel: (enId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM engineer WHERE en_id = ${enId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateEngModel: (enId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE engineer
      SET ?
      WHERE en_id = ${enId}
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

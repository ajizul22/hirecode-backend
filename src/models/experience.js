const db = require('../helpers/db')

module.exports = {

  createExModel: (enId, exPosisi, exPerusahaan, exStart, exEnd, exDesc) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO experience (en_id, ex_posisi, ex_perusahaan, ex_start, ex_end, ex_deskripsi)
            values (${enId}, '${exPosisi}', '${exPerusahaan}', ${exStart}, ${exEnd}, '${exDesc}')`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getAllExModel: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM experience', (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getExByIdModel: (exId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM experience WHERE ex_id = ${exId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteExModel: (exId) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM experience WHERE ex_id = ${exId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateExModel: (enId, exPosisi, exPerusahaan, exStart, exEnd, exDesc, exId) => {
    return new Promise((resolve, reject) => {
      db.query(`UPDATE experience SET en_id = ${enId}, ex_posisi = '${exPosisi}', ex_perusahaan = '${exPerusahaan}', ex_start = ${exStart}, 
      ex_end = ${exEnd}, ex_deskripsi = '${exDesc}' WHERE ex_id = ${exId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getExByEnIdModel: (enId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM experience WHERE en_id = ${enId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

}

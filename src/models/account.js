const db = require('../helpers/db')
const { createCompanyModel } = require('../models/company')
const { createEngModel } = require('../models/engineer')

module.exports = {

  getAllAcModel: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM account', (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // createAcModel: (data) => {
  //   return new Promise((resolve, reject) => {
  //     const query = `
  //       INSERT INTO account
  //       SET ?
  //     `
  //     const dataAcc = {
  //       ac_name: data.ac_name,
  //       ac_email: data.ac_email,
  //       ac_phone: data.ac_phone,
  //       ac_password: data.ac_password,
  //       ac_level: data.ac_level
  //     }

  //     db.query(query, dataAcc, async (err, result, fields) => {
  //       if (!err) {
  //         if (parseInt(data.ac_level) === 0) {
  //           await createEngModel(result.insertId)
  //         } else {
  //           await createCompanyModel({
  //             ac_id: result.insertId,
  //             cn_perusahaan: data.cn_perusahaan,
  //             cn_jabatan: data.cn_jabatan
  //           })
  //         }
  //         resolve(result)
  //       } else {
  //         reject(new Error(err))
  //       }
  //     })
  //   })
  // },

  getAcByIdModel: (acId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM account WHERE ac_id = ${acId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateAcModel: (data, acId) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE account
        SET ?
        WHERE ac_id = ${acId}
      `
      db.query(query, data, (err, result, reject) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  createAcModel: (data) => {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO account
        SET ?
      `
      const dataAcc = {
        ac_name: data.ac_name,
        ac_email: data.ac_email,
        ac_phone: data.ac_phone,
        ac_password: data.ac_password,
        ac_level: data.ac_level
      }

      db.query(query, dataAcc, async (err, result) => {
        if (!err) {
          const newResult = {
            id: result.insertId,
            ...data
          }
          if (parseInt(data.ac_level) === 0) {
            await createEngModel(result.insertId)
          } else {
            await createCompanyModel({
              ac_id: result.insertId,
              cn_perusahaan: data.cn_perusahaan,
              cn_jabatan: data.cn_jabatan
            })
          }
          delete newResult.ac_password
          delete newResult.cn_perusahaan
          delete newResult.cn_jabatan
          resolve(newResult)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  checkAcModel: (email) => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM account WHERE ac_email = ?', email, (err, result) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

}

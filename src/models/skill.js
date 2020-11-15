const db = require('../helpers/db')

module.exports = {
  getAllSkillModel: () => {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM skill', (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  createSkillModul: (enId, skNamaSkill) => {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO skill (en_id, sk_nama_skill) values (${enId}, '${skNamaSkill}')`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  deleteSkillModul: (skId) => {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM skill WHERE sk_id = ${skId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getSkillByIdModul: (skId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM skill WHERE sk_id = ${skId} `, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateSkillModel: (skId, data) => {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE skill
        SET ?
        WHERE sk_id = ${skId}
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

  getSkillByIdEnModel: (enId) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM skill WHERE en_id = ${enId}`, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }

}

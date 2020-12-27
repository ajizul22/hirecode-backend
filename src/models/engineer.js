const db = require('../helpers/db')
const { getSkillByIdEnModel } = require('../models/skill')

module.exports = {

  getAllEngModel: (limit, offset) => {
    return new Promise((resolve, reject) => {
      const query = `
       SELECT en.en_id,
       ac.ac_id,
       ac.ac_name,
       en.en_job_title,
       en.en_job_type,
       en.en_domisili
       FROM engineer en
       JOIN account ac
       ON (ac.ac_id = en.ac_id)
       LIMIT ${limit}
       OFFSET ${offset}
      `

      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  getSearchEngModel: (SearchValue, limit, offset, filter) => {
    return new Promise((resolve, reject) => {
      let query

      if (parseInt(filter) === 0) {
        query = `
        SELECT en.en_id,
        ac.ac_id,
        ac.ac_name,
        en.en_job_title,
        en.en_job_type,
        en.en_domisili,
        en.en_ft_profil,
        sk.sk_nama_skill
        FROM engineer en
        JOIN account ac
        ON (ac.ac_id = en.ac_id)
        LEFT JOIN skill sk
        ON (sk.en_id = en.en_id)
        WHERE ac.ac_name
        LIKE '%${SearchValue}%'
        OR sk.sk_nama_skill
        LIKE '%${SearchValue}%'
        GROUP BY ac.ac_id
        ORDER BY ac.ac_name ASC
        LIMIT ${limit}
        OFFSET ${offset}
      `
      } else if (parseInt(filter) === 1) {
        query = `
        SELECT en.en_id,
        ac.ac_id,
        ac.ac_name,
        en.en_job_title,
        en.en_job_type,
        en.en_domisili,
        en.en_ft_profil,
        sk.sk_nama_skill
        FROM engineer en
        JOIN account ac
        ON (ac.ac_id = en.ac_id)
        LEFT JOIN skill sk
        ON (sk.en_id = en.en_id)
        WHERE ac.ac_name
        LIKE '%${SearchValue}%'
        OR sk.sk_nama_skill
        LIKE '%${SearchValue}%'
        GROUP BY ac.ac_id
        ORDER BY sk.sk_nama_skill ASC
        LIMIT ${limit}
        OFFSET ${offset}
      `
      } else if (parseInt(filter) === 2) {
        query = `
        SELECT en.en_id,
        ac.ac_id,
        ac.ac_name,
        en.en_job_title,
        en.en_job_type,
        en.en_domisili,
        en.en_ft_profil,
        sk.sk_nama_skill
        FROM engineer en
        JOIN account ac
        ON (ac.ac_id = en.ac_id)
        LEFT JOIN skill sk
        ON (sk.en_id = en.en_id)
        WHERE ac.ac_name
        LIKE '%${SearchValue}%'
        OR sk.sk_nama_skill
        LIKE '%${SearchValue}%'
        GROUP BY ac.ac_id
        ORDER BY en.en_domisili
        LIMIT ${limit}
        OFFSET ${offset}
      `
      } else if (parseInt(filter) === 3) {
        query = `
        SELECT en.en_id,
        ac.ac_id,
        ac.ac_name,
        en.en_job_title,
        en.en_job_type,
        en.en_domisili,
        en.en_ft_profil,
        sk.sk_nama_skill
        FROM engineer en
        JOIN account ac
        ON (ac.ac_id = en.ac_id)
        LEFT JOIN skill sk
        ON (sk.en_id = en.en_id)
        WHERE ac.ac_name
        LIKE '%${SearchValue}%'
        OR sk.sk_nama_skill
        LIKE '%${SearchValue}%'
        GROUP BY ac.ac_id
        ORDER BY en.en_job_type ASC
        LIMIT ${limit}
        OFFSET ${offset}
      `
      } else {
        query = `
        SELECT en.en_id,
        ac.ac_id,
        ac.ac_name,
        en.en_job_title,
        en.en_job_type,
        en.en_domisili,
        en.en_ft_profil,
        sk.sk_nama_skill
        FROM engineer en
        JOIN account ac
        ON (ac.ac_id = en.ac_id)
        LEFT JOIN skill sk
        ON (sk.en_id = en.en_id)
        WHERE ac.ac_name
        LIKE '%${SearchValue}%'
        OR sk.sk_nama_skill
        LIKE '%${SearchValue}%'
        GROUP BY ac.ac_id
        ORDER BY en.en_id ASC
        LIMIT ${limit}
        OFFSET ${offset}
      `
      }
      db.query(query, async (err, result, fields) => {
        if (!err) {
          const data = []

          for (let i = 0; i < result.length; i++) {
            const item = result[i]

            const skill = await getSkillByIdEnModel(item.en_id)
            data[i] = {
              en_id: item.en_id,
              ac_id: item.ac_id,
              ac_name: item.ac_name,
              en_job_title: item.en_job_title,
              en_job_type: item.en_job_type,
              en_domisili: item.en_domisili,
              en_ft_profil: item.en_ft_profil,
              en_skill: skill
            }
          }

          resolve(data)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  // getSearchEngModel: (SearchValue, limit, offset) => {
  //   return new Promise((resolve, reject) => {
  //     const query = `
  //       SELECT en.en_id,
  //       ac.ac_id,
  //       ac.ac_name,
  //       en.en_job_title,
  //       en.en_job_type,
  //       en.en_domisili
  //       FROM engineer en
  //       JOIN account ac
  //       ON (ac.ac_id = en.ac_id)
  //       JOIN skill sk
  //       ON (sk.en_id = en.en_id)
  //       WHERE ac.ac_name
  //       LIKE '%${SearchValue}%'
  //       OR sk.sk_nama_skill
  //       LIKE '%${SearchValue}%'
  //       GROUP BY ac.ac_id
  //       LIMIT ${limit}
  //       OFFSET ${offset}
  //     `
  //     db.query(query, async (err, result, fields) => {
  //       if (!err) {
  //         const data = []

  //         for (let i = 0; i < result.length; i++) {
  //           const item = result[i]

  //           const skill = await getSkillByIdEnModel(item.en_id)
  //           data[i] = {
  //             en_id: item.en_id,
  //             ac_id: item.ac_id,
  //             ac_name: item.ac_name,
  //             en_job_title: item.en_job_title,
  //             en_job_type: item.en_job_type,
  //             en_domicile: item.en_domicile,
  //             en_profile: item.en_profile,
  //             en_skill: skill
  //           }
  //         }

  //         resolve(result)
  //       } else {
  //         reject(new Error(err))
  //       }
  //     })
  //   })
  // },

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
      const query = `
       SELECT en.en_id,
       ac.ac_id,
       ac.ac_name,
       en.en_job_title,
       en.en_job_type,
       en.en_domisili,
       en.en_deskripsi,
       en.en_ft_profil,
       en.en_created_at,
       en.en_update_at
       FROM engineer en
       JOIN account ac
       ON (ac.ac_id = en.ac_id)
       WHERE en_id = ${enId}
       `
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  },

  updateEngModel: (enId, setData) => {
    return new Promise((resolve, reject) => {
      const query = `
      UPDATE engineer
      SET ?
      WHERE en_id = ${enId}
      `
      db.query(query, setData, (err, result, fields) => {
        if (!err) {
          resolve(result)
        } else {
          reject(new Error(err))
        }
      })
    })
  }
}

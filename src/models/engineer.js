const db = require('../helpers/db')

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
      db.query(query, (err, result, fields) => {
        if (!err) {
          resolve(result)
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
  //     db.query(query, (err, result, fields) => {
  //       if (!err) {
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
       en.en_domisili
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

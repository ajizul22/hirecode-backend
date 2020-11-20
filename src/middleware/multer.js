const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, './uploads/')
  },
  filename: (req, file, callback) => {
    const extension = file.originalname.split('.').pop()
    const fileName = file.fieldname + '-' + Date.now() + '.' + extension
    callback(null, fileName)
  }
})

const fileFilter = (req, file, callback) => {
  if ((file.mimetype === 'image/jpeg') || (file.mimetype === 'image/png')) {
    callback(null, true)
  } else {
    return callback(new Error('extension file must be JPG or PNG'), false)
  }
}

const limits = { fileSize: 1024 * 1024 * 1 }

const upload = multer({ storage, fileFilter, limits }).single('image')

const uploadFilter = (request, response, next) => {
  upload(request, response, function (err) {
    if (err instanceof multer.MulterError) {
      response.status(400).send({
        success: false,
        message: err.message
      })
    } else if (err) {
      response.status(400).send({
        success: false,
        message: err.message
      })
    }
    next()
  })
}

module.exports = uploadFilter

const fs = require('fs')
const multer = require('multer')
const path = require('path')
const { UPLOAD_DIRS, ensureDirectories } = require('../config/uploadConfig')

ensureDirectories()
  .then(() => {
    console.log('Upload directories are ensured.')
  })
  .catch((err) => {
    console.error('Error creating upload directories:', err)
  })

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(UPLOAD_DIRS.TEMP)) {
      fs.mkdirSync(UPLOAD_DIRS.TEMP, { recursive: true })
    }
    cb(null, UPLOAD_DIRS.TEMP)
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`
    const filename = `${uniqueSuffix}-${file.originalname}`
    cb(null, filename)
  }
})

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png/
  const extname = allowedTypes.test(path.extname(file.originalname)?.toLowerCase())
  const mimetype = allowedTypes.test(file.mimetype)

  if (extname && mimetype) {
    return cb(null, true)
  }
  cb(new Error('Chỉ cho phép tải lên file ảnh (jpeg, jpg, png)'))
}

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 2 * 1024 * 1024 // 2MB
  },
  fileFilter: fileFilter
})

module.exports = upload

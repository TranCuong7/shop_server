const multer = require('multer')
const path = require('path')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const { storage } = require('../utils/Storage')

class Multer {
  constructor({ storageOption, fileSize }) {
    this.storageOption = storageOption
    this.defaultExtensions = this.defaultExtensions()
    this.fileSize = fileSize || 2 * 1024 * 1024
  }

  defaultExtensions() {
    return [
      '.png',
      '.gif',
      '.bmp',
      '.svg',
      '.wav',
      '.mp4',
      '.mov',
      '.avi',
      '.wmv',
      '.mp3',
      '.m4a',
      '.jpg',
      '.jpeg',
      '.mpga',
      '.webp',
      '.wma',
      '.doc',
      '.docx',
      '.pdf',
      '.tiff',
      '.ico',
      '.flac',
      '.ogg',
      '.flv',
      '.mkv',
      '.webm',
      '.xls',
      '.xlsx',
      '.ppt',
      '.pptx',
      '.txt',
      '.rtf',
      '.zip',
      '.rar',
      '.7z',
      '.csv',
      '.json',
      '.xml'
    ]
  }

  diskStorageConfig() {
    return {
      destination: (req, file, cb) => {
        const folderPath = storage.storagePath('tmp')
        if (!fs.existsSync(folderPath)) {
          fs.mkdirSync(folderPath, { recursive: true })
        }
        cb(null, folderPath)
      },
      filename: (req, file, cb) => {
        const fileExt = path.extname(file.originalname)
        const uniqueFilename = `${uuidv4()}${fileExt}`
        cb(null, uniqueFilename)
      }
    }
  }

  fileFilter(allowedExtensions) {
    return (req, file, cb) => {
      const fileExt = path.extname(file.originalname).toLowerCase()
      if (!allowedExtensions.includes(fileExt)) {
        return cb(new multer.MulterError('INVALID_EXTENSION'), false)
      }
      cb(null, true)
    }
  }

  multerConfig(allowedExtensions) {
    const storageOptions = {
      memory: multer.memoryStorage(this.storageOption),
      disk: multer.diskStorage(this.diskStorageConfig())
    }
    return {
      storage: storageOptions[this.storageOption],
      fileFilter: this.fileFilter(allowedExtensions),
      limits: {
        fileSize: this.fileSize
      }
    }
  }

  single(filename, allowedExtensions = this.defaultExtensions) {
    return multer(this.multerConfig(allowedExtensions)).single(filename)
  }

  array(filename, maxCount, allowedExtensions = this.defaultExtensions) {
    return multer(this.multerConfig(allowedExtensions)).array(filename, maxCount)
  }

  fields(fields) {
    const configFields = fields.map((field) => ({
      name: field.name,
      maxCount: field.maxCount || 1
    }))
    return multer(this.multerConfig(fields.map((f) => f.extensions || this.defaultExtensions))).fields(configFields)
  }

  any(allowedExtensions = this.defaultExtensions) {
    return multer(this.multerConfig(allowedExtensions)).any()
  }
}

const storageOption = {
  storageOption: process.env.STORAGE_OPTION || 'disk',
  fileSize: 2 * 1024 * 1024
}
const upload = new Multer(storageOption)
module.exports = { upload }

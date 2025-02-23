const sharp = require('sharp')
const path = require('path')
const fs = require('fs').promises
const { UPLOAD_DIRS } = require('../config/uploadConfig')

// Middleware đơn giản xử lý ảnh
const processImage = async (req, res, next) => {
  if (!req.files || !req.files.length) {
    return next()
  }

  try {
    const processedFiles = []

    for (const file of req.files) {
      const filename = `${Date.now()}-${path.basename(file.originalname)}`
      const processedPath = path.join(UPLOAD_DIRS.PROCESSED, filename)

      await sharp(file.path)
        .resize(800, 600, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({
          quality: 80,
          mozjpeg: true
        })
        .toFile(processedPath)

      // Xóa file gốc sau xử lý
      await fs.unlink(file.path)

      const relativePath = path.relative('uploads', processedPath)

      processedFiles.push({
        originalName: file.originalname,
        filename,
        path: processedPath,
        relativePath,
        mimetype: 'image/jpeg'
      })
    }

    req.processedFiles = processedFiles

    next()
  } catch (error) {
    next(error)
  }
}

// Middleware linh hoạt xử lý ảnh với cấu hình
const processImageWithConfig = (config) => {
  return async (req, res, next) => {
    if (!req.files || !req.files.length) {
      return next()
    }

    // Validate config
    if (!config || !config.uploadDir) {
      return next(new Error('Invalid configuration: uploadDir is required.'))
    }

    try {
      await fs.mkdir(config.uploadDir, { recursive: true })

      const processedFiles = []

      for (const file of req.files) {
        const prefix = config.prefix || ''
        const filename = `${prefix}-${Date.now()}-${path.basename(file.originalname)}`
        const processedPath = path.join(config.uploadDir, filename)

        let sharpInstance = sharp(file.path)

        if (config.resize) {
          sharpInstance = sharpInstance.resize(config.resize.width, config.resize.height, config.resize.options)
        }

        if (config.format === 'jpeg') {
          sharpInstance = sharpInstance.jpeg(config.formatOptions)
        } else if (config.format === 'webp') {
          sharpInstance = sharpInstance.webp(config.formatOptions)
        }

        await sharpInstance.toFile(processedPath)

        const relativePath = path.relative('uploads', processedPath)

        processedFiles.push({
          originalName: file.originalname,
          filename,
          path: processedPath,
          relativePath,
          mimetype: `image/${config.format || 'jpeg'}`
        })

        // Xóa file gốc sau khi xử lý
        await fs.unlink(file.path)
      }

      req.processedFiles = processedFiles

      next()
    } catch (error) {
      console.error('Error occurred during image processing:', error)
      next(error)
    }
  }
}

module.exports = {
  processImage,
  processImageWithConfig
}

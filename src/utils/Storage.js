const path = require('path')
const sharp = require('sharp')
const fs = require('fs')
const { v4: uuidv4 } = require('uuid')
const SystemException = require('../exceptions/SystemException')
const { STATUS_CODE } = require('../constants')

class Storage {
  constructor() {
    this.basePublicPath = path.join(__dirname, '../public/')
    this.baseStoragePath = path.join(__dirname, '../storage/')
  }

  publicPath(relativePath = '') {
    return path.join(this.basePublicPath, relativePath)
  }

  storagePath(relativePath = '') {
    return path.join(this.baseStoragePath, relativePath)
  }

  async ensureDirectoryExistence(dirPath) {
    try {
      await fs.promises.mkdir(dirPath, { recursive: true })
    } catch (error) {
      console.error(`Error creating directory ${dirPath}`, err)
    }
  }

  async optimize(filePath, outputPath, options) {
    try {
      await fs.promises.access(filePath)
    } catch {
      throw new SystemException(STATUS_CODE.NOT_FOUND, ('Input file not found: {{ filePath }}', { filePath }))
    }

    const fileName = uuidv4()
    const format = (options.format || 'png').toLowerCase()
    const fileNameOutput = `${fileName}.${format}`
    const fileOutput = path.join(outputPath, fileNameOutput)

    await this.ensureDirectoryExistence(outputPath)
    try {
      let image = sharp(filePath)
      if (options.width || options.height) {
        image = image.resize(options.width, options.height)
      }

      await image.toFormat(format, { quality: options.quality }).toFile(fileOutput)

      const size = (await fs.promises.stat(fileOutput)).size

      return { fileOutput, fileNameOutput, size }
    } catch (error) {
      throw new SystemException(STATUS_CODE.INTERNAL_SERVER_ERROR, error.message)
    }
  }
  async storeAs(fileInput, outputPath, fileName) {
    try {
      this.ensureDirectoryExistence(path.join(outputPath, fileName))
      const filePath = path.join(outputPath, fileName)
      const content = fs.readFileSync(fileInput)
      fs.writeFileSync(filePath, content)
      return { outputPath, fileName }
    } catch (error) {
      throw new SystemException(STATUS_CODE.INTERNAL_SERVER_ERROR, error.message)
    }
  }

  async unlink(filePath, type = 'storage') {
    const basePath = type === 'public' ? this.basePublicPath : this.baseStoragePath
    const fullPath = path.join(basePath, filePath)
    try {
      await fs.promises.unlink(fullPath)
    } catch (error) {
      throw new SystemException(STATUS_CODE.INTERNAL_SERVER_ERROR, error.message)
    }
  }
}

const storage = new Storage()
module.exports = { storage }

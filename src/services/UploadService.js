const db = require('../models')
const { storage } = require('../utils/Storage')
const path = require('path')
const fs = require('fs')
const ServiceException = require('../exceptions/ServiceException')

class ImageService {
  async uploadImage(file, imageableId = null, imageableType = 'product', imageType = 'thumbnail') {
    if (!file) {
      throw new ServiceException('Bạn chưa đính kèm')
    }

    const uploadDir = imageableType.toLowerCase() + 's'

    const optimized = await storage.optimize(file?.path, storage.publicPath(uploadDir), {
      quality: 80
    })

    const imageUrl = path.join('/', uploadDir, optimized.fileNameOutput)

    await db.Image.create({
      url: imageUrl,
      imageableId,
      imageableType,
      imageType
    })

    return imageUrl
  }

  async uploadVideo(videoUrl, imageableId, imageableType = 'post', imageType = 'video') {
    const media = await db.Image.create({
      type: 'video',
      url: videoUrl,
      imageableId,
      imageableType,
      imageType
    })

    return media.url
  }

  async showImage({ page = 1, limit = 9999 }) {
    const offset = (page - 1) * limit
    const { count, rows: images } = await db.Image.findAndCountAll({
      attributes: ['id', 'url'],
      limit: limit,
      offset: offset
    })

    const filteredImages = images.filter((image) => !image.url.startsWith('processed'))

    return {
      totalItem: filteredImages.length,
      images: filteredImages,
      totalPages: Math.ceil(filteredImages.length / limit),
      currentPage: page
    }
  }

  async updateImage(file, imageableId = null, imageableType = 'product', imageType = 'thumbnail', id) {
    if (!file) {
      throw new ServiceException('Bạn chưa đính kèm')
    }

    const uploadDir = imageableType.toLowerCase() + 's'

    const optimize = await storage.optimize(file.path, storage.publicPath(uploadDir), {
      quality: 80
    })
    const imageUrl = path.join('/', uploadDir, optimize.fileNameOutput)

    const imageId = await db.Image.findByPk(id)
    const oldUrl = imageId.url

    const appRoot = path.resolve('./')
    const imgUrl = oldUrl.trim().startsWith('src/public/') ? oldUrl.trim() : `src/public/${oldUrl.trim()}`
    const imgPath = path.join(appRoot, imgUrl)

    if (!oldUrl) {
      throw new Error('Không tồn tại ảnh trong db')
    } else {
      try {
        if (fs.existsSync(imgPath)) {
          fs.unlinkSync(imgPath)
        } else {
          throw new Error('Không tồn tại ảnh trong server')
        }
      } catch (error) {
        throw new Error('Lỗi server không thể xóa ảnh')
      }
    }
    await imageId.update({
      url: imageUrl,
      imageableId,
      imageableType,
      imageType
    })

    return imageUrl
  }

  async deleteImage(imageId) {
    const image = await db.Image.findByPk(imageId)
    await storage.unlink(image.url, 'public')
    await image.destroy()
  }
}

const imageService = new ImageService()
module.exports = { imageService }

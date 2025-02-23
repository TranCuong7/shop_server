const { imageService } = require('../services/UploadService')
const { message } = require('../constants/message')
const { STATUS_CODE } = require('../constants')
const ServiceException = require('../exceptions/ServiceException')

class UploadController {
  async upload(req, res, next) {
    const { imageableId, imageableType, imageType, videoUrl } = req.body
    try {
      let result

      if (!videoUrl && !req.file) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          message: 'Video URL or file is required'
        })
      }

      if (videoUrl) {
        result = await imageService.uploadVideo(videoUrl, imageableId, imageableType, imageType)
      } else {
        result = await imageService.uploadImage(req.file, imageableId, imageableType, imageType)
      }

      if (!result) {
        return res.status(STATUS_CODE.BAD_REQUEST).json({
          message: 'Upload failed'
        })
      }

      return res.status(STATUS_CODE.OK).json({
        message: message.createdSuccessfully,
        data: result
      })
    } catch (error) {
      next(error)
    }
  }

  async show(req, res, next) {
    const { page, limit } = req.query
    try {
      const result = await imageService.showImage({ page, limit })

      return res.status(STATUS_CODE.OK).json({
        message: message.getSuccessfully,
        data: result
      })
    } catch (error) {
      next(error)
    }
  }

  async update(req, res, next) {
    const { imageableId, imageableType, imageType } = req.body
    const { id } = req.params

    try {
      const result = await imageService.updateImage(req.file, imageableId, imageableType, imageType, id)

      return res.status(STATUS_CODE.OK).json({
        message: message.updatedSuccessfully,
        data: result
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    try {
      const { id } = req.params
      const result = await imageService.deleteImage(id)
      return res.status(STATUS_CODE.OK).json({
        message: message.deletedSuccessfully,
        data: result
      })
    } catch (error) {
      next(error)
    }
  }
}

const mediaController = new UploadController()
module.exports = { mediaController }

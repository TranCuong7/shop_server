const { message } = require('../constants/message')
const { STATUS_CODE } = require('../constants')
const { partnerService } = require('../services/PartnerService')
const db = require('../models')

class PartnerController {
  async createPartner(req, res, next) {
    const {
      userFullName,
      yearOfBirth,
      userEmail,
      userPhone,
      hometown,
      companyName,
      position,
      businessField,
      businessAddress,
      websiteOrHotline,
      note
    } = req.body
    const userAvatar = req.processedFiles?.[0]?.relativePath || ''
    try {
      const createUser = await partnerService.create({
        userFullName,
        yearOfBirth,
        userEmail,
        userPhone,
        userAvatar,
        hometown,
        companyName,
        position,
        businessField,
        businessAddress,
        websiteOrHotline,
        note
      })

      return res.status(STATUS_CODE.OK).json({ message: message.createdSuccessfully, data: createUser })
    } catch (error) {
      next(error)
    }
  }

  async addPartnerLogo(req, res, next) {
    const { id } = req.params
    const { companyName } = req.body

    const logoPath = req.processedFiles?.[0]?.relativePath
    try {
      if (!logoPath) {
        return res.status(400).json({
          message: 'Chưa đính kèm logo'
        })
      }

      const addLogo = await partnerService.update(id, {
        companyName: companyName,
        userAvatar: logoPath
      })

      return res.status(200).json({
        message: message.updatedSuccessfully,
        data: addLogo
      })
    } catch (error) {
      next(error)
    }
  }

  async showPartner(req, res, next) {
    const { page, limit } = req.query
    try {
      const users = await partnerService.show({ page, limit })

      return res.status(STATUS_CODE.OK).json({ message: message.createdSuccessfully, data: users })
    } catch (error) {
      next(error)
    }
  }

  async showPartnerNeedApproved(req, res, next) {
    const { page, limit } = req.query
    try {
      const users = await partnerService.showApproved({ page, limit })

      return res.status(STATUS_CODE.OK).json({ message: message.createdSuccessfully, data: users })
    } catch (error) {
      next(error)
    }
  }

  async updatePartner(req, res, next) {
    const {
      userFullName,
      yearOfBirth,
      userEmail,
      userPhone,
      hometown,
      companyName,
      position,
      businessField,
      businessAddress,
      websiteOrHotline,
      note
    } = req.body

    const { id } = req.params
    const logoPath = req.processedFiles?.[0]?.relativePath

    try {
      const result = await partnerService.updatePartner(id, {
        userFullName,
        yearOfBirth,
        userEmail,
        userPhone,
        userAvatar: logoPath,
        hometown,
        companyName,
        position,
        businessField,
        businessAddress,
        websiteOrHotline,
        note
      })

      return res.status(STATUS_CODE.OK).json({
        message: message.updatedSuccessfully,
        data: result
      })
    } catch (error) {
      next(error)
    }
  }

  async delete(req, res, next) {
    const { id } = req.params
    const result = await partnerService.delete(id)

    return res.status(STATUS_CODE.OK).json({ message: message.deletedSuccessfully, data: result })
  }
  catch(error) {
    next(error)
  }
}

const partnerController = new PartnerController()
module.exports = { partnerController }

const ServiceException = require('../exceptions/ServiceException')
const db = require('../models')
const path = require('path')
const fs = require('fs')

class PartnerService {
  async deleteOldAvatar(oldAvatar) {
    if (!oldAvatar) return

    const appRoot = path.resolve('./')
    const imgUrl = oldAvatar.trim().startsWith('uploads/') ? oldAvatar.trim() : `uploads/${oldAvatar.trim()}`
    const imgPath = path.join(appRoot, imgUrl)

    try {
      if (fs.existsSync(imgPath)) {
        fs.unlinkSync(imgPath)
      } else {
        console.warn(`Old avatar file not found: ${imgPath}`)
      }
    } catch (error) {
      console.error(`Error deleting old avatar ${imgPath}:`, error)
    }
  }

  async create({
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
  }) {
    const company = await db.Company.create({
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
    return company
  }

  async update(id, { companyName, userAvatar }) {
    const existingUser = await db.Company.findByPk(id)
    if (!existingUser) {
      throw new Error('Không thấy thông tin partner')
    }

    if (userAvatar) {
      this.deleteOldAvatar(existingUser.userAvatar)
    }

    await existingUser.update({ companyName, userAvatar })
    return existingUser
  }

  async updatePartner(
    id,
    {
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
    }
  ) {
    const dataPartner = await db.Company.findByPk(id)
    if (!dataPartner) {
      throw new ServiceException('Không tìm thấy đối tác')
    }
    if (userAvatar) {
      this.deleteOldAvatar(dataPartner.userAvatar)
    }
    await dataPartner.update({
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

    return dataPartner
  }

  async show({ page = 1, limit = 9999 }) {
    const offset = (page - 1) * limit
    const { count, rows: users } = await db.Company.findAndCountAll({
      attributes: ['companyName', 'userAvatar', 'id'],
      limit: limit,
      offset: offset,
      where: {
        approvalStatus: 'Đã duyệt'
      }
    })

    return { data: { totalItems: count, users: users, totalPages: Math.ceil(count / limit), currentPage: page } }
  }

  async showApproved({ page = 1, limit = 9999 }) {
    const offset = (page - 1) * limit
    const { count, rows: users } = await db.Company.findAndCountAll({
      limit: limit,
      offset: offset
    })

    return { data: { totalItems: count, users: users, totalPages: Math.ceil(count / limit), currentPage: page } }
  }

  async delete(id) {
    const user = await db.Company.findByPk(id)

    const appRoot = path.resolve('./')
    const imgUrl = user.userAvatar?.trim().startsWith('uploads/') ? user.userAvatar?.trim() : `uploads/${user.userAvatar?.trim()}`
    const imgPath = path.join(appRoot, imgUrl)

    await user.destroy()

    if (fs.existsSync(imgPath)) {
      fs.unlinkSync(imgPath)
    }
  }
}

const partnerService = new PartnerService()
module.exports = { partnerService }

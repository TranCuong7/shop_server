const db = require('../models')
const ServiceException = require('../exceptions/ServiceException')
const { where } = require('sequelize')

class PermissionsService {
  async create({ permissionName, permissionSlug }) {
    const newPermission = await db.Permission.create({
      permissionName,
      permissionSlug,
      type: 'User'
    })
    return newPermission
  }
  async show({ page = 1, limit = 9999 }) {
    const offset = (page - 1) * limit
    const { count, rows: permission } = await db.Permission.findAndCountAll({
      limit: limit,
      offset: offset,
      where: {
        type: 'User'
      }
    })
    return { totalItems: count, permission: permission, totalPage: Math.ceil(count / limit), currentPage: page }
  }

  // async showSlug({ slug }) {
  //   const productSlug = await db.Product.findOne({
  //     where: { slug: slug },
  //     include: [
  //       {
  //         model: db.Company,
  //         as: 'company',
  //         required: true
  //       },
  //       {
  //         model: db.Category,
  //         as: 'category',
  //         required: true
  //       }
  //     ]
  //   })
  //   return productSlug
  // }

  permissionSlug
  async updatePermission(id, { permissionName, permissionSlug }) {
    const dataPermission = await db.Permission.findByPk(id)
    if (!dataPermission) {
      throw new ServiceException('Không tìm thấy permission')
    }

    await dataPermission.update({
      permissionName,
      permissionSlug
    })

    return dataPermission
  }

  async deletePermissions(id) {
    const dataPermission = await db.Permission.findByPk(id)
    if (!dataPermission) {
      throw new ServiceException('Không tìm thấy permission')
    }
    await dataPermission.destroy()
  }
}

const permissionsService = new PermissionsService()
module.exports = { permissionsService }

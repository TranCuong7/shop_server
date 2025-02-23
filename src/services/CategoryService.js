const { STATUS_CODE } = require('../constants')
const { message } = require('../constants/message')
const ServiceException = require('../exceptions/ServiceException')
const db = require('../models')
const NotFoundException = require('../exceptions/NotFoundException')
const { Op } = require('sequelize')

const categoryService = {
  getAllCategories: async ({ page = 1, limit = 10, s = '', t = 'category', permission = [] }) => {
    try {
      const offset = (page - 1) * limit

      const whereCondition = {
        type: t,
        [Op.or]: [{ name: { [Op.like]: `%${s}%` } }]
      }

      if (t === 'post') {
        const permissionIds = permission.map((p) => p.id)
        whereCondition.permissionId = {
          [db.Sequelize.Op.in]: permissionIds
        }
      }

      const { count, rows } = await db.Category.findAndCountAll({
        where: whereCondition,
        include: [
          {
            model: db.Product,
            as: 'products'
          }
        ],
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      })
      const pageCount = Math.ceil(count / limit)
      return {
        status: STATUS_CODE.OK,
        data: rows,
        itemCount: count,
        pageCount,
        currentPage: parseInt(page)
      }
    } catch (e) {
      throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
    }
  },

  getPublicAllCategories: async ({ page = 1, limit = 10, s = '', t = 'category' }) => {
    try {
      const offset = (page - 1) * limit

      const whereCondition = {
        type: t,
        [Op.or]: [{ name: { [Op.like]: `%${s}%` } }]
      }

      const { count, rows } = await db.Category.findAndCountAll({
        where: whereCondition,
        include: [
          {
            model: db.Product,
            as: 'products'
          }
        ],
        limit,
        offset,
        order: [['createdAt', 'DESC']]
      })
      const pageCount = Math.ceil(count / limit)
      return {
        status: STATUS_CODE.OK,
        data: rows,
        itemCount: count,
        pageCount,
        currentPage: parseInt(page)
      }
    } catch (e) {
      throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
    }
  },

  createCategories: async ({ name, slug, description, type = 'category', permissionId }) => {
    const transaction = await db.sequelize.transaction()

    const isSlugExists = await categoryService.isSlugExists({ slug })
    if (isSlugExists) {
      return {
        message: 'Slug đã tồn tại',
        status: STATUS_CODE.BAD_REQUEST
      }
    }
    try {
      const category = await db.Category.create(
        {
          name,
          slug,
          description,
          type,
          permissionId
        },
        { transaction }
      )

      await transaction.commit()

      return {
        status: STATUS_CODE.OK,
        data: category
      }
    } catch (e) {
      await transaction.rollback()
      throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
    }
  },

  getCategoryById: async (id) => {
    try {
      const category = await db.Category.findByPk(id, {
        include: [
          {
            model: db.Product,
            as: 'products'
          }
        ]
      })

      if (!category) {
        throw new ServiceException(message.notFound, STATUS_CODE.NOT_FOUND)
      }

      return {
        status: STATUS_CODE.OK,
        data: category.toJSON()
      }
    } catch (e) {
      throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
    }
  },

  getCategoryBySlug: async (slug) => {
    try {
      const category = await db.Category.findOne({
        where: { slug },
        include: [
          {
            model: db.Product,
            as: 'products'
          }
        ]
      })

      if (!category) {
        throw new ServiceException(message.notFound, STATUS_CODE.NOT_FOUND)
      }

      return {
        status: STATUS_CODE.OK,
        data: category.toJSON()
      }
    } catch (e) {
      throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
    }
  },

  updateCategories: async ({ id, name, slug, description, type, permissionId }) => {
    const category = await db.Category.findByPk(id)
    if (!category) {
      throw new NotFoundException('Không tìm thấy bài viết')
    }

    const isSlugExists = await categoryService.isSlugExistsUpdate({ id, slug })
    if (isSlugExists) {
      return {
        message: 'Slug đã tồn tại',
        status: STATUS_CODE.BAD_REQUEST
      }
    }

    try {
      await category.update({
        name,
        slug,
        description,
        type,
        permissionId
      })

      return {
        status: STATUS_CODE.OK,
        data: category
      }
    } catch (e) {
      console.log('Error when updating post: ', e)
      throw new ServiceException(e.message)
    }
  },

  deleteCategories: async ({ id }) => {
    const category = await db.Category.findByPk(id)

    if (!category) {
      throw new ServiceException(message.notFound, STATUS_CODE.NOT_FOUND)
    }

    try {
      await category.destroy()
    } catch (e) {
      throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
    }
  },

  isSlugExists: async ({ slug }) => {
    try {
      const category = await db.Category.findOne({ where: { slug } })
      return category !== null
    } catch (error) {
      console.error('Lỗi kiểm tra slug:', error)
      throw error
    }
  },

  isSlugExistsUpdate: async ({ id, slug }) => {
    try {
      const category = await db.Category.findOne({
        where: {
          slug,
          id: { [Op.ne]: id }
        }
      })

      return category !== null
    } catch (error) {
      console.error('Lỗi kiểm tra slug:', error)
      throw error
    }
  }
}

module.exports = categoryService

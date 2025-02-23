const { STATUS_CODE } = require('../constants')
const { message } = require('../constants/message')
const ServiceException = require('../exceptions/ServiceException')
const { createPostImages } = require('../services/ImageService')
const db = require('../models')
const fs = require('fs')
const path = require('path')
const NotFoundException = require('../exceptions/NotFoundException')

const PostService = {
  createPost: async ({ title, content, userId, status, files, cateGory, seoTitle, seoDescription, seoKeywords, slug }) => {
    const transaction = await db.sequelize.transaction()
    try {
      const post = await db.Post.create(
        {
          title,
          content,
          userId,
          status,
          slug,
          cateGory,
          seoTitle: seoTitle || title,
          seoDescription: seoDescription || content.substring(0, 160),
          seoKeywords: seoKeywords || ''
        },
        { transaction }
      )
      if (files?.length) {
        await createPostImages({ files, postId: post.id, transaction })
      }

      await transaction.commit()

      return {
        status: STATUS_CODE.OK,
        data: post
      }
    } catch (e) {
      await transaction.rollback()
      throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
    }
  },

  getAllPosts: async ({ page = 1, limit = 10, searchTerm = '' }) => {
    try {
      const offset = (page - 1) * limit

      // const whereClause = searchTerm
      //   ? {
      //       [db.Sequelize.Op.or]: [
      //         { title: { [db.Sequelize.Op.iLike]: `%${searchTerm}%` } },
      //         { content: { [db.Sequelize.Op.iLike]: `%${searchTerm}%` } },
      //         { seoKeywords: { [db.Sequelize.Op.iLike]: `%${searchTerm}%` } }
      //       ]
      //     }
      //   : {}

      const { count, rows } = await db.Post.findAndCountAll({
        // where: whereClause,
        include: [
          {
            model: db.User,
            as: 'user',
            attributes: ['id', 'userFullName', 'userEmail']
          },
          {
            model: db.Image,
            as: 'images',
            where: { imageableType: 'Post' },
            required: false
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

  getPostById: async (id) => {
    try {
      const post = await db.Post.findByPk(id, {
        include: [
          {
            model: db.User,
            as: 'user',
            attributes: ['id', 'userFullName', 'userEmail']
          },
          {
            model: db.Image,
            as: 'images',
            where: { imageableType: 'Post' }
          }
        ]
      })

      if (!post) {
        throw new ServiceException(message.notFound, STATUS_CODE.NOT_FOUND)
      }

      return {
        status: STATUS_CODE.OK,
        data: post.toJSON()
      }
    } catch (e) {
      throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
    }
  },

  getPostBySlug: async (slug) => {
    try {
      const post = await db.Post.findOne({
        where: { slug },
        include: [
          {
            model: db.User,
            as: 'user',
            attributes: ['id', 'userFullName', 'userEmail']
          },
          {
            model: db.Image,
            as: 'images',
            where: { imageableType: 'Post' }
          }
        ]
      })

      if (!post) {
        throw new ServiceException(message.notFound, STATUS_CODE.NOT_FOUND)
      }

      return {
        status: STATUS_CODE.OK,
        data: post.toJSON()
      }
    } catch (e) {
      throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
    }
  },

  updatePost: async ({ slug, title, content, status, seoTitle, seoDescription, seoKeywords, cateGory, id }, files) => {
    const post = await db.Post.findByPk(id)
    if (!post) {
      throw new NotFoundException('Không tìm thấy bài viết')
    }
    if (slug !== post.slug) {
      const slugExists = await db.Post.findOne({ where: { slug } })
      if (slugExists) {
        throw new ServiceException('Slug đã tồn tại, vui lòng chọn slug khác')
      }
    }

    try {
      await post.update({
        title,
        content,
        status,
        cateGory,
        slug,
        seoTitle: seoTitle || title,
        seoDescription: seoDescription || content.substring(0, 160),
        seoKeywords: seoKeywords || ''
      })

      const appRoot = path.resolve('./')
      const imgs = await post.getImages()
      for (const img of imgs) {
        const imgUrl = img.url.trim().startsWith('uploads/') ? img.url.trim() : `uploads/${img.url.trim()}`
        const imgPath = path.join(appRoot, imgUrl)
        try {
          if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath)
          } else {
            console.warn(`File not found: ${imgPath}`)
          }
        } catch (error) {
          console.error(`Error deleting file ${imgPath}:`, error)
        }
      }
      await db.Image.destroy({
        where: {
          imageableId: id,
          imageableType: 'Post'
        }
      })

      if (files.length > 0) {
        await createPostImages({ files, postId: post.id })
      }

      return true
    } catch (e) {
      console.log('Error when updating post: ', e)
      throw new ServiceException(e.message)
    }
  },

  deletePost: async ({ id }) => {
    const post = await db.Post.findByPk(id)

    if (!post) {
      throw new ServiceException(message.notFound, STATUS_CODE.NOT_FOUND)
    }

    try {
      const appRoot = path.resolve('./')

      const imgs = await post.getImages()
      for (const img of imgs) {
        const imgUrl = img.url.trim().startsWith('uploads/') ? img.url.trim() : `uploads/${img.url.trim()}`
        const imgPath = path.join(appRoot, imgUrl)
        try {
          if (fs.existsSync(imgPath)) {
            fs.unlinkSync(imgPath)
          } else {
            console.warn(`File not found: ${imgPath}`)
          }
        } catch (error) {
          console.error(`Error deleting file ${imgPath}:`, error)
        }
      }

      await db.Image.destroy({
        where: {
          imageableId: id,
          imageableType: 'Post'
        }
      })
      await post.destroy()
    } catch (e) {
      throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
    }
  }
}

module.exports = PostService

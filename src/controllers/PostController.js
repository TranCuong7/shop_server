const { sendResponse, json } = require('../utils/APIResponse')
const PostService = require('../services/PostService')
const { message } = require('../constants/message')
const { STATUS_CODE } = require('../constants')

const postController = {
  createPost: async (req, res, next) => {
    try {
      const { title, content, status, seoTitle, seoDescription, seoKeywords, postType, cateGory, slug } = req.body
      const userId = req.user.id

      const files = req.processedFiles?.map((file) => ({
        relativePath: file.relativePath,
        imageType: file.fieldname || 'blogImage' // Default to thumbnail if not specified
      }))
      const result = await PostService.createPost({
        title,
        content,
        userId,
        status,
        files,
        cateGory,
        slug,
        seoTitle,
        seoDescription,
        seoKeywords,
        postType // Thêm postType để phân biệt loại bài viết
      })

      return res.status(STATUS_CODE.OK).json({
        message: message.createdSuccessfully,
        data: result
      })
    } catch (error) {
      next(error)
    }
  },

  getAllPosts: async (req, res, next) => {
    try {
      const { page, limit, searchTerm, postType } = req.query

      const result = await PostService.getAllPosts({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 1000,
        searchTerm,
        postType
      })
      return json(res, STATUS_CODE.OK, 'Đã lấy được', result)
    } catch (error) {
      next(error)
    }
  },

  getPostById: async (req, res) => {
    const { id } = req.params
    try {
      const result = await PostService.getPostById(id)
      return sendResponse(res, result)
    } catch (e) {
      return sendResponse(res, {
        status: e.status,
        messages: e.message
      })
    }
  },

  updatePost: async (req, res, next) => {
    const { id } = req.params
    const files = req.processedFiles?.length
      ? req.processedFiles.map((file) => ({
          relativePath: file.relativePath,
          imageType: file.fieldname || 'blogImage'
        }))
      : []

    try {
      await PostService.updatePost({ id, ...req.body }, files)
      return json(res, STATUS_CODE.OK, message.updatedSuccessfully)
    } catch (error) {
      next(error)
    }
  },

  deletePost: async (req, res, next) => {
    const { id } = req.params
    const userId = req.user.id
    try {
      await PostService.deletePost({ id, userId })
      return json(res, STATUS_CODE.OK, 'Đã xoá được')
    } catch (error) {
      next(error)
    }
  }
}
module.exports = postController

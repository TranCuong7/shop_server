const { sendResponse, json, jsonDelete } = require('../utils/APIResponse')
const CategoryService = require('../services/CategoryService')
const UserService = require('../services/UserService')
const RoleService = require('../services/RoleService')
const { message } = require('../constants/message')
const { STATUS_CODE } = require('../constants')

const categoryController = {
  getAllCategories: async (req, res, next) => {
    try {
      const { page, limit, s, t } = req.query

      const userInfo = await UserService.getUseById({ id: req.user?.id })
      if (!userInfo) {
        return {
          status: STATUS_CODE.NOT_MODIFIED,
          message: 'Không tìm thấy người dùng'
        }
      }
      const permissionResponse = await RoleService.getPermissionsByRoleId({ roleId: userInfo.data.roleId })
      const permission = permissionResponse.data ?? []

      const result = await CategoryService.getAllCategories({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 1000,
        s,
        t,
        permission
      })
      return json(res, STATUS_CODE.OK, 'Đã lấy được', result)
    } catch (error) {
      next(error)
    }
  },
  getPublicAllCategories: async (req, res, next) => {
    try {
      const { page, limit, s, t } = req.query

      const result = await CategoryService.getPublicAllCategories({
        page: parseInt(page) || 1,
        limit: parseInt(limit) || 1000,
        s,
        t
      })
      return json(res, STATUS_CODE.OK, 'Đã lấy được', result)
    } catch (error) {
      next(error)
    }
  },
  createCategories: async (req, res, next) => {
    try {
      const result = await CategoryService.createCategories({ ...req.body })
      return res.status(STATUS_CODE.CREATED).json({
        data: result
      })
    } catch (error) {
      next(error)
    }
  },
  getCategoryById: async (req, res) => {
    const { id } = req.params
    try {
      const result = await CategoryService.getCategoryById(id)
      return res.status(STATUS_CODE.OK).json({
        message: '',
        data: result
      })
    } catch (e) {
      return sendResponse(res, {
        status: e.status,
        messages: e.message
      })
    }
  },
  getCategoryBySlug: async (req, res) => {
    const { id } = req.params
    try {
      const result = await CategoryService.getCategoryBySlug(id)
      return res.status(STATUS_CODE.OK).json({
        message: '',
        data: result
      })
    } catch (e) {
      return sendResponse(res, {
        status: e.status,
        messages: e.message
      })
    }
  },
  updateCategories: async (req, res, next) => {
    const { id } = req.params
    try {
      const result = await CategoryService.updateCategories({ id, ...req.body })
      return res.status(STATUS_CODE.OK).json({
        data: result
      })
    } catch (error) {
      next(error)
    }
  },
  deleteCategories: async (req, res, next) => {
    const { id } = req.params
    try {
      await CategoryService.deleteCategories({ id })
      return jsonDelete(res, STATUS_CODE.OK, 'Xoá thành công')
    } catch (error) {
      next(error)
    }
  }
}
module.exports = categoryController

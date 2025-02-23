const { message } = require('../constants/message')
const { STATUS_CODE } = require('../constants')
const { permissionsService } = require('../services/PermissionsService')

class PermissionsController {
  async create(req, res, next) {
    const { permissionName } = req.body
    try {
      const createPermission = await permissionsService.create({
        permissionName,
        permissionSlug: permissionName
      })

      return res.status(STATUS_CODE.OK).json({ message: message.createdSuccessfully, data: createPermission })
    } catch (error) {
      next(error)
    }
  }

  async showPermissions(req, res, next) {
    const { page, limit } = req.query
    try {
      const showPermissions = await permissionsService.show({ page, limit })
      return res.status(STATUS_CODE.OK).json({ message: message.getSuccessfully, data: showPermissions })
    } catch (error) {
      next(error)
    }
  }

  async showProductBySlug(req, res, next) {
    const { slug } = req.params

    try {
      const showSlug = await productService.showSlug({ slug })

      if (!showSlug || (Array.isArray(showSlug) && showSlug.length === 0)) {
        return res.status(STATUS_CODE.NOT_FOUND).json({ message: 'Không tìm thấy sản phẩm' })
      }

      return res.status(STATUS_CODE.OK).json({ message: message.getSuccessfully, data: showSlug })
    } catch (error) {
      next(error)
    }
  }

  async updatePermission(req, res, next) {
    const { permissionName } = req.body

    const { id } = req.params

    try {
      const result = await permissionsService.updatePermission(id, {
        permissionName,
        permissionSlug: permissionName
      })

      return res.status(STATUS_CODE.OK).json({
        message: message.updatedSuccessfully,
        data: result
      })
    } catch (error) {
      next(error)
    }
  }

  async deletePermissions(req, res, next) {
    const { id } = req.params
    try {
      const result = await permissionsService.deletePermissions(id)

      return res.status(STATUS_CODE.OK).json({
        message: message.deletedSuccessfully,
        data: result
      })
    } catch (error) {
      next(error)
    }
  }

  async getProductWithPriority(req, res, next) {
    try {
      const product = await productService.showWithPriority()
      return res.status(STATUS_CODE.OK).json({ message: message.getSuccessfully, data: product })
    } catch (error) {
      next(error)
    }
  }
}

const permissionsController = new PermissionsController()
module.exports = { permissionsController }

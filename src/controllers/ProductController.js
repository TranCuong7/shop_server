const { message } = require('../constants/message')
const { STATUS_CODE } = require('../constants')
const { productService } = require('../services/ProductService')

class ProductController {
  async createProduct(req, res, next) {
    const { name, description, price, quantity, status, urlImage, companyId, companyURL, categoryId, madeBy, priority, slug } = req.body

    try {
      const createProduct = await productService.create({
        name,
        description,
        price,
        quantity,
        status,
        urlImage,
        companyId,
        companyURL,
        categoryId,
        madeBy,
        priority,
        slug
      })

      return res.status(STATUS_CODE.OK).json({ message: message.createdSuccessfully, data: createProduct })
    } catch (error) {
      next(error)
    }
  }

  async showProduct(req, res, next) {
    const { page, limit } = req.query
    try {
      const showProduct = await productService.show({ page, limit })
      return res.status(STATUS_CODE.OK).json({ message: message.getSuccessfully, data: showProduct })
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

  async updateProduct(req, res, next) {
    const { name, description, price, quantity, status, urlImage, companyId, companyURL, categoryId, madeBy, slug } = req.body

    const { id } = req.params

    try {
      const result = await productService.updateProduct(id, {
        name,
        description,
        price,
        quantity,
        status,
        urlImage,
        companyId,
        companyURL,
        categoryId,
        madeBy,
        slug
      })

      return res.status(STATUS_CODE.OK).json({
        message: message.updatedSuccessfully,
        data: result
      })
    } catch (error) {
      next(error)
    }
  }

  async deleteProduct(req, res, next) {
    const { id } = req.params
    try {
      const result = await productService.deleteProduct(id)

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

const productController = new ProductController()
module.exports = { productController }

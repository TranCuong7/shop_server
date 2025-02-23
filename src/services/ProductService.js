const db = require('../models')
const ServiceException = require('../exceptions/ServiceException')
const { where } = require('sequelize')

class ProductService {
  async create({ name, description, price, quantity, status, urlImage, companyId, companyURL, categoryId, madeBy, priority, slug }) {
    const transaction = await db.sequelize.transaction()
    try {
      await db.Product.create(
        {
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
        },
        { transaction }
      )
      await transaction.commit()
      return true
    } catch (error) {
      await transaction.rollback()
      throw new ServiceException(error.message)
    }
  }

  async show({ page = 1, limit = 9999, s = '' }) {
    const offset = (page - 1) * limit
    const { count, rows: product } = await db.Product.findAndCountAll({
      limit: limit,
      offset: offset,
      include: [
        {
          model: db.Company,
          as: 'company'
        },
        {
          model: db.Category,
          as: 'category'
        }
      ]
    })
    return { totalItems: count, product: product, totalPage: Math.ceil(count / limit), currentPage: page }
  }

  async showSlug({ slug }) {
    const productSlug = await db.Product.findOne({
      where: { slug: slug },
      include: [
        {
          model: db.Company,
          as: 'company',
          required: true
        },
        {
          model: db.Category,
          as: 'category',
          required: true
        }
      ]
    })
    return productSlug
  }

  async updateProduct(id, { name, description, price, quantity, status, urlImage, companyId, companyURL, categoryId, madeBy, slug }) {
    const dataProduct = await db.Product.findByPk(id)
    if (!dataProduct) {
      throw new ServiceException('Không tìm thấy sản phẩm')
    }

    await dataProduct.update({
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

    return dataProduct
  }

  async deleteProduct(id) {
    const dataProduct = await db.Product.findByPk(id)
    if (!dataProduct) {
      throw new ServiceException('Không tìm thấy sản phẩm')
    }
    await dataProduct.destroy()
  }

  async showWithPriority() {
    const product = await db.Product.findAll({
      limit: 4,
      order: [['priority', 'ASC']]
    })

    const adsVip = product.slice(0, 2)
    const adsNormal = product.slice(2, 4)

    return {
      adsVip,
      adsNormal
    }
  }
}

const productService = new ProductService()
module.exports = { productService }

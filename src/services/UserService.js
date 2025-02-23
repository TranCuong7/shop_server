const db = require('../models')
const { STATUS_CODE } = require('../constants')
const { message } = require('../constants/message')
const ServiceException = require('../exceptions/ServiceException')
const { Op } = require('sequelize')

const getUser = async (data) => {
  try {
    const { notInIds, ...conditions } = data

    const whereCondition = {}

    Object.entries(conditions).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        whereCondition[key] = value
      }
    })

    if (notInIds) {
      whereCondition.id = {
        [Op.notIn]: notInIds
      }
    }

    const user = await db.User.findOne({
      where: whereCondition,
      include: [
        {
          model: db.Role,
          as: 'role',
          attributes: ['id', 'roleName', 'roleSlug']
        }
      ]
    })

    if (!user)
      return {
        status: STATUS_CODE.NO_CONTENT,
        messages: message.notExist
      }

    return {
      status: STATUS_CODE.OK,
      data: user.toJSON()
    }
  } catch (e) {
    throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
  }
}

const getUseByUserName = async ({ username }) => {
  return db.User.findOne({
    where: { account: username },
    include: [
      {
        model: db.Role,
        as: 'role',
        attributes: ['id', 'roleName', 'roleSlug'],
        include: [
          {
            model: db.Permission,
            as: 'permissions',
            attributes: ['id', 'permissionName', 'permissionSlug']
          }
        ]
      }
    ]
  })
}

const getUseById = async ({ id }) => {
  try {
    const getUser = await db.User.findOne({
      where: {
        id: id
      },
      include: [
        {
          model: db.Role,
          as: 'role',
          attributes: ['id', 'roleName', 'roleSlug'],
          include: [
            {
              model: db.Permission,
              as: 'permissions',
              attributes: ['id', 'permissionName', 'permissionSlug']
            }
          ]
        }
      ]
    })

    if (!getUser)
      return {
        status: STATUS_CODE.NO_CONTENT,
        messages: message.notExist
      }

    return {
      status: STATUS_CODE.OK,
      data: getUser.toJSON()
    }
  } catch (e) {
    return {
      status: STATUS_CODE.INTERNAL_SERVER_ERROR,
      messages: e.message
    }
  }
}

const create = async ({
  roleId,
  userCode,
  userFullName,
  userEmail,
  userPhone,
  userAddress,
  userAvatar,
  account,
  companyName,
  position,
  password,
  userId
}) => {
  try {
    const user = await db.User.create({
      roleId,
      userCode,
      userFullName,
      userEmail,
      userPhone,
      userAddress,
      userAvatar,
      account,
      companyName,
      position,
      password,
      createdBy: userId,
      updatedBy: userId
    })

    return {
      status: STATUS_CODE.OK,
      data: user.toJSON(),
      messages: message.createdSuccessfully
    }
  } catch (e) {
    throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
  }
}

const shows = async ({ page = 1, limit = 9999 }) => {
  try {
    const offset = (page - 1) * limit

    const { count, rows: users } = await db.User.findAndCountAll({
      include: [
        {
          model: db.Role,
          as: 'role',
          attributes: ['id', 'roleName', 'roleSlug']
        }
      ],
      attributes: [
        'id',
        'roleId',
        'userCode',
        'userFullName',
        'userEmail',
        'userPhone',
        'userAddress',
        'account',
        'companyName',
        'position',
        'deletedAt',
        'createdBy',
        'updatedBy',
        'createdAt',
        'updatedAt'
      ],
      limit: limit,
      offset: offset
    })

    return {
      status: STATUS_CODE.OK,
      data: {
        totalItems: count,
        users: users,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      }
    }
  } catch (e) {
    throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
  }
}

const update = async ({
  id,
  roleId,
  userCode,
  userFullName,
  userEmail,
  userPhone,
  userAvatar,
  userAddress,
  account,
  companyName,
  position,
  password,
  userId
}) => {
  try {
    const user = await db.User.findOne({
      where: {
        id: id
      }
    })
    let conditions = {
      roleId,
      userCode,
      userFullName,
      userEmail,
      userPhone,
      userAvatar,
      userAddress,
      account,
      companyName,
      position,
      companyName,
      position,
      updatedBy: userId
    }

    if (password) conditions.password = password

    await user.update(conditions)

    return {
      status: STATUS_CODE.OK,
      messages: message.updatedSuccessfully
    }
  } catch (e) {
    throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
  }
}

const destroy = async ({ ids, userId }) => {
  try {
    await db.User.update(
      { updatedBy: userId },
      {
        where: { id: { [Op.in]: ids } }
      }
    )

    await db.User.destroy({
      where: { id: { [Op.in]: ids } }
    })

    return {
      status: STATUS_CODE.OK,
      messages: message.deletedSuccessfully
    }
  } catch (e) {
    throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
  }
}

module.exports = { getUseByUserName, getUseById, getUser, create, shows, update, destroy }

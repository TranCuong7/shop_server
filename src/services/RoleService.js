const db = require('../models')
const { STATUS_CODE } = require('../constants')
const { message } = require('../constants/message')
const ServiceException = require('../exceptions/ServiceException')
const { Op } = require('sequelize')

const getRole = async (data) => {
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

    const role = await db.Role.findOne({
      where: whereCondition,
      raw: true
    })

    if (!role)
      return {
        status: STATUS_CODE.NO_CONTENT,
        messages: message.notExist
      }

    return {
      status: STATUS_CODE.OK,
      data: role
    }
  } catch (e) {
    throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
  }
}

const create = async ({ roleName, roleSlug, userId, permissionIds }) => {
  try {
    const role = await db.Role.create({
      roleName: roleName,
      roleSlug,
      createdBy: userId,
      updatedBy: userId
    })

    const newDetails = permissionIds.map((detail) => ({
      ...detail,
      roleId: role.id,
      permissionId: detail
    }))

    await db.RoleHasPermission.bulkCreate(newDetails)

    return {
      status: STATUS_CODE.OK,
      data: role.toJSON(),
      messages: message.createdSuccessfully
    }
  } catch (e) {
    throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
  }
}

const createRoleHasPermissions = async ({ roleId, permissionIds, userId }) => {
  try {
    const recordsToCreate = permissionIds.map((permissionId) => ({
      roleId,
      permissionId,
      createdBy: userId,
      updatedBy: userId
    }))

    const createdRecords = await db.RoleHasPermission.bulkCreate(recordsToCreate, {
      returning: true
    })

    return {
      status: STATUS_CODE.OK,
      data: createdRecords,
      messages: message.createdSuccessfully
    }
  } catch (e) {
    throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
  }
}

const shows = async ({ page = 1, limit = 9999 }) => {
  try {
    const offset = (page - 1) * limit

    const { count, rows: roles } = await db.Role.findAndCountAll({
      attributes: ['id', 'roleName', 'roleSlug', 'deletedAt', 'updatedBy', 'createdAt', 'updatedAt'],
      limit: limit,
      offset: offset
    })

    return {
      status: STATUS_CODE.OK,
      data: {
        totalItems: count,
        roles: roles,
        totalPages: Math.ceil(count / limit),
        currentPage: page
      }
    }
  } catch (e) {
    throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
  }
}

const getPermissionsByRoleId = async ({ roleId }) => {
  try {
    const getPermissions = await db.RoleHasPermission.findAll({
      where: {
        roleId: roleId
      },
      attributes: ['id', 'roleId', 'permissionId'],
      include: [
        {
          model: db.Permission,
          as: 'permission',
          attributes: ['permissionName', 'permissionSlug']
        }
      ],
      order: [['permissionId', 'ASC']],
      raw: true
    })

    const formattedPermissions = getPermissions.map((item) => ({
      id: item.permissionId,
      permissionName: item['permission.permissionName'],
      permissionSlug: item['permission.permissionSlug']
    }))

    return {
      status: STATUS_CODE.OK,
      data: formattedPermissions
    }
  } catch (e) {
    throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
  }
}

const update = async ({ id, roleName, roleSlug, userId, permissionIds }) => {
  try {
    const role = await db.Role.findOne({
      where: {
        id: id
      }
    })

    await role.update({
      roleName: roleName,
      roleSlug: roleSlug,
      updatedBy: userId
    })

    await db.RoleHasPermission.destroy({
      where: { roleId: id }
    })

    const newDetails = permissionIds.map((detail) => ({
      ...detail,
      roleId: id,
      permissionId: detail
    }))

    await db.RoleHasPermission.bulkCreate(newDetails)

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
    await db.Role.update(
      { updatedBy: userId },
      {
        where: { id: { [Op.in]: ids } }
      }
    )

    await db.Role.destroy({
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

const permissionShows = async () => {
  try {
    const permissions = await db.Permission.findAll({
      attributes: ['id', 'parentId', 'permissionName', 'permissionSlug'],
      order: [['id', 'ASC']],
      raw: true,
      where: {
        type: 'System'
      }
    })

    return {
      status: STATUS_CODE.OK,
      data: permissions
    }
  } catch (e) {
    throw new ServiceException(e.message, STATUS_CODE.INTERNAL_SERVER_ERROR)
  }
}

module.exports = { getRole, create, createRoleHasPermissions, shows, getPermissionsByRoleId, update, destroy, permissionShows }

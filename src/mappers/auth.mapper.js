const authMapper = (token, user) => {
  const userPermissions = user?.role?.permissions || []
  const userRole = user?.role || {}

  const permissions = userPermissions.map(({ id, permissionName, permissionSlug }) => ({
    id,
    permissionName,
    permissionSlug
  }))

  return {
    id: user.id,
    fullName: user.userFullName,
    role: {
      id: userRole?.id,
      roleName: userRole?.roleName,
      roleSlug: userRole?.roleSlug
    },
    token,
    permissions
  }
}

module.exports = { authMapper }

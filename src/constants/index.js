const PERMISSIONS = [
  {
    id: 1,
    parentId: null,
    permissionName: 'Người dùng',
    permissionSlug: 'USER'
  },
  {
    id: 2,
    parentId: 1,
    permissionName: 'Duyệt người dùng',
    permissionSlug: 'APPROVE_USER'
  },
  {
    id: 3,
    parentId: 1,
    permissionName: 'Thêm',
    permissionSlug: 'USER_CREATE'
  },
  {
    id: 4,
    parentId: 1,
    permissionName: 'Xem',
    permissionSlug: 'USER_SHOW'
  },
  {
    id: 5,
    parentId: 1,
    permissionName: 'Cập nhật',
    permissionSlug: 'USER_UPDATE'
  },
  {
    id: 6,
    parentId: 1,
    permissionName: 'Xóa',
    permissionSlug: 'USER_DESTROY'
  },
  {
    id: 7,
    parentId: null,
    permissionName: 'Vai trò',
    permissionSlug: 'ROLE'
  },
  {
    id: 8,
    parentId: 7,
    permissionName: 'Thêm',
    permissionSlug: 'ROLE_CREATE'
  },
  {
    id: 9,
    parentId: 7,
    permissionName: 'Xem',
    permissionSlug: 'ROLE_SHOW'
  },
  {
    id: 10,
    parentId: 7,
    permissionName: 'Cập nhật',
    permissionSlug: 'ROLE_UPDATE'
  },
  {
    id: 11,
    parentId: 7,
    permissionName: 'Xóa',
    permissionSlug: 'ROLE_DESTROY'
  },
  {
    id: 12,
    parentId: null,
    permissionName: 'Khách hàng',
    permissionSlug: 'CUSTOMER'
  },
  {
    id: 13,
    parentId: 12,
    permissionName: 'Thêm',
    permissionSlug: 'CUSTOMER_CREATE'
  },
  {
    id: 14,
    parentId: 12,
    permissionName: 'Xem',
    permissionSlug: 'CUSTOMER_SHOW'
  },
  {
    id: 15,
    parentId: 12,
    permissionName: 'Cập nhật',
    permissionSlug: 'CUSTOMER_UPDATE'
  },
  {
    id: 16,
    parentId: 12,
    permissionName: 'Xóa',
    permissionSlug: 'CUSTOMER_DESTROY'
  },
  {
    id: 17,
    parentId: null,
    permissionName: 'Đơn hàng',
    permissionSlug: 'BILL'
  },
  {
    id: 18,
    parentId: 17,
    permissionName: 'Thêm',
    permissionSlug: 'BILL_CREATE'
  },
  {
    id: 19,
    parentId: 17,
    permissionName: 'Xem',
    permissionSlug: 'BILL_SHOW'
  },
  {
    id: 20,
    parentId: 17,
    permissionName: 'Cập nhật',
    permissionSlug: 'BILL_UPDATE'
  },
  {
    id: 21,
    parentId: 17,
    permissionName: 'Xóa',
    permissionSlug: 'BILL_DESTROY'
  },
  {
    id: 22,
    parentId: null,
    permissionName: 'Cài đặt hệ thống',
    permissionSlug: 'SETTING'
  },
  {
    id: 23,
    parentId: 22,
    permissionName: 'Thêm',
    permissionSlug: 'SETTING_CREATE'
  },
  {
    id: 24,
    parentId: 22,
    permissionName: 'Xem',
    permissionSlug: 'SETTING_SHOW'
  },
  {
    id: 25,
    parentId: 22,
    permissionName: 'Cập nhật',
    permissionSlug: 'SETTING_UPDATE'
  },
  {
    id: 26,
    parentId: 22,
    permissionName: 'Xoá',
    permissionSlug: 'SETTING_DESTROY'
  },
  {
    id: 27,
    parentId: null,
    permissionName: 'Bài viết',
    permissionSlug: 'POST'
  },
  {
    id: 28,
    parentId: 27,
    permissionName: 'Thêm',
    permissionSlug: 'POST_CREATE'
  },
  {
    id: 29,
    parentId: 27,
    permissionName: 'Cập nhật',
    permissionSlug: 'POST_UPDATE'
  },
  {
    id: 30,
    parentId: 27,
    permissionName: 'Xoá',
    permissionSlug: 'POST_DELETE'
  },
  {
    id: 31,
    parentId: null,
    permissionName: 'Danh mục',
    permissionSlug: 'CATEGORY'
  },
  {
    id: 32,
    parentId: 31,
    permissionName: 'Thêm',
    permissionSlug: 'CATEGORY_CREATE'
  },
  {
    id: 33,
    parentId: 31,
    permissionName: 'Cập nhật',
    permissionSlug: 'CATEGORY_UPDATE'
  },
  {
    id: 34,
    parentId: 31,
    permissionName: 'Xoá',
    permissionSlug: 'CATEGORY_DELETE'
  }
]

const STATUS_CODE = {
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NO_CONTENT: 204,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  SERVICE_UNAVAILABLE: 503
}

const SETTING_KEY = {
  TAX: 'tax_setting',
  CURRENCY: 'currency_setting',
  FEE: 'fee_setting'
}

const VEHICLE_TYPE = {
  PASSENGER_TRANSPORTATION: 'passenger_transportation',
  GOODS_TRANSPORTATION: 'goods_transportation'
}

module.exports = { STATUS_CODE, PERMISSIONS, SETTING_KEY, VEHICLE_TYPE }

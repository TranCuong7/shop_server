const express = require('express')
const imageConfigs = require('../config/image')
const router = express.Router()
const { validate } = require('../middlewares/Validate')
const { authenticate, authorize } = require('../middlewares/JWTAction')

const AuthValidate = require('../validates/AuthValidate')
const AuthController = require('../controllers/AuthController')
const RoleValidate = require('../validates/RoleValidate')
const RoleController = require('../controllers/RoleController')
const UserValidate = require('../validates/UserValidate')
const UserController = require('../controllers/UserController')

const PostController = require('../controllers/PostController')
const PostValidate = require('../validates/PostValidate')

const ImageProcessor = require('../middlewares/ImageProcessor')
const uploadImage = require('../middlewares/Upload')

const { mediaController } = require('../controllers/MediaController')
const MediaValidate = require('../validates/MediaValidate')

const partnerValidate = require('../validates/PartnerValidate')
const { partnerController } = require('../controllers/PartnerController')

const { approveUserValidate } = require('../validates/ApproveValidate')
const { approvedController } = require('../controllers/ApproveController')

const { productController } = require('../controllers/ProductController')
const productValidate = require('../validates/ProductValidate')

const {
  permissionsController
} = require('../controllers/PermissionsController')
const permissionsValidate = require('../validates/PermissionsValidate')

const categoryController = require('../controllers/CategoryController')
const categoryValidate = require('../validates/CategoryValidate')

const { upload } = require('../utils/Upload')

router.post('/login', AuthValidate.login, validate, AuthController.login)
router.put('/logout', authenticate, AuthController.logout)

router.get('/permission-shows', authenticate, RoleController.permissionShows)

router.post(
  '/role-create',
  authenticate,
  authorize(['ROLE_CREATE']),
  RoleValidate.create,
  validate,
  RoleController.create
)

router.get('/role-shows', authenticate, RoleController.shows)

router.get(
  '/role-show',
  authenticate,
  RoleValidate.show,
  validate,
  RoleController.show
)

router.put(
  '/role-update',
  authenticate,
  authorize(['ROLE_UPDATE']),
  RoleValidate.update,
  validate,
  RoleController.update
)

router.delete(
  '/role-destroy',
  authenticate,
  authorize(['ROLE_DESTROY']),
  RoleValidate.destroy,
  validate,
  RoleController.destroy
)

router.post(
  '/user-create',
  authenticate,
  authorize(['USER_CREATE']),
  UserValidate.create,
  validate,
  UserController.create
)
router.get(
  '/user-show',
  authenticate,
  UserValidate.show,
  validate,
  UserController.show
)
router.get('/user-shows', authenticate, UserController.shows)

router.put(
  '/user-update',
  authenticate,
  authorize(['USER_UPDATE']),
  UserValidate.update,
  validate,
  UserController.update
)

router.delete(
  '/user-destroy',
  authenticate,
  authorize(['USER_DESTROY']),
  UserValidate.destroy,
  validate,
  UserController.destroy
)

router.put(
  '/users/:userId/approve',
  authenticate,
  authorize(['APPROVE_USER']),
  approveUserValidate,
  validate,
  approvedController.approved
)

router.get('/company-shows', partnerController.showPartner)
router.get('/company-approved', partnerController.showPartnerNeedApproved)

router.post(
  '/company-create',
  authenticate,
  uploadImage.array('images'),
  ImageProcessor.processImageWithConfig(imageConfigs.userAvatar),
  partnerValidate.partnerCreateValidate,
  validate,
  partnerController.createPartner
)

router.put(
  '/company-update-by-id/:id',
  authenticate,
  uploadImage.array('images'),
  ImageProcessor.processImageWithConfig(imageConfigs.userAvatar),
  // partnerValidate.partnerCreateValidate,
  // validate,
  partnerController.updatePartner
)

router.put(
  '/company-update/:id',
  authenticate,
  uploadImage.array('images'),
  ImageProcessor.processImageWithConfig(imageConfigs.userAvatar),
  partnerController.addPartnerLogo
)

router.delete(
  '/company-delete/:id',
  authenticate,
  partnerValidate.partnerDeleteValidate,
  validate,
  partnerController.delete
)

router.post(
  '/blog-posts-create',
  authenticate,
  authorize(['POST_CREATE']),
  uploadImage.array('images', 5),
  PostValidate.validatePost,
  validate,
  ImageProcessor.processImageWithConfig(imageConfigs.blogImage),

  PostController.createPost
)

router.post(
  '/thumbnail-posts-create',
  authenticate,
  authorize(['POST_CREATE']),
  uploadImage.array('images', 5),
  PostValidate.validatePost,
  validate,
  ImageProcessor.processImageWithConfig(imageConfigs.thumbnail),
  PostController.createPost
)

router.get('/posts', PostController.getAllPosts)
router.get('/posts/:id', PostController.getPostById)

router.put(
  '/posts-update/:id',
  authenticate,
  authorize(['POST_UPDATE']),
  uploadImage.array('images'),
  PostValidate.validatePost,
  validate,
  ImageProcessor.processImageWithConfig(imageConfigs.blogImage),
  PostController.updatePost
)

router.delete(
  '/posts-delete/:id',
  authenticate,
  authorize(['POST_DELETE']),
  PostController.deletePost
)

router.get('/get-media', authenticate, mediaController.show)

router.post(
  '/upload-media',
  authenticate,
  MediaValidate.files,
  validate,
  upload.single('files'),
  mediaController.upload
)
router.put(
  '/update-media/:id',
  authenticate,
  authorize(['MEDIA_UPDATE']),
  MediaValidate.update,
  validate,
  upload.single('files'),
  mediaController.update
)

router.delete(
  '/delete-media/:id',
  authenticate,
  authorize(['MEDIA_DELETE']),
  MediaValidate.destroy,
  validate,
  mediaController.delete
)

router.get(
  '/categories',
  authenticate,
  authorize(['CATEGORY']),
  categoryController.getAllCategories
)

router.get('/categories/public', categoryController.getPublicAllCategories)
router.get('/categories/:id', authenticate, categoryController.getCategoryById)
router.get(
  '/categories/get-by-slug/:id',
  authenticate,
  categoryController.getCategoryBySlug
)

router.post(
  '/categories',
  authenticate,
  authorize(['CATEGORY_CREATE']),
  categoryValidate.post,
  validate,
  categoryController.createCategories
)

router.put(
  '/categories/:id',
  authenticate,
  authorize(['CATEGORY_UPDATE']),
  categoryValidate.post,
  validate,
  categoryController.updateCategories
)

router.delete(
  '/categories/:id',
  authenticate,
  authorize(['CATEGORY_DELETE']),
  categoryController.deleteCategories
)

router.post(
  '/product-create/',
  authenticate,
  authorize(['PRODUCT_CREATE']),
  productValidate.validateProduct,
  validate,
  productController.createProduct
)

router.get(
  '/product-show',
  // authenticate,
  // authorize(['CATEGORY_UPDATE']),
  // productValidate.validateProduct,
  // validate,
  productController.showProduct
)

router.get(
  '/product-show-with-priority',
  // authenticate,
  // authorize(['CATEGORY_UPDATE']),
  // productValidate.validateProduct,
  // validate,
  productController.getProductWithPriority
)

router.get(
  '/product-show/:slug',
  // authenticate,
  // authorize(['CATEGORY_UPDATE']),
  // productValidate.validateProduct,
  // validate,
  productController.showProductBySlug
)

router.put(
  '/product-update/:id',
  authenticate,
  authorize(['PRODUCT_UPDATE']),
  productValidate.validateProduct,
  validate,
  productController.updateProduct
)
router.delete(
  '/product/:id',
  authenticate,
  authorize(['PRODUCT_DELETE']),
  productController.deleteProduct
)

router.post(
  '/permissions-create',
  authenticate,
  authorize(['PERMISSIONS_CREATE']),
  permissionsValidate.validatePermission,
  validate,
  permissionsController.create
)

router.put(
  '/permissions-update/:id',
  authenticate,
  authorize(['PERMISSIONS_UPDATE']),
  permissionsValidate.validatePermission,
  validate,
  permissionsController.updatePermission
)

router.get(
  '/permissions-show',
  authenticate,
  permissionsController.showPermissions
)

router.delete(
  '/permissions-delete/:id',
  authenticate,
  authorize(['PERMISSIONS_DELETE']),
  permissionsController.deletePermissions
)

module.exports = router

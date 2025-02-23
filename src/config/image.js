const { UPLOAD_DIRS } = require('../config/uploadConfig')

const imageConfigs = {
  blogImage: {
    prefix: 'blog',
    uploadDir: UPLOAD_DIRS.PROCESSED,
    relativeDir: 'processed/blog',
    resize: {
      width: 800,
      height: 600,
      options: {
        fit: 'inside',
        withoutEnlargement: true
      }
    },
    format: 'webp',
    formatOptions: {
      quality: 85
    }
  },
  productImage: {
    prefix: 'product',
    uploadDir: UPLOAD_DIRS.PROCESSED,
    relativeDir: 'processed/product',
    resize: {
      width: 1200,
      height: 1200,
      options: {
        fit: 'cover',
        withoutEnlargement: true
      }
    },
    format: 'webp',
    formatOptions: {
      quality: 90
    }
  },
  userAvatar: {
    prefix: 'avatar',
    uploadDir: UPLOAD_DIRS.PROCESSED,
    relativeDir: 'processed/avatar',
    resize: {
      width: 200,
      height: 200,
      options: {
        fit: 'cover',
        withoutEnlargement: true
      }
    },
    format: 'webp',
    formatOptions: {
      quality: 80
    }
  },
  bannerImage: {
    prefix: 'banner',
    uploadDir: UPLOAD_DIRS.PROCESSED,
    relativeDir: 'processed/banner',
    resize: {
      width: 1920,
      height: 1080,
      options: {
        fit: 'inside',
        withoutEnlargement: true
      }
    },
    format: 'webp',
    formatOptions: {
      quality: 85
    }
  },
  thumbnail: {
    prefix: 'thumbnail',
    uploadDir: UPLOAD_DIRS.PROCESSED,
    relativeDir: 'processed/thumbnail',
    resize: {
      width: 400,
      height: 300,
      options: {
        fit: 'cover',
        withoutEnlargement: true
      }
    },
    format: 'webp',
    formatOptions: {
      quality: 80
    }
  }
}

module.exports = imageConfigs

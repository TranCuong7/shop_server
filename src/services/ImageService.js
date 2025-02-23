const db = require('../models')

const createPostImages = async (data) => {
  const { files, postId } = data
  await createImages({ files, imageableType: 'Post', imageableId: postId })
}

const createImages = async (data) => {
  const { files = [], imageableType, imageableId, imageType } = data

  for (const file of files) {
    const imageUrl = file.relativePath

    await db.Image.create({
      url: imageUrl,
      imageableId,
      imageableType: 'Post',
      imageType: 'blogImage'
    })
  }
}

module.exports = { createImages, createPostImages }

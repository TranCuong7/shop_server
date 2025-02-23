const express = require('express')
const path = require('path')

const FOLDER = {
  PRODUCT: 'product',
  POSTS: 'posts',
  CATEGORY: 'category'
}

const fileSystems = (app) => {
  app.use('/css', express.static(path.join(__dirname, '../public/css')))
  app.use('/js', express.static(path.join(__dirname, '../public/js')))
  app.use('/img', express.static(path.join(__dirname, '../public/img')))
  Object.values(FOLDER).forEach((folder) => {
    app.use('/', express.static(path.join(__dirname, `../public/${folder}`)))
  })
}

module.exports = fileSystems

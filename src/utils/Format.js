const slugify = require('slugify')

function convertSlug(title) {
  return slugify(title, {
    replacement: '-',
    remove: undefined,
    lower: false,
    strict: false,
    locale: 'vi',
    trim: true
  })
}
module.exports = { convertSlug }

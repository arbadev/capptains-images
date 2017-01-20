const express = require('express')
const router = express.Router()
const Image = require('../models/Image.js')


/* GET home page. */
router.get('/', function(req, res, next) {

  const selectAttributes = {
    name: 1,
    created_at: 1,
    fullPath: 1
  }

  const promise = Image.find({}).select(selectAttributes)
  promise.then(images => {
    return res.render(
      'imagesTable',
      {
        title: 'Image server',
        images: images
      }
    )
  })
  .catch(error => {
    console.log('error ', error)
  })
})

module.exports = router

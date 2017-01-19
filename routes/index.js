const express = require('express')
const router = express.Router()
const Image = require('../models/Image.js')


/* GET home page. */
router.get('/', function(req, res, next) {

  const query = Image.find({})
  const promise = query.exec()

  promise.then(images => {
    res.render(
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

var express = require('express')
var router = express.Router()
var imageController = require('../controllers/ImageController.js')
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()

/**
* @description Routes to rise add and edit views
* @author Andres Barradas
*/

router.get('/new', function (req, res) {
  res.render(
    'addImage',
    {
      title: 'Add Images',
    }
  )
})

router.put('/:id/edit', function (req, res) {
  // body...
})

/**
* @description Access endpoint to a specific image
* @author Andres Barradas
*/

router.route('/:id')
  .get(function (req, res) {
    // body...
  })
  .put(function (req, res) {
    // body...
  })
  .delete(function (req, res) {
    // body...
  });


/**
* @description Access endpoint to image colletion
* @author Andres Barradas
*/

router.route('/')
  .get(function (req, res) {
    // body...
  })
  .post(function (req, res) {
    // body...
  });

module.exports = router

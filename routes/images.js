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

router.get('/images/new', function (req, res) {
  // body...
})

router.put('/images/:id/edit', function (req, res) {
  // body...
})

/**
* @description Access endpoint to a specific image
* @author Andres Barradas
*/

router.route('/images/:id')
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

router.route('/images')
  .get(function (req, res) {
    // body...
  })
  .post(function (req, res) {
    // body...
  });

module.exports = router

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
  console.log('params', req.params)
  imageController.show(req, res)
})
.put(function (req, res) {
  // body...
})
.delete(function (req, res) {
  imageController.remove(req, res)
});

/**
* @description Access endpoint to image colletion
* @author Andres Barradas
*/
/*
* POST
*/
router.post('/', function (req, res) {
  imageController.create(req, res)
});
/*
* GET
*/
router.get('/', function (req, res) {
  console.log('dentro de GET /images');
  console.log(req.body);
})


module.exports = router

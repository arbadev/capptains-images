const express = require('express')
const router = express.Router()
const Image = require('../models/Image.js')
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()


/* GET home page. */
router.get('/', function(req, res) {
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

router.get('/login', function(req, res) {
  return res.render(
    'login',
    {
      title: 'Login',
    }
  )
})

// router.post('/login', jsonParser, passport.authenticate('local-login', {
//         successRedirect : '/images/new',
//         failureRedirect : '/login',
//         failureFlash : true
//     }));

module.exports = router

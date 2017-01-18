const express = require('express')
const router = express.Router()

/* GET home page. */
router.get('/', function(req, res, next) {

  const images = [
    {
      url: "http://p.w3layouts.com/demos/oops-404/web",
      title: 'Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, , ',
      created_at: '2012-04-25 13:00:00.00 PST',
      _id: '21391279372197412n3k21n3'
    },
    {
      url: "http://p.w3layouts.com/demos/oops-404/web",
      title: 'Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, ',
      created_at: '2012-04-25 13:00:00.00 PST',
      _id: '21391279372197412n3k21n3'
    },
    {
      url: "http://p.w3layouts.com/demos/oops-404/web",
      title: 'Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, ',
      created_at: '2012-04-25 13:00:00.00 PST',
      _id: '21391279372197412n3k21n3'
    },
    {
      url: "http://p.w3layouts.com/demos/oops-404/web",
      title: 'Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, ',
      created_at: '2012-04-25 13:00:00.00 PST',
      _id: '21391279372197412n3k21n3'
    },
    {
      url: "http://p.w3layouts.com/demos/oops-404/web",
      title: 'Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, Un titulo, ',
      created_at: '2012-04-25 13:00:00.00 PST',
      _id: '21391279372197412n3k21n3'
    }
  ]

  res.render(
    'imagesTable',
    {
      title: 'Image server',
      images: images
    }
  )

})

module.exports = router

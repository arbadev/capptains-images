const Image = require('../models/Image.js')
const mongoose = require('mongoose')
const assert = require('assert')
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')

mongoose.Promise = global.Promise

/**
* hitController.js
*
* @description :: Server-side logic for managing images.
*/
module.exports = {

  /**
  * imageController.create()
  */
  create: function (req, res) {
    console.log('ImageController.create')
    console.log(req.files.file.name)
    console.log(req.files.file.path)
    const data = {
      name: req.files.file.name,
      created_at: new Date()
    }
    var image = new Image(data)
    var promise = image.save()

    promise.then(image => {
      console.log('Image', image);
      const extension =  req.files.file.name.split('.').pop();
      const lvlOne = image._id.toString().substr(0,2);
      const lvlTwo = image._id.toString().substr(2,2);
      const imagesDir = path.join(`${__dirname}/../`, 'images')
      const imagePath = path.join(imagesDir, `/${lvlOne}/${lvlTwo}/${image._id}.${extension}`)
      const shortPath = `/images/${lvlOne}/${lvlTwo}/${image._id}.${extension}`
      const filePath = path.join(imagesDir, `/${lvlOne}/${lvlTwo}`)
      console.log('image path', imagePath);
      console.log('file path', req.files.file.path);

      if (!fs.existsSync(filePath) || !fs.existsSync(imagePath)) {
        mkdirp(filePath, (err) => {
          if (err) console.error(err)
          else {
            console.log(`created dir ${filePath}`)
            fs.rename(req.files.file.path, imagePath)
          }
        })
      }
      var criteria = { _id: image._id }
      var updateData = { fullPath: imagePath, shortPath: shortPath }
      var opts = { new: true }
      return Image.findByIdAndUpdate(image._id, updateData, opts)
    })
    .then( updateImage => {
      console.log('updated image ', updateImage)
      // res.redirect(`/images/${image._id}`)
      // res.redirect('/')
      return res.status(201).json(updateImage)
    })
    .catch(error => {
      console.log('error ', error)
    })

  },

  /**
  * hitController.list()
  */
  list: function (req, res) {
    console.log('hitController.list')
    const query = Hit.find()
    const promise = query.exec()

    promise.then(hits => {
      return res.status(201).json(hits)
    })
    .catch(error => {
      console.log.error('error ', error)
    })
  },

  /**
  * hitController.show()
  */
  show: function (req, res) {
    console.log('imageController.show')
    console.log('params in SHOW', req.params)
    const id = req.params.id
    const criteria = {_id: id}
    console.log('id: ', id)
    const promise = Image.findOne(criteria)

    promise.then(image => {
      console.log('SHOW IMAGE', image);
      return res.sendFile(image.fullPath)

      // return res.status(201).json(hit)
    })
    .catch(error => {
      return res.status(400).json(error)
      console.log.error('error ', error)
    })
  },

  /**
  * hitController.remove()
  */
  remove: function (req, res) {
    console.log('imageController.remove')
    const id = req.params.id
    const promise = Image.findByIdAndRemove(id)
    promise.then(removedImage => {
      fs.unlinkSync(removedImage.fullPath)
      console.log('removed image', removedImage)
      return res.status(200).json(removedImage)
    })
    .catch(error => {
      return res.status(400).json(removedImage)
      console.log.error('error ', error)
    })
  }
}

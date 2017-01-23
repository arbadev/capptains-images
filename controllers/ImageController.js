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
    const data = {
      name: req.files.file.name,
      created_at: new Date()
    }
    var image = new Image(data)
    var promise = image.save()

    promise.then(image => {
      const extension =  req.files.file.name.split('.').pop();
      const lvlOne = image._id.toString().substr(0,2);
      const lvlTwo = image._id.toString().substr(2,2);
      const imagesDir = path.join(`${__dirname}/../`, 'images')
      const imagePath = path.join(imagesDir, `/${lvlOne}/${lvlTwo}/${image._id}.${extension}`)
      const shortPath = `/images/${lvlOne}/${lvlTwo}/${image._id}.${extension}`
      const filePath = path.join(imagesDir, `/${lvlOne}/${lvlTwo}`)
      if (!fs.existsSync(filePath) || !fs.existsSync(imagePath)) {
        mkdirp(filePath, (err) => {
          if (err) console.error(err)
          else {
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
      return res.status(201).json(updateImage)
    })
    .catch(error => {
      console.log('error ', error)
    })

  },

  /**
  * imageController.show()
  */
  show: function (req, res) {
    console.log('imageController.show')
    const id = req.params.id
    const criteria = {_id: id}
    const promise = Image.findOne(criteria)
    promise.then(image => {
      return res.sendFile(image.fullPath)
    })
    .catch(error => {
      return res.status(400).json(error)
      console.log.error('error ', error)
    })
  },

  /**
  * imageController.remove()
  */
  remove: function (req, res) {
    console.log('imageController.remove')
    const id = req.params.id
    const promise = Image.findByIdAndRemove(id)
    promise.then(removedImage => {
      fs.unlinkSync(removedImage.fullPath)
      return res.status(200).json(removedImage)
    })
    .catch(error => {
      return res.status(400).json(removedImage)
      console.log.error('error ', error)
    })
  }
}

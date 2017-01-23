var express = require('express')
var path = require('path')
var mongoose = require('mongoose')
var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var formidable = require('express-formidable')

/*
* Mongodb
*
*/
mongoose.connect('mongodb://localhost/captainsTask')
var db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function() {
  console.log('Connected  =====> nodeTask Captains DB')
  console.log('Listening on port =====> 3000')
})

// Reset the database
// db.collections['Image'].drop( function(err) {
//     console.log('collection dropped');
// });

/*
*    Routes import
*
*/
var routes = require('./routes/index')
var images = require('./routes/images')

var app = express()

// formidable setup
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(formidable());

/*
*    Routes at app
*
*/
app.use('/', routes)
app.use('/images', images)

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')


// Moment setup
app.locals.moment = require('moment')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

// // error handlers (correction)
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found')
//   err.status = 404
//   next(err)
// })

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500)
    res.render('error', {
      message: err.message,
      error: err
    })
  })
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500)
  res.render('error', {
    message: err.message,
    error: {}
  })
})


module.exports = app

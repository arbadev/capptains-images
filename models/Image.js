var mongoose = require('mongoose')
var Schema   = mongoose.Schema

var imageSchema = new Schema({
	name : String,
	created_at : Date,
	fullPath : String,
	shortPath : String,
	// user: [{ type: Schema.Types.ObjectId, ref: 'User' }]
});

module.exports = mongoose.model('Image', imageSchema)

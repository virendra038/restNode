var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var PoemSchema = new Schema({
	name: String
});

module.exports = mongoose.model('Poem', PoemSchema);
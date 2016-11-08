
//models/bearModel.js

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('commentDb', {
    name: String,
    value: Number,
    sentimentValue: String
});
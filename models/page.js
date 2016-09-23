var mongoose = require('mongoose');
var Module = require('./module');

var PageSchema = new mongoose.Schema({
  title: String,
  modules: [{type: mongoose.Schema.ObjectId, ref: 'Module'}]
});

var Page = mongoose.model("Page", PageSchema);
module.exports = Page;
var mongoose = require('mongoose');

var ModuleSchema = new mongoose.Schema({
  type: String,
  content: String,
  rank: Number,
  caption: String
});

var Module = mongoose.model("Module", ModuleSchema);
module.exports = Module;
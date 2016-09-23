var express = require('express');
var router = express.Router();

var Module = require('../models/module');
var Page = require('../models/page');

// INDEX
router.get('/', function(req, res){
  Module.find(function(error, modules){
    if(error) return res.status(404).send({message: 'Could not find any modules'})
    return res.status(200).send(modules);
  });
});

// SHOW
router.get('/:id', function(req, res){
  var id = req.params.id;
  Module.findById({_id: id}, function(error, module){
    if(error) return res.status(404).send({message: 'Could not find module'})
    return res.status(200).send(module);
  });
});

// POST
router.post('/', function(req, res){
  var module = new Module(req.body);
  module.save(function(error, module){
    Page.findByIdAndUpdate({_id: req.body.page_id}, {$push: {"modules": module._id}}, function(error){
      if(error) return res.status(403).send({message: 'Could not add module b/c' + error});
      return res.status(200).send(module);
    });
  });
});

// UPDATE
router.put('/:id', function(req, res) {
    Module.findByIdAndUpdate(req.params.id, req.body, function(error){
      if(error) return res.status(403).send({message: 'Could not update module b/c' + error});
      return res.status(200);
    });
});

// SAVE ORDER
router.post('/saveOrder', function(req, res) {
  var data = req.body.data;
  data.forEach(function(value, index) {
    var id = value;
    var rank = index;
    Module.findByIdAndUpdate({_id: id}, { rank: rank }, function(error){
      if(error) return res.status(403).send({message: 'Could not update module order b/c' + error});
      return res.status(200);
    });
  });
});

// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  Module.remove({_id: id}, function(error){
    if (error) res.status(404).send({message: 'No module with that ID. Could not delete.'})
    return res.status(204).send({message: 'Deleted!'});
  });
});

module.exports = router
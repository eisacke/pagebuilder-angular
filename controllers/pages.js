var express = require('express');
var router = express.Router();

var Page = require('../models/page');

// INDEX
router.get('/', function(req, res){
  Page.find(function(error, pages){
    if(error) return res.status(404).send({message: 'Could not find any pages'})
    return res.status(200).send(pages);
  });
});

// SHOW
router.get('/:id', function(req, res){
  var id = req.params.id;
  Page.findById({_id: id})
  .populate('modules')
  .exec(function(error, page){
    if(error) return res.status(404).send({message: 'Could not find page'})
    return res.status(200).send(page);
  });
});

// POST
router.post('/', function(req, res){
  var page = new Page(req.body);
  page.save(function(error){
    if(error) return res.status(403).send({message: 'Could not create page b/c' + error});
    return res.status(200).send(page);
  });
});

// DELETE
router.delete('/:id', function(req, res){
  var id = req.params.id;
  Page.remove({_id: id}, function(error){
    if (error) res.status(404).send({message: 'No page with that ID. Could not delete.'})
    return res.status(204).send({message: 'Deleted!'});
  });
});

module.exports = router
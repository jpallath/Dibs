var express = require ('express'),
    router  = express.Router(),
    Idea    = require('../models/idea.js');

router.use(function(req, res, next){
  res.locals.controller = 'ideas';
  next();
})

//Index  will just be all the posts written, this will be removed when the site is finalized

router.get('/', function(req,res){
  Idea.find({}, function(err, ideasArray){
    if (err){
      console.log("Where are the ideas?")
    } else {
      res.render('ideas', {idea: ideasArray})
    }
  })
})

//New Idea
router.get('/new', function(req, res){
  console.log("hi")
  res.render('ideas/new');
});
//Created
router.post('/',function(req,res){
  Idea.create(req.body.idea);
  res.redirect(301, '/ideas');
})
//Show
router.get('/:id', function(req, res){
  var mongoId = req.params.id;
  Idea.findOne({_id:mongoId}, function(err, foundIdea){
    if (err){
      console.log("Whoops");
    } else {
      res.render('ideas/show',{idea: foundIdea})
    }
  })
});
//Delete
router.delete('/:id', function(req, res){
  console.log(req.params.id);
  var mongoId = req.params.id;
  console.log(mongoId);
  Idea.remove({_id:mongoId}, function(err, foundIdea){
    console.log('deleted');
    res.redirect(301, '/ideas')
  });
});
//Edit
router.get('/:id/edit', function(req, res){
  var mongoId = req.params.id;
  Idea.findOne({_id:mongoId}, function(err, foundIdea){
    if (err) {
      console.log(err);
    } else {
      res.render("ideas/edit", {idea:foundIdea});
    };
  });
})
//Update
router.patch('/:id', function(req, res){
  var mongoId = req.params.id;
  var updatedIdea = req.body.idea;
  Idea.update({_id:mongoId}, updatedIdea, function(err, foundIdea){
    if(err){
      console.log("woah");
    } else {
      res.redirect(301, '/ideas/' + mongoId)
    }
  })
})
//Export
module.exports = router;

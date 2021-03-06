var express = require ('express'),
    router  = express.Router(),
    Idea    = require('../models/idea.js'),
    Tag     = require("../models/tag.js"),
    Comment = require('../models/comment.js');

router.use(function(req, res, next){
  res.locals.controller = 'ideas';
  next();
})

// router.use(function (req, res, next) {
//   if (req.session.currentUser){
//     currentUser = req.session.currentUser;
//     next();
//     } else{
//       currentUser = "";
//       }
//       console.log("Hey idea",res.locals);
//       next()
//       });

//Index  will just be all the posts written, this will be removed when the site is finalized

router.get('/', function(req, res){
  Idea.find({}).sort({upvotes:-1}).exec(function(err,ideasArray){
    if (err){
      console.log("where are the ideas")
    } else {
      res.render('ideas', {idea: ideasArray})
    }
  })
});

//New Idea
router.get('/new', function(req, res){
  // console.log("hi")
  res.render('ideas/new');
});
//Created
router.post('/',function(req,res){
  var newIdea = new Idea();
  newIdea.title = req.body.idea.title;
  newIdea.image = req.body.idea.image;
  newIdea.content = req.body.idea.content;
  newIdea.author = req.session.currentUser;
  newIdea.tags = req.body.idea.tags.split(', ');
  for (var i = 0; i < newIdea.tags.length; i++) {
    var newTag = new Tag();
    newTag.tag = newIdea.tags[i];
    newTag.save();
  }
  newIdea.save();
  res.redirect(301, '/ideas');
})
//Show
router.get('/:id', function(req, res){
  var mongoId = req.params.id;
  Idea.findOne({_id: mongoId}, function(err, foundIdea){
    if (err){
      // console.log("Whoops");
    } else {
      req.session.currentParent = req.params.id;
      req.session.currentParentType = "idea";
      console.log(foundIdea)
      Comment.find({parent_id:mongoId}, function(err,foundComments){
        if (err){
        } else {
          // console.log( foundComments );
          res.render('ideas/show', {
            idea: foundIdea,
            comments: foundComments
          })
        }
      })

      // res.render('ideas/show',{idea: foundIdea})
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
    } else {
      res.redirect(301, '/ideas/' + mongoId)
    }
  })
})
//Export
module.exports = router;

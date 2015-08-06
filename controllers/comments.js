var express = require ('express'),
    router  = express.Router(),
    Comment    = require('../models/comment.js');

router.use(function(req, res, next){
  res.locals.controller = 'comments';
  next();
})

//Index  at the moment will be all the comments recorded on the server-- this will be deleted once the site is built correctly

router.get('/', function(req,res){
  Comment.find({}, function(err, commentsArray){
    if (err){
      console.log("Where are the comments?")
    } else {
      res.render('comments', {comment: commentsArray})
    }
  })
})

//New Comment
router.get('/new', function(req, res){
  res.render('comments/new');
});
//Created
router.post('/',function(req,res){
  Comment.create(req.body.comment);
  res.redirect(301, '/comments');
})
//Show
router.get('/:id', function(req, res){
  var mongoId = req.params.id;
  Comment.findOne({_id:mongoId}, function(err, foundComment){
    if (err){
    } else {
      res.render('comments/show',{comment: foundComment})
    }
  })
});
//Delete
router.delete('/:id', function(req, res){
  var mongoId = req.params.id;
  Comment.remove({_id:mongoId}, function(err, foundComment){
    res.redirect(301, '/comments')
  });
});
//Edit
router.get('/:id/edit', function(req, res){
  var mongoId = req.params.id;
  Comment.findOne({_id:mongoId}, function(err, foundComment){
    if (err) {
    } else {
      res.render("comments/edit", {comment:foundComment});
    };
  });
})
//Update
router.patch('/:id', function(req, res){
  var mongoId = req.params.id;
  var updatedComment = req.body.comment;
  Comment.update({_id:mongoId}, updatedComment, function(err, foundComment){
    if(err){
    } else {
      res.redirect(301, '/comment/' + mongoId)
    }
  })
})
//Export
module.exports = router;

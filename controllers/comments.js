var express = require ('express'),
    router  = express.Router(),
    Idea    = require('../models/idea.js'),
    Comment = require('../models/comment.js');

router.use(function(req, res, next){
  res.locals.controller = 'comments';
  next();
});

//Index  at the moment will be all the comments recorded on the server-- this will be deleted once the site is built correctly

router.get('/', function(req,res){
  Comment.find({}, function(err, commentsArray){
    if (err){
      console.log("Where are the ideas?")
    } else {
      console.log(commentsArray);
      res.render('comments', {comment: commentsArray})
    }
  })
})
  // Comment.find({}, function(err, commentsArray){
  //   console.log("commenting?")
  //   if (err){
  //     console.log("Where are the comments?")
  //   } else {
  //     res.render('comments', {comment: commentsArray})
  //   }
  // })

//New Comment
router.get('/new', function(req, res){
  Idea.findOne({_id:req.session.currentParent}, function(err, foundIdea){
    if (err){

    } else {
      res.render('comments/new', {idea:foundIdea});
    }
  })
});
//Created
router.post('/',function(req,res){
  console.log(req.body.comment.content);
  var newComment = new Comment();
  newComment.content = req.body.comment.content;
  console.log('got here');
  newComment.parent_id = req.session.currentParent;
  newComment.parent_type = req.session.currentParentType;
  newComment.author = req.session.currentUser;
  console.log(newComment)
  newComment.save();
  res.redirect(301, 'comments');
  // res.redirect(301, '/comments');
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
});

router.post('/:id/comment', function (req, res) {
  var mongoId = req.params.id;

  Comment.findOne({_id:mongoId}, function(err, foundComment){
    if (err) {

    } else {
      foundComment.comments.push({
        content: req.body.content,
        author: req.session.currentUser,
      });

      foundComment.save(function (err) {
        if (err) {
          console.log("WTF!");
        } else {
          res.redirect(301, "/ideas")
        }
      });
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
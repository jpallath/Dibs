var express = require ('express'),
    router  = express.Router(),
    User    = require('../models/user.js');

router.use(function (req, res, next) {
  res.locals.controller = 'users';
  next();
});

// //To set the currentUser as nobody
// router.use(function (req, res, next) {
//   if (req.session.currentUser){
//     var currentUser = req.session.currentUser;
//     next();
//     }
//     else{
//       currentUser = "";
//       next();
//       }
//       console.log("Hey user",res.locals);
//       });

//Index (Maybe Log-In?), this is just an indevelopment page to make sure users are saving
router.get('/', function(req, res){
  User.find({}, function(err, usersArray){
    if (err) {
      console.log("CAN'T FIND USERS");
    } else {
      console.log(req.session.currentUser);
      res.render('users',{user: usersArray});
    };
  });
});

//Log-In
router.get('/login', function(req, res){
  res.render('users/login');
})

router.post('/login', function(req,res){
  var attempt = req.body.user;
  User.findOne({username: attempt.username}, function (err, found){
    if (found.validPassword(attempt.password)){
      currentUser = found.username;
      req.session.currentUser = found.username;
      console.log(req.session.currentUser);
      res.redirect(301, "/ideas")
    } else {
      res.redirect(301, "/users/login")
    }
  })
})

//logout middleware?
router.get('/logout', function(req, res){
  res.render('users/logout');
})

router.post('/logout', function(req,res){
  req.session.destroy(function(err) {
  // cannot access session here
})
console.log(req.session);
  res.redirect(301, "/ideas")
})

// -------------------------
// router.post('/login', function(req, res){
//   attempt = req.body.user;
//   console.log(attempt);
//   User.findOne({username: attempt.username}, function(err, found){
//     console.log (found)
//     if (found && found.password == attempt.password){
//       console.log("true")
//       res.redirect(301, "/users")
//     }
//     else {
//       res.redirect(301, "/users/login")
//     }
//
//   })
// })
// ---------------------------
  // console.log(res.body.user);
      // req.session.currentUser = User.username;
      // console.log(User.schema.paths.username)
      // console.log(req.session.currentUser)
      // req.session.currentId = found._id;
      // console.log(req.session);
      // res.redirect(301, '/users');
    // } else {
    //   console.log("null")
    //   res.redirect(301, "/users/login")
    // }
  // })

//New
router.get('/new', function(req,res){
  console.log("hi");
  res.render('users/new');
});
//Create
router.post('/', function(req, res){
  var newUser = new User();
  newUser.password = newUser.generateHash(req.body.user.password);
  newUser.username = req.body.user.username;
  newUser.save()
  res.redirect(301, "users/login");
})
//Show
router.get('/:id', function(req, res){
  var mongoId = req.params.id;
  User.findOne({_id:mongoId}, function(err, foundUser){
    if (err){
      console.log("Whoops");
    } else {
      res.render('users/show',{user: foundUser})
    }
  })
});
//Delete
router.delete('/:id', function(req, res){
  var mongoId = req.params.id;
  User.remove({_id:mongoId}, function(err, foundUser){
    res.redirect(301, '/users')
  });
});
//Edit
router.get('/:id/edit', function(req, res){
  var mongoId = req.params.id;
  User.findOne({_id:mongoId}, function(err, foundUser){
    if (err) {
      console.log(err);
    } else {
      res.render("users/edit", {user:foundUser});
    };
  });
})
//Update
router.patch('/:id', function(req, res){
  var mongoId = req.params.id;
  var updatedUser = req.body.user;
  User.update({_id:mongoId}, updatedUser, function(err, foundUser){
    if(err){
    } else {
      res.redirect(301, '/users/' + mongoId)
    }
  })
})
//Export
module.exports = router;

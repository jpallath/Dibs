var mongoose = require('mongoose'),
    Schema   = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10;

var userSchema = Schema({
  username:          {type: String, required: true, index: {unique: true}},
  password:          {type: String, required: true},
  ideaPoints:        {type: Number, default: 0},
  commentPoints:     {type: Number, default: 0},
  interactionPoints: {type: Number, default: 0}
})

userSchema.methods.generateHash = function(password){
  return bcrypt.hashSync(password,bcrypt.genSaltSync(10));
}

userSchema.methods.validPassword = function(password){
  console.log(this.password, password);
  return bcrypt.compareSync(password,this.password)
}

var User = mongoose.model("User", userSchema);
module.exports = User;

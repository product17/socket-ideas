import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
const { Schema } = mongoose;
const SALT_WORK_FACTOR = 10;
const passwordRegex = new RegExp('^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$');

const userSchema = new Schema({
  createdDate: { type: Date, default: Date.now },
  displayName: String,
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  password: {
    type: String,
    minLength: 8,
    validate: {
      validator: function (pw) {
        // Password should have numbers and special chars
        return passwordRegex.test(pw);
      },
      message: 'Password should have at least 1 number and 1 special character',
    },
    // select: false, // removes password from queries
  },
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
});

userSchema.pre('save', function(next) {
  console.log("test");
  const user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    console.log(user.password, salt);
    bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        // override the cleartext password with the hashed one
        user.password = hash;
        next();
    });
  });
});

userSchema.methods.getClientUser = function() {
  return {
    displayName: this.displayName,
    email: this.email,
    username: this.username,
  };
}

userSchema.methods.validatePassword = function(candidatePassword, cb) {
  if (!this.password) {
    cb(new Error('Password incorrect'));
    return;
  }

  bcrypt.compare(candidatePassword, this.password).then(function(isMatch) {
    cb(null, isMatch);
  }).catch((err) => {
    cb(err);
  });
}

export default mongoose.model('user', userSchema);

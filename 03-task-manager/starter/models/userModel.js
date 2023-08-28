const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please enter an username"],
    trim: true,
    maxlength: 20,
    unique: true,
  },
  email: {
	type : String,
	require:[true,"please provide a valid Email"] ,
	unique: true,
    lowercase: true,
    validate: [isEmail, "Please enter a valid email"],
  },
  password:{
	type:String,
	required:[true,'password is required'],
	minlength:6
  },
  isAdmin:{
    type:Boolean,
    default:false
  }
},{
  timestamps: true, // Add timestamps to the schema
});

// Hashing password before saving to db
userSchema.pre("save", async function (next) {
  try {
    // Only hash the password if it has been modified or is new
    if (!this.isModified("password")) {
      return next();
    }
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  // find user signed in email  
  const user = await this.findOne({ email });
  if (user) {
    setTimeout(() => {
      console.log(`Timed out`);
    }, 200)
    const auth = bcrypt.compareSync(password, user.password);
    console.log("auth ", auth)
    if (auth) {
      return user;
    }
    throw new Error('Incorrect password');
  }
  throw new Error('Invalid credentials');
};
const User = mongoose.model("User", userSchema);

module.exports = User;
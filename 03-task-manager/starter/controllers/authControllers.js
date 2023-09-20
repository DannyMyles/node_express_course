const User = require("../models/userModel");
const asyncWrapper = require("../middleware/asyncMiddleware");
const JwtService = require("../services/jwt.service");
const { ObjectId } =  require('mongodb')

const jwtService = new JwtService();

// Adding cookie
const maxAge = 3 * 24 * 60 * 60 * 1000; // 3 days in milliseconds

// signUp user
const signupUser = asyncWrapper(async (req, res, next) => {
  // Exact username, email an password from the request body
  const { username, email, password } = req.body,
    userExist = await User.findOne({ email, password });

  // if the user exists send and error
  if (userExist) {
    return res.status(409).json({ err: err });
  }

  //  Otherwise create a new user
  const newUser = new User({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  // adding jwt and cokie
  const token = jwtService.generateAccessToken(newUser._id, newUser.email);
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });

  // save the user to db
  const savedUser = await newUser.save();
  res.status(201).json({ savedUser });
});

// Login user
const loginUser = asyncWrapper(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  try {
  const user = await User.login(email, password);
  // Generate JWT and set cookie
  const token = jwtService.generateAccessToken(user._id, user.email);
  res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
  res.status(200).json({ user: user._id });
  } catch (error) {
  console.log("Error while logging in:", error);
  res.status(500).json({ err: "An error occurred while logging in" });
  }
});

// update user
const updateUser = asyncWrapper(async (req, res, next) => {
  const {id: updateId} = req.params;
  const user = await User.findOneAndUpdate({_id: ObjectId(updateId)}, req.body, {
    new : true,
    runValidators:true
  })
  if(!user){
    res.status(404).json({msg: `No user with this Id ${updateId}`})
  }
  res.status(200).json(res.json({ _id: ObjectId(updateId), data: req.body }));
});



module.exports = { signupUser, loginUser, updateUser };

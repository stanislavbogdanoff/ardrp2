const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

//@desc   Register new user
//@route  POST /api/users
//@access Private
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    role,
  });
  if (user) res.status(200).json(user);
  else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

//@desc   Login user
//@route  POST /api/users/login
//@access Public
const loginUser = asyncHandler(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (
    user &&
    (await bcrypt.compare(password.toString(), user.password.toString()))
  ) {
    res.status(200).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

//@desc   Get all users
//@route  GET /api/users
//@access Private
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find();
  if (users && users.length > 0) {
    res.status(200).json(users);
  } else {
    res.status(400);
    throw new Error("Users not found");
  }
});

//@desc   Get all users
//@route  PATCH /api/users/wallet
//@access Private
const assignWallet = asyncHandler(async (req, res) => {
  const user = await User.findOneAndUpdate({_id: req.body.id}, {
    wallet: req.body.wallet
  })
  if (user) res.status(200).json(user)
  else {
    res.status(400)
    throw new Error("User not found")
  }
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

module.exports = { registerUser, loginUser, getAllUsers, assignWallet };
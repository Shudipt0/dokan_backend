const User = require("../models/user.model");
const generateToken = require("../services/token.service");
const moment = require("moment");

// register user
async function createUser(req, res, next) {
  const userBody = req.body;
  const email = userBody.email;
  const phone = userBody.phone;

  try {
    // check email is taken
    if (await User.isEmailOrPhoneTaken({email, phone})) {
      return res.status(400).json({ message: "Email or Phone already taken!" });
    }
    // create user
    const user = await User.create({
      name: userBody.name,
      phone: phone,
      email: email,
      password: userBody.password,
    });
    // send response
    res.status(200).send({
      message: "User registered successfully!",
      data: {
        id: user._id,
        name: user.name,
        phone: phone,
        email: user.email,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
}

// login user
async function loginUser(req, res, next) {
  const userBody = req.body;
  const password = userBody.password;
  const email = userBody.username;
  const phone = userBody.username;

  try {
    // if email exists
    const user = await User.findOne({ 
      $or: [{email},{phone}]
     });

    // check credentials
    if (!user || !(await user.isPasswordMatch(password))) {
      return res.status(401).send({ message: "Incorrect email or password!" });
    }

    // generate token
    const accessTokenExpires = moment().add(
      process.env.JWT_ACCESS_EXPIRATION_MINUTES,
      "minutes"
    );

    const token = await generateToken(
      user._id,
      user.role,
      accessTokenExpires,
      "access"
    );

    // set cookie
    res.cookie("token", token, {
      httpOnly: true,
      sameSite: "none",
      secure: false,
    })

        // optional: separate cookie for user id
    res.cookie("userId", user._id.toString(), {
      httpOnly: false, // set to true if you only need it server-side
      sameSite: "none",
      secure: false,
    })

    // send response
    res.status(200).send({
      message: "Login successfully!",
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).send({ message: error?.message });
  }
}

// get all users
async function getAllUsers(req, res, next) {
  try {
    const users = await User.find({});
    res.status(200).send({
      status: true,
      users: users,
    });
  } catch (error) {
    res.status(500).send({ message: error?.message });
  }
}

// get user profile
async function userProfile(req, res, next) {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    res.status(200).send({
      user: user,
      // user: req.user,
    });

  } catch (error) {
    res.status(500).send({ message: error?.message });
  }
}

// update user
async function updateUser(req, res, next) {
  const {id} = req.params;
  const updates = req.body;
  try{
    await User.findByIdAndUpdate(id, { $set: updates }, { new: true });
    res.status(200).json({ message: "User updated successfully!" });
  }catch (err){
    res.status(500).json({ message: err.message });
  }

}

module.exports = { createUser, loginUser, userProfile, getAllUsers, updateUser };

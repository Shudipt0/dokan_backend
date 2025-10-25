
const mongoose = require("mongoose");
const bcryptjs = require('bcryptjs');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  }
});

// check if email is taken
userSchema.statics.isEmailTaken = async function (email){
    const user = await this.findOne({email});
    return !!user;
}

// hash password before saving the user
userSchema.pre("save", async function (next) {
    const user = this;

    user.password = await bcryptjs.hash(user.password, 10);
    next();
});

// check if password match or not
userSchema.methods.isPasswordMatch = async function(password){
  const user = this;
  return bcryptjs.compare(password, user.password);
};


const User = mongoose.model("User", userSchema);

module.exports = User;

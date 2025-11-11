const mongoose = require("mongoose");
const bcryptjs = require("bcryptjs");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      trim: true,
      lowercase: true,
      sparse: true,
    },
    phone: {
      type: String,
      required: true,
      unique: true,
      trim: true,
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
  },
  {
    timestamps: {
      createdAt: "created_at",
      updatedAt: "updated_at",
    },
  }
);

// check if email is taken
userSchema.statics.isEmailOrPhoneTaken = async function ({email, phone}) {
    const conditions = [];
  if (email) conditions.push({ email });
  if (phone) conditions.push({ phone });
  if (conditions.length === 0) return false;
  
  const user = await this.findOne({ 
    $or: conditions
   });
  return !!user;
};

// hash password before saving the user
userSchema.pre("save", async function (next) {
  const user = this;

  user.password = await bcryptjs.hash(user.password, 10);
  next();
});

// check if password match or not
userSchema.methods.isPasswordMatch = async function (password) {
  const user = this;
  return bcryptjs.compare(password, user.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;

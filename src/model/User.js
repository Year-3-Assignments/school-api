import mongoose, { Schema } from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import validator from 'validator';

const UserSchema = new Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      trim: true,
    },
    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Email is Required'],
      trim: true,
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error('Please enter valid email address');
        }
      },
    },
    phoneNumber: {
      type: String,
      required: [true, 'Phone number required'],
      trim: true,
      max: [10, 'Please enter valid phone number'],
      validate(value) {
        if (!validator.isMobilePhone(value)) {
          throw new Error('Please enter valid mobile number');
        }
      },
    },
    addressLine1: {
      type: String,
      required: [true, 'Address 1 is required'],
      trim: true,
    },
    addressLine2: {
      type: String,
      required: [false, 'Address 2 is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    role: {
      type: String,
      required: false,
      trim: true,
    },
    imageurl: {
      type: String,
      required: [true, 'Profile image is required'],
      trim: true,
    },
    description: {
      type: String,
      required: false,
      trim: true,
    },
    userName: {
      type: String,
      required: [true, 'Username is required'],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password must be provided'],
      trim: true,
    },
    salary: {
      type: String,
      required: [true, 'Salary is required'],
    },
    token: { type: String },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function (next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  const token = jwt.sign({ _id: user._id }, 'schoolapisecret');
  user.token = token;
  await user.save();
  return token;
};

UserSchema.statics.findByUsernamePassword = async function (
  userName,
  password
) {
  const user = await User.findOne({ userName });
  if (!user) {
    throw new Error('User not found');
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Password is not matched');
  }
  return user;
};

const User = mongoose.model('users', UserSchema);

export default User;

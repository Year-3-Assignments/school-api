import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const StudentSchema = new Schema({
  firstname: {
    type: String,
    required: [true, 'Name should be provided'],
    trim: true,
  },
  lastname: {
    type: String,
    required: [true, 'Name should be provided'],
    trim: true,
  },
  dateofbirth: {
    type: String,
    required: [true, 'Date of Birth should be provided'],
    trim: true,
  },
  address1: {
    type: String,
    required: [true, 'Address 1 is required'],
    trim: true,
  },
  address2: {
    type: String,
    required: [true, 'Address 2 is required'],
    trim: true,
  },
  city: { type: String, required: [true, 'City is required'], trim: true },
  province: {
    type: String,
    required: [true, 'Province is required'],
    trim: true,
  },
  grade: { type: Number, required: true, trim: true },
  imageurl: { type: String, required: false, trim: true },
  achievements: [{ type: String, required: true, trim: true }],
  parent: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  email: {
    type: String,
    required: [true, 'Email must be provided'],
    trim: true,
  },
  username: { type: String, required: false, trim: true },
  password: {
    type: String,
    required: [true, 'Password must be provided'],
    trim: true,
  },
  token: { type: String },
});

StudentSchema.pre('save', async function (next) {
  const student = this;
  if (student.isModified('password')) {
    student.password = await bcrypt.hash(student.password, 8);
  }
  next();
});

StudentSchema.methods.generateAuthToken = async function () {
  const student = this;
  const token = jwt.sign({ _id: user._id }, 'schoolapisecret');
  user.token = token;
  await student.save();
  return token;
};

StudentSchema.statics.findByUsernamePassword = async function (
  username,
  password
) {
  const student = await Student.findOne({ username });
  if (!student) {
    throw new Error('Student not found');
  }
  const isMatch = await bcrypt.compare(password, student.password);
  if (!isMatch) {
    throw new Error('Password is not matched');
  }
  return student;
};

const Student = mongoose.model('students', StudentSchema);
export default Student;

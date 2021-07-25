import mongoose, { Schema } from 'mongoose';

const StudentSchema = new Schema({
  firstname: { type: String, required: [true, 'Name should be provided'], trim: true },
  lastname: { type: String, required: [true, 'Name should be provided'], trim: true },
  dateofbirth: { type: String, required: [true, 'Date of Birth should be provided'], trim: true },
  address1: { type: String, required: true, trim: true },
  address2: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  province: { type: String, required: true, trim: true },
  grade: { type: Number, required: true, trim: true },
  imageurl: { type: String, required: false, trim: true },
  achievements: [{ type: String, required: true, trim: true }],
  parent: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true }, 
  email: { type: String, required: [true, 'Email must be provided'], trim: true },
  username: { type: String, required: [true, 'Username must be provided'], trim: true },
  password: { type: String, required: [true, 'password123'], trim: true },
});

const Student = mongoose.model('students', StudentSchema);
export default Student;
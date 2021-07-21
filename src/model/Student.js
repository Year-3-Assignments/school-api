import mongoose, { Schema } from 'mongoose';

const StudentSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    trim: true
  }
});

const Student = mongoose.model('students', StudentSchema);
export default Student;
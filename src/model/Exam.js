import mongoose, { Schema } from 'mongoose';

const ExamSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Exam title is required'],
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      required: [true, 'Create person is required'],
      ref: 'users',
    },
    createdFor: {
      type: String,
      required: [true, 'Class name is required'],
      trim: true,
    },
    duration: {
      type: Number,
      required: [true, 'Exam duration is required'],
      default: 2,
    },
    numberOfQuestions: {
      type: Number,
      required: [true, 'Number of questions are required'],
    },
    accessPassword: {
      type: String,
      required: [true, 'Exam access password is required'],
      trim: true,
    },
    startDateTime: {
      type: Date,
      required: [true, 'Start date and time is required'],
    },
  },
  {
    timestamps: true,
  }
);

const Exam = mongoose.model('exams', ExamSchema);

export default Exam;

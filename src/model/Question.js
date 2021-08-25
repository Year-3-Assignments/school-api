import mongoose, { Schema } from 'mongoose';

const QuestionSchema = new Schema(
  {
    examId: { type: Schema.Types.ObjectId, required: true, ref: 'exams' },
    question: {
      type: String,
      required: [true, 'Question is required'],
      trim: true,
    },
    isMCQQuestion: { type: Boolean, required: false, default: false },
    level: { type: String, required: false, trim: true },
    options: [
      {
        option: { type: String, required: false, trim: true },
      },
    ],
    correctOption: { type: String, required: false, trim: true },
  },
  {
    timestamps: true,
  }
);

const Question = mongoose.model('questions', QuestionSchema);
export default Question;

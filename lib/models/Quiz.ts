import mongoose from 'mongoose';

export interface IQuestion {
  question: string;
  options: string[];
  answer: string;
  explanation: string;
}

export interface IQuiz {
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  questions: IQuestion[];
  createdAt: Date;
}

const QuestionSchema = new mongoose.Schema<IQuestion>({
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  answer: { type: String, required: true },
  explanation: { type: String, required: true },
});

const QuizSchema = new mongoose.Schema<IQuiz>({
  topic: { type: String, required: true },
  difficulty: { type: String, enum: ['easy', 'medium', 'hard'], required: true },
  questions: [QuestionSchema],
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Quiz || mongoose.model<IQuiz>('Quiz', QuizSchema);
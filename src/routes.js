import { createUser, loginUser } from './controller/user.controller';
import {
  createExam,
  getExamsForTeacher,
  updateExam,
  deleteExam,
} from './controller/exam.controller';
import auth from './middleware/authentication';

export default function (app) {
  // User API endpoints
  app.post('/user/create', createUser);
  app.post('/user/login', loginUser);
  // Exam API endpoints
  app.post('/exam/add', auth, createExam);
  app.get('/exam/teacher', auth, getExamsForTeacher);
  app.put('/exam/update/:id', auth, updateExam);
  app.delete('/exam/delete/:id', auth, deleteExam);
}

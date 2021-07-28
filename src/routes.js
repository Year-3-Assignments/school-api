import { createUser, loginUser } from './controller/user.controller';
import {
  createExam,
  getExamsForTeacher,
  updateExam,
  deleteExam,
} from './controller/exam.controller';
import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentByID,
  updateStudent,
} from './controller/student.controller';
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
  //Student API Endpoints
  app.post('/student/add', auth, createStudent);
  app.get('/student/', auth, getAllStudents);
  app.get('/student/:id', auth, getStudentByID);
  app.put('student/update/:id', auth, updateStudent);
  app.delete('student/delete/:id', auth, deleteStudent);
}

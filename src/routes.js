import {
  createUser,
  loginUser,
  getUserInfo,
} from './controller/user.controller';
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
import {
  createQuestion,
  getQuestionsForExam,
  getQuestionsForTeacher,
  getQuestion,
  updateQuestion,
  deleteQuestion,
} from './controller/question.controller';
import auth from './middleware/authentication';

export default function (app) {
  // User API endpoints
  app.post('/user/create', createUser);
  app.post('/user/login', loginUser);
  app.get('/user/', auth, getUserInfo);
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
  // Question API endpoints
  app.post('/question/add', auth, createQuestion);
  app.get('/question/exam/teacher/:id', auth, getQuestionsForTeacher);
  app.get('/question/exam/:id', auth, getQuestionsForExam);
  app.get('/question/:id', auth, getQuestion);
  app.put('/question/update/:id', auth, updateQuestion);
  app.post('/question/delete/:id', auth, deleteQuestion);
}

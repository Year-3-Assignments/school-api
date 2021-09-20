import {
  createUser,
  loginUser,
  getUserInfo,
  getAllEmployees,
  getEmployeeById,
  deleteEmployee,
  updateEmployee,
  getAllSalary,
} from './controller/user.controller';
import {
  createExam,
  getExamsForTeacher,
  updateExam,
  deleteExam,
  getExamPaperForStudent,
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
import {
  createSport,
  getAllSportsDetails,
  updateSport,
  deleteSport,
  getSportsCoach,
  getSportsStudents,
} from './controller/sport.controller';
import {
  createSportInventory,
  getAllSportsInventory,
  updateSportInventory,
  deleteSportInventory,
} from './controller/sports-inventory.controller';
import auth from './middleware/authentication';
import { generatePaper } from './pdf-generator/exam-paper-generator';

export default function (app) {
  // User API endpoints
  app.post('/user/create', createUser);
  app.post('/user/login', loginUser);
  app.get('/user/', auth, getUserInfo);
  app.get('/user/getAllEmployees', getAllEmployees);
  app.get('/user/:id', getEmployeeById);
  app.delete('/user/delete/:id', deleteEmployee);
  app.put('/user/update/:id', updateEmployee);
  app.get('/user/salary', getAllSalary);
  // Exam API endpoints
  app.post('/exam/add', auth, createExam);
  app.get('/exam/teacher', auth, getExamsForTeacher);
  app.put('/exam/update/:id', auth, updateExam);
  app.delete('/exam/delete/:id', auth, deleteExam);
  app.get('/exam/getquestions/:id', auth, getExamPaperForStudent);
  //Student API Endpoints
  app.post('/student/add', auth, createStudent);
  app.get('/student', auth, getAllStudents);
  app.get('/student/:id', auth, getStudentByID);
  app.put('student/update/:id', auth, updateStudent);
  app.delete('student/delete/:id', auth, deleteStudent);
  // Question API endpoints
  app.post('/question/add', auth, createQuestion);
  app.get('/question/exam/teacher/:id', auth, getQuestionsForTeacher);
  app.get('/question/exam/:id', auth, getQuestionsForExam);
  app.get('/question/:id', auth, getQuestion);
  app.put('/question/update/:id', auth, updateQuestion);
  app.delete('/question/delete/:id', auth, deleteQuestion);
  // Sports API endpoints
  app.post('/sport/add', createSport);
  app.get('/sport', getAllSportsDetails);
  app.put('/sport/:id', updateSport);
  app.delete('/sport/:id', deleteSport);
  app.get('/sport/coach', getSportsCoach);
  app.get('/sport/student', getSportsStudents);
  // Sports Inventory API endpoints
  app.post('/sportsinventory/add', createSportInventory);
  app.get('/sportsinventory', getAllSportsInventory);
  app.put('/sportsinventory/:id', updateSportInventory);
  app.delete('/sportsinventory/:id', deleteSport);
  // PDF url
  app.post('/get-pdf', generatePaper);
}

import { createStudent, getAllStudents } from './controller/student.controller';

export default function (app) {
  app.post('/student/add', createStudent);
  app.get('/student/', getAllStudents);
}
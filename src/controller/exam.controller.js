import Exam from '../model/Exam';
import Question from '../model/Question';
import enums from './controller.enums';
import responseHandler from '../response/response.handler';

export async function createExam(req, res) {
  if (req.user && req.user.role === enums.role.TEACHER) {
    let examDetails = {
      title: req.body.title,
      createdBy: req.user._id,
      createdFor: req.body.createdFor,
      duration: req.body.duration,
      numberOfQuestions: req.body.numberOfQuestions,
      accessPassword: req.body.accessPassword,
    };

    const exam = new Exam(examDetails);
    exam
      .save()
      .then((data) => {
        responseHandler.respond(res, data);
      })
      .catch((error) => {
        responseHandler.handleError(res, error.message);
      });
  }
}

export async function getExamsForTeacher(req, res) {
  if (req.user && req.user.role === enums.role.TEACHER) {
  }
}

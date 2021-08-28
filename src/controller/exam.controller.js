import Exam from '../model/Exam';
import Question from '../model/Question';
import enums from './controller.enums';
import responseHandler from '../response/response.handler';
import log from './controller.log';

export async function createExam(req, res) {
  if (req.user && req.user.role === enums.role.TEACHER) {
    let examDetails = {
      examId: req.body.examId,
      title: req.body.title,
      subject: req.body.subject,
      status: req.body.status,
      createdBy: req.user._id,
      createdFor: req.body.createdFor,
      duration: req.body.duration,
      numberOfQuestions: req.body.numberOfQuestions,
      accessPassword: req.body.accessPassword,
      startDateTime: req.body.startDateTime,
    };

    const exam = new Exam(examDetails);
    exam
      .save()
      .then(async (data) => {
        const examId = generateExamLink(
          data._doc.examId,
          data._doc._id,
          data._doc.accessPassword
        );
        log.info(examId);
        const updatedExam = await Exam.findByIdAndUpdate(data._doc._id, {
          accessLink: examId,
        });
        responseHandler.respond(res, updatedExam);
      })
      .catch((error) => {
        responseHandler.handleError(res, error.message);
      });
  } else {
    return responseHandler.respond(res, enums.roleIssue.ONLY_TEACHER);
  }
}

export async function getExamsForTeacher(req, res) {
  if (req.user && req.user.role === enums.role.TEACHER) {
    new Promise(async (resolve, reject) => {
      let exams = await Exam.find({ createdBy: req.user._id }).populate(
        'createdBy',
        'firstName lastName email phoneNumber imageurl user'
      );
      return resolve({ exams });
    })
      .then((data) => {
        responseHandler.respond(res, data);
      })
      .catch((error) => {
        responseHandler.handleError(res, error.message);
      });
  } else {
    return responseHandler.respond(res, enums.roleIssue.ONLY_TEACHER);
  }
}

export async function updateExam(req, res) {
  if (req.params.id && req.user && req.user.role === enums.role.TEACHER) {
    try {
      new Promise(async (resolve, reject) => {
        let exam = await Exam.findById(req.params.id);

        if (!exam) {
          throw new Error(enums.exam.NOT_FOUND);
        }

        let examDetails = {
          examId: req.body.examId,
          subject: req.body.subject,
          status: req.body.status,
          title: req.body.title,
          createdBy: req.user._id,
          createdFor: req.body.createdFor,
          duration: req.body.duration,
          numberOfQuestions: req.body.numberOfQuestions,
          accessPassword: req.body.accessPassword,
          startDateTime: req.body.startDateTime,
        };

        exam = await Exam.findByIdAndUpdate(req.params.id, examDetails);
        return resolve({ exam });
      })
        .then((data) => {
          responseHandler.respond(res, data);
        })
        .catch((error) => {
          responseHandler.handleError(res, error.message);
        });
    } catch (error) {
      return responseHandler.handleError(res, error.message);
    }
  } else {
    return responseHandler.respond(res, enums.roleIssue.ONLY_TEACHER);
  }
}

export async function deleteExam(req, res) {
  if (req.params.id && req.user && req.user.role === enums.role.TEACHER) {
    try {
      new Promise(async (resolve, reject) => {
        let exam = await Exam.findById(req.params.id);

        if (!exam) {
          throw new Error(enums.exam.NOT_FOUND);
        }

        exam = await Exam.findByIdAndDelete(req.params.id);
        return resolve({ exam });
      })
        .then((data) => {
          responseHandler.respond(res, data);
        })
        .catch((error) => {
          responseHandler.handleError(res, error.message);
        });
    } catch (error) {
      return responseHandler.handleError(res, error.message);
    }
  } else {
    return responseHandler.respond(res, enums.roleIssue.ONLY_TEACHER);
  }
}

function generateExamLink(examId, id, accessPassword) {
  if (examId && id && accessPassword) {
    const examPrefix = 'http://localhost:3000/student/examination';
    const examLink =
      examPrefix + '/' + examId + '/' + accessPassword + '/' + id;
    return examLink;
  } else {
    return null;
  }
}

export async function getExamPaperForStudent(req, res) {
  if (
    (req.user && req.user.role === enums.role.STUDENT) ||
    req.user.role === enums.role.TEACHER
  ) {
    const questions = await Question.find(
      { examId: req.params.id },
      'isMCQQuestion level options question',
      (error, result) => {
        if (error) {
          return error;
        }
        return result;
      }
    );

    responseHandler.respond(res, questions);
  } else {
    return responseHandler.respond(res, enums.roleIssue.ONLY_STUDENT);
  }
}

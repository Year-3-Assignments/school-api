import Exam from '../model/Exam';
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
      startDateTime: req.body.startDateTime,
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
  } else {
    return responseHandler.respond(res, enums.roleIssue.ONLY_TEACHER);
  }
}

export async function getExamsForTeacher(req, res) {
  if (req.user && req.user.role === enums.role.TEACHER) {
    new Promise(async (resolve, reject) => {
      let exams = await Exam.find({ createdBy: req.user._id });
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

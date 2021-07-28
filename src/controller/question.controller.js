import Question from '../model/Question';
import enums from './controller.enums';
import responseHandler from '../response/response.handler';

export async function createQuestion(req, res) {
  if (req.user && req.user.role === enums.role.TEACHER) {
    let questionDetails = {
      examId: req.body.examId,
      question: req.body.question,
      isWritingQuestion: req.body.isWritingQuestion,
      level: req.body.level || enums.question.LEVEL_EASY,
      options: req.body.options,
      correctOption: req.body.correctOption,
    };

    const question = new Question(questionDetails);
    question
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

export async function getQuestionsForExam(req, res) {
  if (req.params && req.user && req.user.role === enums.role.STUDENT) {
    new Promise(async (resolve, reject) => {
      const questions = await Question.find(
        { examId: req.params.id },
        'isWritingQuestion level options',
        (error, result) => {
          if (error) {
            return error;
          }
          return result;
        }
      );
      return resolve({ questions });
    })
      .then((data) => {
        responseHandler.respond(res, data);
      })
      .catch((error) => {
        responseHandler.handleError(res, error.message);
      });
  } else {
    return responseHandler.respond(res, enums.roleIssue.ONLY_STUDENT);
  }
}

export async function getQuestionsForTeacher(req, res) {
  if (req.params && req.user && req.user.role === enums.role.TEACHER) {
    new Promise(async (resolve, reject) => {
      const questions = await Question.find({ examId: req.params.id });
      return resolve({ questions });
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

export async function getQuestion(req, res) {
  if (
    (req.params && req.user && req.user.role === enums.role.STUDENT) ||
    req.user.role === enums.role.TEACHER
  ) {
    new Promise(async (resolve, reject) => {
      const question = await Question.findById(req.params.id);
      return resolve({ question });
    })
      .then((data) => {
        responseHandler.respond(res, data);
      })
      .catch((error) => {
        responseHandler.handleError(res, error.message);
      });
  } else {
    return responseHandler.respond(res, enums.roleIssue.ONLY_STUDENT_TEACHER);
  }
}

export async function updateQuestion(req, res) {
  if (req.params && req.user && req.user.role === enums.role.TEACHER) {
    new Promise(async (resolve, reject) => {
      let question = await Question.findById(req.params.id);

      if (!question) {
        return responseHandler.handleError(res, enums.question.NOT_FOUND);
      }

      let questionDetails = {
        examId: req.body.examId,
        question: req.body.question,
        isWritingQuestion: req.body.isWritingQuestion,
        level: req.body.level || enums.question.LEVEL_EASY,
        options: req.body.options,
        correctOption: req.body.correctOption,
      };

      question = await Question.findByIdAndUpdate(
        req.params.id,
        questionDetails
      );
      return resolve({ question });
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

export async function deleteQuestion(req, res) {
  if (req.params && req.user && req.user.role === enums.role.TEACHER) {
    try {
      new Promise(async (resolve, reject) => {
        let question = await Question.findById(req.params.id);

        if (!question) {
          throw new Error(enums.question.NOT_FOUND);
        }

        question = await Question.findByIdAndDelete(req.params.id);
        return resolve({ question });
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

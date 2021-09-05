const path = require('path');
const PDF = require('pdf-creator-node');
import Exam from '../model/Exam';
import Question from '../model/Question';
import log from '../controller/controller.log';
const FS = require('fs');
const htmlFile = FS.readFileSync(path.resolve(__dirname, 'template.html'), {
  encoding: 'utf-8',
});

export async function generatePaper(req, res) {
  const exam = await Exam.findById(req.body.examId);
  const questions = await Question.find(
    { examId: req.body.examId },
    'isMCQQuestion level options question',
    (error, result) => {
      if (error) {
        return error;
      }
      return result;
    }
  );

  if (exam && questions) {
    const newQuestions = [];

    for (let i = 0; i < questions.length; i++) {
      let question = questions[i].question;
      let options = [];
      for (let j = 0; j < questions[i].options.length; j++) {
        options.push(questions[i].options[j].option);
      }
      let questionData = {
        question: question,
        options: options,
      };
      newQuestions.push(questionData);
    }

    let options = {
      format: 'A4',
      orientation: 'portrait',
      border: '10mm',
      header: {
        height: '15mm',
        contents:
          '<div style="text-align: center;">REACH School - Examination Paper 2021</div>',
      },
    };

    let document = {
      html: htmlFile,
      data: {
        examId: exam._id,
        title: exam.title,
        grade: exam.createdFor,
        subject: exam.subject,
        questions: newQuestions,
      },
      path: './output.pdf',
      type: '',
    };

    PDF.create(document, options)
      .then((data) => {
        log.info('PDF Generated');
        res.download(path.resolve(__dirname, '../../output.pdf'));
      })
      .catch((error) => {
        res
          .status(500)
          .json({ message: 'Error with generate PDF - ' + error.message });
      });
  } else {
    res.status(404).json({ message: 'Exam & Questions not found' });
  }
}

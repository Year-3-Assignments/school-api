import { response } from 'express';
import Student from '../model/Student';
import responseHandler from '../response/response.handler';
import enums from './controller.enums';

export async function createStudent(req, res) {
  if (req.user && req.user.role === enums.role.ADMIN) {
    let studentData = new Student(req.body);
    const student = new Student(studentData);
    await student
      .save()
      .then((data) => {
        responseHandler.respond(res, data);
      })
      .catch((error) => {
        responseHandler.handleError(res, error.message);
      });
  } else {
    return responseHandler.respond(res, enums.roleIssue.ONLY_ADMIN);
  }
}

export async function getAllStudents(req, res) {
  await Student.find({})
    .then((students) => {
      responseHandler.respond(res, students);
    })
    .catch((error) => {
      responseHandler.handleError(res, error.message);
    });
}

export async function getStudentByID(req, res, next) {
  if (req.params && req.user && req.user.role === enums.role.ADMIN) {
    await Student.findById(req.params.id)
      .populate('password', enums.student.STUDENT_DATA)
      .then((data) => {
        responseHandler.respond(res, data);
        next();
      })
      .catch((error) => {
        response.handleError(res, error.message);
        next();
      });
  } else {
    responseHandler.respond(res, enums.student.NO_STUDENT);
    return;
  }
}

export async function updateStudent(req, res) {
  if (req.params.id && req.user && req.user.role === enums.role.ADMIN) {
    try {
      new Promise(async (resolve, reject) => {
        let student = await Student.findById(req.params.id);

        if (!student) {
          throw new Error(enums.student.NO_STUDENT);
        }

        let studentDetails = {
          firstname: req.body.firstname,
          lastname: req.body.lastname,
          dateofbirth: req.body.dateofbirth,
          address1: req.body.address1,
          address2: req.body.address2,
          city: req.body.city,
          province: req.body.province,
          grade: req.body.grade,
          imageurl: req.body.imageurl,
          achievements: req.body.achievements,
          parent: req.body.parent,
          phone: req.body.phone,
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
        };

        student = await Student.findByIdAndUpdate(
          req.params.id,
          studentDetails
        );
        return resolve({ student });
      })
        .then((data) => {
          responseHandler.respond(res, data);
        })
        .catch((error) => {
          responseHandler.handleError(res, error.message);
        });
    } catch (error) {
      responseHandler.handleError(res, error.message);
    }
  } else {
    return responseHandler.respond(res, enums.roleIssue.ONLY_ADMIN);
  }
}

export async function deleteStudent(req, res) {
  if (req.params.id && req.user && req.user.role === enums.role.ADMIN) {
    try {
      new Promise(async (resolve, reject) => {
        let student = await Student.findById(req.params.id);

        if (!student) {
          throw new Error(enums.student.NO_STUDENT);
        }

        student = await Student.findByIdAndDelete(req.params.id);
        return resolve({ student });
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
    return responseHandler.respond(res, enums.roleIssue.ONLY_ADMIN);
  }
}

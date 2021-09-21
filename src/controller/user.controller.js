import User from '../model/User';
import enums from './controller.enums';
import responseHandler from '../response/response.handler';
import LOG from './controller.log';
import { response } from 'express';

export async function createUser(req, res) {
  if (req.body && req.body.userName) {
    new Promise(async (resolve, reject) => {
      let userName = req.body.userName;
      let user = await User.findOne({ userName: userName });

      if (user) {
        return resolve(enums.user.ALREADY_EXIST);
      }

      user = new User(req.body);
      await user.save();
      const TOKEN = await user.generateAuthToken();
      let responseData = {
        user_id: user._id,
        userName: user.userName,
        token: TOKEN,
        role: user.role,
      };
      return resolve({ responseData, TOKEN });
    })
      .then((data) => {
        if (data === enums.user.ALREADY_EXIST) {
          LOG.warn(enums.user.ALREADY_EXIST);
        } else {
          LOG.info(enums.user.CREATE_SUCCESS);
        }

        responseHandler.respond(res, data);
      })
      .catch((error) => {
        LOG.info(enums.user.CREATE_ERROR);
        responseHandler.handleError(res, error.message);
      });
  }
}

export async function loginUser(req, res) {
  if (req.body && req.body.userName && req.body.password) {
    let { userName, password } = req.body;

    new Promise(async (resolve, reject) => {
      try {
        let user = await User.findByUsernamePassword(userName, password);

        if (!user) {
          throw new Error(enums.user.NOT_FOUND);
        }

        const TOKEN = await user.generateAuthToken();
        let responseData = {
          user_id: user._id,
          userName: user.userName,
          token: TOKEN,
          role: user.role,
        };
        return resolve({ responseData });
      } catch (error) {
        return resolve(error.message);
      }
    })
      .then((data) => {
        if (data === enums.user.NOT_FOUND) {
          LOG.warn(enums.user.NOT_FOUND);
        } else if (data === enums.user.PASSWORD_NOT_MATCH) {
          LOG.warn(enums.user.PASSWORD_NOT_MATCH);
        } else {
          LOG.info(enums.user.LOGIN_SUCCESS);
        }
        responseHandler.respond(res, data);
      })
      .catch((error) => {
        LOG.info(enums.user.LOGIN_ERROR);
        responseHandler.handleError(res, error.message);
      });
  } else {
    return responseHandler.handleError(res, enums.user.CREDENTIAL_REQUIRED);
  }
}

export async function getUserInfo(req, res) {
  const user = req.user;

  if (user) {
    const userObject = {
      _id: req.user._id,
      firstName: req.user.firstName,
      lastName: req.user.lastName,
      email: req.user.email,
      phoneNumber: req.user.phoneNumber,
      addressLine1: req.user.addressLine1,
      addressLine2: req.user.addressLine2,
      city: req.user.city,
      role: req.user.role,
      imageUrl: req.user.imageurl,
      userName: req.user.userName,
    };

    responseHandler.respond(res, userObject);
  } else {
    responseHandler.notFound(res);
  }
}

//get all registered employees
export async function getAllEmployees(req, res) {
  await User.find({})
    .then((employees) => {
      res.status(200).json(employees);
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
}

//get employee by id
export async function getEmployeeById(req, res, next) {
  if (req.params && req.params.id) {
    await User.findById(req.params.id)
      .populate({
        path: 'employee',
        populate: {
          path: 'employee',
          model: 'users',
          select:
            '_id firstname lastname dateofbirth address1 address2 city province imageurl phone email username salary',
        },
      })
      .then((data) => {
        response.sendRespond(res, data);
        next();
      })
      .catch((error) => {
        response.sendRespond(res, error.message);
        next();
      });
  } else {
    response.sendRespond(res, enums.user.NOT_FOUND);
    return;
  }
}

//delete employee/user
export async function deleteEmployee(req, res) {
  if (req.params.id && req.user && req.user.role === enums.role.ADMIN) {
    try {
      new Promise(async (resolve, reject) => {
        let user = await User.findById(req.params.id);

        if (!user) {
          throw new Error(enums.NOT_FOUND);
        }
        user = await User.findByIdAndDelete(req.params.id);
        return resolve({ user });
      })
        .then((data) => {
          responseHandler.respond(res, data);
        })
        .catch((error) => {
          console.log(error);
          responseHandler.handleError(res, error.message);
        });
    } catch (error) {
      console.log(error);
      return responseHandler.handleError(res, error.message);
    }
  } else {
    return responseHandler.respond(res, enums.roleIssue.ONLY_ADMIN);
  }
}

//Update employee
export async function updateEmployee(req, res) {
  if (req.params.id && req.user && req.user.role === enums.role.ADMIN) {
    try {
      new Promise(async (resolve, reject) => {
        let user = await User.findById(req.params.id);

        if (!user) {
          throw new Error(enums.user.NOT_FOUND);
        }

        let userDetails = {
          firstName: req.body.firstname,
          lastName: req.body.lastname,
          dateofbirth: req.body.dateofbirth,
          addressLine1: req.body.address1,
          addressLine2: req.body.address2,
          city: req.body.city,
          description: req.body.description,
          phoneNumber: req.body.phone,
          email: req.body.email,
          role: req.body.role,
          userName: req.body.username,
          password: req.body.password,
          salary: req.body.salary,
        };

        user = await User.findByIdAndUpdate(req.params.id, userDetails);
        return resolve({ user });
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
    return responseHandler.handleError(res, enums.roleIssue.ONLY_ADMIN);
  }
}

//get Salary details
export async function getAllSalary(req, res) {
  await User.find({})
    .then((employees) => {
      res.status(200).json(employees);
    })
    .catch((error) => {
      res.status(500).json(error.message);
    });
}

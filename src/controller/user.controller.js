import User from '../model/User';
import enums from './controller.enums';
import responseHandler from '../response/response.handler';
import LOG from './controller.log';

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

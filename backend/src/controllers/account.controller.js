const { createUsername, generateVerifyCode, throwError } = require('../helper');
const bcrypt = require('bcryptjs');
const {
  isExistAccount,
  createAccount,
  createUser,
  findAccount,
  updatePassword,
  getProfile,
  updateAvt,
  updateProfile,
  getUserInfo,
} = require('../services/account.service');
const {
  COOKIE_EXPIRES_TIME,
  KEYS,
  ACCOUNT_TYPES,
  MAX,
} = require('../constant');
const jwtConfig = require('../configs/jwt.config');
const express = require('express');
const app = express();
const mailConfig = require('../configs/mail.config');
const {
  saveVerifyCode,
  checkVerifyCode,
  removeVerifyCode,
} = require('../services/common.service');
const uuidService = require('../services/uuid.service');

exports.postRegisterAccount = async (req, res) => {
  try {
    const { name, password } = req.body;
    const email = req.body.email?.toLowerCase();

    // check account existence
    const isExist = await isExistAccount(email);
    if (isExist) {
      throw new Error('Email already in use');
    }

    const uuid = await uuidService.register(email, password);

    // create an account
    const newAccountId = await createAccount(
      email,
      password,
      ACCOUNT_TYPES.LOCAL,
      uuid,
    );
    if (!newAccountId) {
      throw new Error('Account does not exist');
    }

    // create an user
    const newUser = await createUser(newAccountId, name);

    if (!newUser) {
      throw new Error('Account does not exist');
    }

    return res.status(200).json({ message: 'Account creation success !' });
  } catch (error) {
    throwError(res, error);
  }
};

exports.postLogin = async (req, res) => {
  try {
    const email = req.body.email?.toLowerCase();
    const { password } = req.body;

    await uuidService.login(email, password);

    // check account existence
    const account = await findAccount(email);
    if (!account) {
      throw new Error('Account does not exist');
    }

    // check password
    const isMatch = await bcrypt.compare(password, account.password);
    if (!isMatch) {
      throw new Error('Incorrect password');
    }

    // set cookie with jwt
    const token = await jwtConfig.encodedToken(
      process.env.JWT_SECRET_KEY || 'amonino-serect',
      { accountId: account._id },
    );

    return res.status(200).json({
      message: 'success',
      token,
    });
  } catch (error) {
    throwError(res, error);
  }
};

exports.postLoginSocialNetwork = async (req, res) => {
  try {
    const { user } = req;
    if (!Boolean(user)) {
      throw new Error('Login failed, try again');
    }

    const { email, name, avt, id, type } = user;
    const account = await findAccount(email);
    let accountId = null;

    // If not exist then create a new account
    if (!account) {
      accountId = await createAccount(email, '', type);
      if (!accountId) {
        throw new Error('Login failed, try again');
      }

      await createUser(accountId, name, avt);
    } else {
      accountId = account._id;
    }

    // set cookie with jwt
    const token = await jwtConfig.encodedToken(
      process.env.JWT_SECRET_KEY || 'amonino-serect',
      { accountId },
    );

    return res.status(200).json({
      message: 'success',
      token,
    });
  } catch (error) {
    throwError(res, error);
  }
};

exports.postResetPassword = async (req, res) => {
  try {
    const { email, verifyCode, password } = req.body;

    const { status, message } = await checkVerifyCode(verifyCode, email);
    if (!status) {
      throw new Error(message);
    }

    const isUpdated = await updatePassword(email, password);

    removeVerifyCode(email);

    if (isUpdated) {
      return res.status(200).json({ message: 'success' });
    }

    throw new Error('An error occurred, please try again later !');
  } catch (error) {
    throwError(res, error);
  }
};

exports.putUpdateAvt = async (req, res, next) => {
  try {
    const { user } = req;
    const { avtSrc } = req.body;
    if (!Boolean(avtSrc) || !Boolean(user)) {
      throw new Error('Update failed');
    }
    const update = await updateAvt(user.username, avtSrc);
    if (!update) {
      throw new Error('Update failed');
    }

    return res.status(200).json({ newSrc: update });
  } catch (error) {
    throwError(res, error);
  }
};

exports.putUpdateProfile = async (req, res, next) => {
  try {
    const { user } = req;
    const newInfo = await updateProfile(user, req.body);
    return res.status(200).json(newInfo);
  } catch (error) {
    throwError(res, error);
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const { user } = req;
    if (!user) {
      throw new Error(
        'You are not logged in. Please login to continue this action',
      );
    }
    const userInfo = await getUserInfo(user);
    return res.status(200).json(userInfo);
  } catch (error) {
    throwError(res, error);
  }
};

exports.getVerifyCode = async (req, res) => {
  try {
    const { email } = req.query;
    if (!Boolean(email)) {
      throw new Error('Account does not exist');
    }

    const isExist = await isExistAccount(email);
    if (!isExist) {
      throw new Error('Account does not exist');
    }

    const verifyCode = generateVerifyCode(MAX.VERIFY_CODE);

    const mail = {
      to: email,
      subject: 'Password change confirmation code',
      html: mailConfig.htmlResetPassword(verifyCode),
    };

    await mailConfig.sendEmail(mail);
    saveVerifyCode(verifyCode, email);

    return res
      .status(200)
      .json({ message: 'Code sent successfully. Please check your Email' });
  } catch (error) {
    throwError(res, error);
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    if (!req.user) {
      throw new Error('Not found');
    }
    const { accountId } = req.user;

    const userInfo = await getProfile(accountId);
    if (!userInfo) {
      throw new Error('Not found');
    }

    return res
      .status(200)
      .json({ email: userInfo.email, createdDate: userInfo.createdDate });
  } catch (error) {
    throwError(res, error);
  }
};

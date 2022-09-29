const { ACCOUNT_TYPES, MAX } = require('../constant');
const { hashPassword } = require('../helper');
const AccountModel = require('../models/account.model');
const UserModel = require('../models/user.model');
const { uploadImage } = require('./common.service');

exports.isExistAccount = email => {
  return AccountModel.exists({ email });
};

exports.findAccount = email => {
  return AccountModel.findOne({ email });
};

exports.createAccount = (
  email,
  password,
  authType = ACCOUNT_TYPES.LOCAL,
  uuid,
) => {
  return AccountModel.create({
    email,
    password,
    authType,
    createdDate: new Date(),
    uuid,
  });
};

exports.createUser = (accountId, name) => {
  return UserModel.create({ accountId, name });
};

exports.updatePassword = async (email = '', newPassword = '') => {
  try {
    const hashPw = await hashPassword(newPassword);

    const res = await AccountModel.updateOne({ email }, { password: hashPw });

    if (res.ok) {
      return true;
    }

    return false;
  } catch (error) {
    throw error;
  }
};

exports.updateAvt = async (username = '', avtSrc = '') => {
  try {
    const picture = await uploadImage(avtSrc, 'amonino/user-avt');
    const isUpdated = await UserModel.updateOne({ username }, { avt: picture });
    if (isUpdated.n && isUpdated.ok) return picture;

    return false;
  } catch (error) {
    throw error;
  }
};

exports.updateProfile = async (
  username = '',
  newName = '',
  newUsername = '',
) => {
  try {
    if (username.toLowerCase() !== newUsername.toLowerCase()) {
      const isExist = await UserModel.exists({ username: newUsername });
      if (isExist) {
        return { status: false, message: 'Username already in use' };
      }
    }

    const isUpdated = await UserModel.updateOne(
      { username },
      { name: newName, username: newUsername },
    );

    if (isUpdated.n && isUpdated.ok)
      return { status: true, message: 'success' };

    return false;
  } catch (error) {
    throw error;
  }
};

exports.getProfile = async (accountId = '') => {
  try {
    const account = await AccountModel.findById(accountId).select(
      'email createdDate',
    );
    return account;
  } catch (error) {
    throw error;
  }
};

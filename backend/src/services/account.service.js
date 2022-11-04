const { ACCOUNT_TYPES, MAX } = require('../constant');
const { hashPassword } = require('../helper');
const AccountModel = require('../models/account.model');
const UserModel = require('../models/user.model');
const { uploadImage } = require('./common.service');
const uuidService = require('./uuid.service');

exports.isExistAccount = email => {
  return AccountModel.exists({ email });
};

exports.findAccount = data => {
  return AccountModel.findOne(data);
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
  const hashPw = await hashPassword(newPassword);
  const account = await this.findAccount({ email });
  if (!account) throw new Error('Account does not exist');

  await AccountModel.updateOne({ email }, { password: hashPw });
  await uuidService.updatePassword(account.uuid, newPassword);

  return true;
};

exports.updateAvt = async (_id = '', avtSrc = '') => {
  try {
    const picture = await uploadImage(avtSrc, 'amonino/user-avt');
    const isUpdated = await UserModel.updateOne({ _id }, { avatar: picture });
    if (isUpdated.n && isUpdated.ok) return picture;

    return false;
  } catch (error) {
    throw error;
  }
};

exports.updateProfile = async (user, data) => {
  try {
    const { name, role, avatar } = data;
    if (!!role && !!user.role)
      throw new Error('You are not allowed to change role');
    const dataUpdate = {};
    if (name) dataUpdate.name = name;
    if (role) dataUpdate.role = role;
    if (avatar) dataUpdate.avt = avatar;
    await UserModel.updateOne({ _id: user._id }, dataUpdate);
    return this.getUserInfo(user);
  } catch (error) {
    throw error;
  }
};

exports.getUserInfo = user => {
  return UserModel.findById(user._id)
    .populate('organizations')
    .populate('accountId');
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

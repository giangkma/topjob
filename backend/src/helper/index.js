const bcrypt = require('bcryptjs');
const { MAX } = require('../constant');
const { findOrganizationById } = require('../services/organization.service');

// @fn: create an username for user by email, account id
// @ex: dyno2000@email.com, id: 127391212 => dyno200012739
exports.createUsername = (email = '', id = '') => {
  const idStr = id.toString();
  return (
    email.toString().split('@')[0] + idStr.slice(idStr.length - 5, idStr.length)
  );
};

exports.generateVerifyCode = numberOfDigits => {
  const n = parseInt(numberOfDigits);
  const number = Math.floor(Math.random() * Math.pow(10, n)) + 1;
  let numberStr = number.toString();
  const l = numberStr.length;
  for (let i = 0; i < MAX.VERIFY_CODE - l; ++i) {
    numberStr = '0' + numberStr;
  }
  return numberStr;
};

exports.hashPassword = async (password = '') => {
  const saltRounds = parseInt(process.env.SALT_ROUND);
  const hashPassword = await bcrypt.hash(password, saltRounds);
  return hashPassword;
};

exports.throwError = (res, error) => {
  return res.status(400).json({
    error: true,
    message: error.message,
  });
};

exports.checkOrganization = async (id, user) => {
  const organization = await findOrganizationById(id);
  if (!organization) {
    throw new Error(
      'Organization is not exist. Please check your organization id',
    );
  }
  const isExist = user.organizations.find(
    org => org.toString() === organization._id.toString(),
  );
  if (!isExist) {
    throw new Error('You do not have permission !');
  }
  return organization;
};

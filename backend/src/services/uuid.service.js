const { default: axios } = require('axios');

exports.register = async (account, hash) => {
  try {
    const res = await axios.post('https://cvnl.me/uuid/v1/user/create', {
      account,
      hash,
    });
    const { data } = res;
    if (data.error && data.message == 'UserExisted') {
      throw new Error('Email already in use');
    }
    return data.data?.userInfo?.id;
  } catch (error) {
    throw error;
  }
};

exports.login = async (account, hash) => {
  try {
    const res = await axios.post('https://cvnl.me/uuid/v1/user/hash', {
      account,
      hash,
    });
    const { data } = res;
    if (data.error && data.message == 'UserNotFoundOrInvalidPassword') {
      throw new Error('Invalid email or password');
    }
  } catch (error) {
    throw error;
  }
};

exports.getInfo = async uuid => {
  try {
    const res = await axios.post(
      `https://cvnl.me/uuid/v1/user/info?id=${uuid}`,
    );
    const { data } = res;
    if (data.error && data.message == 'UserNotFound') {
      throw new Error('User not found');
    }
  } catch (error) {
    throw error;
  }
};

exports.updatePassword = async (uuid, hash) => {
  try {
    const res = await axios.post('https://cvnl.me/uuid/v1/user/password', {
      uuid,
      hash,
    });
    const { data } = res;
    if (data.error && data.message == 'UserNotFound') {
      throw new Error('User not found');
    }
  } catch (error) {
    throw error;
  }
};

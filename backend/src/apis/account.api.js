const accountApi = require('express').Router();
const accountController = require('../controllers/account.controller');
const passport = require('passport');
const passportConfig = require('../middlewares/passport.middleware');

accountApi.post('/register', accountController.postRegisterAccount);
accountApi.post('/login', accountController.postLogin);
accountApi.post(
  '/login-gg',
  passport.authenticate('google-token', { session: false }),
  accountController.postLoginSocialNetwork,
);
accountApi.post(
  '/login-fb',
  passport.authenticate('facebook-token', { session: false }),
  accountController.postLoginSocialNetwork,
);
accountApi.post('/reset-password', accountController.postResetPassword);

accountApi.put(
  '/update-avt',
  passportConfig.jwtAuthentication,
  accountController.putUpdateAvt,
);
accountApi.post(
  '/upload-img',
  passportConfig.jwtAuthentication,
  accountController.uploadPicture,
);

accountApi.put(
  '/update-profile',
  passportConfig.jwtAuthentication,
  accountController.putUpdateProfile,
);

accountApi.get(
  '/user-info',
  passportConfig.jwtAuthentication,
  accountController.getUserInfo,
);
accountApi.get('/send-verify-code', accountController.getVerifyCode);
accountApi.get(
  '/user-profile',
  passportConfig.jwtAuthentication,
  accountController.getUserProfile,
);

module.exports = accountApi;

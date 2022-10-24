const applyApi = require('express').Router();
const passportConfig = require('../middlewares/passport.middleware');
const applyController = require('../controllers/apply.controller');

applyApi.post(
  '/:vacancyId',
  passportConfig.jwtAuthentication,
  applyController.applyVacancy,
);

applyApi.put(
  '/:applyId',
  passportConfig.jwtAuthentication,
  applyController.sendToApplicant,
);

applyApi.get(
  '/:id',
  passportConfig.jwtAuthentication,
  applyController.getApply,
);

applyApi.get(
  '/all/:organizationId',
  passportConfig.jwtAuthentication,
  applyController.getAllApplies,
);

applyApi.get(
  '/vacancy/:vacancyId',
  passportConfig.jwtAuthentication,
  applyController.getAllAppliesForVacancy,
);

module.exports = applyApi;

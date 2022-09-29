const vacancyApi = require('express').Router();
const passportConfig = require('../middlewares/passport.middleware');
const vacancyController = require('../controllers/vacancy.controller');

vacancyApi.post(
  '',
  passportConfig.jwtAuthentication,
  vacancyController.createVacancy,
);

vacancyApi.delete(
  '/:id',
  passportConfig.jwtAuthentication,
  vacancyController.removeVacancy,
);

vacancyApi.put(
  '/:id',
  passportConfig.jwtAuthentication,
  vacancyController.updateVacancy,
);

vacancyApi.get(
  '/:id',
  passportConfig.jwtAuthentication,
  vacancyController.getVacancy,
);

vacancyApi.get(
  '/:organizationId',
  passportConfig.jwtAuthentication,
  vacancyController.getVacancies,
);

module.exports = vacancyApi;

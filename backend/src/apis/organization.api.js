const organizationApi = require('express').Router();
const passportConfig = require('../middlewares/passport.middleware');
const organizationController = require('../controllers/organization.controller');

organizationApi.post(
  '',
  passportConfig.jwtAuthentication,
  organizationController.createOranization,
);

organizationApi.put(
  '/:id',
  passportConfig.jwtAuthentication,
  organizationController.updateOrganization,
);

organizationApi.delete(
  '/:id',
  passportConfig.jwtAuthentication,
  organizationController.removeOrganization,
);

module.exports = organizationApi;

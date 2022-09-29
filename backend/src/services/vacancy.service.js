const Model = require('../models/vacancy.model');

exports.findVacancyById = id => {
  return Model.findById(id).populate('createdBy').populate('organization');
};

exports.removeVacancy = id => {
  return Model.findByIdAndDelete(id);
};

exports.createVacancy = data => {
  return Model.create(data);
};

exports.getVacancies = (userId, organizationId) => {
  return Model.find({
    createdBy: userId,
    organization: organizationId,
  });
};

exports.updateVacancy = (id, data) => {
  return Model.findByIdAndUpdate(id, data, { new: true });
};

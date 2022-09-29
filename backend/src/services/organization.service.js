const Model = require('../models/organization.model');

exports.isExistOrganization = name => {
  return Model.exists({ name });
};

exports.findOrganizationByName = name => {
  return Model.findOne({ name });
};

exports.findOrganizationById = id => {
  return Model.findById(id);
};

exports.removeOrganization = id => {
  return Model.findByIdAndDelete(id);
};

exports.createOrganization = async data => {
  const isExist = await Model.exists({ name: data.name });
  if (isExist) {
    throw new Error('Organization is exist');
  }
  return Model.create(data);
};

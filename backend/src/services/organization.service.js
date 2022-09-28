const OrganizationModel = require('../models/account.model/organization.model');

exports.isExistOrganization = name => {
  return OrganizationModel.exists({ name });
};

exports.findOrganizationByName = name => {
  return OrganizationModel.findOne({ name });
};

exports.findOrganizationById = id => {
  return OrganizationModel.findById(id);
};

exports.removeOrganization = id => {
  return OrganizationModel.findByIdAndDelete(id);
};

exports.createOrganization = async data => {
  const isExist = await OrganizationModel.exists({ name: data.name });
  if (isExist) {
    throw new Error('Organization is exist');
  }
  return OrganizationModel.create(data);
};

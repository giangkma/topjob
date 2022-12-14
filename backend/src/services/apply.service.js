const Model = require('../models/apply.model');

exports.findApply = data => {
  return Model.findOne(data)
    .populate('vacancy')
    .populate('user')
    .populate('organization');
};

exports.isExistApply = data => {
  return Model.exists(data);
};

exports.createApply = async data => {
  return Model.create(data);
};

exports.getApplies = async ({ organizationId, vacancyId, query }) => {
  const { status, isSortScore } = query;
  const filter = {};

  if (organizationId) {
    filter.organization = organizationId;
  }
  if (vacancyId) {
    filter.vacancy = vacancyId;
  }
  if (status) {
    filter.status = status;
  }
  const applies = await Model.find(filter)
    .populate('vacancy')
    .populate('user')
    .sort({ createdDate: -1 });

  if (isSortScore) {
    return applies.sort((a, b) => {
      return b.requirements.length - a.requirements.length;
    });
  }
  return applies;
};

exports.updateApply = async (id, data) => {
  return Model.findByIdAndUpdate(id, data, { new: true });
};

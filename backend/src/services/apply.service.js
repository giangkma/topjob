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

exports.getApplies = async ({ userId, organizationId, vacancyId, query }) => {
  const { status, isSortScore } = query;
  const filter = {
    user: userId,
  };

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
      return b.requiments.length - a.requiments.length;
    });
  }
  return applies;
};

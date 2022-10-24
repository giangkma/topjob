const { STATUS_APPLY, STATUS_VACANCY } = require('../constant');
const { throwError, checkOrganization } = require('../helper');
const {
  findApply,
  createApply,
  getApplies,
  isExistApply,
  updateApply,
} = require('../services/apply.service');
const { findVacancyById } = require('../services/vacancy.service');

exports.applyVacancy = async (req, res) => {
  try {
    const { user } = req;
    const { vacancyId } = req.params;
    const { requirements } = req.body;
    if (!requirements || !requirements.length) {
      throw new Error('You need to choose some requirements! before apply');
    }
    const vacancy = await findVacancyById(vacancyId);
    if (!vacancy.status) {
      throw new Error('Vacancy is not exist');
    }
    if (vacancy.status !== STATUS_VACANCY.ACTIVE) {
      throw new Error('Vacancy is not active');
    }
    const applyExist = await isExistApply({
      vacancy: vacancyId,
      user: user._id,
    });
    if (applyExist) {
      throw new Error('You have already applied for this vacancy');
    }
    const apply = await createApply({
      vacancy: vacancyId,
      user: user._id,
      status: STATUS_APPLY.PENDING,
      requirements,
      organization: vacancy.organization,
    });

    return res.status(200).json(apply);
  } catch (error) {
    throwError(res, error);
  }
};

exports.getAllApplies = async (req, res) => {
  try {
    const { user } = req;
    const { organizationId } = req.params;
    await checkOrganization(organizationId, user);
    const applies = await getApplies({
      userId: user._id,
      organizationId,
      query: req.query,
    });
    return res.status(200).json(applies);
  } catch (error) {
    throwError(res, error);
  }
};

exports.getAllAppliesForVacancy = async (req, res) => {
  try {
    const { user } = req;
    const { vacancyId } = req.params;
    const vacancy = await findVacancyById(vacancyId);
    if (!vacancy) {
      throw new Error('Vacancy is not exist');
    }
    if (vacancy.createdBy?._id?.toString() !== user._id.toString()) {
      throw new Error(
        'You do not have permission to get applies of this vacancy',
      );
    }
    const applies = await getApplies({
      userId: user._id,
      vacancyId,
      query: req.query,
    });
    return res.status(200).json(applies);
  } catch (error) {
    throwError(res, error);
  }
};

exports.getApply = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const apply = await findApply({ _id: id, user: user._id });
    if (!apply) {
      throw new Error('Apply is not exist');
    }
    return res.status(200).json(apply);
  } catch (error) {
    throwError(res, error);
  }
};

exports.sendToApplicant = async (req, res) => {
  try {
    const { user } = req;
    const { applyId } = req.params;
    const { status, message, timeInterview } = req.body;
    const apply = await findApply({ _id: applyId });
    if (!apply) {
      throw new Error('Apply is not exist');
    }
    const { organization } = apply;
    await checkOrganization(organization, user);
    await updateApply(applyId, {
      status,
      message,
      timeInterview,
    });
    return res.status(200).json(true);
  } catch (error) {
    throwError(res, error);
  }
};

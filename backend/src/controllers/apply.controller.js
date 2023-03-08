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
const mailConfig = require('../configs/mail.config');
const { findAccount } = require('../services/account.service');

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

    const { accountId } = apply.user;
    const account = await findAccount({ _id: accountId });
    if (!account) throw new Error('Applicant is not exist');

    const { organization } = apply;
    await checkOrganization(organization, user);
    await updateApply(applyId, {
      status,
      message,
      timeInterview,
    });
    let subjectEmail = `[${organization.name.toUpperCase()}]`;
    if (status === STATUS_APPLY.ACCEPTED) {
      subjectEmail += ` THƯ MỜI NHẬN VIỆC - ${apply.user.name.toUpperCase()} - VỊ TRÍ ${apply.vacancy.position.toUpperCase()}`;
    } else if (status === STATUS_APPLY.REJECTED) {
      subjectEmail += ` THƯ CẢM ƠN - ${apply.user.name.toUpperCase()} - VỊ TRÍ ${apply.vacancy.position.toUpperCase()}`;
    } else {
      subjectEmail += ` THƯ MỜI PHỎNG VẤN - ${apply.user.name.toUpperCase()} - VỊ TRÍ ${apply.vacancy.position.toUpperCase()}`;
    }

    const mail = {
      to: account.email,
      subject: subjectEmail,
      html: mailConfig.htmlApplicant(message.replace('\n', '<br/>')),
    };

    await mailConfig.sendEmail(mail);
    return res.status(200).json(true);
  } catch (error) {
    throwError(res, error);
  }
};

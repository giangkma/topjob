const { findOrganizationById } = require('../services/organization.service');
const { throwError } = require('../helper');
const {
  createVacancy,
  getVacancies,
  removeVacancy,
  findVacancyById,
  updateVacancy,
} = require('../services/vacancy.service');

exports.getVacancies = async (req, res) => {
  try {
    const { organizationId } = req.params;
    const { user } = req;
    const organization = await findOrganizationById(organizationId);
    if (!organization) {
      throw new Error('Organization is not exist');
    } else {
      const isExist = user.organizations.find(
        org => org.toString() === organizationId,
      );
      if (!isExist) {
        throw new Error(
          'You do not have permission to get vacancies of this organization',
        );
      }
    }
    const vacancies = await getVacancies(user._id, organizationId);
    return res.status(200).json(vacancies);
  } catch (error) {
    throwError(res, error);
  }
};

exports.getVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const vacancy = await findVacancyById(id);
    if (!vacancy) {
      throw new Error('Vacancy is not exist');
    } else {
      const isExist = user.organizations.find(
        org => org.toString() === vacancy.organization._id.toString(),
      );
      if (!isExist) {
        throw new Error(
          'You do not have permission to get this vacancy of this organization',
        );
      }
    }
    return res.status(200).json(vacancy);
  } catch (error) {
    throwError(res, error);
  }
};

exports.createVacancy = async (req, res) => {
  try {
    const { user } = req;
    const {
      position,
      salary,
      location,
      type,
      requirements,
      benefits,
      organizationId,
    } = req.body;
    const organization = await findOrganizationById(organizationId);
    if (!organization) {
      throw new Error('Organization is not exist');
    } else {
      const isExist = user.organizations.find(
        org => org.toString() === organizationId,
      );
      if (!isExist) {
        throw new Error(
          'You do not have permission to create vacancy for this organization',
        );
      }
    }

    const vacancy = await createVacancy({
      position,
      salary,
      location,
      type,
      requirements,
      benefits,
      organization: organizationId,
      createdBy: user._id,
    });

    return res.status(200).json(vacancy);
  } catch (error) {
    throwError(res, error);
  }
};

exports.removeVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const vacancy = await findVacancyById(id);
    if (!vacancy) {
      throw new Error('Vacancy is not exist');
    } else {
      const isExist = user.organizations.find(
        org => org.toString() === vacancy.organization._id.toString(),
      );
      if (!isExist) {
        throw new Error(
          'You do not have permission to remove vacancy of this organization',
        );
      }
    }
    await removeVacancy(id);
    return res.status(200).json({ message: 'Remove vacancy successfully' });
  } catch (error) {
    throwError(res, error);
  }
};

exports.updateVacancy = async (req, res) => {
  try {
    const { id } = req.params;
    const { user } = req;
    const { position, salary, location, type, requirements, benefits, status } =
      req.body;
    const vacancy = await findVacancyById(id);
    if (!vacancy) {
      throw new Error('Vacancy is not exist');
    } else {
      const isExist = user.organizations.find(
        org => org.toString() === vacancy.organization._id.toString(),
      );
      if (!isExist) {
        throw new Error(
          'You do not have permission to update vacancy of this organization',
        );
      }
    }
    const updatedVacancy = await updateVacancy(id, {
      position,
      salary,
      location,
      type,
      requirements,
      benefits,
      status,
    });
    return res.status(200).json(updatedVacancy);
  } catch (error) {
    throwError(res, error);
  }
};

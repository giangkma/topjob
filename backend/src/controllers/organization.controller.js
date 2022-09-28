const {
  createOrganization,
  findOrganizationByName,
  findOrganizationById,
} = require('../services/organization.service');
const { throwError } = require('../helper');

exports.createOranization = async (req, res) => {
  try {
    const { user } = req;
    const { name } = req.body;
    let organization = await findOrganizationByName(name);
    if (!organization) {
      organization = await createOrganization(req.body);
    } else {
      const isExist = user.organizations.find(
        org => org.toString() === organization._id.toString(),
      );
      if (isExist) {
        throw new Error('User is exist in organization');
      }
    }
    // add organization to user
    user.organizations.push(organization._id);
    await user.save();

    return res.status(200).json(organization);
  } catch (error) {
    throwError(res, error);
  }
};

const checkOrganization = async (id, user) => {
  const organization = await findOrganizationById(id);
  if (!organization) {
    throw new Error(
      'Organization is not exist. Please check your organization id',
    );
  }
  const isExist = user.organizations.find(
    org => org.toString() === organization._id.toString(),
  );
  if (!isExist) {
    throw new Error('You do not have permission to update this organization');
  }
  return organization;
};

exports.updateOrganization = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const { email, country, address, establishedDate, logo } = req.body;
    const organization = await checkOrganization(id, user);
    if (email) organization.email = email;
    if (country) organization.country = country;
    if (address) organization.address = address;
    if (establishedDate) organization.establishedDate = establishedDate;
    if (logo) organization.logo = logo;

    await organization.save();

    return res.status(200).json(organization);
  } catch (error) {
    throwError(res, error);
  }
};

exports.removeOrganization = async (req, res) => {
  try {
    const { user } = req;
    const { id } = req.params;
    const organization = await checkOrganization(id, user);
    // remove organization from user
    user.organizations = user.organizations.filter(
      org => org.toString() !== organization._id.toString(),
    );
    await user.save();

    return res.status(200).json(user);
  } catch (error) {
    throwError(res, error);
  }
};

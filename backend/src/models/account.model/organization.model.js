const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const organizationSchema = new Schema({
  name: { type: String, trim: true, required: true, unique: true },
  email: { type: String, trim: true, required: true },
  country: { type: String, trim: true, required: true },
  address: { type: String, trim: true, required: true },
  establishedDate: {
    type: Date,
    required: true,
  },
  logo: { type: String, trim: true, default: '' },
});

const OrganizationModel = mongoose.model(
  'organization',
  organizationSchema,
  'organizations',
);

module.exports = OrganizationModel;

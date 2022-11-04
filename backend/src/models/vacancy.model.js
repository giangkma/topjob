const mongoose = require('mongoose');
const { TYPES_VACANCY, STATUS_VACANCY } = require('../constant');
const Schema = mongoose.Schema;

const vacancySchema = new Schema({
  position: { type: String, trim: true, required: true },
  salary: { type: String, trim: true, required: true },
  location: { type: String, trim: true, required: true },
  image: { type: String, trim: true },
  type: {
    type: String,
    default: TYPES_VACANCY.FULL_TIME,
    enum: [
      TYPES_VACANCY.FULL_TIME,
      TYPES_VACANCY.PART_TIME,
      TYPES_VACANCY.FREELANCE,
    ],
  },
  requirements: [
    {
      type: String,
      trim: true,
      required: true,
    },
  ],
  benefits: [
    {
      type: String,
      trim: true,
      required: true,
    },
  ],
  organization: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'organization',
  },
  status: {
    type: String,
    default: STATUS_VACANCY.ACTIVE,
    enum: [STATUS_VACANCY.ACTIVE, STATUS_VACANCY.INACTIVE],
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  createdBy: { type: String, trim: true, required: true, ref: 'user' },
});

const VacancyModel = mongoose.model('vacancy', vacancySchema, 'vacancys');

module.exports = VacancyModel;

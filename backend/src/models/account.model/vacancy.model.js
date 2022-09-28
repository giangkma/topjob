const mongoose = require('mongoose');
const { TYPES_VACANCY } = require('../../constant');
const Schema = mongoose.Schema;

const vacancySchema = new Schema({
  position: { type: String, trim: true, required: true },
  salary: { type: String, trim: true, required: true },
  location: { type: String, trim: true, required: true },
  type: {
    type: String,
    default: TYPES_VACANCY.FULL_TIME,
    enum: [
      TYPES_VACANCY.FULL_TIME,
      TYPES_VACANCY.PART_TIME,
      TYPES_VACANCY.FREELANCE,
    ],
  },
  requiments: [
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
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
  createdBy: { type: String, trim: true, required: true },
});

const VacancyModel = mongoose.model('vacancy', vacancySchema, 'vacancys');

module.exports = VacancyModel;

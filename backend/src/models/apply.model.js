const mongoose = require('mongoose');
const { STATUS_APPLY } = require('../constant');
const Schema = mongoose.Schema;

const STATUS_APPLY_ENUM = Object.values(STATUS_APPLY);

const applySchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  vacancy: { type: Schema.Types.ObjectId, required: true, ref: 'vacancy' },
  organization: {
    type: Schema.Types.ObjectId,
    required: true,
    ref: 'organization',
  },
  status: {
    type: String,
    default: STATUS_APPLY.DRART,
    enum: STATUS_APPLY_ENUM,
  },
  requirements: [
    {
      type: String,
      trim: true,
      required: true,
    },
  ],
  message: {
    type: String,
    trim: true,
  },
  timeInterview: {
    type: Date,
  },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const ApplyModel = mongoose.model('apply', applySchema, 'applies');

module.exports = ApplyModel;

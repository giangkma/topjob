const mongoose = require('mongoose');
const { STATUS_APPLY } = require('../../constant');
const Schema = mongoose.Schema;

const applySchema = new Schema({
  user: { type: Schema.Types.ObjectId, required: true, ref: 'user' },
  vacancy: { type: Schema.Types.ObjectId, required: true, ref: 'vacancy' },
  status: {
    type: String,
    default: STATUS_APPLY.PENDING,
    enum: [STATUS_APPLY.PENDING, STATUS_APPLY.ACCEPTED, STATUS_APPLY.REJECTED],
  },
  score: { type: Number, default: 0 },
  createdDate: {
    type: Date,
    required: true,
    default: new Date(),
  },
});

const ApplyModel = mongoose.model('apply', applySchema, 'applies');

module.exports = ApplyModel;

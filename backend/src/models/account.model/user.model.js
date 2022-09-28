const mongoose = require('mongoose');
const { MAX, ROLES } = require('../../constant');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  accountId: { type: Schema.Types.ObjectId, required: true, ref: 'account' },
  name: { type: String, trim: true, required: true, maxLength: MAX.NAME_LEN },
  avatar: { type: String, trim: true, default: '' },
  role: {
    type: String,
    default: ROLES.DEFAULT,
    enum: [ROLES.DEFAULT, ROLES.ADMIN, ROLES.EMPLOYEE],
  },
  organizations: [
    {
      type: Schema.Types.ObjectId,
      ref: 'organization',
    },
  ],
});

const UserModel = mongoose.model('user', userSchema, 'users');

module.exports = UserModel;

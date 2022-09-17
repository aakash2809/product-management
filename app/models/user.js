const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');
//const logger = require('../../config/logger');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'email id alreay exist']
  },
  password: {
    type: String,
    required: true,
  },
},
{
  timestamps: true,
  autoIndex: false,
});

userSchema.set('versionKey', false);

userSchema.pre('save', async function (next) {
  this.password = await bycrypt.hash(this.password, 10);
  next();
});

//logger.info('inside model');
const User = mongoose.model('User', userSchema);

class UserModel {
  /**
    * @description save request data to database
    * @param {*} registrationData holds data to be saved in json formate
    * @param {*} callback holds a function
   */
  register = (registrationData, callback) => {
    console.log('TRACKED_PATH: Inside model');
    
    const userRegistration = new User(registrationData);
    userRegistration.save((error, registrationResult) => {
      if (error) {
        error = 'already registered';
        callback(error, null);
      } else {
        callback(null, registrationResult);
      }
    });
  }
}

module.exports = new UserModel();
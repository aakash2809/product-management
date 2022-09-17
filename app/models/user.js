const mongoose = require('mongoose');
const bycrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
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

   /**
      * @description find email id in database and validate
      * @param {*} loginCredential holds login credentials
      * @param {*} callback holds a function
     */
    getDetailOfGivenEmailId = (loginCredential, callback) => {
      const { email } = loginCredential;
      User.find({ email: `${email}` }, (error, loginResult) => {
          (error) ? callback(error, null) : callback(null, loginResult);
      });
  }

}

module.exports = new UserModel();
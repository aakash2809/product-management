//const bycrypt = require('bcryptjs');
// const EventEmitter = require('events');
const userModel = require('../models/user');
// const logger = require('../../config/logger');
// const jwtAuth = require('../middlewares/helper');
// const resposnsCode = require('../../util/staticFile.json');
// const helper = require('../middlewares/helper');

class UserServices {
 
  /**
   * @description save request data to database using model methods
   * @param {*} registrationData holds data to be saved in json formate
   * @param {*} callback holds a function
  */
  registerUser = (registrationData, callback) => {
    userModel.register(registrationData, async (error, registrationResult) => {
      if (error) {
        callback(error, null);
      } else {
        const response  = {
            success: true,
            statusCode: 200 ,
            message: `user registered sussefully by email ${ registrationResult.email }`,
          };
          console.log(`user registered sussefully by email ${ registrationResult.email }`);
        callback(null, response);
      }
    });
  }

}

module.exports = new UserServices();
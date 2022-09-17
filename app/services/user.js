const userModel = require('../models/user');
const bycrypt = require('bcryptjs');
const { genrateToken } = require('../middleware/helper')

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

   /**
      * @description validate credentials and return result accordingly to database using model methods
      * @param {*} loginCredentials
      * @param {*} callback holds a function
      */
    validateAndLogin = (loginCredentials, callback) => userModel.getDetailOfGivenEmailId(loginCredentials, (error, loginResult) => {
      let loginResponse = '';
      if (error) {
          error = {
              success: false,
              statusCode: 500,
              message: error,
          };
          callback(error, null);
      } else if (loginResult[0] == null) {
          loginResponse = {
              success: false,
              statusCode: 404,
              message: 'email id does not exist',
          };
          callback(null, loginResponse);
      } else {
          bycrypt.compare(loginCredentials.password, loginResult[0].password, (error, result) => {
               if (result) {
                 let token = genrateToken(loginResult[0])
                console.log('loginResult[0]', loginResult[0])
                  loginResponse = {
                      success: true,
                      statusCode: 200,
                      message: 'login successfull',
                      token: token,
                      user: loginResult,
                  };
                  callback(null, loginResponse);
              } else {
                  error = {
                      success: false,
                      statusCode: 401,
                      message: 'Invalid password',
                  };
                  callback(error, null);
              }
          });
      }
  })

}

module.exports = new UserServices();
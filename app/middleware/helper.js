var Buffer = require('buffer/').Buffer 

class Helper {

  /**
 * @description it genrate the token
 */
  genrateToken = (user) => {
    const tokenObject = {
        username: user.name,
        email: user.email,
        password: user.password,
        secret_key: process.env.SECRET_KEY
      };
      return Buffer.from(JSON.stringify(tokenObject)).toString('base64');
  };

  /**
   * @description this function verify the token
   */
  verifyToken = (request, response, next) => {
    try {
      const token = request.headers.authorization.split('Bearer ')[1];
      const decode = Buffer.from(JSON.stringify(token), 'base64').toString('ascii');
        if (token) {
          request.userData = JSON.parse(decode);;
          next();
        }
     ;
    } catch (error) {
      response.send({
        success: false,
        status_code: 400,
        message: 'Authentication failed',
      });
    }
  }; 
}

module.exports = new Helper();
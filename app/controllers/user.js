const userServices = require('../services/user');


class UserControllers {
    /**
   * @description add user to database
   * @param {*} request in json formate
   * @param {*} response sends response from server
   */
    register = (request, response) => {
        const registrationDetails = {
            name: request.body.name,
            email: request.body.email,
            password: request.body.password,
            confirmPassword: request.body.confirmPassword,
        };
        if (request.body.password != request.body.confirmPassword) {
            response.send({
                success: false,
                status_code: 400,
                message: 'password does not match with confirm password',
            });
            return;
        }

        console.log('INVOKING: registerUser method of services');
        userServices.registerUser(
            registrationDetails,
            (error, registrationResult) => {
                error
                    ? response.send({
                        success: error.success,
                        status_code: error.statusCode,
                        message: error.message,
                    })
                    : response.send({
                        success: registrationResult.success,
                        status_code: 200,
                        message: registrationResult.message,
                    });
                console.log('SUCCESS001: User registered successfully');
            },
        );
    };

    /**
   * @description login to database
   * @param {*} request
   * @param {*} response
   */
    login = (request, response) => {
        console.log('TRACKED_PATH: Inside controller');
        const loginDetails = {
            email: request.body.email,
            password: request.body.password,
        };
        console.log(
            'INVOKING: getLoginCredentialAndCallForValidation method of login services',
        );
        userServices.validateAndLogin(
            loginDetails,
            (error, loginResult) => {
                error
                    ? response.send({
                        success: error.success,
                        statusCode: error.statusCode,
                        message: error.message,
                    })
                    : response.send({
                        success: loginResult.success,
                        statusCode: loginResult.statusCode,
                        token: loginResult.token,
                        message: loginResult.message,
                    });
            },
        );
    };
}

module.exports = new UserControllers();
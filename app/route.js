const { register, login } = require('./controllers/user');

class Routes {
    routeToController = (app) => {
      // register a new user
      app.post('/register', register);

       // user login
      app.post('/login', login);
    
    }
  }
  
module.exports = new Routes();

const { register } = require('./controllers/user');

class Routes {
    routeToController = (app) => {
      // register a new user
      app.post('/register', register);
    
    }
  }
  
module.exports = new Routes();

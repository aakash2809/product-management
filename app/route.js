const { register, login, } = require('./controllers/user');
const { addCategory, updateCategoryByCategoryId, deleteCategryByCategryId } = require('./controllers/category');
const { verifyToken } = require('./middleware/helper');

class Routes {
    routeToController = (app) => {
      // register a new user
      app.post('/register', register);
       // user login
      app.post('/login', login);


      // Update category by categoryId
      app.post('/add/Category', verifyToken, addCategory);
      // Update category by category Id
      app.put('/update/category',verifyToken, updateCategoryByCategoryId);
      // Delete a category with categoryId
      app.delete('/delete/category',verifyToken, deleteCategryByCategryId);
    }
  }
  
module.exports = new Routes();

const { register, login, } = require('./controllers/user');
const { addCategory, updateCategoryByCategoryId, deleteCategryByCategryId } = require('./controllers/category');
const { addProduct, getAllproduct, updateNoteByNoteId, deleteProduct } = require('./controllers/product');
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


      // Create a new product
      app.post('/add/product', verifyToken, addProduct);
      // Retrieve all product
      app.get('/all/product', verifyToken, getAllproduct);
      //delete product
      app.delete('/delete/product:productId', verifyToken, deleteProduct);
     // Update a product detail with product Id
      app.put('/update/product/:productId', verifyToken, updateNoteByNoteId);
    }
  }
  
module.exports = new Routes();

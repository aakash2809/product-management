const categoryServices = require('../services/category');
class CategoryController {
  /**
   * @description  add Category to database
   * @param {*} request takes Category in json formate
   * @param {*} response sends response from server
   */
  addCategory = async (request, response) => {
    try {
      console.log('TRACKED_PATH: Inside controller');
      const categoryDetails = {
        category_name: request.body.category,
        userId: request.userData.userId,
      };

      console.log('INVOKING: save method of services');
      const result = await categoryServices.saveCategoryData(categoryDetails);
      console.log('SUCCESS001: Category inserted successfully');
      response.send({
        success: true,
        status_code: 200,
        message: 'Category inserted successfully',
      });
    } catch (error) {
      console.log(`ERR001: ${error}`);
      response.send({
        success: false,
        status_code: 400,
        message: `error in insert note ${error}`,
      });
    }
  }


  /**
   * @description update Category by _id
   * @param {*} request
   * @param {*} response sends response from server
   */
  updateCategoryByCategoryId = async (request, response) => {
    console.log('TRACKED_PATH: Inside controller');
    try {
      const result = await categoryServices.updateCategoryByCategoryId(request.body.categoryId, { category_name: request.body.category }, request.userData.userId);
      console.log('Category updated successfully');
      response.send({
        success: result.success,
        status_code: result.statusCode,
        message: result.message,
      });
    } catch (error) {
      console.log(`ERR004: Internal server error ${error}`);
      response.send({
        success: false,
        status_code: 500,
        message: 'Internal server error',
      });
    }
  };

  /**
   * @description delete Category by _id
   * @param {*} request 
   * @param {*} response sends response from server
   */
  deleteCategryByCategryId = async (request, response) => {
    console.log('TRACKED_PATH: Inside controller');
    try {
      const result = await categoryServices.removeCatgoryByCategoryId(request.body.categoryId, request.userData.userId);
      response.send({
        success: result.success,
        status_code: result.statusCode,
        message: result.message,
      });
    } catch (error) {
        console.log(`ERR005: category_name not found with id ${request.body.categoryId}`);
      response.send({
        success: false,
        status_code: 500,
        message: 'Internal server error',
      });
    }
  };
}

module.exports = new CategoryController();
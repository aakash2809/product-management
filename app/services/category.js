const categoryModel = require('../models/category');

class CategoryServices {
  /**
   * @description save request data to database using model methods
   * @param {*}  categoryData data to be saved in json formate
   */
   saveCategoryData = async (categoryData) => {
    try {
      return await categoryModel.saveCategory(categoryData);
    } catch (error) {
      return error;
    }
  }

  
  /**
   * @description remove category from database using model's mothod
   * @param {*}  categoryId holds category Object id
   *  @param {*}  userId holds user Object id
   */
   removeCatgoryByCategoryId = async (categoryId, userId) => {
    console.log('TRACKED_PATH: Inside services');
    try {
      const result = await categoryModel.deleteCatgoryByCategoryId(categoryId);
      let responseResult = '';
      if (result == null) {
        responseResult = {
          success: false,
          statusCode: 404,
          message: `CategoryId not found with ${categoryId}`,
        };
        return responseResult;
      }
      responseResult = {
        success: true,
        statusCode: 200,
        message: 'Category deleted successfully!',
      };
      return responseResult;
    } catch (error) {
      return error;
    }
  }

  /**
   * @description update category data existed in database, using model's mothod
   * @param {*} categoryId holds _id that is categoryId
   * @param {*} dataToReplace takes data to be upadated in json formate
   */
   updateCategoryByCategoryId= async (categoryId, dataToReplace, userId) => {
   console.log('TRACKED_PATH: Inside services');
    try {
      const result = await categoryModel.updateCatgoryByCategoryId(categoryId, dataToReplace);

      let responseResult = '';
      if (result == null) {
        responseResult = {
          success: false,
          statusCode: 404,
          message: `category not found with ${categoryId}`,
        };

        return responseResult;
      }
      responseResult = {
        success: true,
        statusCode: 200,
        message: 'category updated successfully!',
      };

      return responseResult;
    } catch (error) {
      return error;
    }
  }
}

module.exports = new CategoryServices();
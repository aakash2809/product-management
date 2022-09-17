const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    category_name: {
    type: String,
    required: true,
    unique: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
},
{
  timestamps: true,
});

categorySchema.set('versionKey', false);

const Category = mongoose.model('Category', categorySchema);

class CategoryModel {
  /**
   * @description save request category data to database
   * @param {*} catgoryData holds data to be saved in json formate
   */
   saveCategory = (catgoryData ) => new Promise((resolve, reject) => {
    const category = new Category(catgoryData );
    category.save((error, categoryResult) => {
      if (error) {
        return reject(error);
      }
      return resolve(categoryResult);
    });
  })

  /**
   * @description remove category data from database
   * @param {*}categoryId holds _id that is category id
   */
   deleteCatgoryByCategoryId = (categoryId) => new Promise((resolve, reject) => {
    Category.findByIdAndDelete({_id: categoryId}, (error, categoryResult) => {
      if (error) {
        return reject(error);
      }
      return resolve(categoryResult);
    });
  })

  /**
   * @description update category data existed in database
   * @param {*} categoryId holds _id that is categoryId
   * @param {*} dataToUpdate takes data to be upadated in json formate
   */
   updateCatgoryByCategoryId = (categoryId, dataToUpdate) => new Promise((resolve, reject) => {
    Category.findByIdAndUpdate({_id: categoryId}, dataToUpdate, { new: true }, (error, categoryResult) => {
      if (error) {
        return reject(error);
      }
      return resolve(categoryResult);
    });
  })
}

module.exports = new CategoryModel();
const productModel = require('../models/product');

class ProductService {
    /**
     * @description calling model class method to add new product to schema
     * @method save is model class method
     * @param {*} productData holds product detail
     * @returns callback function
     */
    addProduct = async (productData) => await productModel.save(productData, (error, data) => {
        (error) || data;
    })

    /**
     * @description get products
     * @method getAllproducts is a model class method
     */
    getProducts = (callback) => {
        productModel.getProducts(((error, data) => error ? callback(error, null): callback(null, data)))
    }

    /**
     * @description update a product by id
     * @method update is model class methodholds productdata
     * @param {*}productData holds user input update data
     * @param {*} callback is for controller class methods
     * @returns callback
     */
    updateProduct = (productData, callback) => productModel.update(productData, (error, data) => ((error) ? callback(error, null) : callback(null, data)))

    /**
     * @description delete a product by its id
     * @param {*} productData holds user input data
     * @param {*} callback is for controller class method
     * @method delete is models class method
     * @returns callback
     */
    deleteProduct = (productData, callback) => productModel.delete(productData, (error, data) => ((error) ? callback(error, null) : callback(null, data)))

}

module.exports = new ProductService();
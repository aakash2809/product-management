const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    title: {
    type: String,
    required: true,
    unique: true
  },
  description:{
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
},
  photo: {
    type: String,
    required: true,
},
  attribute:[Object],
  categoryId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
},

},
{
  timestamps: true,
});

const Product = mongoose.model('Product', productSchema);

class ProductModel {
    /**
     * @description saving Product into buckets
     * @param {*} productData holds user input data
     * @param {*} callback is for service class method
     */
    save = async (productData, callback) => {
        const product = new Product(productData);
        await product.save((error, productResult) => {
            error ? callback(error, null) : callback(null, productResult);
        });
    }

    /**
     * @description get products from database
     * @param {*} callback is for service class holds error and user
     */
    getProducts = async (callback) => {
        try{
            let result = await Product.find({})
            callback(null, result);
        }catch(error){
            callback(error, null);
        }
    }

    /**
     * @description update a product
     * @param {*} productData
     * @param {*} callback
     */
    update = async (productData, callback) => {
        const { productId } = productData;
        await Product.findByIdAndUpdate({_id: productId}, productData, { new: true }, (error, result) => {
            if (error) {
              return callback(error, null);;
            }
            return callback(null, result);;
          });
    }

    /**
     * @description delete a product
     * @param {*} productData
     * @param {*} callback
     * @returns data of remove method
     */
    delete = (productData, callback) => {
        Product.findByIdAndDelete({_id: productData.productId}, (error, productResult) => {
            error ? callback(error, null) : callback(null, productResult);
        });
    }
}

module.exports = new ProductModel();
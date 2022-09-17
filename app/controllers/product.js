
const productService = require('../services/product');

class ProductController {
    /**
     * @description add product to database
     * @param {*} request takes product detail in json formate
     * @param {*} response sends response from server
     */
   /**
     * @description add new product to 
     * @method addProduct is a service class method
     * @param {req, res}
     */
    addProduct = (req, res) => {
        try {
            const prodctData = {
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                photo: req.body.photo,
                attribute: req.body.attribute,
                categoryId: req.body.categoryId
            };
            productService.addProduct(prodctData)
                .then((data) => {
                    console.log('product added successfully !');
                    res.send({
                        status: 200,
                        message: 'product added successfully !',
                        data,
                    });
                })
                .catch((error) => {
                    console.log('Some error occurred while creating Product', error);
                    res.send({
                        status: 500,
                        message: 'Some error occurred while creating Product',
                    });
                });
        } catch (error) {
            console.log('Some error occurred while inserting a Product');
            res.send({
                status: 500,
                message: `Some error occurred while inserting ${error}`,
            });
        }
    }
 
    /**
     * @description find all product in database
     * @method getBooks is service class method
     * @param {*} req holds user input
     * @param {*} res sends responce with data coming from Database
     */
     getAllproduct = (req, res) => {
        try {
            productService.getProducts((error, data) => {
                if (error) {
                    return res.status(500).send({
                        success: false,
                        message: error.message,
                    });
                } if (data.length == 0) {
                    console.log('product not found');
                    return res.status(404).send({
                        success: false,
                        message: 'product not found',
                    });
                }
                console.log('Successfully retrieved products !');
                return res.status(200).send({
                    success: true,
                    message: 'Successfully retrieved products !',
                    data,
                });
            });
        } catch (error) {
            console.log('Some error occurred !');
            res.status(500).send({
                success: false,
                message: `Some error occurred !${error}`,
            });
        }
    }

    /**
     * @description update product in database
     * @method update is service class method
     * @param res is used to send the response
     */
     updateProductByProductId = (req, res) => {
        try {
            const prodctData = {
                productId:req.body.productId,
                title: req.body.title,
                price: req.body.price,
                description: req.body.description,
                photo: req.body.photo,
                attribute: req.body.attribute,
                categoryId: req.body.categoryId
            };
            productService.updateProduct(prodctData, (error, data) => (
                error
                    ? (console.log(`Error updating product with id : ${req.body.productId}`),
                        res.send({
                            status_code: 500,
                            message: `Error updating product with id : ${req.body.productId}${error}`,
                        }))
                    : !data
                        ? (console.log(`product not found with id : ${req.body.productId}${error}`),
                            res.send({
                                status_code: 400,
                                message: `product not found with id : ${req.body.productId}${error}`,
                            }))
                        : console.log('product updated successfully !'),
                res.send({
                    status_code: 200,
                    message: 'product updated successfully !',
                    data,
                })
            ));
        } catch (error) {
            return (
                error.kind === 'ObjectId'
                    ? (console.log(`product not found with id ${error}${req.body.productId}`),
                        res.send({
                            status_code: 404,
                            message: `product not found with id ${error}${req.body.productId}`,
                        }))
                    : console.log(`Error updating product with id ${error}${req.body.productId}`),
                res.send({
                    status_code: 500,
                    message: `Error updating product with id ${error}${req.body.productId}`,
                })
            );
        }
    };

    /**
     * @description delet product with id
     * @method delete is service class method
     * @param response is used to send the response
     */
     deleteProduct = (req, res) => {
        try {
            const productData = {
                productId: req.body.productId,
            };
            productService.deleteProduct(productData, (error, data) => (
                error
                    ? (console.log(`product not found with id ${req.body.productId}`),
                        res.send({
                            status_code: 200,
                            message: `product not found with id ${req.body.productId}`,
                        }))
                    : console.log('product deleted successfully!'),
                res.send({
                    status_code: 200,
                    message: 'product deleted successfully!',
                })
            ));
        } catch (error) {
            return (
                error.kind === 'ObjectId' || error.title === 'NotFound'
                    ? (console.log(`could not found  with id${req.body.productId}`),
                        res.send({
                            status_code: 404,
                            message: `product not found with id ${req.body.productId}`,
                        }))
                    : console.log(`Could not product with id ${req.body.productId}`),
                res.send({
                    status_code: 500,
                    message: `Could not delete product with id ${req.body.productId}`,
                })
            );
        }
    }

  }
  
  module.exports = new ProductController();
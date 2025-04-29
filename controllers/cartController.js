const Product = require("../models/Product");
const { STATUS_CODE } = require("../constants/statusCode");
const Cart = require("../models/cart");

exports.addProductToCart = (request, response) => {
    try {
      const { name, description, price } = request.body;
  
      const newProduct = new Product(name, description, parseFloat(price));
      Product.add(newProduct);     
      Cart.add(name);              
  
      response.status(STATUS_CODE.FOUND).redirect('/products/new'); 
    } catch (error) {
      response.status(STATUS_CODE.NOT_FOUND).send({ error: error.message });
    }
  };
  
  exports.getProductsCount = (request, response) => {
    const totalQuantity = Cart.getProductsQuantity();
    response.status(STATUS_CODE.OK).json({ totalQuantity });
  };
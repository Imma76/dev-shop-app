/* eslint-disable class-methods-use-this */
import _ from 'lodash';
// import multer from "multer";
import productModel from '../models/product.model.js';

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads/");
//   },
//   filename: (req, file, cb) => {
//     cb(null, file.originalname);
//   },
// });
// const upload = multer({ storage: storage });
class ProductController {
  async createProduct(req, res, next) {
    const data = {
      name: req.body.name,
      price: req.body.price,
      productImage: req.file.path
    };

    const product = await productModel.create(data);

    return res.status(201).send({ status: true, body: product });
  }

  async findProduct(req, res) {
    const product = await productModel.findById(req.params.id);
    if (_.isEmpty(product)) {
      return res
        .status(404)
        .send({ status: true, message: 'no product found' });
    }
    return res.status(200).send({ status: true, body: product });
  }

  async getProduct(req, res) {
    const product = await productModel.find({});
    if (_.isEmpty(product)) {
      return res
        .status(404)
        .send({ status: true, length: 0, message: 'no product found' });
    }

    return res
      .status(200)
      .send({
        status: true,
        length: product.length,
        body: product.map((doc) => ({
          name: doc.name,
          price: doc.price,
          productImage: doc.productImage,
          _id: doc._id,
          request: {
            type: 'GET',
            url: `${process.env.dev_route}${doc.productImage}`
          }
        }))
      });
  }

  async deleteProduct(req, res) {
    const product = await productModel.remove({ _id: req.params.id });
    if (_.isEmpty(product)) {
      return res
        .status(404)
        .send({ status: true, message: 'no product found' });
    }
    return res.status(200).send({ status: true, body: 'product deleted' });
  }
}

export default new ProductController();

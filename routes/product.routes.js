import express from 'express';
import multer from 'multer';
import productController from '../controllers/product.controller.js';

import checkAuth from '../middlewares/auth.middlewares.js';

const productRouter = express.Router();

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage });
productRouter.get('/', productController.getProduct);
productRouter.post('/', upload.single('productImage'), checkAuth, productController.createProduct);
productRouter.get('/:id', checkAuth, productController.findProduct);
productRouter.delete('/:id', checkAuth, productController.deleteProduct);

export default productRouter;

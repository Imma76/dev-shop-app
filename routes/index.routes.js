import express from 'express';
import productRouter from './product.routes.js';
import orderRouter from './orders.routes.js';
import userRouter from './user.routes.js';

const router = express.Router();

router.use('/products', productRouter);

router.use('/orders', orderRouter);

router.use('/users', userRouter);
export default router;

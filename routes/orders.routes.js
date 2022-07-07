import express from 'express';
import orderController from '../controllers/order.controller.js';
import checkAuth from '../middlewares/auth.middlewares.js';

const orderRouter = express.Router();

orderRouter.get('/', orderController.getOrder);
orderRouter.post('/', checkAuth, orderController.createorder);
orderRouter.get('/:id', checkAuth, orderController.findOrder);
orderRouter.delete('/:id', checkAuth, orderController.deleteOrder);

export default orderRouter;

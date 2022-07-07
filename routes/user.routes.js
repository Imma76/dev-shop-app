import express from 'express';
import userController from '../controllers/user.controller.js';
import checkAuth from '../middlewares/auth.middlewares.js';

const userRouter = express.Router();

userRouter.post('/login', userController.loginUser);
userRouter.post('/signup', userController.createUser);
userRouter.get('/:id', checkAuth, userController.findUser);
userRouter.delete('/:id', checkAuth, userController.deleteUser);

export default userRouter;

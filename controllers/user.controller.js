/* eslint-disable consistent-return */
/* eslint-disable new-cap */
/* eslint-disable class-methods-use-this */
import _ from 'lodash';
// import multer from "multer";
import bcrypt from 'bcryptjs';

import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';

class UserController {
  async createUser(req, res) {
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) {
        return res.status(500).send({ status: false, message: err });
      }

      const body = {
        email: req.body.email,
        password: hash
      };
      const user = new userModel(body);
      user
        .save()
        .then((result) => console.log(result))
        .catch((err) => console.log(err));
      return res.status(201).send({ status: true, message: 'user created successfully', body: { email: user.email } });
    });
  }

  async loginUser(req, res) {
    const user = await userModel.findOne({ email: req.body.email });

    if (_.isEmpty(user)) {
      return res.status(404).send({ status: false, message: 'user does not exist' });
    }
    bcrypt.compare(
      req.body.password,
      user.password,

      (err, success) => {
        if (!success) {
          return res.status(400).send({ status: false, message: 'Auth failed' });
        }
        console.log(user);
        const token = jwt.sign({ email: user.email, id: user._id }, process.env.JWT_SECRET, { expiresIn: '1hr' });
        return res.status(200).send({
          status: true,
          data: {
            message:
                                'logged in successfully',
            body: {
              email: user.email, token: token
            }
          }
        });
      }
    );
  }

  async findUser(req, res) {
    const user = await userModel.findById(req.params.id);
    if (_.isEmpty(user)) {
      return res
        .status(404)
        .send({ status: true, message: 'no user found' });
    }
    return res.status(200).send({ status: true, body: user });
  }

  async getUser(req, res) {
    const user = await userModel.find({});
    if (_.isEmpty(UserController)) {
      return res
        .status(404)
        .send({ status: true, length: 0, message: 'no user found' });
    }
    return res
      .status(200)
      .send({ status: true, length: product.length, body: user });
  }

  async deleteUser(req, res) {
    const user = await userModel.remove({ _id: req.params.id });
    if (_.isEmpty(user)) {
      return res
        .status(404)
        .send({ status: true, message: 'no user found' });
    }
    return res.status(200).send({ status: true, body: 'user deleted' });
  }
}

export default new UserController();

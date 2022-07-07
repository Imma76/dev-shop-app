import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);

    req.userData = decode;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'auth failed' });
  }
};

export default checkAuth;

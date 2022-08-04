/* eslint-disable consistent-return */
import jwt from 'jsonwebtoken';

const checkAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    const token = authHeader && authHeader.split(' ')[1];

    const decode = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userData = decode;
    next();
  } catch (error) {
    return res.status(401).send({ message: 'auth failed' });
  }
};

export default checkAuth;

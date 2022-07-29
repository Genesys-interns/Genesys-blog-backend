/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import UserService from '../services/user.service.js';

dotenv.config();

class UserController {
  /**
     * Verifies if email is correct, through verifying a token
     * This suppose to render html, that uses fetch or
     * axios api to make a request
    */
  async verifyEmail(req, res) {
    const { token } = req.query;

    const decoded = jwt.verify(token, process.env.SECRET);

    const user = await UserService.findById(decoded._id);
    if (!user) return res.status(404).send({ success: false, message: 'user not found' });
    if (user.verifiedAt) return res.status(200).send({ success: false, message: 'user already verified' });

    user.verifiedAt = new Date();

    await user.save();

    return res.header('token', token).send({
      success: true,
      message: 'email verified',
      data: user
    });
  }
}

export default new UserController();

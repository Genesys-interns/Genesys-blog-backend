/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import _ from 'lodash';
import UserService from '../services/user.service.js';
import { transporter } from '../config/mail.config.js';

dotenv.config();
class UserController {
  async sendVerificationEmail(req, res) {
    const user = await UserService.findOne({ email: req.body.email });
    // console.log(user)
    if (_.isEmpty(user)) {
      return res.status(404).send({
        success: false,
        message: 'invalid email'
      });
    }

    const verificationToken = user.generateAuthToken();
    const url = `http://localhost:4011/sendEmail/verify/${verificationToken}`;

    transporter.sendMail({
      to: req.body.email,
      subject: 'Verify Account',
      html: `Click <a href = ${url}>here</a> to confirm your email.`
    });

    return res.status(201).send({
      message: `Sent a verification email to ${req.body.email}`
    });
  }

  async verify(req, res) {
    const { token } = req.params;
    // Check we have an id
    if (!token) {
      return res.status(422).send({
        message: 'Missing Token'
      });
    }
    // Step 1 -  Verify the token from the URL
    // let payload = null;
    const decoded = jwt.verify(
      token,
      process.env.SECRET
    );

    // Step 2 - Find user with matching ID
    const user = await UserService.findById(decoded._id);
    console.log(user);
    if (!user) {
      return res.status(404).send({
        message: 'User does not exists'
      });
    }
    // Step 3 - Update user verification status to true
    // user.verified = true;
    await UserService.create(user);

    return res.status(200).send({
      message: 'Account Verified'
    });
  }
}

export default new UserController();

/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import userService from '../services/user.service.v2.js';
import postController from './post.controller.v2.js';

import UserService from '../services/user.service.js';
import { transporter, mailGenerator } from '../config/mail.js';
import commentController from './comment.controller.v2.js';


class UserControllerV2 {
  async create(req, res) {
    const user = await UserService.findByEmail(req.body);
    if (!_.isEmpty(user)) {
      return res.status(400).send({
        success: false,
        message: 'User already exists'
      });
    }
    const data = {

      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      confirmPassword: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    };
    const newUser = await UserService.create(data);

    const verificationToken = newUser.generateToken();
    const url = `${process.env.APP_URL}/api/v1/users/verify/${verificationToken}`;
    const response = {
      body: {
        name: `${req.body.firstName} ${req.body.lastName}`,
        intro: 'Email Verification Link',
        action: {
          instructions:
              'If you did not request for this mail, Please Ignore it. To Verify your Email password, click on the link below:',
          button: {
            text: 'Verify Email',
            link: url
          }
        },
        outro: 'Do not share this link with anyone.'
      }
    };

    const mail = mailGenerator.generate(response);

    const message = {
      from: 'Genesys-Blog <genesysblogapp@gmail.com>',
      to: req.body.email,
      subject: 'Verify Your Email',
      html: mail
    };

    await transporter.sendMail(message);

    return res.status(201).send({
      message: `Sent a verification email to ${req.body.email}`
    });
  }

  async loginUser(req, res) {
    const user = await userService.findByEmail(req.body);
    if (_.isEmpty(user)) {
      return res.status(404).send({ success: false, body: 'user does not exist' });
    }
    const verifyPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!verifyPassword) {
      return res.status(404).send({ success: false, message: 'email or password is invalid' });
    }
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '200h', algorithm: 'HS512' });
    return res.status(200).send({
      success: true,
      body: {
        message: 'user logged in successfully',
        token,
        data: user
      }
    });
  }

  async fetchUserDetails(req, res) {
    const articles = await postController.fetchUserArticle(req.params.id);
    const comments = await commentController.getUsersComments(req.params.id);

    const userData = {
      postLength: articles.length, reactions: comments.length , userPost: articles
    };
    return res.status(200).send({ status: true, body: userData });
  }

  async updateUserPhoto(req, res) {
    cloudinary.config({
      cloud_name: process.env.CLOUD_NAME,
      api_key: process.env.API_KEY,
      api_secret: process.env.API_SECRET
    });
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    const data = { photo: result.url };

    const update = await userService.updateUserImage(req.body.id, data);
    if (update.acknowledged === true) {
      return res.status(201).send({ status: true, message: 'image uploaded successfully' });
    }
    return res.status(200).send({ status: false, message: 'couldn\'t upload image...try again later!' });
  }
}
export default new UserControllerV2();

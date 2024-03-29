/* eslint-disable no-underscore-dangle */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
/* eslint-disable no-unused-vars */
import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import { transporter, mailGenerator } from '../config/mail.js';
import UserService from '../services/user.service.js';
import postController from './post.controller.js';
import commentController from './comment.controller.js';

dotenv.config();
class UserController {
  async create(req, res) {
    const user = await UserService.findByEmail(req.body);
    if (!_.isEmpty(user)) {
      return res.status(400).send({
        success: false,
        message: 'User already exists'
      });
    }
    const data = {

      email: req.body.email.toLowerCase(),
      password: bcrypt.hashSync(req.body.password, 10),
      confirmPassword: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    };

    const compare = bcrypt.compareSync(data.confirmPassword, data.password);
    if (!compare) {
      res.send({
        message: 'confirm password and password mismatch'
      });
    }
    const newUser = await UserService.create(data);

    const verificationToken = newUser.generateToken();
    const url = `${process.env.APP_URL}users/verify/${verificationToken}`;

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
    const user = await UserService.findByEmail(req.body);
    if (_.isEmpty(user)) {
      return res.status(404).send({ success: false, body: 'user does not exist' });
    }
    const verifyPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!verifyPassword) {
      return res.status(400).send({ success: false, message: 'email or password is invalid' });
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
      postLength: articles.length, reactions: comments.length, userPost: articles
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

    const update = await UserService.updateUserImage(req.body.id, data);
    if (update.acknowledged === true) {
      return res.status(201).send({ status: true, message: 'image uploaded successfully' });
    }
    return res.status(200).send({ status: false, message: 'couldn\'t upload image...try again later!' });
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
    const decoded = jwt.verify(
      token,
      process.env.TOKEN_SECRET
    );
    const user = await UserService.findOne({ _id: decoded._id });
    if (!user) {
      return res.status(404).send({
        message: 'User does not  exists'
      });
    }
    // Step 3 - Update user verification status to true
    user.verified = true;
    await user.save();

    return res.status(200).send({
      message: 'Account Verified'
    });
  }

  async getUsers(req, res) {
    const users = await UserService.findAll();
    if (_.isEmpty(users)) {
      return res.status(200).send({
        success: true,
        message: 'No users found'
      });
    }
    return res.status(200).send({
      success: true,
      data: users
    });
  }
}

export default new UserController();

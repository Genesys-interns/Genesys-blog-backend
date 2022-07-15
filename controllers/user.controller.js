/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import _ from 'lodash';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UserService from '../services/user.service.js';

class UserController {
  async create(req, res) {
    const user = UserService.findByEmail(req.body);
    if (!_.isEmpty(user)) {
      return res.status(404).send({
        success: false,
        message: 'User already exists'
      });
    }
    // const hashPassword = async (password) => {
    //   try {
    //     const salt = await bcrypt.genSalt(10);
    //     return await bcrypt.hash(password, salt);
    //   } catch (error) {
    //     throw new Error('Hashing failed', error);
    //   }
    // };
    const data = {

      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 10),
      confirmPassword: req.body.password,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    };
    const newUser = await UserService.create(data);
    return res.status(201).send({
      success: true,
      message: 'User created successfully',
      data: newUser
    });
  }

  async loginUser(req, res) {
      const user = await UserService.findByEmail(req.body);
      console.log(user);
    if (_.isEmpty(user)) {
      return res.status(404).send({ success: false, body: 'user does not exist' });
    }
    const verifyPassword = bcrypt.compareSync(req.body.password, user.password);
    if (!verifyPassword) {
      return res.status(404).send({ success: false, message: 'email or password is invalid' });
    }
    const token = jwt.sign({ _id: user._id, email: user.email }, process.env.TOKEN_SECRET, { expiresIn: '23hrs', algorithm: 'HS512' });
    return res.status(200).send({
      success: true,
      body: {
        message: 'user logged in successfully',
        data: { email: user.email, token }
      }
    });
  }
}
export default new UserController();

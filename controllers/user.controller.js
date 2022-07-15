/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import _ from 'lodash';
import bcrypt from 'bcrypt';
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
}

export default new UserController();

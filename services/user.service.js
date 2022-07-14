/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { User } from '../models/user.model.js';

class UserService {
  async create(data) {
    const newUser = await User.create(data);
    return newUser;
  }
}

export default new UserService();

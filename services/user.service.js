/* eslint-disable lines-between-class-members */
/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import { User } from '../models/user.model.js';

class UserService {
  async create(data) {
    const newUser = await User.create(data);
    return newUser;
  }

  async findByEmail(data) {
    const user = await User.findOne({ email: data.email });
    return user;
  }
  async createG(data) {
    const newUser = await User.create(data);
    return newUser;
  }

  async findUser({ googleId }) {
    const googleid = await User.findOne({ googleId });
    return googleid;
     }
}

export default new UserService();

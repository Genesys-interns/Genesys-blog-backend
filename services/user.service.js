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

  async findUserByGoogle(googleId) {
    const googleid = await User.findOne({ googleId });
    return googleid;
  }
  async fetchUserDetails(id) {
    const user = await User.findOne({ _id: id });
    return user;
  }
  async updateUserImage(id, data) {
    const user = await User.updateOne({ _id: id }, data, { runValidators: true });
    return user;
  }
  async findOne(filter = {}) {
    const user = await User.findOne(filter);
    return user;
  }
}

export default new UserService();

/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import User from '../models/user.model.js';

class Userservice {
  async createG(data) {
    const newUser = await User.create(data);
    return newUser;
  }

  async findUser({ googleId }) {
    const googleid = await User.findOne({ googleId });
    return googleid;
  }
}

export default new Userservice();

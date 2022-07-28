/* eslint-disable import/extensions */
/* eslint-disable class-methods-use-this */
import UserVerification from '../models/userVerification.model.js';

class Userservice {
  async createVerifiedUser(data) {
    const verifiedUser = await UserVerification.create(data);
    return verifiedUser;
  }

  async findVerifiedUser(id) {
    const verifiedUser = await UserVerification.findOne({ id });
    return verifiedUser;
  }

  async deleteVerifiedUser(id) {
    const verifiedUser = await UserVerification.deleteOne({ _id: id });
    return verifiedUser;
  }

  async updateUser(id, data) {
    const verifiedUser = await UserVerification.updateOne(
      { _id: id },
      data,
      { runValidators: true }
    );
    return verifiedUser;
  }
}

export default new Userservice();

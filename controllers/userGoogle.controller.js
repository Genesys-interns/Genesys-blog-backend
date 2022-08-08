/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import dotenv from 'dotenv';

dotenv.config();

class UserGoogleController {
  async authUser(req, res) {
    res.status(200).send('Authenticated user');
  }
}

export default new UserGoogleController();

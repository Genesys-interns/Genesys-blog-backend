/* eslint-disable class-methods-use-this */
/* eslint-disable import/extensions */
import User from '../models/user.model.js';

// const base = `${process.env.APP_URL}${process.env.BASE_PATH}`;

class UserService {
  /**
 * Send a verification mail to this user on signup
 * used at: user-controller
 */
  // /async sendVerificationMail(user, token) {
  // // send mail
  //   const response = {
  //     body: {
  //       name: `${user.firstName} ${user.lastName}`,
  //       intro: 'Welcome to Genesys Blog app',
  //       action: {
  //         instructions: 'To continue, please click here:',
  //         button: {
  //           text: 'Verify your account',
  //           link: `${base}/users/verify-email?token=${token}`
  //         }
  //       },
  //       outro: 'Thanks for signing up. Enjoy the Blog..'
  //     }
  //   };

  //   const mail = mailGenerator.generate(response);

  //   const message = {
  //     from: ''`Genesys Blog <genesysblogapp@gmail.com>',
  //     to: user.email,
  //     subject: 'Registration successful',
  //     html: mail
  //   };

  //   await transporter.sendMail(message);
  // // return true;
  // }

  async create(data) {
    const verifiedUser = await User.create(data);
    return verifiedUser;
  }

  async findById(id) {
    const user = await User.findOne({ _id: id });
    return user;
  }

  async findOne(filter = {}) {
    const user = await User.findOne(filter);

    return user;
  }

  async VerificationToken() {
    const token = User.generateAuthToken();
    return token;
  }
}

export default new UserService();

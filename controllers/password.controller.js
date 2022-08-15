/* eslint-disable no-underscore-dangle */
/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { User } from '../models/user.model.js';
import { sendPasswordResetMail, validateEmail } from '../services/password.services.js';
import { validatePasswordWithToken } from '../validators/password.validator.js';

class PasswordController {
  async forgot(req, res) {
    const { email } = await validateEmail({ email: req.body.email });

    // verify user

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).send({

        success: false,

        message: 'User with this email does not exist'

      });
    }

    // send reset mail

    await sendPasswordResetMail(user);

    // return res.send({ Authenticated: user });

    return res.status(200).send({

      success: true,

      message: 'The link to reset your password has been sent to your mail'

    });
  }

  async reset(req, res) {
    const validData = await validatePasswordWithToken(req.body);

    const decoded = jwt.verify(validData.token, process.env.APP_SECRET);

    const user = await User.findById(decoded._id);
    if (!user) return res.status(404).send({ success: false, message: 'user not found' });

    // set password
    const salt = await bcrypt.genSalt(10); // hash password
    user.password = await bcrypt.hash(validData.password, salt);

    await user.save();

    return res.status(200).send({ success: true, message: 'success', data: user });
  }
}

export default new PasswordController();

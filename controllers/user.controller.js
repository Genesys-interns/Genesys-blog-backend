/* eslint-disable class-methods-use-this */
/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { v4 as uuidv4 } from 'uuid';
import { logger } from '../app.js';
import Userservice from '../services/user.service.js';

dotenv.config();

class UserController {
  // eslint-disable-next-line class-methods-use-this
  async processEmail(req, res) {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.AUTH_EMAIL,
        pass: process.env.AUTH_PASS
      }
    });

    transporter.verify((err, success) => {
      if (err) {
        logger.error(err);
      } else {
        logger.info('Ready for messages');
        logger.info(success);
      }
    });

    const sendVerificationEmail = async ({ _id, email }) => {
      const uniqueString = uuidv4() + _id;
      // hash the unique string
      const hashedUID = bcrypt.hashSync(uniqueString, 10);
      const data = {
        uniqueString: hashedUID,
        createdAt: Date.now(),
        expiredAt: Date.now() + 21600000
      };

      const currentUrl = 'http://localhost:4011/';

      const newVerification = await Userservice.createVerifiedUser(data);

      const mail = {
        from: process.env.AUTH_EMAIL,
        to: email,
        subject: 'Verify Your Email',
        message: `<a href= ${`${currentUrl}user/verify${_id}/${uniqueString}`}> here </a>`
      };

      if (!newVerification) {
        return res.status(500).send({
          message: 'Sorry Couldn\'t send the email'
        });
      }

      transporter.sendmail(mail);
      return res.status(200).send({
        message: 'Successful!!'
      });
    };

    sendVerificationEmail();
  }

  async verifyLink(req, res) {
    const { userId, uniqueString } = req.params;

    const findverfiedUser = Userservice.findVerifiedUser(userId);
    if (!findverfiedUser) {
      res.status(500).send({
        success: false,
        message: 'This user does not exist or has been previously verified'
      });
    }

    const { expiresAt } = findverfiedUser[0];
    if (expiresAt < Date.now()) {
      const deleteverfiedUser = Userservice.deleteVerifiedUser(userId);

      if (!deleteverfiedUser) {
        res.status(500).send({
          success: false,
          message: 'Error while trying to delete this user'
        });
      }
    }

    const hashedUniqueString = findverfiedUser[0] + uniqueString;

    const unhashUString = bcrypt.compare(uniqueString, hashedUniqueString);

    if (unhashUString){
      
    }
  }
}
export default new UserController();

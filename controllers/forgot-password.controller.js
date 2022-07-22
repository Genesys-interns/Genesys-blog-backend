/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import forgotPasswordModel from '../models/forgot-password.model';
import logger from '../app';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

class ForgotPasswordController {
  async reset(req, res) {
    const { email, redirectUrl } = req.body;
    const check = await forgotPasswordModel
      .find({ email })
      .then((data) => {
        if (data.length) {

          if (!data[0].verified) {
             res.send({
              success: false,
              message: 'User hasn\'t verified email'
             })
        } else{
          const  sendResetEmail = ({_id, email}, redirectUrl, res) => {
              const resetString = uuidv4 + _id;
              forgotPasswordModel
              .deleteMany({ userID: _id})
              .then(result => { 
              const mailOptions = {
                from: process.env.AUTH_EMAIL,
                to: email,
                subject: "Password Reset",
                html: `<p>Use link below to reset your password</p><p>This link expires in 6 minutes </p><p> click <a heref=${redirectUrl + "/" + _id + "/" + resetString}></a> to proceed</p>`,
              };

              const saltRounds = 10;
              bcrypt
               .hash()
               .then()
               .catch()
              })
              .catch(error => {
                logger.error(error);
                res.status(404).send({
                  success: false,
                  message: 'error occured while clearing user from passwrd reset list'
                })
              })
          }
          sendResetEmail(data[0], redirectUrl, res);
        } else {
          res.send({
            success: false,
            message: 'User does not exist'
          });
        }
      })
      .catch((error) => {
        logger.error(error);
        res.send({
          success: false,
          message: 'User not found'
        });
      });
  }
}
export default new ForgotPasswordController();

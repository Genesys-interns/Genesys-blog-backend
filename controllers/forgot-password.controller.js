/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import forgotPasswordModel from '../models/forgot-password.model';
import logger from '../app';
import { response } from 'express';
import { v4 as uuidv4 } from 'uuid';

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
              .then()
              .catch(error => {
                logger.error(error);
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

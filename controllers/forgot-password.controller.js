/* eslint-disable import/extensions */
/* eslint-disable import/no-cycle */
/* eslint-disable class-methods-use-this */
import { transporter } from '../config/mail.js';
import validateEmail from  '../services/forgot-password.js';
import { User } from '../models/user.model.js'
import { sendPasswordResetMail } from '../services/forgot-password.services.js'
class ForgotPasswordController {
     async reset (req, res) => {
     const { email } = await validateEmail({email: req.body.email});
     
     // verify user
     const user = await User.findOne({ email});
     if(!user){
      return res.status(404).send({
        success: false,
        message: 'User with this email does not exist'
      });
     }
     // send reset mail
     await sendPasswordResetMail(user);

     return res.status(200).send({
      success: true,
      message: 'The link to reset your password has been sent to your mail'
     });
     };
};
export default new ForgotPasswordController();

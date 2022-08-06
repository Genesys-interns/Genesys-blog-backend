/* eslint-disable import/no-cycle */
/* eslint-disable import/extensions */
import Joi from 'joi';
import { mailGenerator, transporter } from '../config/mail.js';

const BASE_PATH = '/forgot-password';
const base = `${process.env.APP_URL}${BASE_PATH}`;
export const validateEmail = async (email) => {
  // email schema
  const schema = Joi.object({
    email: Joi.string().email().trim().lowercase()
      .required()
  });
  const value = await schema.validateAsync(email);

  return value;
};

export const sendPasswordResetMail = async (user) => {
  const token = user.generateToken();
  // send mail
  const response = {
    body: {
      name: `${user.firstName} ${user.lastName}`,
      intro: 'Password Reset Link',
      action: {
        instructions:
            'If you did not request for this mail, Please Ignore it. To reset your password, click on the link below:',
        button: {
          text: 'Reset password',
          link: `${base}/users/password-reset?token=${token}`
        }
      },
      outro: 'Do not share this link with anyone.'
    }
  };

  const mail = mailGenerator.generate(response);

  const message = {
    from: 'Genesys-Blog <enere0115@gmail.com>',
    to: user.email,
    subject: 'Reset your password',
    html: mail
  };

  await transporter.sendMail(message);
  // return true;
};

export default { validateEmail, sendPasswordResetMail };

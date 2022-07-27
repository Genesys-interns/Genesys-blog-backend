/* eslint-disable import/no-named-as-default */
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS
  }
});

export const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Genesys Blog',
    link: process.env.APP_URL
  }
});

export default { transporter, mailGenerator };

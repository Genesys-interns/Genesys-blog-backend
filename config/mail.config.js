import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import dotenv from 'dotenv';

dotenv.config();

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: 'genesysblogapp@gmail.com',
    pass: 'ltbanmrdfwkkqbmb'
  }
});

export const mailGenerator = new Mailgen({
  theme: 'default',
  product: {
    name: 'Genesys blog App',
    link: process.env.APP_URL
  }
});

export default {
  transporter,
  mailGenerator
};

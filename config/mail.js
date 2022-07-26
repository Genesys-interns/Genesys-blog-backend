/* eslint-disable import/no-named-as-default */
import nodemailer from 'nodemailer';
import logger from '../app';

export const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: process.env.AUTH_EMAIL,
    pass: process.env.AUTH_PASS
  }
});

export const verifyTransporter = transporter.verify((error, success) => {
  if (error) {
    logger.error(error);
  } else {
    logger.info('Ready to send email');
    logger.info(success);
  }
});

export default { transporter, verifyTransporter };

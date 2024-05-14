import nodemailer from 'nodemailer';
import { config } from '../config/config';

// Types import
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// Mail Transporter configure?
export const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
  ...(config.nodemailerConfig.host === 'smtp.gmail.com' && { service: 'gmail' }),
  host: config.nodemailerConfig.host,
  port: parseInt(config.nodemailerConfig.port),
  secure: false, // true for 465, false for other ports
  auth: {
    user: config.nodemailerConfig.userName,
    pass: config.nodemailerConfig.pass,
  },
  requireTLS: true,
});

import nodemailer from 'nodemailer';
// Types import
import SMTPTransport from 'nodemailer/lib/smtp-transport';

import { nodemailerConfig } from './config';

// Mail Transporter configure?
export const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
  ...(nodemailerConfig.host === 'smtp.gmail.com' && { service: 'gmail' }),
  host: nodemailerConfig.host,
  port: parseInt(nodemailerConfig.port),
  secure: false, // true for 465, false for other ports
  auth: {
    user: nodemailerConfig.userName,
    pass: nodemailerConfig.pass
  },
  requireTLS: true
});

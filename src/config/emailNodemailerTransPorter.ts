import nodemailer from 'nodemailer';
import { nodemailerConfig } from './config';
import { nodemailerConstants } from '../constants/repoConstants';

// Types import
import SMTPTransport from 'nodemailer/lib/smtp-transport';

// Mail Transporter configure?
export const transporter: nodemailer.Transporter<SMTPTransport.SentMessageInfo> = nodemailer.createTransport({
  ...(nodemailerConfig.host === nodemailerConstants.HOST && { service: nodemailerConstants.SERVICE }),
  host: nodemailerConfig.host,
  port: parseInt(nodemailerConfig.port),
  secure: false, // true for 465, false for other ports
  auth: {
    user: nodemailerConfig.userName,
    pass: nodemailerConfig.pass,
  },
  requireTLS: true,
});

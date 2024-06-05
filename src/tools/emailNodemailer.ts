import path from 'path';
import dotenv from 'dotenv';
// Types import
import SMTPTransport from 'nodemailer/lib/smtp-transport';
import { transporter } from '../config/emailNodemailerTransPorter';
import { nodemailerConfig } from '../config/config';
import { IMailOptions, IMailResponseType } from '../types';
//import { logger } from '../Logger/index';

dotenv.config({ path: path.join(__dirname, '../../.env') });

export const emailNodemailer = async (receiver: string, subject: string, body?: string): Promise<IMailResponseType> => {
  try {
    const mailOptions: IMailOptions = {
      from: nodemailerConfig.sender, //Sender Address
      to: receiver, //Receiver's Address
      subject: subject,
      html:
        body ||
        `<div class="container" style="max-width: 98%; padding-top: 20px">
            <p>Dear User,</p>
            <p>This is a test mail generated by you. </p>
            <p style="margin-bottom: 30px;">You have successfully setup your email</p>
            --
            <p style = "color: #E94D51; font-size: 14px; margin-top: 2px; font-weight: bold;">Regards</p>
        </div>`,
    };

    // Send Mail
    const finalSend: SMTPTransport.SentMessageInfo = await transporter.sendMail(mailOptions);
    if (finalSend) {
      return {
        isSuccess: true,
      };
    } else {
      return {
        isSuccess: false,
        response: 'Unable to send email',
      };
    }
  } catch (error: unknown) {
    //logger.error({})

    console.log('Error SMTP connection::>', error);
    return {
      isSuccess: false,
      response: error,
    };
  }
};

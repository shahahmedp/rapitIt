import ip from 'ip';
import { config } from '../config/config';
import { emailNodemailer } from './emailNodemailer';
import { amazonS3Upload } from './amazonS3Upload';

export const getHostUrl = (attachProtocol: boolean): string => {
  let serverUrl = 'localhost';
  const nodeEnv = process.env.NODE_ENV || 'development';
  if (nodeEnv === 'development') {
    serverUrl = 'localhost';
  } else if (nodeEnv === 'production' && config.nodemailerConfig.prodDomain !== '') {
    serverUrl = config.nodemailerConfig.prodDomain;
  } else if (nodeEnv === 'production' && config.nodemailerConfig.prodDomain === '') {
    serverUrl = ip.address();
  }

  serverUrl = attachProtocol ? `${config.nodemailerConfig.protocol}://${serverUrl}` : serverUrl;

  serverUrl =
    config.nodemailerConfig.includePortInDomain === 'YES'
      ? `${serverUrl}:${config.nodemailerConfig.serverPort}`
      : serverUrl;

  return serverUrl;
};

export function generateSixDigitOTP() {
  return Math.floor(Math.random() * 900000) + 100000;
}

export { amazonS3Upload }
export { emailNodemailer }

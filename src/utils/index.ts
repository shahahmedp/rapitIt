import ip from 'ip';
import { nodemailerConfig } from '../config/config';
import { handleError } from './errorHandler';
import { responseFormat } from './responseFormat';


export const getHostUrl = (attachProtocol: boolean): string => {
  let serverUrl = 'localhost';
  const nodeEnv = process.env.NODE_ENV || 'development';
  if (nodeEnv === 'development') {
    serverUrl = 'localhost';
  } else if (nodeEnv === 'production' && nodemailerConfig.prodDomain !== '') {
    serverUrl = nodemailerConfig.prodDomain;
  } else if (nodeEnv === 'production' && nodemailerConfig.prodDomain === '') {
    serverUrl = ip.address();
  }

  serverUrl = attachProtocol ? `${nodemailerConfig.protocol}://${serverUrl}` : serverUrl;

  serverUrl =
    nodemailerConfig.includePortInDomain === 'YES'
      ? `${serverUrl}:${nodemailerConfig.serverPort}`
      : serverUrl;

  return serverUrl;
};

export function generateSixDigitOTP() {
  return Math.floor(Math.random() * 900000) + 100000;
}

export { handleError };
export { responseFormat };

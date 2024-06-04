import ip from 'ip';
import { nodemailerConfig } from '../config/config';
import { environment } from '../constants/repoConstants';
import { handleError } from './errorHandler';
import { responseFormat } from './responseFormat';

export const getHostUrl = (attachProtocol: boolean): string => {
  let serverUrl = environment.HOST;
  const nodeEnv = process.env.NODE_ENV || environment.DEV;
  if (nodeEnv === environment.DEV) {
    serverUrl = environment.HOST;
  } else if (nodeEnv === environment.PROD && nodemailerConfig.prodDomain !== '') {
    serverUrl = nodemailerConfig.prodDomain;
  } else if (nodeEnv === environment.PROD && nodemailerConfig.prodDomain === '') {
    serverUrl = ip.address();
  }

  serverUrl = attachProtocol ? `${nodemailerConfig.protocol}://${serverUrl}` : serverUrl;

  serverUrl =
    nodemailerConfig.includePortInDomain === 'YES' ? `${serverUrl}:${nodemailerConfig.serverPort}` : serverUrl;

  return serverUrl;
};

export function generateSixDigitOTP() {
  return Math.floor(Math.random() * 900000) + 100000;
}

export { handleError };
export { responseFormat };

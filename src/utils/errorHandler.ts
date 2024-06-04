// src/utils/errorHandler.ts
import { Response } from 'express';

import { StatusConstants as dailogue } from '../constants/statusConstants';

import { responseFormat } from './responseFormat';

export const handleError = async (res: Response, error: unknown, statusCode: number = dailogue.code500.code) => {
  const message = error instanceof Error ? error.message : 'Unknown error';
  const statusMessage = dailogue.getMessage(statusCode);
  await responseFormat(
    res,
    statusCode,
    true,
    {},
    {},
    {},
    {
      status: statusMessage,
      message: message
    }
  );
};

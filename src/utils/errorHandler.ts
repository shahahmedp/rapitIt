// src/utils/errorHandler.ts
import { Response } from 'express';
import { StatusConstants as dailogue } from '../constants/repoConstants';
import { responseFormat } from './responseFormat';

export const handleError = async (error: unknown, statusCode: number = dailogue.code500.code, res?:Response) => {
  const message = error instanceof Error ? error.message : 'Unknown error';
  const statusMessage = dailogue.getMessage(statusCode);
  await responseFormat(
    statusCode,
    true,
    res,
    {},
    {},
    {},
    {
      status: statusMessage,
      message: message,
    },
  );
};

import { logger } from '../Logger';
import { Response } from 'express';

interface ErrorInfo {
  status?: string;
  message?: string;
}

interface DetailedError {
  message?: string;
}

interface CustomError extends Error {
  errors?: DetailedError[];
}

export const responseFormat = async (
  errorCode: number,
  status: boolean,
  res?: Response,
  payload?: object,
  next?: object,
  previous?: object,
  errors?: ErrorInfo,
  customMessage?: string, // Add customMessage parameter
) => {
  const errAns = errors?.message ? errors.message : 'Server error';
  if (res && !Object.keys(res).length) {
    logger.error({ message: 'Response is not available', error: errAns });
    return;
  }
  if (res)
    res.status(errorCode).send({
      status: status,
      data: { items: payload },
      page: {
        next: next,
        previous: previous,
      },
      error: {
        message: errors ? [errAns] : errors,
      },
      message: customMessage,
    });
};

export const throwError = async (message: string): Promise<void> => {
  logger.error({ error: message });
  throw new Error(message);
};

export const errorHandling = async (error: CustomError): Promise<void> => {
  logger.error(error);
  if (error?.errors?.length) {
    const errorArr: string[] = [];
    (error.errors || []).forEach((value: ErrorInfo) => {
      errorArr.push(value?.message || 'Unknown error');
    });
    throw new Error(errorArr[0]);
  } else {
    throw new Error(error.message || 'Unknown error');
  }
};

/* eslint-disable prettier/prettier */
import { Response } from 'express';
import { logger } from '../Logger';

export const responseFormat = async (
  res: Response,
  errorCode: any,
  status: boolean,
  payload?: object,
  next?: any,
  previous?: any,
  errors?: any,
  customMessage?: string, // Add customMessage parameter
) => {
  const errAns = errors?.message ? errors?.message : 'Server error';

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

export const throwError = async (message: string) => {
  logger.error({ error: message });
  throw new Error(message);
};

export const errorHandling = async (error: any) => {
  logger.error(error);
  if (error?.errors?.length) {
    const errorArr: string[] = [];
    (error?.errors || []).forEach((value: any) => {
      errorArr.push(value?.message);
    });
    throw new Error(errorArr?.[0]);
  } else {
    throw new Error(error);
  }
};

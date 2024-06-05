export class StatusConstants {
  public static code200 = {
    code: 200,
    message: 'The Request was successfully done',
  };
  public static code400 = {
    code: 400,
    message: 'improper request',
  };
  public static code403 = {
    code: 403,
    message: 'please provide all the attribute in request',
  };
  public static code401 = {
    code: 401,
    message: 'Your are not authorize',
  };
  public static code404 = {
    code: 404,
    message: 'Resource not fount',
  };
  public static code500 = {
    code: 500,
    message: 'server error',
  };
  public static code404Message = 'Method Not Found';

  public static getMessage(code: number): string {
    const status = Object.values(StatusConstants).find((status) => typeof status === 'object' && status.code === code);
    return status ? status.message : 'Error';
  }
}

export const environment = {
  DEV: 'dev',
  PROD: 'prod',
  STAGE: 'stage',
  HOST: 'localhost',
};
export const nodemailerConstants = {
  HOST: 'smtp.gmail.com',
  SERVICE: 'gmail',
};
export const LoggerConstants = {
  DATE_FORMAT: 'DD-MM-YYYY HH:mm:ss',
  BASE_PATH: './src/db/logs/',
};
export const dbConstants = {
  POSTGRES: 'postgreSQL',
  MONGO: 'mongoDB',
  BOTH: 'both',
};

export const apiResponseMessage = {
  auth: {
    signUp_success: 'register successful',
    signUp_fail: 'registration failed',
  },
};

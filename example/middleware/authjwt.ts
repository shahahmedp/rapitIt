import { Request, Response, NextFunction } from 'express';
import { secretKey } from '../../src/config/config';
import { logger } from '../../src/Logger';
import { StatusConstants as dailogue } from '../../src/constants/statusConstants';
import { handleError } from '../../src/utils';

const jwt = require('jsonwebtoken');

export class AuthJwt {
  /**
   * This middleware is used to verify the token.
   *
   * @param req
   * @param res
   * @param next
   */
  public static async VerifyToken(req: Request, res: Response, next: NextFunction) {
    logger.info('verify token method called ');
    try {
      const token = req.headers['x-access-token'];
      //check token in request
      if (!token) {
        return res.status(dailogue.code403.code).send({
          status: dailogue.code403.message,
          message: 'no token provided!',
        });
      }
      //verify token
      jwt.verify(token.toString(), secretKey.secret, (err: Error | null, decoded: string) => {
        if (err) {
          return res.status(dailogue.code401.code).send({ status: dailogue.code401.message, message: 'Unauthorized' });
        } else {
          req.body.userId = decoded;
          next();
        }
      });
    } catch (err: any) {
      handleError(res, err, dailogue.code500.code);
    }
  }
}

import { Request, Response, NextFunction } from 'express';
import { secretKey } from '../../src/config/config';
import { logger } from '../../src/Logger';
import { StatusConstants as dailogue } from '../../src/constants/repoConstants';
import { handleError } from '../../src/utils';
import jwt from 'jsonwebtoken';

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
      if (secretKey && secretKey.secret && secretKey.expiresIn) {
        jwt.verify(
          token.toString(),
          secretKey.secret,
          (err: jwt.VerifyErrors | null, decoded: object | string | undefined) => {
            if (err) {
              return res
                .status(dailogue.code401.code)
                .send({ status: dailogue.code401.message, message: 'Unauthorized' });
            } else {
              req.body.userId = decoded as string;
              next();
            }
          },
        );
      }
    } catch (err) {
      handleError(err, dailogue.code500.code, res);
    }
  }
}

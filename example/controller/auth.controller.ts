import { Request, Response } from 'express';
import { db } from '../../src/db';
import { logger } from '../../src/Logger';
import { StatusConstants as dailogue } from '../../src/constants/repoConstants';
import { secretKey } from '../../src/config/config';
import { responseFormat } from '../../src/utils';
import { handleError } from '../../src/utils';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export class Auth {
  /**
   * This controller is used to do Register user.
   *
   * @param req
   * @param res
   */
  public static async signUp(req: Request, res: Response) {
    logger.info('SignUP Controller as reached');
    try {
      await db.user
        .create({
          userName: req.body.username,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 8),
        })
        .then(async () => {
          await responseFormat(dailogue.code200.code, true, res, {
            status: dailogue.code200.message,
            message: `User ${req.body.username} was registered successfully`,
          });
        });
    } catch (err) {
      handleError(err, dailogue.code500.code, res);
    }
  }
  /**
   * This controller is used to do Authenticate user.
   *
   * @param req
   * @param res
   */
  public static async signIn(req: Request, res: Response) {
    logger.info('signIN controller reached');
    try {
      await db.user
        .findOne({
          where: { userName: req.body.username },
        })
        .then(async (user: { password: string; id: string; userName: string; email: string }) => {
          if (!user) {
            res.status(dailogue.code404.code).send({
              status: dailogue.code404.message,
              message: 'User Not found .',
            });
            return;
          }
          //comparing password
          const passwordIsValid = bcrypt.compareSync(req.body.password, user?.password);
          //if not password is same
          if (!passwordIsValid) {
            res.status(401).send({
              accessToken: null,
              message: 'invalid password!',
            });
            return;
          }
          let token;
          if (secretKey && secretKey.secret && secretKey.expiresIn) {
            // Generate JWT token
            token = jwt.sign({ id: user?.id }, secretKey.secret, {
              expiresIn: secretKey.expiresIn, // 24 hours
            });
            // Proceed with token usage...
          } else {
            // Handle the case where secretKey is not defined or its properties are undefined
            logger.error({ message: 'Secret key or expiresIn is not defined' });
          }
          await responseFormat(dailogue.code200.code, true, res, {
            status: dailogue.code200.message,
            id: user?.id,
            username: user?.userName,
            email: user?.email,
            accessToken: token,
          });
        });
    } catch (err) {
      handleError(err, dailogue.code500.code, res);
    }
  }
}

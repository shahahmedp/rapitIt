import { Request, Response } from 'express';
import { db } from '../../src/db';
import { logger } from '../../src/Logger';
import { StatusConstants as dailogue } from '../../src/constants/statusConstants';
import { config } from '../../src/config/config';
import { responseFormat } from '../../src/utils';
import { handleError } from '../../src/utils';
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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
          await responseFormat(res, dailogue.code200.code, true, {
            status: dailogue.code200.message,
            message: `User ${req.body.username} was registered successfully`,
          });
        });
    } catch (err) {
      handleError(res, err, dailogue.code500.code);
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
          //generating jwt token to send response
          const token = jwt.sign({ id: user?.id }, config.secretKey.secret, {
            expiresIn: config.secretKey.expiresIn, // 24 hours
          });
          await responseFormat(res, dailogue.code200.code, true, {
            status: dailogue.code200.message,
            id: user?.id,
            username: user?.userName,
            email: user?.email,
            accessToken: token,
          });
        });
    } catch (err) {
      handleError(res, err, dailogue.code500.code);
    }
  }
}

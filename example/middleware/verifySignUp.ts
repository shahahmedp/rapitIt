import { Request, Response, NextFunction } from 'express';
import db from '../../src/db';
import { logger } from '../../src/Logger';
import { StatusConstants as dailogue } from '../../src/constants/statusConstants';

export class VerifySignUp {
  /**
   * This middleware is used to check duplicate user name or email in db.
   *
   * @param req
   * @param res
   * @param next
   */
  /* eslint-disable */
  public static async checkUsernameOrEmailExist(req: Request, res: Response, next: NextFunction) {
    logger.info('check MIddleware username&email in db');
    try {
      await db.user
        .findOne({
          where: { userName: req.body.username },
        })
        .then((usr: any) => {
          if (usr) {
            res.status(dailogue.code400.code).send({
              status: dailogue.code400.message,
              message: 'Failed Username is already in use!',
            });
            return;
          }
          //know it check email in db
          db.user
            .findOne({
              where: {
                email: req.body.email,
              },
            })
            .then((user: any) => {
              if (user) {
                res.status(dailogue.code400.code).send({
                  status: dailogue.code400.message,
                  message: 'Failed! Email is already in use!',
                });
                return;
              }
              next();
            });
        });
    } catch (err: any) {
      res.status(dailogue.code500.code).send({ status: dailogue.code500.message, message: err });
    }
  }
}

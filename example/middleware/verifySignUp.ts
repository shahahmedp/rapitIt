import { Request, Response, NextFunction } from 'express';
import { db } from '../../src/db/postgreSQL';
import { logger } from '../../src/Logger';
import { StatusConstants as dailogue } from '../../src/constants/repoConstants';
import { handleError } from '../../src/utils/errorHandler';

export class VerifySignUp {
  /**
   * This middleware is used to check duplicate user name or email in db.
   *
   * @param req
   * @param res
   * @param next
   */
  public static async checkUsernameOrEmailExist(req: Request, res: Response, next: NextFunction) {
    logger.info('check MIddleware username&email in db');
    try {
      await db.user
        .findOne({
          where: { email: req.body.email },
        })
        .then((usr: object) => {
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
            .then((user: object) => {
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
    } catch (err) {
      handleError(err, dailogue.code500.code, res);
    }
  }
}

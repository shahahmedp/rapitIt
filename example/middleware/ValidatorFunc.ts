import { Request, Response, NextFunction } from 'express';
import { logger } from '../../src/Logger';
import { StatusConstants as dailogue } from '../../src/constants/statusConstants';
import { validationResult } from 'express-validator';

export class ValidatorFunc {
  /**
   * This function is used to validate payload.
   *
   * @param req
   * @param res
   * @param next
   */

  public static async validator(req: Request, res: Response, next: NextFunction) {
    logger.info('Validator function to validate payload');
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(dailogue.code400.code).json({ statuss: dailogue.code400.message, message: errors });
      return ;
    } else {
      next();
    }
  }
}

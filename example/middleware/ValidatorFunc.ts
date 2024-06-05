import { Request, Response, NextFunction } from 'express';
import { logger } from '../../src/Logger';
import { StatusConstants as dailogue } from '../../src/constants/repoConstants';
import { validationResult } from 'express-validator';
import { handleError } from '../../src/utils/errorHandler';

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
      handleError({ statuss: dailogue.code400.message, message: errors }, dailogue.code400.code, res);
      return;
    } else {
      next();
    }
  }
}

import express from "express"
import { Auth } from '../../example/controller/auth.controller';
import { 
  registerCheck, 
  signInCheck 
} from '../payloadValidation/checkDataPacket';
import { VerifySignUp } from '../../example/middleware/verifySignUp';
import { ValidatorFunc } from '../../example/middleware/ValidatorFunc';
const router = express.Router();

  /**
   * This routing method to regsiter the user.
   *
   * @param req
   * @param res
   */

  router.post(
    //path
    '/signup',
    //check data payload
    registerCheck,
    ValidatorFunc.validator,
    //middlewares to verify
    [VerifySignUp.checkUsernameOrEmailExist],
    // controllers
    Auth.signUp,
  );
  /**
   * This routing method to login the user.
   *
   * @param req
   * @param res
   */

  router.post(
    '/signin',
    //payload check
    signInCheck,
    ValidatorFunc.validator,
    //controller
    Auth.signIn,
  );

  export { router };
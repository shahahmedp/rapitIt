import { Request, Response } from 'express';
import { AuthJwt } from '../../example/middleware/authjwt';
//import {user} from '../controller/user.controller'

module.exports = function (app: any) {
  app.get('/api/test/all', [AuthJwt.VerifyToken], (_req: Request, res: Response) => {
    res.send('token authentication successfull');
  });
  //app.get("/api/test/admin",[Authjwt.verifyToken, Authjwt.isAdmin], user.AdminBoard);
};

// @ts-check
//import { Request, Response } from 'express';

// Routes import
import { router as Authentication } from '../routes/auth.routes';
import { router as Test } from '../routes/test.router';

const routes = (app: any): void => {
  // Redirect to investigation endpoints
  app.use('/api/auth', Authentication);
  app.use('/api/test', Test);
  // Throw error if the given path not found
  // app.use((_req: Request, res: Response) => {
  //   return res.status(404).send({ error: 'Page not found. Please try again' });
  // });
};

export { routes };

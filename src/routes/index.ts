// @ts-check
import { Express } from 'express';

// Routes import
import { router as Authentication } from './auth.routes';
import { router as Test } from './test.router';
import { router as User } from './user.routes';

const routes = (app: Express): void => {
  // Redirect to investigation endpoints
  app.use('/api/auth', Authentication);
  app.use('/api/test', Test);
  app.use('/api/user', User);
};

export { routes };

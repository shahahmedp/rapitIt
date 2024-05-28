import express from 'express'; // Importing Express framework
import 'express-async-errors'; // Importing express-async-errors to handle asynchronous errors
import { thirdPartyMiddlewares } from './middlewares'; // Importing middleware setup function
import { routes } from './init/routes'; // Importing application routes

require('dotenv').config({ path: `./env/${process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : `.env`}` });

const app = express(); // Creating Express application

// Apply middleware
thirdPartyMiddlewares(app);

// Routes setup
routes(app);

app.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'application/liquid');
  res.render('pages/index');
}); // Rendering index page

export { app }; // Exporting Express application

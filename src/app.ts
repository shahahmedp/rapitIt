import express from 'express'; // Importing Express framework
import 'express-async-errors'; // Importing express-async-errors to handle asynchronous errors
import { thirdPartyMiddlewares } from './middlewares'; // Importing middleware setup function
import { routes } from './routes'; // Importing application routes
import dotenv from 'dotenv';

dotenv.config({
  path: process.env.NODE_ENV ? `./env/${process.env.NODE_ENV}.env` : `./env/.env`,
});

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

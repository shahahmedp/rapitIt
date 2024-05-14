import express from 'express'; // Importing Express framework
import 'express-async-errors'; // Importing express-async-errors to handle asynchronous errors
import { json } from 'body-parser'; // Importing body-parser middleware to parse incoming request bodies
import cors from 'cors'; // Importing cors middleware for Cross-Origin Resource Sharing
import helmet from 'helmet'; // Importing helmet middleware for securing HTTP headers
import swaggerUi from 'swagger-ui-express'; // Importing swagger-ui-express for Swagger API documentation
import swaggerOutput from '../swagger/swagger.json'; // Importing Swagger API documentation JSON file
import cookieParser from 'cookie-parser';
require('dotenv').config({ path: `./env/${process.env.NODE_ENV ? `.${process.env.NODE_ENV}.env` : `.env`}` });
import {
  getHostUrl,
  //logger
} from './utils'; // Importing utility functions and logger
import { routes } from './init/routes'; // Importing application routes

const app = express(); // Creating Express application

// Middleware setup
app.use(cors()); // Using cors middleware
app.use(express.json()); // Parsing JSON bodies
app.use(cookieParser()); //cookie parser
app.use(express.urlencoded({ extended: true })); // Parsing URL-encoded bodies
app.use(
  helmet({
    contentSecurityPolicy: false,
    frameguard: { action: 'deny' },
    hsts: { maxAge: 31536000 },
    hidePoweredBy: true,
    xssFilter: false,
  }),
); // Configuring helmet middleware for security
app.use((_req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
}); // Setting up Access-Control-Allow-Origin headers

app.set('trust proxy', true); // Setting trust proxy
swaggerOutput.host = getHostUrl(false); // Setting up Swagger API documentation host URL
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput)); // Serving Swagger API documentation
app.use(json()); // Using json middleware
app.use(express.json()); // Using express.json middleware
app.use(express.urlencoded({ extended: true })); // Using express.urlencoded middleware

// Routes setup
routes(app)
app.get('/', (_req, res) => {
  res.setHeader('Content-Type', 'application/liquid');
  res.render('pages/index');
}); // Rendering index page

export { app }; // Exporting Express application

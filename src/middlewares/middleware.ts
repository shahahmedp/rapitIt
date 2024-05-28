import cors from 'cors'; // Importing cors middleware for Cross-Origin Resource Sharing
import helmet from 'helmet'; // Importing helmet middleware for securing HTTP headers
import swaggerUi from 'swagger-ui-express'; // Importing swagger-ui-express for Swagger API documentation
import swaggerOutput from '../../swagger/swagger.json'; // Importing Swagger API documentation JSON file
import cookieParser from 'cookie-parser'; // Importing cookie-parser middleware
import bodyParser from 'body-parser'; // Importing body-parser middleware to parse incoming request bodies
import serveStatic from 'serve-static'; // Importing serve-static middleware to serve static files
import express, { Express } from 'express'; // Importing Express framework
import path from 'path'; // Importing path module
import { getHostUrl } from '../utils'; // Importing utility functions

// Function to apply middleware to the Express application
export const thirdPartyMiddlewares = (app: Express) => {
  // Use cors middleware
  app.use(cors());

  // Parse JSON bodies
  app.use(express.json());

  // Parse URL-encoded bodies
  app.use(express.urlencoded({ extended: true }));

  // Use cookie-parser middleware
  app.use(cookieParser());

  // Serve static files from the "public" directory
  app.use(serveStatic(path.join(__dirname, '../../public')));

  // Use helmet middleware for security
  app.use(
    helmet({
      contentSecurityPolicy: false,
      frameguard: { action: 'deny' },
      hsts: { maxAge: 31536000 },
      hidePoweredBy: true,
      xssFilter: false,
    }),
  );

  // Set up Access-Control-Allow-Origin headers
  app.use((_req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

  // Set trust proxy
  app.set('trust proxy', true);

  // Set up Swagger API documentation
  swaggerOutput.host = getHostUrl(false);
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));

  // Middleware to parse JSON bodies
  app.use(bodyParser.json());

  // Middleware to parse URL-encoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));
};

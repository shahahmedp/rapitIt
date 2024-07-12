import cors from 'cors'; // Importing cors middleware for Cross-Origin Resource Sharing
import helmet from 'helmet'; // Importing helmet middleware for securing HTTP headers
import swaggerUi from 'swagger-ui-express'; // Importing swagger-ui-express for Swagger API documentation
import swaggerJsdoc from 'swagger-jsdoc';
import cookieParser from 'cookie-parser'; // Importing cookie-parser middleware
import bodyParser from 'body-parser'; // Importing body-parser middleware to parse incoming request bodies
import serveStatic from 'serve-static'; // Importing serve-static middleware to serve static files
import express, { Express } from 'express'; // Importing Express framework
import path from 'path'; // Importing path module
import fs from 'fs';

// Function to apply middleware to the Express application
export const thirdPartyMiddlewares = (app: Express) => {
  // Use cors middleware
  app.use(cors());

  //set ejs
  app.set('view engine', 'ejs');

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
  // Swagger definition
  const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
      description: 'List of API endpoints for backend server',
      version: '1.0.0',
      title: 'Damco Server API Documentation',
      contact: {
        email: '',
      },
      license: {
        name: 'Apache 2.0',
        url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
      },
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server',
      },
    ],
  };

  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: [path.join(__dirname, '../routes/*')], // Correct path to your route files
  };

  const swaggerSpec = swaggerJsdoc(options);

  // Ensure the 'swagger' directory exists and create swagger.json file if it doesn't exist
  const swaggerDir = path.resolve(__dirname, '../../swagger');
  const swaggerFilePath = path.join(swaggerDir, 'swagger.json');

  if (!fs.existsSync(swaggerDir)) {
    fs.mkdirSync(swaggerDir);
  }

  if (!fs.existsSync(swaggerFilePath)) {
    fs.writeFileSync(swaggerFilePath, JSON.stringify(swaggerSpec, null, 2), 'utf-8');
  }

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // Middleware to parse JSON bodies
  app.use(bodyParser.json());

  // Middleware to parse URL-encoded bodies
  app.use(bodyParser.urlencoded({ extended: true }));
};

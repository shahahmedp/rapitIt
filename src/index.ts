/* eslint-disable @typescript-eslint/ban-ts-comment */
import 'reflect-metadata';
import { app } from './app';
import { logger } from './Logger';
import { config } from './config/config';
import { dbInit } from './db/index';
//import inquirer from 'inquirer';
// Load environment variables from .env file
require('dotenv').config({
  path: `${process.env.NODE_ENV}` ? `./env/${process.env.NODE_ENV}.env` : `./env/.env`,
});

const PORT = config.PORT;
console.log('env', process.env.MODE, process.env.PORT, process.env.NODE_ENV, `./env/${process.env.NODE_ENV}.env`);
const start = async () => {
  // @ts-ignore
  app.listen(PORT, (err: Error | null) => {
    if (err) console.log(err);
    // const answers = await inquirer.prompt([
  //   {
  //     type: 'input',
  //     name: 'name',
  //     message: 'What is your name?',
  //   },
  //   {
  //     type: 'confirm',
  //     name: 'confirm',
  //     message: 'Are you ready to proceed?',
  //   },
  // ]);

  // // Process user's input
  // if (answers.confirm) {
  //   console.log(`Hello, ${answers.name}!`);
  //   // Execute your desired functionality here
  // } else {
  //   console.log('Okay, maybe next time.');
  // }
    dbInit();
    logger.info(`Backend Service App started at: ${new Date()} on port ${PORT}`);
  });
};

start();

/* eslint-disable @typescript-eslint/no-var-requires */
import { Model, ModelCtor } from 'sequelize-typescript/dist/model/model/model';
import Op from 'sequelize/types/operators';
const Sequelize = require('sequelize');
export interface postgresDbInterface {
    [key: string]: ModelCtor<Model> | typeof Sequelize;
    Sequelize?: typeof Sequelize;
    Op?: typeof Op;
  }

  export interface mongoDbInterface {
    Op?: typeof Op;
  }
export interface IMailOptions {
  from: string;
  to: string;
  subject: string;
  html: string;
}

export interface IMailResponseType {
  isSuccess: boolean;
  response?: unknown;
}

export interface LoggerInterface {
  log(message: string): void;
  info(message: string): void;
  warn(message: string): void;
  error(message: object): void;
}

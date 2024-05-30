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
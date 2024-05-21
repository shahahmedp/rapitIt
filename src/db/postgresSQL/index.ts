/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
import { associationModels } from './association';
import { config } from '../../config/config';
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const db: any = {};

export const initPostgres  = async () => {
  const sequelize = new Sequelize(config.dbConfig.database, config.dbConfig.username, config.dbConfig.password, {
    host: config.dbConfig.host,
    dialect: config.dbConfig.dialect,
    define: {
      freezeTableName: true,
    },
    dailectOptions: {
      ssl: {
        rejectUnauthorized: false,
        useUTC: false,
      },
    },
    timezone: '+05:30',
    logging: false,
  });

  const [result] = await sequelize.query(`
    SELECT 1 FROM pg_database WHERE datname = '${config.dbConfig.database}'
  `);
  if (result.length == 0) {
    await sequelize.query(`CREATE DATABASE ${config.dbConfig.database}`);
  }

  fs.readdirSync(__dirname + '/models')
    .filter((file) => {
      return file.indexOf('.') !== 0 && file !== basename && (file.slice(-3) === '.ts' || file.slice(-3) === '.js');
    })
    .forEach((file) => {
      const model = require(path.join(__dirname, 'models', file))(sequelize, Sequelize.DataTypes);
      db[model.name] = model;
    });

  Object.keys(db).forEach((modelName) => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
  associationModels();
  db.sequelize = sequelize;
  db.Sequelize = Sequelize;
  db.Op = Sequelize.Op;
  await db.sequelize.sync();
  //seeders
  await db.sequelize.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
};

export { db };

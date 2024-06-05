/* eslint-disable @typescript-eslint/no-var-requires */
import fs from 'fs';
import path from 'path';
import { associationModels } from './association';
import { postgreSQLdbConfig } from '../../config/config';
import { postgresDbInterface } from '../../types';

const Sequelize = require('sequelize');

const basename = path.basename(__filename);
const db: postgresDbInterface = {};

export const initPostgres = async () => {
  const sequelize = new Sequelize(
    postgreSQLdbConfig.database,
    postgreSQLdbConfig.username,
    postgreSQLdbConfig.password,
    {
      host: postgreSQLdbConfig.host,
      dialect: postgreSQLdbConfig.dialect,
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
    },
  );

  const [result] = await sequelize.query(`
    SELECT 1 FROM pg_database WHERE datname = '${postgreSQLdbConfig.database}'
  `);
  if (result.length == 0) {
    await sequelize.query(`CREATE DATABASE ${postgreSQLdbConfig.database}`);
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

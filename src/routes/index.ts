import { Express } from 'express';

module.exports = function (app: Express): void {
  /**
   *  all routes imported and exported here .
   *
   * @param req
   * @param res
   */
  module.exports = require('./auth.routes')(app);
  module.exports = require('./user.routes')(app);
};

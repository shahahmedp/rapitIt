"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthJwt = void 0;
const config_1 = require("../../src/config/config");
const Logger_1 = require("../../src/Logger");
const statusConstants_1 = require("../../src/constants/statusConstants");
const responseFormat_1 = require("../../src/utils/responseFormat");
const jwt = require('jsonwebtoken');
class AuthJwt {
    /**
     * This middleware is used to verify the token.
     *
     * @param req
     * @param res
     * @param next
     */
    static VerifyToken(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger_1.logger.info('verify token method called ');
            try {
                const token = req.headers['x-access-token'];
                //check token in request
                if (!token) {
                    return res.status(statusConstants_1.StatusConstants.code403.code).send({
                        status: statusConstants_1.StatusConstants.code403.message,
                        message: 'no token provided!',
                    });
                }
                //verify token
                jwt.verify(token.toString(), config_1.config.secretKey.secret, (err, decoded) => {
                    if (err) {
                        return res.status(statusConstants_1.StatusConstants.code401.code).send({ status: statusConstants_1.StatusConstants.code401.message, message: 'Unauthorized' });
                    }
                    else {
                        req.body.userId = decoded;
                        next();
                    }
                });
            }
            catch (err) {
                yield (0, responseFormat_1.responseFormat)(res, statusConstants_1.StatusConstants.code500.code, true, {}, {}, {}, {
                    status: statusConstants_1.StatusConstants.code500.message,
                    message: err.message,
                });
            }
        });
    }
}
exports.AuthJwt = AuthJwt;

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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Auth = void 0;
const db_1 = __importDefault(require("../../src/db"));
const Logger_1 = require("../../src/Logger");
const statusConstants_1 = require("../../src/constants/statusConstants");
const config_1 = require("../../src/config/config");
const responseFormat_1 = require("../../src/utils/responseFormat");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
class Auth {
    /**
     * This controller is used to do Register user.
     *
     * @param req
     * @param res
     */
    static signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger_1.logger.info('SignUP Controller as reached');
            try {
                yield db_1.default.user
                    .create({
                    userName: req.body.username,
                    email: req.body.email,
                    password: bcrypt.hashSync(req.body.password, 8),
                })
                    .then(() => __awaiter(this, void 0, void 0, function* () {
                    yield (0, responseFormat_1.responseFormat)(res, statusConstants_1.StatusConstants.code200.code, true, {
                        status: statusConstants_1.StatusConstants.code200.message,
                        message: `User ${req.body.username} was registered successfully`,
                    });
                }));
            }
            catch (err) {
                yield (0, responseFormat_1.responseFormat)(res, statusConstants_1.StatusConstants.code500.code, true, {}, {}, {}, {
                    status: statusConstants_1.StatusConstants.code500.message,
                    message: err.message,
                });
            }
        });
    }
    /**
     * This controller is used to do Authenticate user.
     *
     * @param req
     * @param res
     */
    static signIn(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger_1.logger.info('signIN controller reached');
            try {
                yield db_1.default.user
                    .findOne({
                    where: { userName: req.body.username },
                })
                    .then((user) => __awaiter(this, void 0, void 0, function* () {
                    if (!user) {
                        res.status(statusConstants_1.StatusConstants.code404.code).send({
                            status: statusConstants_1.StatusConstants.code404.message,
                            message: 'User Not found .',
                        });
                        return;
                    }
                    //comparing password
                    const passwordIsValid = bcrypt.compareSync(req.body.password, user === null || user === void 0 ? void 0 : user.password);
                    //if not password is same
                    if (!passwordIsValid) {
                        res.status(401).send({
                            accessToken: null,
                            message: 'invalid password!',
                        });
                        return;
                    }
                    //generating jwt token to send response
                    const token = jwt.sign({ id: user === null || user === void 0 ? void 0 : user.id }, config_1.config.secretKey.secret, {
                        expiresIn: config_1.config.secretKey.expiresIn, // 24 hours
                    });
                    yield (0, responseFormat_1.responseFormat)(res, statusConstants_1.StatusConstants.code200.code, true, {
                        status: statusConstants_1.StatusConstants.code200.message,
                        id: user === null || user === void 0 ? void 0 : user.id,
                        username: user === null || user === void 0 ? void 0 : user.userName,
                        email: user === null || user === void 0 ? void 0 : user.email,
                        accessToken: token,
                    });
                }));
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
exports.Auth = Auth;

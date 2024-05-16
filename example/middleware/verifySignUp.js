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
exports.VerifySignUp = void 0;
const db_1 = __importDefault(require("../../src/db"));
const Logger_1 = require("../../src/Logger");
const statusConstants_1 = require("../../src/constants/statusConstants");
class VerifySignUp {
    /**
     * This middleware is used to check duplicate user name or email in db.
     *
     * @param req
     * @param res
     * @param next
     */
    /* eslint-disable */
    static checkUsernameOrEmailExist(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            Logger_1.logger.info('check MIddleware username&email in db');
            try {
                yield db_1.default.user
                    .findOne({
                    where: { userName: req.body.username },
                })
                    .then((usr) => {
                    if (usr) {
                        res.status(statusConstants_1.StatusConstants.code400.code).send({
                            status: statusConstants_1.StatusConstants.code400.message,
                            message: 'Failed Username is already in use!',
                        });
                        return;
                    }
                    //know it check email in db
                    db_1.default.user
                        .findOne({
                        where: {
                            email: req.body.email,
                        },
                    })
                        .then((user) => {
                        if (user) {
                            res.status(statusConstants_1.StatusConstants.code400.code).send({
                                status: statusConstants_1.StatusConstants.code400.message,
                                message: 'Failed! Email is already in use!',
                            });
                            return;
                        }
                        next();
                    });
                });
            }
            catch (err) {
                res.status(statusConstants_1.StatusConstants.code500.code).send({ status: statusConstants_1.StatusConstants.code500.message, message: err });
            }
        });
    }
}
exports.VerifySignUp = VerifySignUp;

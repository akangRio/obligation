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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = require("../prisma/db");
const bcrypt_1 = require("../helpers/bcrypt");
const jwt_1 = require("../helpers/jwt");
class UserController {
    static createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, phone, role, password } = req.body;
                const hashedPass = (0, bcrypt_1.hasher)(password);
                const createNewUser = yield db_1.prisma.user.create({
                    data: {
                        name,
                        email,
                        phone,
                        role,
                        password: hashedPass,
                    },
                });
                // Remove sensitive data
                const { password: _, instituteId: __ } = createNewUser, safeUser = __rest(createNewUser, ["password", "instituteId"]);
                res.send(safeUser);
            }
            catch (err) {
                res.status(401).send(err.message);
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            try {
                const { email, password } = req.body;
                const checkedUser = yield db_1.prisma.user.findUnique({
                    where: { email },
                    include: { institute: true },
                });
                if (!checkedUser || !(0, bcrypt_1.passValidator)(password, checkedUser.password)) {
                    throw new Error("please check your input again");
                }
                const access_token = (0, jwt_1.signToken)({
                    userId: checkedUser.id,
                    email: checkedUser.email,
                    name: checkedUser.name,
                    role: checkedUser.role,
                    instituteId: checkedUser.instituteId,
                    instituteType: (_b = (_a = checkedUser.institute) === null || _a === void 0 ? void 0 : _a.instituteType) !== null && _b !== void 0 ? _b : null,
                });
                res.send({ access_token });
            }
            catch (err) {
                res.status(401).send(err.message);
            }
        });
    }
    static getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { search } = req.query;
                const { instituteId, role, instituteType } = req.identity;
                if (instituteId == null && role !== "ADMIN") {
                    throw new Error(`you haven't been assigned to a specific institute`);
                }
                let options = {
                    include: { institute: true },
                    omit: { password: true },
                };
                if (role === "ADMIN") {
                    if (search) {
                        options.where = {
                            OR: [
                                { name: { contains: search } },
                                { email: { contains: search } },
                                { phone: { contains: search } },
                                { institute: { name: { contains: search } } },
                            ],
                        };
                    }
                }
                else if (role === "EXECUTIVE" && instituteType === "INT") {
                    options.where = { role: { not: "ADMIN" } };
                }
                else {
                    options.where = { role: { not: "ADMIN" }, instituteId };
                }
                const users = yield db_1.prisma.user.findMany(options);
                res.send(users);
            }
            catch (err) {
                res.status(400).send(err.message);
            }
        });
    }
    static editUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, email, phone, instituteId, role } = req.body;
                const editedUser = yield db_1.prisma.user.update({
                    where: { id },
                    data: { name, email, phone, instituteId, role },
                });
                const { password: _ } = editedUser, safeUser = __rest(editedUser, ["password"]);
                res.send(safeUser);
            }
            catch (err) {
                res.status(400).send(err.message);
            }
        });
    }
    static editUserPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, oldPassword, newPassword } = req.body;
                const user = yield db_1.prisma.user.findUnique({ where: { id } });
                if (!user || !(0, bcrypt_1.passValidator)(oldPassword, user.password)) {
                    throw new Error("Wrong password");
                }
                const hashedPass = (0, bcrypt_1.hasher)(newPassword);
                yield db_1.prisma.user.update({
                    where: { id },
                    data: { password: hashedPass },
                });
                res.send("Password has been changed");
            }
            catch (err) {
                res.status(400).send(err.message);
            }
        });
    }
}
exports.default = UserController;

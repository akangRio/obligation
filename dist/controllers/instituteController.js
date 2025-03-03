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
const db_1 = require("../prisma/db");
class InstituteController {
    static createInstitute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, phone, instituteType } = req.body;
                yield db_1.prisma.institute.create({
                    data: { name, email, phone, instituteType },
                });
                res.send("ok");
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
    }
    static addUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, userId } = req.body;
                yield db_1.prisma.institute.update({
                    where: { id },
                    data: {
                        users: { connect: [{ id: userId }] },
                    },
                    include: { users: true },
                });
                res.send("ok");
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
    }
    static getInstitutes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const institutes = yield db_1.prisma.institute.findMany({
                    include: {
                        users: {
                            omit: {
                                password: true,
                            },
                        },
                    },
                });
                res.send(institutes);
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
    }
    static editInstitute(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id, name, email, phone, instituteType } = req.body;
                const updatedInstitute = yield db_1.prisma.institute.update({
                    where: { id },
                    data: { name, email, phone, instituteType },
                });
                res.send(updatedInstitute);
            }
            catch (err) {
                res.status(500).send(err);
            }
        });
    }
}
exports.default = InstituteController;

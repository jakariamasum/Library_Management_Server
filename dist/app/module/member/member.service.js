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
exports.MemberServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createMemberIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const newMember = yield prisma.member.create({
        data: payload,
    });
    return newMember;
});
const getAllMembersFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const Members = yield prisma.member.findMany();
    return Members;
});
const getSingleMemberFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const Member = yield prisma.member.findUnique({
        where: {
            memberId: id,
        },
    });
    return Member;
});
const updateMemberIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedMember = yield prisma.member.update({
        where: {
            memberId: id,
        },
        data: Object.assign({}, payload),
    });
    return updatedMember;
});
const deleteMemberFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const deletedMember = yield prisma.member.delete({
        where: {
            memberId: id,
        },
    });
    return deletedMember;
});
exports.MemberServices = {
    createMemberIntoDB,
    getAllMembersFromDB,
    getSingleMemberFromDB,
    updateMemberIntoDB,
    deleteMemberFromDB,
};

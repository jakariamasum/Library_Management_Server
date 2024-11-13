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
exports.BorrowRecordServices = void 0;
const client_1 = require("@prisma/client");
const date_fns_1 = require("date-fns");
const prisma = new client_1.PrismaClient();
const createBorrowRecordIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma.borrowRecord.create({
        data: payload,
    });
    return result;
});
const getOverDueBorrowListFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const currentDate = new Date();
    const overdueRecords = yield prisma.borrowRecord.findMany({
        where: {
            returnDate: null,
            borrowDate: {
                lt: (0, date_fns_1.addDays)(currentDate, -14),
            },
        },
        include: {
            book: { select: { title: true } },
            member: { select: { name: true } },
        },
    });
    return overdueRecords.map((record) => {
        const overdueDays = (0, date_fns_1.differenceInDays)(currentDate, (0, date_fns_1.addDays)(record.borrowDate, 14));
        return {
            borrowId: record.borrowId,
            bookTitle: record.book.title,
            borrowerName: record.member.name,
            overdueDays,
        };
    });
});
exports.BorrowRecordServices = {
    createBorrowRecordIntoDB,
    getOverDueBorrowListFromDB,
};

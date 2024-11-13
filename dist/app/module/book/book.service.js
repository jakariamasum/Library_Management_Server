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
exports.BookServices = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBookIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload);
    const newBook = yield prisma.book.create({
        data: payload,
    });
    return newBook;
});
const getAllBooksFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const books = yield prisma.book.findMany();
    return books;
});
const getSingleBookFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const book = yield prisma.book.findUnique({
        where: {
            bookId: id,
        },
    });
    return book;
});
const updateBookIntoDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const updatedBook = yield prisma.book.update({
        where: {
            bookId: id,
        },
        data: Object.assign({}, payload),
    });
    return updatedBook;
});
const deleteBookFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma.$transaction((transaction) => __awaiter(void 0, void 0, void 0, function* () {
        yield transaction.borrowRecord.deleteMany({
            where: { bookId: id },
        });
        const deletedBook = yield transaction.book.delete({
            where: { bookId: id },
        });
        return deletedBook;
    }));
});
exports.BookServices = {
    createBookIntoDB,
    getAllBooksFromDB,
    getSingleBookFromDB,
    updateBookIntoDB,
    deleteBookFromDB,
};

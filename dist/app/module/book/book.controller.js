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
exports.BookControllers = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const book_service_1 = require("./book.service");
const createBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookServices.createBookIntoDB(req.body);
    if (!result) {
        throw new AppError_1.default(500, "Failed to create the book. Please try again.");
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 201,
        message: "Book created successfully",
        data: result,
    });
}));
const getAllBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_service_1.BookServices.getAllBooksFromDB();
    if (!result) {
        throw new AppError_1.default(404, "No books found.");
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Books retrieved successfully",
        data: result,
    });
}));
const getSingleBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const result = yield book_service_1.BookServices.getSingleBookFromDB(bookId);
    if (!result) {
        throw new AppError_1.default(404, "Book not found.");
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Book retrieved successfully",
        data: result,
    });
}));
const updateBook = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const result = yield book_service_1.BookServices.updateBookIntoDB(bookId, req.body);
    if (!result) {
        throw new AppError_1.default(404, "Book not found.");
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Book updated successfully",
        data: result,
    });
}));
const deleteBooks = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { bookId } = req.params;
    const result = yield book_service_1.BookServices.deleteBookFromDB(bookId);
    if (!result) {
        throw new AppError_1.default(404, "Book not found.");
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Book successfully deleted",
    });
}));
exports.BookControllers = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBooks,
};

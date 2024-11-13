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
exports.BorrowRecordControllers = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const borrow_service_1 = require("./borrow.service");
const createBorrowRecord = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield borrow_service_1.BorrowRecordServices.createBorrowRecordIntoDB(req.body);
    if (!result) {
        throw new AppError_1.default(500, "Failed to create borrow record. Please try again.");
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Book borrowed successfully",
        data: result,
    });
}));
const getOverdueBorrowList = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const overdueList = yield borrow_service_1.BorrowRecordServices.getOverDueBorrowListFromDB();
    const message = overdueList.length > 0 ? "Overdue borrow list fetched" : "No overdue books";
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message,
        data: overdueList,
    });
}));
exports.BorrowRecordControllers = {
    createBorrowRecord,
    getOverdueBorrowList,
};

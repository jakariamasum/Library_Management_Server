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
exports.MemberControllers = void 0;
const AppError_1 = __importDefault(require("../../errors/AppError"));
const catchAsync_1 = __importDefault(require("../../utils/catchAsync"));
const sendResponse_1 = __importDefault(require("../../utils/sendResponse"));
const member_service_1 = require("./member.service");
const createMember = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberServices.createMemberIntoDB(req.body);
    if (!result) {
        throw new AppError_1.default(500, "Failed to create member. Please try again.");
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 201,
        message: "Member created successfully",
        data: result,
    });
}));
const getAllMembers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield member_service_1.MemberServices.getAllMembersFromDB();
    if (!result) {
        throw new AppError_1.default(404, "No members found.");
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Members retrieved successfully",
        data: result,
    });
}));
const getSingleMember = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId } = req.params;
    const result = yield member_service_1.MemberServices.getSingleMemberFromDB(memberId);
    if (!result) {
        throw new AppError_1.default(404, "Member not found.");
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Member retrieved successfully",
        data: result,
    });
}));
const updateMember = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId } = req.params;
    const result = yield member_service_1.MemberServices.updateMemberIntoDB(memberId, req.body);
    if (!result) {
        throw new AppError_1.default(404, "Member not found.");
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Member updated successfully",
        data: result,
    });
}));
const deleteMembers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { memberId } = req.params;
    const result = yield member_service_1.MemberServices.deleteMemberFromDB(memberId);
    if (!result) {
        throw new AppError_1.default(404, "Member not found");
    }
    (0, sendResponse_1.default)(res, {
        success: true,
        status: 200,
        message: "Member successfully deleted",
    });
}));
exports.MemberControllers = {
    createMember,
    getAllMembers,
    getSingleMember,
    updateMember,
    deleteMembers,
};

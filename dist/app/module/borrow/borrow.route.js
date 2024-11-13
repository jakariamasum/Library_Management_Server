"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BorrowRecordRoutes = void 0;
const express_1 = require("express");
const borrow_controller_1 = require("./borrow.controller");
const router = (0, express_1.Router)();
router.post("/", borrow_controller_1.BorrowRecordControllers.createBorrowRecord);
router.get("/overdue", borrow_controller_1.BorrowRecordControllers.getOverdueBorrowList);
exports.BorrowRecordRoutes = router;

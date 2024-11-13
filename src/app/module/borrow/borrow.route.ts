import { Router } from "express";
import { BorrowRecordControllers } from "./borrow.controller";

const router = Router();

router.post("/", BorrowRecordControllers.createBorrowRecord);
router.get("/overdue", BorrowRecordControllers.getOverdueBorrowList);
router.put("/:id", BorrowRecordControllers.updateBorrowRecord);

export const BorrowRecordRoutes = router;

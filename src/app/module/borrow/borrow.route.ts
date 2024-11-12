import { Router } from "express";
import { BorrowRecordControllers } from "./borrow.controller";

const router = Router();

router.post("/", BorrowRecordControllers.createBorrowRecord);

export const BorrowRecordRoutes = router;

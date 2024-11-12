import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BorrowRecordServices } from "./borrow.service";

const createBorrowRecord = catchAsync(async (req, res) => {
  const result = await BorrowRecordServices.createBorrowRecordIntoDB(req.body);
  if (!result) {
    throw new AppError(
      500,
      "Failed to create borrow record. Please try again."
    );
  }

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Book borrowed successfully",
    data: result,
  });
});

export const BorrowRecordControllers = {
  createBorrowRecord,
};

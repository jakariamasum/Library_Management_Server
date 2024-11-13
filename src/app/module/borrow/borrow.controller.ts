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

const updateBorrowRecord = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { borrowDate } = req.body;
  const result = await BorrowRecordServices.updateBorrowRecordIntoDB(
    id,
    borrowDate
  );
  if (!result) {
    throw new AppError(404, "Record not found.");
  }

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Record updated successfully",
    data: result,
  });
});

const getOverdueBorrowList = catchAsync(async (req, res) => {
  const overdueList = await BorrowRecordServices.getOverDueBorrowListFromDB();

  const message =
    overdueList.length > 0 ? "Overdue borrow list fetched" : "No overdue books";

  sendResponse(res, {
    success: true,
    status: 200,
    message,
    data: overdueList,
  });
});

export const BorrowRecordControllers = {
  createBorrowRecord,
  getOverdueBorrowList,
  updateBorrowRecord,
};

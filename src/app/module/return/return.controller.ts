import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { ReturnServices } from "./return.service";

const returnBook = catchAsync(async (req, res) => {
  const { borrowId } = req.body;
  const result = await ReturnServices.returnBookFromDB(borrowId);
  if (!result) {
    throw new AppError(404, "Something went wrong!");
  }

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Book returned successfully",
  });
});

export const ReturnControllers = {
  returnBook,
};

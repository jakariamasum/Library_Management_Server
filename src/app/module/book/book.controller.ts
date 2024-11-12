import AppError from "../../errors/AppError";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { BookServices } from "./book.service";

const createBook = catchAsync(async (req, res) => {
  const result = await BookServices.createBookIntoDB(req.body);
  if (!result) {
    throw new AppError(404, "Something went wrong!");
  }

  sendResponse(res, {
    success: true,
    status: 201,
    message: "Book created successfully",
    data: result,
  });
});
const getAllBooks = catchAsync(async (req, res) => {
  const result = await BookServices.getAllBooksFromDB();
  if (!result) {
    throw new AppError(404, "Something went wrong!");
  }

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Books retrieved successfully",
    data: result,
  });
});
const getSingleBook = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const result = await BookServices.getSingleBookFromDB(bookId);
  if (!result) {
    throw new AppError(404, "Something went wrong!");
  }

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Book retrieved successfully",
    data: result,
  });
});
const updateBook = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const result = await BookServices.updateBookIntoDB(bookId, req.body);
  if (!result) {
    throw new AppError(404, "Something went wrong!");
  }

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Book updated successfully",
    data: result,
  });
});
const deleteBooks = catchAsync(async (req, res) => {
  const { bookId } = req.params;
  const result = await BookServices.deleteBookFromDB(bookId);
  if (!result) {
    throw new AppError(404, "Something went wrong!");
  }

  sendResponse(res, {
    success: true,
    status: 200,
    message: "Book successfully deleted",
  });
});

export const BookControllers = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateBook,
  deleteBooks,
};

import { PrismaClient } from "@prisma/client";
import { IBorrowRecord } from "./borrow.interface";
import { addDays, differenceInDays } from "date-fns";
import AppError from "../../errors/AppError";

const prisma = new PrismaClient();

const createBorrowRecordIntoDB = async (payload: IBorrowRecord) => {
  return await prisma.$transaction(async (transaction) => {
    // throw error if the user does not exits
    await transaction.member.findUniqueOrThrow({
      where: {
        memberId: payload.memberId,
      },
    });

    // throw error if the book does not exits
    await transaction.book.findUniqueOrThrow({
      where: {
        bookId: payload.bookId,
      },
    });

    // Find the book and check if there are available copies
    const book = await transaction.book.findUniqueOrThrow({
      where: {
        bookId: payload.bookId,
      },
    });

    if (book.availableCopies <= 0) {
      throw new AppError(400, "No available copies for this book");
    }

    // Create the borrow record
    const borrowRecord = await transaction.borrowRecord.create({
      data: {
        bookId: payload.bookId,
        memberId: payload.memberId,
        borrowDate: new Date(),
      },
      select: {
        borrowId: true,
        bookId: true,
        memberId: true,
        borrowDate: true,
      },
    });

    // Decrease the available copies by one
    await transaction.book.update({
      where: {
        bookId: payload.bookId,
      },
      data: {
        availableCopies: {
          decrement: 1,
        },
      },
    });

    return borrowRecord;
  });
};

const getOverDueBorrowListFromDB = async () => {
  const currentDate = new Date();

  const overdueRecords = await prisma.borrowRecord.findMany({
    where: {
      returnDate: null,
      borrowDate: {
        lt: addDays(currentDate, -14),
      },
    },
    include: {
      book: { select: { title: true } },
      member: { select: { name: true } },
    },
  });

  return overdueRecords.map((record) => {
    const overdueDays = differenceInDays(
      currentDate,
      addDays(record.borrowDate, 14)
    );
    return {
      borrowId: record.borrowId,
      bookTitle: record.book.title,
      borrowerName: record.member.name,
      overdueDays,
    };
  });
};

const updateBorrowRecordIntoDB = async (id: string, date: string) => {
  const res = await prisma.borrowRecord.update({
    where: {
      borrowId: id,
    },
    data: {
      borrowDate: date,
    },
  });
  return res;
};

export const BorrowRecordServices = {
  createBorrowRecordIntoDB,
  getOverDueBorrowListFromDB,
  updateBorrowRecordIntoDB,
};

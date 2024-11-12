import { PrismaClient } from "@prisma/client";
import { IBorrowRecord } from "./borrow.interface";
import { addDays, differenceInDays } from "date-fns";

const prisma = new PrismaClient();

const createBorrowRecordIntoDB = async (payload: IBorrowRecord) => {
  const result = await prisma.borrowRecord.create({
    data: payload,
  });
  return result;
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

export const BorrowRecordServices = {
  createBorrowRecordIntoDB,
  getOverDueBorrowListFromDB,
};

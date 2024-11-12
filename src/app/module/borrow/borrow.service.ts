import { PrismaClient } from "@prisma/client";
import { IBorrowRecord } from "./borrow.interface";

const prisma = new PrismaClient();

const createBorrowRecordIntoDB = async (payload: IBorrowRecord) => {
  const result = await prisma.borrowRecord.create({
    data: payload,
  });
  return result;
};

export const BorrowRecordServices = {
  createBorrowRecordIntoDB,
};

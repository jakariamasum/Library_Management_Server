import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const returnBookFromDB = async (id: string) => {
  const res = await prisma.borrowRecord.update({
    where: {
      borrowId: id,
    },
    data: {
      returnDate: new Date(),
    },
  });
  return res;
};

export const ReturnServices = {
  returnBookFromDB,
};

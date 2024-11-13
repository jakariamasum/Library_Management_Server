import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const returnBookFromDB = async (id: string) => {
  return await prisma.$transaction(async (transaction) => {
    // Throws an error if the record is not found
    await transaction.borrowRecord.findUniqueOrThrow({
      where: {
        borrowId: id,
      },
    });

    // update the borrow record
    const res = await transaction.borrowRecord.update({
      where: {
        borrowId: id,
      },
      data: {
        returnDate: new Date(),
      },
    });

    // Increase the available copies by one
    await transaction.book.update({
      where: {
        bookId: res.bookId,
      },
      data: {
        availableCopies: {
          increment: 1,
        },
      },
    });
    return res;
  });
};

export const ReturnServices = {
  returnBookFromDB,
};

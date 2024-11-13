import { PrismaClient } from "@prisma/client";
import { IBook } from "./book.interface";

const prisma = new PrismaClient();

const createBookIntoDB = async (payload: IBook) => {
  const newBook = await prisma.book.create({
    data: payload,
  });
  return newBook;
};

const getAllBooksFromDB = async () => {
  const books = await prisma.book.findMany();
  return books;
};

const getSingleBookFromDB = async (id: string) => {
  const book = await prisma.book.findUnique({
    where: {
      bookId: id,
    },
  });
  return book;
};

const updateBookIntoDB = async (id: string, payload: Partial<IBook>) => {
  // Throws an error if the book is not found
  await prisma.book.findUniqueOrThrow({
    where: {
      bookId: id,
    },
  });

  // update the book
  const updatedBook = await prisma.book.update({
    where: {
      bookId: id,
    },
    data: {
      ...payload,
    },
  });
  return updatedBook;
};

const deleteBookFromDB = async (id: string) => {
  return await prisma.$transaction(async (transaction) => {
    // Throws an error if the book is not found
    await transaction.book.findUniqueOrThrow({
      where: {
        bookId: id,
      },
    });

    // delete all borrow record associated with that book
    await transaction.borrowRecord.deleteMany({
      where: { bookId: id },
    });

    // delete the book
    const deletedBook = await transaction.book.delete({
      where: { bookId: id },
    });

    return deletedBook;
  });
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  updateBookIntoDB,
  deleteBookFromDB,
};

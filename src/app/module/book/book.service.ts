import { PrismaClient } from "@prisma/client";
import { IBook } from "./book.interface";

const prisma = new PrismaClient();

const createBookIntoDB = async (payload: IBook) => {
  console.log(payload);
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
  const deletedBook = await prisma.book.delete({
    where: {
      bookId: id,
    },
  });
  return deletedBook;
};

export const BookServices = {
  createBookIntoDB,
  getAllBooksFromDB,
  getSingleBookFromDB,
  updateBookIntoDB,
  deleteBookFromDB,
};

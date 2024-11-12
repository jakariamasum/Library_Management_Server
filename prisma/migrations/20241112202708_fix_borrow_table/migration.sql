/*
  Warnings:

  - Added the required column `updatedAt` to the `BorrowRecord` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BorrowRecord" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "borrowDate" SET DEFAULT CURRENT_TIMESTAMP;

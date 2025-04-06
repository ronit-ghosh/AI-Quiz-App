/*
  Warnings:

  - Added the required column `userId` to the `Answers` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Categories` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Questions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Stats` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Answers" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Questions" ADD COLUMN     "userId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Stats" ADD COLUMN     "userId" TEXT NOT NULL;

/*
  Warnings:

  - Made the column `categoryId` on table `Stats` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Stats" ALTER COLUMN "categoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Stats" ADD CONSTRAINT "Stats_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

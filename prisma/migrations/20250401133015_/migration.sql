/*
  Warnings:

  - You are about to drop the column `realeseYear` on the `Anime` table. All the data in the column will be lost.
  - Added the required column `releaseYear` to the `Anime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "realeseYear",
ADD COLUMN     "releaseYear" INTEGER NOT NULL;

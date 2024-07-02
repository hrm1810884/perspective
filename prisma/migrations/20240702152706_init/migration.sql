/*
  Warnings:

  - Added the required column `isPublic` to the `Diary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diary" ADD COLUMN     "isPublic" BOOLEAN NOT NULL;

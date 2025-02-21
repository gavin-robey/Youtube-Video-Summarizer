/*
  Warnings:

  - You are about to drop the column `message` on the `Message` table. All the data in the column will be lost.
  - Added the required column `AIMessage` to the `Message` table without a default value. This is not possible if the table is not empty.
  - Added the required column `humanMessage` to the `Message` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Message" DROP COLUMN "message",
ADD COLUMN     "AIMessage" TEXT NOT NULL,
ADD COLUMN     "humanMessage" TEXT NOT NULL;

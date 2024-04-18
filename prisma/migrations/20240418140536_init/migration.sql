/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Institute` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Institute` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Institute` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Institute` required. This step will fail if there are existing NULL values in that column.
  - Made the column `content` on table `Projects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `Institute` ADD COLUMN `email` VARCHAR(191) NOT NULL,
    ADD COLUMN `phone` VARCHAR(191) NOT NULL,
    MODIFY `name` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Projects` MODIFY `content` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `Institute_email_key` ON `Institute`(`email`);

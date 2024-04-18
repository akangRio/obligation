/*
  Warnings:

  - You are about to drop the column `userId` on the `Institute` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[instituteId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `instituteId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `Institute` DROP FOREIGN KEY `Institute_userId_fkey`;

-- AlterTable
ALTER TABLE `Institute` DROP COLUMN `userId`;

-- AlterTable
ALTER TABLE `User` ADD COLUMN `instituteId` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `User_instituteId_key` ON `User`(`instituteId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_instituteId_fkey` FOREIGN KEY (`instituteId`) REFERENCES `Institute`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

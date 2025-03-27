/*
  Warnings:

  - You are about to alter the column `createdAt` on the `item` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updatedAt` on the `item` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `modulo` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updatedAt` on the `modulo` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `permission` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updatedAt` on the `permission` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `n_codper` to the `Horario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `horario` ADD COLUMN `n_codper` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `item` MODIFY `createdAt` TIMESTAMP NULL,
    MODIFY `updatedAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `modulo` MODIFY `createdAt` TIMESTAMP NULL,
    MODIFY `updatedAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `permission` MODIFY `createdAt` TIMESTAMP NULL,
    MODIFY `updatedAt` TIMESTAMP NULL;

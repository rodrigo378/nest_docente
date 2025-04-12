/*
  Warnings:

  - You are about to alter the column `createdAt` on the `item` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updatedAt` on the `item` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `modulo` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updatedAt` on the `modulo` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `permission` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updatedAt` on the `permission` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Made the column `dia` on table `horario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `h_inicio` on table `horario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `h_fin` on table `horario` required. This step will fail if there are existing NULL values in that column.
  - Made the column `c_color` on table `horario` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `horario` MODIFY `dia` VARCHAR(191) NOT NULL,
    MODIFY `h_inicio` DATETIME(3) NOT NULL,
    MODIFY `h_fin` DATETIME(3) NOT NULL,
    MODIFY `c_color` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `item` MODIFY `createdAt` TIMESTAMP NULL,
    MODIFY `updatedAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `modulo` MODIFY `createdAt` TIMESTAMP NULL,
    MODIFY `updatedAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `permission` MODIFY `createdAt` TIMESTAMP NULL,
    MODIFY `updatedAt` TIMESTAMP NULL;

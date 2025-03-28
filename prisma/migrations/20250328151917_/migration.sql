/*
  Warnings:

  - You are about to drop the column `n_aulo` on the `aula` table. All the data in the column will be lost.
  - You are about to alter the column `createdAt` on the `item` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updatedAt` on the `item` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `modulo` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updatedAt` on the `modulo` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `createdAt` on the `permission` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - You are about to alter the column `updatedAt` on the `permission` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.
  - Added the required column `n_aula` to the `Aula` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `aula` DROP COLUMN `n_aulo`,
    ADD COLUMN `n_aula` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `horario` ADD COLUMN `c_codcur_equ` VARCHAR(191) NULL,
    ADD COLUMN `c_codesp_equ` VARCHAR(191) NULL,
    ADD COLUMN `c_codfac_equ` VARCHAR(191) NULL,
    ADD COLUMN `c_codmod_equ` VARCHAR(191) NULL,
    ADD COLUMN `c_nomcur_equ` VARCHAR(191) NULL,
    ADD COLUMN `n_codper_equ` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `item` MODIFY `createdAt` TIMESTAMP NULL,
    MODIFY `updatedAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `modulo` MODIFY `createdAt` TIMESTAMP NULL,
    MODIFY `updatedAt` TIMESTAMP NULL;

-- AlterTable
ALTER TABLE `permission` MODIFY `createdAt` TIMESTAMP NULL,
    MODIFY `updatedAt` TIMESTAMP NULL;

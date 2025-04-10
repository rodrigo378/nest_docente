-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NULL,
    `apellido` VARCHAR(191) NULL,
    `genero` VARCHAR(191) NULL,
    `grado` VARCHAR(191) NULL,
    `estado` CHAR(1) NOT NULL DEFAULT 'A',
    `email` VARCHAR(191) NOT NULL,
    `password` VARCHAR(191) NULL,
    `googleId` VARCHAR(191) NULL,
    `microsoftId` VARCHAR(191) NULL,
    `authProvider` ENUM('LOCAL', 'GOOGLE', 'MICROSOFT') NOT NULL DEFAULT 'LOCAL',
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `User_email_key`(`email`),
    UNIQUE INDEX `User_googleId_key`(`googleId`),
    UNIQUE INDEX `User_microsoftId_key`(`microsoftId`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Departamento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Provincia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `departamento_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Distrito` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `provincia_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Modulo` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `codigo` VARCHAR(255) NOT NULL,
    `icono` TEXT NULL,
    `estado` CHAR(1) NOT NULL DEFAULT 'A',
    `createdAt` TIMESTAMP NULL,
    `updatedAt` TIMESTAMP NULL,

    UNIQUE INDEX `Modulo_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Item` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `modulo_id` INTEGER NOT NULL,
    `nombre` VARCHAR(255) NOT NULL,
    `codigo` VARCHAR(255) NOT NULL,
    `createdAt` TIMESTAMP NULL,
    `updatedAt` TIMESTAMP NULL,

    UNIQUE INDEX `Item_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Permission` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` INTEGER NOT NULL,
    `item_id` INTEGER NOT NULL,
    `estado` CHAR(1) NOT NULL DEFAULT 'A',
    `createdAt` TIMESTAMP NULL,
    `updatedAt` TIMESTAMP NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Turno` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `n_codper` INTEGER NOT NULL,
    `n_codpla` INTEGER NOT NULL,
    `c_codfac` VARCHAR(191) NOT NULL,
    `nom_fac` VARCHAR(191) NOT NULL,
    `c_codesp` VARCHAR(191) NOT NULL,
    `nomesp` VARCHAR(191) NOT NULL,
    `c_grpcur` VARCHAR(191) NOT NULL,
    `c_codmod` INTEGER NOT NULL,
    `c_nommod` VARCHAR(191) NOT NULL,
    `n_ciclo` INTEGER NOT NULL,
    `estado` INTEGER NOT NULL DEFAULT 1,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `n_codper` VARCHAR(191) NOT NULL,
    `c_codmod` INTEGER NOT NULL,
    `c_codfac` VARCHAR(191) NOT NULL,
    `c_codesp` VARCHAR(191) NOT NULL,
    `c_codcur` VARCHAR(191) NOT NULL,
    `c_nomcur` VARCHAR(191) NOT NULL,
    `n_ciclo` INTEGER NOT NULL,
    `c_area` VARCHAR(191) NOT NULL,
    `n_codper_equ` VARCHAR(191) NULL,
    `c_codmod_equ` INTEGER NULL,
    `c_codfac_equ` VARCHAR(191) NULL,
    `c_codesp_equ` VARCHAR(191) NULL,
    `c_codcur_equ` VARCHAR(191) NULL,
    `c_nomcur_equ` VARCHAR(191) NULL,
    `turno_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `grupo_sincro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `curso_id` INTEGER NOT NULL,
    `padre_curso_id` INTEGER NOT NULL,
    `tipo` INTEGER NOT NULL,
    `shortname` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Horario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `dia` VARCHAR(191) NOT NULL,
    `h_inicio` DATETIME(3) NOT NULL,
    `h_fin` DATETIME(3) NOT NULL,
    `n_horas` INTEGER NOT NULL,
    `c_color` VARCHAR(191) NOT NULL,
    `tipo` VARCHAR(191) NOT NULL,
    `h_umaPlus` INTEGER NULL,
    `aula_id` INTEGER NULL,
    `docente_id` INTEGER NULL,
    `curso_id` INTEGER NOT NULL,
    `turno_id` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Aula` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `c_codaula` VARCHAR(191) NOT NULL,
    `n_piso` INTEGER NOT NULL,
    `pabellon` VARCHAR(191) NOT NULL,
    `n_capacidad` VARCHAR(191) NOT NULL,
    `c_obs` TEXT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Docente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `categoria` VARCHAR(191) NOT NULL,
    `c_nomdoc` VARCHAR(191) NOT NULL,
    `h_min` INTEGER NOT NULL,
    `h_max` INTEGER NOT NULL,
    `tipo` INTEGER NOT NULL,
    `h_total` DOUBLE NOT NULL DEFAULT 0,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Provincia` ADD CONSTRAINT `Provincia_departamento_id_fkey` FOREIGN KEY (`departamento_id`) REFERENCES `Departamento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Distrito` ADD CONSTRAINT `Distrito_provincia_id_fkey` FOREIGN KEY (`provincia_id`) REFERENCES `Provincia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Item` ADD CONSTRAINT `Item_modulo_id_fkey` FOREIGN KEY (`modulo_id`) REFERENCES `Modulo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permission` ADD CONSTRAINT `Permission_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Permission` ADD CONSTRAINT `Permission_item_id_fkey` FOREIGN KEY (`item_id`) REFERENCES `Item`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Curso` ADD CONSTRAINT `Curso_turno_id_fkey` FOREIGN KEY (`turno_id`) REFERENCES `Turno`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grupo_sincro` ADD CONSTRAINT `grupo_sincro_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `Curso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `grupo_sincro` ADD CONSTRAINT `grupo_sincro_padre_curso_id_fkey` FOREIGN KEY (`padre_curso_id`) REFERENCES `Curso`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_aula_id_fkey` FOREIGN KEY (`aula_id`) REFERENCES `Aula`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_docente_id_fkey` FOREIGN KEY (`docente_id`) REFERENCES `Docente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `Curso`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Horario` ADD CONSTRAINT `Horario_turno_id_fkey` FOREIGN KEY (`turno_id`) REFERENCES `Turno`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

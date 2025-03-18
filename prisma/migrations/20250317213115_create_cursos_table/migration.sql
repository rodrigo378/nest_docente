-- CreateTable
CREATE TABLE `User` (
    `id` VARCHAR(191) NOT NULL,
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
CREATE TABLE `Docente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `user_id` VARCHAR(191) NOT NULL,
    `nombres` VARCHAR(191) NOT NULL,
    `apellido_paterno` VARCHAR(191) NOT NULL,
    `apellido_materno` VARCHAR(191) NOT NULL,
    `tipo_identificacion` VARCHAR(191) NOT NULL,
    `numero_identificacion` VARCHAR(191) NOT NULL,
    `fecha_nacimiento` DATETIME(3) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `celular` VARCHAR(9) NOT NULL,
    `telefono_fijo` VARCHAR(7) NOT NULL,
    `estado` INTEGER NOT NULL DEFAULT 0,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Docente_user_id_key`(`user_id`),
    UNIQUE INDEX `Docente_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ContactoEmergencia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NOT NULL,
    `relacion` VARCHAR(191) NOT NULL,
    `telefono_1` CHAR(9) NOT NULL,
    `telefono_2` CHAR(9) NULL,
    `docente_id` INTEGER NOT NULL,

    UNIQUE INDEX `ContactoEmergencia_docente_id_key`(`docente_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Domicilio` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `departamento_id` INTEGER NOT NULL,
    `provincia_id` INTEGER NOT NULL,
    `distrito_id` INTEGER NOT NULL,
    `direccion` VARCHAR(191) NULL,
    `referencia` VARCHAR(191) NULL,
    `mz` VARCHAR(191) NULL,
    `lote` VARCHAR(191) NULL,
    `docente_id` INTEGER NOT NULL,

    UNIQUE INDEX `Domicilio_docente_id_key`(`docente_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FormacionAcademica` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `grado_academico` VARCHAR(191) NULL,
    `universidad` VARCHAR(191) NULL,
    `especialidad` VARCHAR(191) NULL,
    `pais` VARCHAR(191) NULL,
    `resolucion_sunedu` VARCHAR(191) NULL,
    `docente_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `TituloProfesional` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NULL,
    `universidad` VARCHAR(191) NULL,
    `especialidad` VARCHAR(191) NULL,
    `docente_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `FormacionComplementaria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `denominacion` VARCHAR(191) NULL,
    `especialidad` VARCHAR(191) NULL,
    `institucion` VARCHAR(191) NULL,
    `docente_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ExperienciaDocente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `institucion` VARCHAR(191) NULL,
    `curso_dictado` VARCHAR(191) NULL,
    `semestre` VARCHAR(191) NULL,
    `pais` VARCHAR(191) NULL,
    `tipo_experiencia` INTEGER NOT NULL,
    `docente_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ArticuloCientifico` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo_articulo` VARCHAR(191) NULL,
    `nombre_revista` VARCHAR(191) NULL,
    `indizado` VARCHAR(191) NULL,
    `año` VARCHAR(191) NULL,
    `enlace` VARCHAR(191) NULL,
    `docente_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Libro` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(191) NULL,
    `nombre_editorial` VARCHAR(191) NULL,
    `año` VARCHAR(191) NULL,
    `docente_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ProyectoInvestigacion` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(191) NULL,
    `entidad_financiadora` VARCHAR(191) NULL,
    `año` VARCHAR(191) NULL,
    `docente_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AsesoriaJurado` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo_tesis` VARCHAR(191) NULL,
    `universidad` VARCHAR(191) NULL,
    `nivel` VARCHAR(191) NULL,
    `año` VARCHAR(191) NULL,
    `tipo` INTEGER NOT NULL,
    `docente_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Otros` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `idioma` VARCHAR(191) NULL,
    `nivel_idioma` VARCHAR(191) NULL,
    `office` VARCHAR(191) NULL,
    `nivel_office` VARCHAR(191) NULL,
    `elearning` VARCHAR(191) NULL,
    `nivel_elearning` VARCHAR(191) NULL,
    `docente_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Curso` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `n_codper` INTEGER NOT NULL,
    `c_codmod` VARCHAR(191) NOT NULL,
    `c_codfac` VARCHAR(191) NOT NULL,
    `c_codesp` VARCHAR(191) NOT NULL,
    `c_codcur` VARCHAR(191) NOT NULL,
    `c_nomcur` VARCHAR(191) NOT NULL,
    `generales` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Provincia` ADD CONSTRAINT `Provincia_departamento_id_fkey` FOREIGN KEY (`departamento_id`) REFERENCES `Departamento`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Distrito` ADD CONSTRAINT `Distrito_provincia_id_fkey` FOREIGN KEY (`provincia_id`) REFERENCES `Provincia`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Docente` ADD CONSTRAINT `Docente_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `User`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ContactoEmergencia` ADD CONSTRAINT `ContactoEmergencia_docente_id_fkey` FOREIGN KEY (`docente_id`) REFERENCES `Docente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Domicilio` ADD CONSTRAINT `Domicilio_docente_id_fkey` FOREIGN KEY (`docente_id`) REFERENCES `Docente`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FormacionAcademica` ADD CONSTRAINT `FormacionAcademica_docente_id_fkey` FOREIGN KEY (`docente_id`) REFERENCES `Docente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `TituloProfesional` ADD CONSTRAINT `TituloProfesional_docente_id_fkey` FOREIGN KEY (`docente_id`) REFERENCES `Docente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `FormacionComplementaria` ADD CONSTRAINT `FormacionComplementaria_docente_id_fkey` FOREIGN KEY (`docente_id`) REFERENCES `Docente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ExperienciaDocente` ADD CONSTRAINT `ExperienciaDocente_docente_id_fkey` FOREIGN KEY (`docente_id`) REFERENCES `Docente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ArticuloCientifico` ADD CONSTRAINT `ArticuloCientifico_docente_id_fkey` FOREIGN KEY (`docente_id`) REFERENCES `Docente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Libro` ADD CONSTRAINT `Libro_docente_id_fkey` FOREIGN KEY (`docente_id`) REFERENCES `Docente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ProyectoInvestigacion` ADD CONSTRAINT `ProyectoInvestigacion_docente_id_fkey` FOREIGN KEY (`docente_id`) REFERENCES `Docente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `AsesoriaJurado` ADD CONSTRAINT `AsesoriaJurado_docente_id_fkey` FOREIGN KEY (`docente_id`) REFERENCES `Docente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Otros` ADD CONSTRAINT `Otros_docente_id_fkey` FOREIGN KEY (`docente_id`) REFERENCES `Docente`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

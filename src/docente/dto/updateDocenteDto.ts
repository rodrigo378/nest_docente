import {
  IsString,
  IsEmail,
  IsDateString,
  IsOptional,
  IsArray,
  ValidateNested,
  Length,
  IsNumber,
} from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateDocenteDto {
  // Información Personal Docente
  @IsOptional()
  @IsString()
  nombres?: string;

  @IsOptional()
  @IsString()
  apellido_paterno?: string;

  @IsOptional()
  @IsString()
  apellido_materno?: string;

  @IsOptional()
  @IsString()
  tipo_identificacion?: string;

  @IsOptional()
  @IsString()
  numero_identificacion?: string;

  @IsOptional()
  @IsDateString()
  fecha_nacimiento?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @IsString()
  @Length(9, 9)
  celular?: string;

  @IsOptional()
  @IsString()
  @Length(7, 7)
  telefono_fijo?: string;

  // Contacto de Emergencia
  @IsOptional()
  contactoEmergencia?: {
    id?: number;
    nombre: string;
    relacion: string;
    telefono_1: string;
    telefono_2?: string;
  };

  // Domicilio del Docente
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => DomicilioDto)
  domicilios?: DomicilioDto[];

  // Formación Académica
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FormacionAcademicaDto)
  formacionAcademica?: FormacionAcademicaDto[];

  // Títulos Profesionales
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TituloProfesionalDto)
  titulosProfesionales?: TituloProfesionalDto[];

  // Formación Complementaria
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => FormacionComplementariaDto)
  formacionComplementaria?: FormacionComplementariaDto[];

  // Experiencia Universitaria
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienciaDocenteDto)
  experienciaUniversitaria?: ExperienciaDocenteDto[];

  // Experiencia No Universitaria
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ExperienciaDocenteDto)
  experienciaNoUnivercitaria?: ExperienciaDocenteDto[];

  // Artículos Científicos
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ArticuloCientificoDto)
  articuloCientifico?: ArticuloCientificoDto[];

  // Libros
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => LibroDto)
  libros?: LibroDto[];

  // Proyectos de Investigación
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProyectoInvestigacionDto)
  proyectoInvestigacion?: ProyectoInvestigacionDto[];

  // Asesorías y Jurados
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AsesoriaJuradoDto)
  asesoriaJurado?: AsesoriaJuradoDto[];

  // Otros conocimientos
  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OtrosDto)
  otros?: OtrosDto[];
}

// **📌 Subclases para Relaciones Anidadas**

export class DomicilioDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  departamento_id?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  provincia_id?: number;

  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  distrito_id?: number;

  @IsOptional()
  @IsString()
  direccion?: string;

  @IsOptional()
  @IsString()
  referencia?: string;

  @IsOptional()
  @IsString()
  mz?: string;

  @IsOptional()
  @IsString()
  lote?: string;
}

export class FormacionAcademicaDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  grado_academico?: string;

  @IsOptional()
  @IsString()
  universidad?: string;

  @IsOptional()
  @IsString()
  especialidad?: string;

  @IsOptional()
  @IsString()
  pais?: string;

  @IsOptional()
  @IsString()
  revalidacion?: string;
}

export class TituloProfesionalDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  titulo?: string;

  @IsOptional()
  @IsString()
  universidad?: string;

  @IsOptional()
  @IsString()
  especialidad?: string;
}

export class FormacionComplementariaDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  denominacion?: string;

  @IsOptional()
  @IsString()
  especialidad?: string;

  @IsOptional()
  @IsString()
  institucion?: string;
}

export class ExperienciaDocenteDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  nombre_universidad?: string;

  @IsOptional()
  @IsString()
  curso_dictado?: string;

  @IsOptional()
  @IsString()
  semestre?: string;

  @IsOptional()
  @IsString()
  pais?: string;
}

export class ArticuloCientificoDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  nombre_articulo?: string;

  @IsOptional()
  @IsString()
  nombre_revista?: string;

  @IsOptional()
  @IsString()
  indizado?: string;

  @IsOptional()
  @IsString()
  año?: string;

  @IsOptional()
  @IsString()
  enlace?: string;
}

export class LibroDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  libro_titulo?: string;

  @IsOptional()
  @IsString()
  nombre_editorial?: string;

  @IsOptional()
  @IsString()
  año?: string;
}

export class ProyectoInvestigacionDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  proyecto?: string;

  @IsOptional()
  @IsString()
  entidad_financiera?: string;

  @IsOptional()
  @IsString()
  año_adjudicacion?: string;
}

export class AsesoriaJuradoDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  titulo_tesis?: string;

  @IsOptional()
  @IsString()
  universidad?: string;

  @IsOptional()
  @IsString()
  nivel_tesis?: string;

  @IsOptional()
  @IsString()
  año?: string;
}

export class OtrosDto {
  @IsOptional()
  id?: number;

  @IsOptional()
  @IsString()
  idioma?: string;

  @IsOptional()
  @IsString()
  nivel_idioma?: string;

  @IsOptional()
  @IsString()
  office?: string;

  @IsOptional()
  @IsString()
  nivel_office?: string;

  @IsOptional()
  @IsString()
  learning?: string;

  @IsOptional()
  @IsString()
  nivel_learning?: string;
}

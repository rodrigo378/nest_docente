import {
  IsNotEmpty,
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

// **📌 Subclases para Relaciones Anidadas**

export class ContactoEmergenciaDto {
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @IsNotEmpty()
  @IsString()
  relacion: string;

  @IsNotEmpty()
  @IsString()
  @Length(9, 9)
  telefono_1: string;

  @IsOptional()
  @IsString()
  @Length(9, 9)
  telefono_2?: string;
}

export class DomicilioDto {
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  departamento_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  provincia_id: number;

  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  distrito_id: number;

  @IsNotEmpty()
  @IsString()
  direccion: string;

  @IsNotEmpty()
  @IsString()
  referencia: string;

  @IsNotEmpty()
  @IsString()
  mz: string;

  @IsNotEmpty()
  @IsString()
  lote: string;
}

export class FormacionAcademicaDto {
  @IsNotEmpty()
  @IsString()
  grado_academico: string;

  @IsNotEmpty()
  @IsString()
  universidad: string;

  @IsNotEmpty()
  @IsString()
  especialidad: string;

  @IsNotEmpty()
  @IsString()
  pais: string;

  @IsNotEmpty()
  @IsString()
  revalidacion: string;
}

export class TituloProfesionalDto {
  @IsNotEmpty()
  @IsString()
  titulo: string;

  @IsNotEmpty()
  @IsString()
  universidad: string;

  @IsNotEmpty()
  @IsString()
  especialidad: string;
}

export class FormacionComplementariaDto {
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

export class CreateDocenteDto {
  // Información Personal Docente
  @IsNotEmpty()
  @IsString()
  nombres: string;

  @IsNotEmpty()
  @IsString()
  apellido_paterno: string;

  @IsNotEmpty()
  @IsString()
  apellido_materno: string;

  @IsNotEmpty()
  @IsString()
  tipo_identificacion: string;

  @IsNotEmpty()
  @IsString()
  numero_identificacion: string;

  @IsNotEmpty()
  @IsDateString()
  fecha_nacimiento: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @Length(9, 9)
  celular: string;

  @IsOptional()
  @IsString()
  @Length(7, 7)
  telefono_fijo?: string;

  // Contacto de Emergencia
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => ContactoEmergenciaDto)
  contactoEmergencia: ContactoEmergenciaDto;

  // Domicilio del Docente
  @IsNotEmpty()
  @ValidateNested()
  @Type(() => DomicilioDto)
  domicilio: DomicilioDto;

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

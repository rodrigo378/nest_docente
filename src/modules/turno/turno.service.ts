import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateTurnoDto } from './dto/updateTurnoDto';
import { CreateTurnoDto } from './dto/createTurnoDto';
import { createLog } from 'src/common/utils/log.util';

@Injectable()
export class TurnoService {
  constructor(private readonly prismaService: PrismaService) {}

  async getTurnos(
    c_codfac?: string,
    c_codesp?: string,
    c_codmod?: number,
    n_codper?: number,
    n_codpla?: number,
    n_ciclo?: number,
    estado?: number,
  ) {
    return await this.prismaService.turno.findMany({
      where: {
        ...(c_codfac && { c_codfac }),
        ...(c_codesp && { c_codesp }),
        ...(c_codmod && { c_codmod }),
        ...(n_codper && { n_codper }),
        ...(n_codpla && { n_codpla }),
        ...(n_ciclo && { n_ciclo }),
        ...(estado && { estado }),
      },
      // include: { Horario: true },
    });
  }

  async getTurno(id: number) {
    const turno = await this.prismaService.turno.findFirst({
      where: { id },
    });

    if (!turno) {
      throw new NotFoundException('Este turno no existe');
    }
    return turno;
  }

  //se agrego log
  async createTurno(user_id: number, createTurnoDto: CreateTurnoDto) {
    const turno = await this.prismaService.turno.findFirst({
      where: {
        n_codper: createTurnoDto.n_codper,
        n_codpla: createTurnoDto.n_codpla,
        c_codfac: createTurnoDto.c_codfac,
        c_codesp: createTurnoDto.c_codesp,
        c_grpcur: createTurnoDto.c_grpcur,
        c_codmod: createTurnoDto.c_codmod,
        n_ciclo: createTurnoDto.n_ciclo,
      },
    });

    if (turno) {
      throw new ConflictException('Ya existe un turno con estos datos.');
    }

    const newTurno = await this.prismaService.turno.create({
      data: {
        ...createTurnoDto,
      },
    });

    await createLog(
      this.prismaService,
      user_id,
      'turno',
      'CREATE',
      'Se creo turrno',
      null,
      {},
      newTurno,
    );

    return {
      success: true,
      mensaje: '✅ Turno creado correctamente',
      turno: newTurno,
    };
  }

  //se agrego log
  async updateTurno(
    user_id: number,
    id: number,
    updateTurnoDto: UpdateTurnoDto,
  ) {
    const turno = await this.prismaService.turno.findFirst({ where: { id } });

    if (!turno) {
      throw new NotFoundException('Este turno no existe');
    }

    const updateTurno = await this.prismaService.turno.update({
      where: { id },
      data: { ...updateTurnoDto },
    });

    await createLog(
      this.prismaService,
      user_id,
      'turno',
      'UPDATE',
      'Se actualizo turrno',
      null,
      turno,
      updateTurno,
    );

    return updateTurno;
  }

  //se agrego log
  async deleteTurno(user_id: number, id: number) {
    const turnoExistente = await this.prismaService.turno.findUnique({
      where: { id },
    });

    if (!turnoExistente) {
      throw new NotFoundException('⚠️ Este turno no existe');
    }
    await this.prismaService.turno.delete({
      where: { id },
    });

    await createLog(
      this.prismaService,
      user_id,
      'turno',
      'DELETE',
      'Se borro turrno',
      null,
      turnoExistente,
      {},
    );

    return {
      success: true,
      mensaje: '✅ Turno eliminado correctamente',
    };
  }
}

// a1   a2
// 8:00 a 10:00
// b1   b2
// 9:30 a 12:30
// a1 < b2 and a2 > b1
// 8:00 < 12:30 and 10:00 > 9:30

// GENERAR TURNO
// SELECT
// 	a.n_codper,
//     a.n_codpla,
// 	b.c_codfac,
//     c.nom_fac,
//     b.c_codesp,
//     d.nomesp,
//     a.c_grpcur,
//     a.c_codmod,
//     e.c_nommod,
//     b.n_ciclo
// FROM tb_curso_grupo a
// INNER JOIN tb_plan_estudio_curso b
//     ON a.c_codcur = b.c_codcur
//     AND a.c_codmod = b.c_codmod
//     AND a.c_codfac = b.c_codfac
//     AND a.c_codesp = b.c_codesp
//     AND a.n_codpla = b.n_codper
// INNER JOIN tb_facultad c
//     ON a.c_codfac = c.cod_fac
// INNER JOIN tb_especialidad d
//     ON a.c_codesp = d.codesp
//     AND a.c_codfac = d.codfac
// INNER JOIN tb_modalidad e
//     ON a.c_codmod = e.c_codmod
// WHERE a.n_codper = 20251 -- and n_ciclo = 1
// AND a.c_codfac IN ('E', 'S')
// GROUP BY
// a.n_codper,
// a.n_codpla,
// b.c_codfac,
// c.nom_fac,
// b.c_codesp,
// d.nomesp,
// a.c_grpcur,
// a.c_codmod,
// e.c_nommod,
// b.n_ciclo;

// tb_cur_grp_hor
// id_horario
// n_codper
// c_codfac
// c_codcur
// c_grpcur
// c_dnidoc
// n_numdia
// c_hh_ini
// c_min_ini
// c_hh_fin
// c_mi_fin
// n_break =>  0
// c_codadm => null
// d_freg => falta
// c_codmod
// c_tipo => TEO TEV PRP LBP => falta
// id_aula
// c_codesp
// n_codpla => 2025
// c_sedcod => 1

// tb_doc_cur_grp
//c_dnidoc
//n_codper
//c_codmod
//c_codfac
//c_codcur
//c_grpcur
//c_tipo => falta
//c_categoria
//c_codesp
//n_codpla
//c_sedcod => 1
//c_tema => null
//n_monto_doc => null
//horas => null

//
//
/*
 */

// EC	ESPECIALIDAD => netamente de carrera
// EF	ESPECIFICA => semainarios
// FG	FORMACIÓN GENERAL => generales
// PP	PRÁCTICAS PRE-PROFESIONALES => practicas

//get docente
// aulas

// primero los cursos deben estar creadoos minimo 2

// luego escoger uno de los 2 como padre y asignarle el curso hijo

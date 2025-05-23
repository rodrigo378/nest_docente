import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UpdateTurnoDto } from './dto/updateTurnoDto';
import { CreateTurnoDto } from './dto/createTurnoDto';
import { createLog } from 'src/common/utils/log.util';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaReadonlyService } from 'src/prisma/readonly.service';
import { Curso } from '@prisma/client';

@Injectable()
export class TurnoService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly prismaReadonly: PrismaReadonlyService,
  ) {}

  async getTurnos(
    c_codfac?: string,
    c_codesp?: string,
    c_codmod?: number,
    n_codper?: number,
    n_codpla?: number,
    n_ciclo?: number,
    estado?: number,
  ) {
    const turnos = await this.prismaService.turno.findMany({
      where: {
        ...(c_codfac && { c_codfac }),
        ...(c_codesp && { c_codesp }),
        ...(c_codmod && { c_codmod }),
        ...(n_codper && { n_codper }),
        ...(n_codpla && { n_codpla }),
        ...(n_ciclo && { n_ciclo }),
        ...(estado && { estado }),
      },
      include: { periodo: true },
    });

    const fechaActual = new Date();

    // Agregar el campo `vencio` según comparación con la fecha de cierre
    const turnosConVencimiento = turnos.map((turno) => {
      const vencio = turno.periodo?.f_cierre
        ? new Date(turno.periodo.f_cierre) < fechaActual
        : false;

      return {
        ...turno,
        vencio,
      };
    });

    return turnosConVencimiento;
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

    let total = 0;

    console.log('turno.c_codfac => ', newTurno.c_codfac);
    console.log('turno.c_codesp => ', newTurno.c_codesp);
    console.log('turno.n_ciclo => ', newTurno.n_ciclo);
    console.log('turno.c_codmod => ', newTurno.c_codmod);

    const cursosRaw: Curso[] = await this.prismaReadonly.$queryRawUnsafe(
      `
          SELECT
            tp.n_codper,
            tp.c_codmod,
            tb.c_nommod,
            tp.c_codfac,
            t_f.nom_fac,
            tp.c_codesp,
            t_e.nomesp,
            tp.c_area,
            tpec.c_nom_cur_area,
            tp.n_ciclo,
            tp.c_ciclo,
            tp.c_codcur,
            tp.c_nomcur,
            tp.n_ht,
            tp.n_hp,
            tpee.n_codper_equ,
            tpee.c_codmod_equ,
            tpee.c_codfac_equ,
            tpee.c_codesp_equ,
            tpee.c_codcur_equ,
            tpee.c_nomcur_equ
          FROM tb_plan_estudio_curso tp
          INNER JOIN tb_modalidad tb ON tb.c_codmod = tp.c_codmod
          INNER JOIN tb_plan_estudio_curso_area tpec ON tpec.c_cod_cur_area = tp.c_area
          INNER JOIN tb_facultad t_f ON t_f.cod_fac = tp.c_codfac
          INNER JOIN tb_especialidad t_e ON t_e.codesp = tp.c_codesp
          LEFT JOIN (
            SELECT DISTINCT
              te.c_codcur,
              te.c_codfac,
              te.c_codesp,
              te.c_codmod,
              te.n_codper_equ,
              te.c_codmod_equ,
              te.c_codfac_equ,
              te.c_codesp_equ,
              te.c_codcur_equ,
              tp2.c_nomcur AS c_nomcur_equ
            FROM tb_plan_estudio_equ te
            INNER JOIN tb_plan_estudio_curso tp2 ON te.c_codcur_equ = tp2.c_codcur
            WHERE te.n_codper_equ IN (2023, 2025)
          ) tpee
          ON tpee.c_codcur = tp.c_codcur
            AND tpee.c_codmod = tp.c_codmod
            AND tpee.c_codfac = tp.c_codfac
            AND tpee.c_codesp = tp.c_codesp
          WHERE
            tp.n_codper IN ( 2023, 2025 )
            AND tp.c_codfac = ?
            AND tp.c_codesp = ?
            AND tp.n_ciclo = ?
            AND tp.c_codmod = ?
          GROUP BY
            tp.n_codper, tp.c_codmod, tb.c_nommod,
            tp.c_codfac, t_f.nom_fac, tp.c_codesp, t_e.nomesp,
            tp.c_area, tpec.c_nom_cur_area, tp.c_codcur, tp.c_nomcur,
            tp.n_ciclo, tp.c_ciclo, tp.n_ht, tp.n_hp,
            tpee.n_codper_equ, tpee.c_codmod_equ, tpee.c_codfac_equ,
            tpee.c_codesp_equ, tpee.c_codcur_equ, tpee.c_nomcur_equ
          ORDER BY tp.c_nomcur
          `,
      newTurno.c_codfac,
      newTurno.c_codesp,
      newTurno.n_ciclo,
      newTurno.c_codmod,
    );

    // console.log('cursosRaw => ', cursosRaw);

    const cursos = cursosRaw.map((curso) => ({
      n_codper: String(curso.n_codper),
      c_codmod: Number(curso.c_codmod),
      c_codfac: curso.c_codfac,
      nom_fac: curso.nom_fac,
      c_codesp: curso.c_codesp,
      nomesp: curso.nomesp,
      c_codcur: curso.c_codcur,
      c_nomcur: curso.c_nomcur,
      n_ciclo: curso.n_ciclo,
      c_area: curso.c_area,
      n_codper_equ: curso.n_codper_equ ? String(curso.n_codper_equ) : null,
      c_codmod_equ: curso.c_codmod_equ ? Number(curso.c_codmod_equ) : null,
      c_codfac_equ: curso.c_codfac_equ ?? null,
      c_codesp_equ: curso.c_codesp_equ ?? null,
      c_codcur_equ: curso.c_codcur_equ ?? null,
      c_nomcur_equ: curso.c_nomcur_equ ?? null,
      turno_id: newTurno.id,
    }));

    if (cursos.length > 0) {
      const result = await this.prismaService.curso.createMany({
        data: cursos,
        skipDuplicates: true,
      });
      total += result.count;
    }

    console.log(`✅ Cursos insertados correctamente: ${total}`);

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

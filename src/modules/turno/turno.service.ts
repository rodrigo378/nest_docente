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

type RowComparacion = {
  c_codfac: string;
  c_codesp: string;
  n_codper: number;
  c_codcur: string;
  c_dnidoc: string;
  n_ciclo: number;
  c_grpcur: string;
  c_codmod: number;
  dia: string; // 'Lunes'...'Domingo'
  h_inicio: string; // 'HH:mm'
  h_fin: string; // 'HH:mm'
};

type DiferenciaItem = {
  key: string;
  sigu: RowComparacion | null;
  horario: RowComparacion | null;
};

type ResultadoTurno = {
  turno: any; // si tienes el tipo Prisma de turno, úsalo aquí
  diferencias: DiferenciaItem[];
};
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

  // Tipos de apoyo (opcionales pero recomendados)

  // function makeKey(r: RowComparacion): string {
  //   return [
  //     r.c_codfac,
  //     r.c_codesp,
  //     r.n_codper,
  //     r.c_codcur,
  //     r.c_dnidoc,
  //     r.n_ciclo,
  //     r.c_grpcur,
  //     r.c_codmod,
  //     r.dia,
  //     r.h_inicio,
  //     r.h_fin,
  //   ].join('|');
  // }

  async verificarSigu(
    c_codfac: string,
    c_codmod: number,
    n_ciclo: number,
    c_codesp: string,
  ) {
    // base => sin docente/día/hora
    const makeBase = (r: any) =>
      [
        String(r.c_codfac),
        String(r.c_codesp),
        String(r.Plan), // 👈 usamos Plan (ya viene en tus SELECTs)
        String(r.c_codcur),
        String(r.n_ciclo),
        String(r.c_grpcur),
        String(r.c_codmod),
      ].join('|');

    // detalle => solo asignación (docente + franja)
    const makeDetail = (r: any) =>
      [
        String(r.c_dnidoc ?? ''),
        String(r.dia),
        String(r.h_inicio),
        String(r.h_fin),
      ].join('|');

    // para sets de comparación (base + detail)
    const makeFullKey = (r: any) => `${makeBase(r)}|${makeDetail(r)}`;

    // para mostrar como pides: "base => detail"
    const makeArrowFmt = (r: any) => `${makeBase(r)} => ${makeDetail(r)}`;

    // turnos filtrados
    const turnos = await this.prismaService.turno.findMany({
      where: { c_codfac, c_codmod, n_ciclo, c_codesp },
      select: {
        id: true,
        c_codfac: true,
        c_codesp: true,
        c_codmod: true,
        n_ciclo: true,
        c_grpcur: true,
      },
    });

    const resultados: any[] = [];

    for (const turno of turnos) {
      // HORARIO (base local)
      const dataHorario = await this.prismaService.$queryRawUnsafe(
        `
      SELECT 
          b.c_codfac,
          b.c_codesp,
          b.n_codper AS Plan,                -- ⚠️ Asegúrate que tu SELECT ya devuelve Plan
          b.c_codcur,
          d.c_dnidoc,
          b.n_ciclo,
          c.c_grpcur,
          b.c_codmod,
          a.dia,
          DATE_FORMAT(DATE_SUB(a.h_inicio, INTERVAL 5 HOUR), '%H:%i') AS h_inicio,
          DATE_FORMAT(DATE_SUB(a.h_fin, INTERVAL 5 HOUR), '%H:%i')   AS h_fin
      FROM horario a
      INNER JOIN curso  b ON a.curso_id = b.id
      INNER JOIN turno  c ON b.turno_id = c.id
      LEFT  JOIN docente d ON a.docente_id = d.id
      WHERE b.c_codfac = ?
        AND b.c_codesp = ?
        AND b.c_codmod = ?
        AND b.n_ciclo = ?
        AND c.c_grpcur = ?
      `,
        turno.c_codfac,
        turno.c_codesp,
        turno.c_codmod,
        turno.n_ciclo,
        turno.c_grpcur,
      );

      // si no hay registros en horario, no incluimos el turno
      if (!dataHorario || (dataHorario as any[]).length === 0) continue;

      // SIGU (referencia)
      const dataSigu = await this.prismaReadonly.$queryRawUnsafe(
        `
      SELECT 
          a.c_codfac,
          a.c_codesp,
          a.n_codpla AS Plan,
          a.c_codcur,
          a.c_dnidoc,
          c.n_ciclo,
          a.c_grpcur,
          a.c_codmod,
          CASE a.n_numdia
              WHEN 1 THEN "Lunes"
              WHEN 2 THEN "Martes"
              WHEN 3 THEN "Miércoles"
              WHEN 4 THEN "Jueves"
              WHEN 5 THEN "Viernes"
              WHEN 6 THEN "Sábado"
              WHEN 7 THEN "Domingo"
              ELSE "Revisar"
          END AS dia,
          CONCAT(LPAD(a.c_hh_ini, 2, "0"), ":", LPAD(a.c_mi_ini, 2, "0")) AS h_inicio,
          CONCAT(LPAD(a.c_hh_fin, 2, "0"), ":", LPAD(a.c_mi_fin, 2, "0")) AS h_fin
      FROM tb_cur_grp_hor a
      LEFT JOIN tb_plan_estudio_curso c 
        ON a.c_codcur = c.c_codcur 
       AND a.c_codfac = c.c_codfac 
       AND a.c_codesp = c.c_codesp 
       AND a.c_codmod = c.c_codmod 
       AND a.n_codpla = c.n_codper
      WHERE a.n_codper = "20252"
        AND a.c_codfac = ?
        AND a.c_codesp = ?
        AND a.c_codmod = ?
        AND c.n_ciclo = ?
        AND a.c_grpcur = ?
      `,
        turno.c_codfac,
        turno.c_codesp,
        turno.c_codmod,
        turno.n_ciclo,
        turno.c_grpcur,
      );

      // Agrupar por baseKey (para aparear diferencias por curso/grupo/mod)
      const groupByBase = (rows: any[]) => {
        const map = new Map<string, any[]>();
        for (const r of rows) {
          const base = makeBase(r);
          if (!map.has(base)) map.set(base, []);
          map.get(base)!.push(r);
        }
        return map;
      };

      const gH = groupByBase(dataHorario as any[]);
      const gS = groupByBase(dataSigu as any[]);

      const diferencias: { keySigu: string; keyHorario: string }[] = [];

      // Unir todas las bases presentes en cualquiera de las fuentes
      const allBases = new Set<string>([...gH.keys(), ...gS.keys()]);

      for (const base of allBases) {
        const hRows = gH.get(base) ?? [];
        const sRows = gS.get(base) ?? [];

        // sets de full keys para comparación exacta (docente + franja)
        const setHFull = new Set(hRows.map(makeFullKey));
        const setSFull = new Set(sRows.map(makeFullKey));

        // comunes exactos
        const comunes: string[] = [];
        for (const fk of setHFull) if (setSFull.has(fk)) comunes.push(fk);
        comunes.forEach((fk) => {
          setHFull.delete(fk);
          setSFull.delete(fk);
        });

        // ahora setHFull = solo en Horario; setSFull = solo en SIGU
        const hOnly = [...setHFull];
        const sOnly = [...setSFull];

        // Intentar aparear por cantidad (1 a 1) para mostrar ambos lados juntos cuando hay “traslados”
        const pairCount = Math.min(hOnly.length, sOnly.length);
        for (let i = 0; i < pairCount; i++) {
          const hKey = hOnly[i];
          const sKey = sOnly[i];

          // reconstruir filas para mostrar formateado con flecha
          const hRow = hRows.find((r: any) => makeFullKey(r) === hKey)!;
          const sRow = sRows.find((r: any) => makeFullKey(r) === sKey)!;

          diferencias.push({
            keySigu: makeArrowFmt(sRow), // base => docente|dia|inicio|fin (SIGU)
            keyHorario: makeArrowFmt(hRow), // base => docente|dia|inicio|fin (HORARIO)
          });
        }

        // Sobrantes solo en Horario
        for (let i = pairCount; i < hOnly.length; i++) {
          const hKey = hOnly[i];
          const hRow = hRows.find((r: any) => makeFullKey(r) === hKey)!;
          diferencias.push({
            keySigu: '',
            keyHorario: makeArrowFmt(hRow),
          });
        }

        // Sobrantes solo en SIGU
        for (let i = pairCount; i < sOnly.length; i++) {
          const sKey = sOnly[i];
          const sRow = sRows.find((r: any) => makeFullKey(r) === sKey)!;
          diferencias.push({
            keySigu: makeArrowFmt(sRow),
            keyHorario: '',
          });
        }
      }

      resultados.push({ turno, diferencias });
    }

    return resultados;
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

import { grupo_sincro } from '@prisma/client';
import {
  CursoDto,
  HorarioDto,
  CreateHorarioArrayDto,
} from 'src/modules/horario/dto/createHorarioArrayDto';
import {
  CursoUpdateDto,
  HorarioUpdateDto,
  UpdateHorarioArrayDto,
} from 'src/modules/horario/dto/updateHorarioArrayDto';
import { PrismaService } from 'src/prisma/prisma.service';

export const parseHora = (hora: Date | string): Date => {
  const date = new Date(hora);
  return new Date(
    Date.UTC(1970, 0, 1, date.getUTCHours(), date.getUTCMinutes(), 0, 0),
  );
};

export const parseHorarioConRango = (
  h_inicio: Date | string,
  h_fin: Date | string,
): { inicio: Date; fin: Date } => {
  const inicio = parseHora(h_inicio);
  let fin = parseHora(h_fin);

  if (fin <= inicio) {
    fin = new Date(fin.getTime() + 24 * 60 * 60 * 1000);
  }

  return { inicio, fin };
};

export const formatoHora = (hora: Date): string => {
  const h = hora.getHours().toString().padStart(2, '0');
  const m = hora.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
};

export const sonCursosAgrupados = async (
  prisma: PrismaService,
  curso1Id: number,
  curso2Id: number,
): Promise<boolean> => {
  if (!curso1Id || !curso2Id) return false;
  if (curso1Id === curso2Id) return false;

  const relacion = await prisma.grupo_sincro.findFirst({
    where: {
      tipo: 1,
      OR: [
        { curso_id: curso1Id, padre_curso_id: curso2Id },
        { curso_id: curso2Id, padre_curso_id: curso1Id },
      ],
    },
  });

  return !!relacion;
};

export const verificarCruzeCreate = async (
  prisma: PrismaService,
  createHorarioArrayDto: CreateHorarioArrayDto,
) => {
  const errores: string[] = [];
  const todosLosHorarios: { h: HorarioDto; curso: CursoDto }[] = [];

  for (const data of createHorarioArrayDto.dataArray) {
    const { curso, horarios } = data;

    const cursoBD = await prisma.curso.findFirst({
      where: {
        turno_id: curso.turno_id,
        n_codper: curso.n_codper,
        c_codmod: curso.c_codmod,
        c_codfac: curso.c_codfac,
        c_codesp: curso.c_codesp,
        c_codcur: curso.c_codcur,
      },
      select: { id: true },
    });

    const grupo = await prisma.grupo_sincro.findFirst({
      where: { curso_id: cursoBD?.id },
      select: { tipo: true },
    });

    const esTransversal = grupo?.tipo === 0;
    const esAgrupado = grupo?.tipo === 1;

    if (esTransversal) {
      console.log(`Curso "${curso.c_nomcur}" es TRANSVERSAL`);
    }

    if (esAgrupado) {
      console.log(`Curso "${curso.c_nomcur}" es AGRUPADO`);
    }

    if (!esAgrupado && !esTransversal) {
      console.log(`Curso "${curso.c_nomcur}" es un curso normal`);
    }

    for (let i = 0; i < horarios.length; i++) {
      const h1 = horarios[i];

      if (!h1.curso_id && cursoBD) {
        h1.curso_id = cursoBD.id;
      }

      const { inicio: inicio1, fin: fin1 } = parseHorarioConRango(
        h1.h_inicio,
        h1.h_fin,
      );

      for (let j = i + 1; j < horarios.length; j++) {
        const h2 = horarios[j];
        if (h1.dia !== h2.dia) continue;

        const { inicio: inicio2, fin: fin2 } = parseHorarioConRango(
          h2.h_inicio || '',
          h2.h_fin || '',
        );

        const cruceHoras = inicio1 < fin2 && fin1 > inicio2;
        const mismoAula = h1.aula_id && h2.aula_id && h1.aula_id === h2.aula_id;
        const mismoDocente =
          h1.docente_id && h2.docente_id && h1.docente_id === h2.docente_id;

        if (cruceHoras && (mismoAula || mismoDocente)) {
          errores.push(
            `⛔ Conflicto interno en curso "${curso.c_nomcur}" el día ${h1.dia} ` +
              `entre ${formatoHora(inicio1)} - ${formatoHora(fin1)} y ${formatoHora(inicio2)} - ${formatoHora(fin2)} ` +
              `(${mismoAula ? 'misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'mismo docente' : ''})`,
          );
        }
      }

      todosLosHorarios.push({ h: h1, curso });
    }
  }

  for (const { h } of todosLosHorarios) {
    const condicionesOR: any[] = [];
    if (h.aula_id) condicionesOR.push({ aula_id: h.aula_id });
    if (h.docente_id) condicionesOR.push({ docente_id: h.docente_id });
    if (condicionesOR.length === 0) continue;

    const existentes = await prisma.horario.findMany({
      where: {
        dia: h.dia,
        OR: condicionesOR,
      },
      include: { curso: true },
    });

    const { inicio: inicio1, fin: fin1 } = parseHorarioConRango(
      h.h_inicio,
      h.h_fin,
    );

    for (const e of existentes) {
      const { inicio: inicio2, fin: fin2 } = parseHorarioConRango(
        e.h_inicio || '',
        e.h_fin || '',
      );

      const cruce = inicio1 < fin2 && fin1 > inicio2;

      const mismoAula = h.aula_id && e.aula_id && h.aula_id === e.aula_id;
      const mismoDocente =
        h.docente_id && e.docente_id && h.docente_id === e.docente_id;

      if (h.curso_id && e.curso_id) {
        if (h.curso_id === e.curso_id) continue;

        const sonAgrupados = await sonCursosAgrupados(
          prisma,
          h.curso_id,
          e.curso_id,
        );
        if (sonAgrupados) {
          continue;
        }
      }

      if (cruce && (mismoAula || mismoDocente)) {
        errores.push(
          `⛔ Conflicto con curso "${e.curso?.c_nomcur}" en BD el día ${h.dia} (ID horario: ${e.id}) ` +
            `entre ${formatoHora(inicio1)} - ${formatoHora(fin1)} y ${formatoHora(inicio2)} - ${formatoHora(fin2)} ` +
            `(${mismoAula ? 'misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'mismo docente' : ''})`,
        );
      }
    }
  }

  return {
    success: errores.length === 0,
    errores,
  };
};

export const verificarCruzesCursosTransversales = async (
  prisma: PrismaService,
  cursosAgrupados: grupo_sincro[],
  horarios: HorarioDto[],
): Promise<string[]> => {
  const errores: string[] = [];

  for (const cursoAgrupado of cursosAgrupados) {
    const curso = await prisma.curso.findUnique({
      where: { id: cursoAgrupado.curso_id },
    });

    if (!curso) continue;

    const turnoHorarios = await prisma.horario.findMany({
      where: { turno_id: curso.turno_id },
      include: { curso: true },
    });

    for (const hNuevo of horarios) {
      const { inicio: inicioNuevo, fin: finNuevo } = parseHorarioConRango(
        hNuevo.h_inicio,
        hNuevo.h_fin,
      );

      for (const hExistente of turnoHorarios) {
        if (hNuevo.dia !== hExistente.dia) continue;

        const { inicio: inicioExistente, fin: finExistente } =
          parseHorarioConRango(
            hExistente.h_inicio || '',
            hExistente.h_fin || '',
          );

        const cruceHoras =
          inicioNuevo < finExistente && finNuevo > inicioExistente;

        if (cruceHoras) {
          errores.push(
            `⛔ Cruce de hora con curso "${hExistente.curso?.c_nomcur}" en turno ${curso.turno_id} el día ${hNuevo.dia}`,
          );
        }
      }
    }
  }

  return errores;
};

export const verificarCruzeUpdate = async (
  prisma: PrismaService,
  updateHorarioArrayDto: UpdateHorarioArrayDto,
) => {
  console.log('inicio verificarCruzeUpdate');
  const errores = new Set<string>();
  const todosLosHorarios: { h: HorarioUpdateDto; curso: CursoUpdateDto }[] = [];

  for (const data of updateHorarioArrayDto.dataArray) {
    const { curso, horarios } = data;

    for (let i = 0; i < horarios.length; i++) {
      const h1 = horarios[i];

      const { inicio: inicio1, fin: fin1 } = parseHorarioConRango(
        h1.h_inicio || '',
        h1.h_fin || '',
      );

      if (!inicio1 || !fin1) continue;

      for (let j = i + 1; j < horarios.length; j++) {
        const h2 = horarios[j];
        if (h1.dia !== h2.dia) continue;

        const { inicio: inicio2, fin: fin2 } = parseHorarioConRango(
          h2.h_inicio || '',
          h2.h_fin || '',
        );

        if (!inicio2 || !fin2) continue;

        const cruceHoras = inicio1 < fin2 && fin1 > inicio2;
        const mismoAula = h1.aula_id && h2.aula_id && h1.aula_id === h2.aula_id;
        const mismoDocente =
          h1.docente_id && h2.docente_id && h1.docente_id === h2.docente_id;

        if (cruceHoras && (mismoAula || mismoDocente)) {
          errores.add(
            `⛔ Conflicto interno en curso "${curso.c_nomcur}" el día ${h1.dia}` +
              ` (${mismoAula ? 'misma aula' : ''}${
                mismoAula && mismoDocente ? ' y ' : ''
              }${mismoDocente ? 'mismo docente' : ''})`,
          );
        }
      }

      todosLosHorarios.push({ h: h1, curso });
    }
  }

  for (const { h, curso } of todosLosHorarios) {
    const cur = await prisma.curso.findFirst({
      where: { c_codcur: curso.c_codcur, turno_id: curso.turno_id },
      include: { cursosPadres: true },
    });

    const condicionesOR: any[] = [];
    if (h.aula_id) condicionesOR.push({ aula_id: h.aula_id });
    if (h.docente_id) condicionesOR.push({ docente_id: h.docente_id });
    if (condicionesOR.length === 0) continue;

    const existentes = await prisma.horario.findMany({
      where: {
        dia: h.dia,
        OR: condicionesOR,
        NOT: h.id ? { id: h.id } : undefined,
      },
      include: { curso: true },
    });

    const { inicio: inicio1, fin: fin1 } = parseHorarioConRango(
      h.h_inicio || '',
      h.h_fin || '',
    );

    if (!inicio1 || !fin1) continue;

    const esCursoTransversal =
      cur?.cursosPadres.length &&
      cur.cursosPadres.some((padre) => padre.tipo === 0);

    if (esCursoTransversal) {
      // console.log(`📘 Curso "${curso.c_nomcur}" es TRANSVERSAL`);
    }

    for (const e of existentes) {
      console.log('=========================================================');

      const { inicio: inicio2, fin: fin2 } = parseHorarioConRango(
        e.h_inicio || '',
        e.h_fin || '',
      );
      console.log('horario_id => ', e.id);

      console.log('inicio1 => ', inicio1);
      console.log('inicio2 => ', inicio2);
      console.log('fin1 => ', fin1);
      console.log('fin2 => ', fin2);

      const cruce = inicio1 < fin2 && fin1 > inicio2;
      console.log('cruce => ', cruce);

      const mismoAula = h.aula_id && e.aula_id && h.aula_id === e.aula_id;
      const mismoDocente =
        h.docente_id && e.docente_id && h.docente_id === e.docente_id;

      if (cur?.id && e.curso_id) {
        if (cur.id === e.curso_id) continue;

        const sonAgrupados = await sonCursosAgrupados(
          prisma,
          cur.id,
          e.curso_id,
        );
        if (sonAgrupados) {
          continue;
        }
      }

      if (!esCursoTransversal && cruce && (mismoAula || mismoDocente)) {
        console.log('cruze');
        errores.add(
          `⛔ Conflicto con "${e.curso?.c_nomcur}" en BD el día ${h.dia}` +
            ` (${mismoAula ? 'misma aula' : ''}${
              mismoAula && mismoDocente ? ' y ' : ''
            }${mismoDocente ? 'mismo docente' : ''})`,
        );
      }
      console.log('=========================================================');
    }
  }

  return {
    success: errores.size === 0,
    errores: Array.from(errores),
  };
};

export const verificarCruzesCursosTransversalesUpdate = async (
  prisma: PrismaService,
  cursosAgrupados: grupo_sincro[],
  horarios: HorarioUpdateDto[],
): Promise<string[]> => {
  const errores: string[] = [];

  const cursosGrupoId = cursosAgrupados.map((c) => c.curso_id);

  for (const cursoAgrupado of cursosAgrupados) {
    const curso = await prisma.curso.findUnique({
      where: { id: cursoAgrupado.curso_id },
    });

    if (!curso) continue;

    const turnoHorarios = await prisma.horario.findMany({
      where: { turno_id: curso.turno_id, curso_id: { notIn: cursosGrupoId } },
      include: { curso: true },
    });

    for (const hNuevo of horarios) {
      const { inicio: inicioNuevo, fin: finNuevo } = parseHorarioConRango(
        hNuevo.h_inicio || '',
        hNuevo.h_fin || '',
      );

      if (!inicioNuevo || !finNuevo) continue;

      for (const hExistente of turnoHorarios) {
        if (hNuevo.dia !== hExistente.dia) continue;

        const { inicio: inicioExistente, fin: finExistente } =
          parseHorarioConRango(
            hExistente.h_inicio || '',
            hExistente.h_fin || '',
          );

        const cruceHoras =
          inicioNuevo < finExistente && finNuevo > inicioExistente;

        if (cruceHoras) {
          errores.push(
            `⛔ Cruce de hora con curso "${hExistente.curso?.c_nomcur}" en turno ${curso.turno_id} el día ${hNuevo.dia}`,
          );
        }
      }
    }
  }
  return errores;
};

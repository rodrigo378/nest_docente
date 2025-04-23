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
  return new Date(1970, 0, 1, date.getHours(), date.getMinutes(), 0, 0);
};

export const formatoHora = (hora: Date): string => {
  const h = hora.getHours().toString().padStart(2, '0');
  const m = hora.getMinutes().toString().padStart(2, '0');
  return `${h}:${m}`;
};

export const verificarCruzeCreate = async (
  prisma: PrismaService,
  createHorarioArrayDto: CreateHorarioArrayDto,
) => {
  const errores: string[] = [];

  const todosLosHorarios: {
    h: HorarioDto;
    curso: CursoDto;
  }[] = [];

  // 1️⃣ Validar entre todos los cursos y sus horarios enviados
  for (const data of createHorarioArrayDto.dataArray) {
    const { curso, horarios } = data;

    for (let i = 0; i < horarios.length; i++) {
      const h1 = horarios[i];
      const inicio1 = parseHora(h1.h_inicio);
      const fin1 = parseHora(h1.h_fin);

      // Cruces dentro del mismo curso
      for (let j = i + 1; j < horarios.length; j++) {
        const h2 = horarios[j];
        if (h1.dia !== h2.dia) continue;

        const inicio2 = parseHora(h2.h_inicio);
        const fin2 = parseHora(h2.h_fin);

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

  // 2️⃣ Verificación con la base de datos
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

    const inicio1 = parseHora(h.h_inicio);
    const fin1 = parseHora(h.h_fin);

    for (const e of existentes) {
      const inicio2 = parseHora(e.h_inicio || '');
      const fin2 = parseHora(e.h_fin || '');
      const cruce = inicio1 < fin2 && fin1 > inicio2;

      const mismoAula = h.aula_id && e.aula_id && h.aula_id === e.aula_id;
      const mismoDocente =
        h.docente_id && e.docente_id && h.docente_id === e.docente_id;

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
      const inicioNuevo = parseHora(hNuevo.h_inicio);
      const finNuevo = parseHora(hNuevo.h_fin);

      for (const hExistente of turnoHorarios) {
        if (hNuevo.dia !== hExistente.dia) continue;

        const inicioExistente = parseHora(hExistente.h_inicio || '');
        const finExistente = parseHora(hExistente.h_fin || '');

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
  const errores = new Set<string>();

  const todosLosHorarios: {
    h: HorarioUpdateDto;
    curso: CursoUpdateDto;
  }[] = [];

  for (const data of updateHorarioArrayDto.dataArray) {
    const { curso, horarios } = data;

    for (let i = 0; i < horarios.length; i++) {
      const h1 = horarios[i];

      const inicio1 = h1.h_inicio ? parseHora(h1.h_inicio) : null;
      const fin1 = h1.h_fin ? parseHora(h1.h_fin) : null;

      if (!inicio1 || !fin1) continue;

      for (let j = i + 1; j < horarios.length; j++) {
        const h2 = horarios[j];

        if (h1.dia !== h2.dia) continue;

        const inicio2 = h2.h_inicio ? parseHora(h2.h_inicio) : null;
        const fin2 = h2.h_fin ? parseHora(h2.h_fin) : null;

        if (!inicio2 || !fin2) continue;

        const cruceHoras = inicio1 < fin2 && fin1 > inicio2;
        const mismoAula = h1.aula_id && h2.aula_id && h1.aula_id === h2.aula_id;
        const mismoDocente =
          h1.docente_id && h2.docente_id && h1.docente_id === h2.docente_id;

        if (cruceHoras && (mismoAula || mismoDocente)) {
          errores.add(
            `⛔ Conflicto interno en curso "${curso.c_nomcur}" el día ${h1.dia}` +
              ` (${mismoAula ? 'misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'mismo docente' : ''})`,
          );
        }
      }

      todosLosHorarios.push({ h: h1, curso });
    }
  }

  // 2️⃣ Verificación con la BD excluyendo los horarios originales si ya existen
  for (const { h, curso } of todosLosHorarios) {
    // for (const { h } of todosLosHorarios) {
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

    const inicio1 = h.h_inicio ? parseHora(h.h_inicio) : null;
    const fin1 = h.h_fin ? parseHora(h.h_fin) : null;

    if (!inicio1 || !fin1) continue;

    for (const e of existentes) {
      const inicio2 = parseHora(e.h_inicio || '');
      const fin2 = parseHora(e.h_fin || '');

      const cruce = inicio1 < fin2 && fin1 > inicio2;
      const mismoAula = h.aula_id && e.aula_id && h.aula_id === e.aula_id;
      const mismoDocente =
        h.docente_id && e.docente_id && h.docente_id === e.docente_id;

      const esCursoRegular =
        cur?.cursosPadres.length !== 0 && cur?.cursosPadres[0].tipo === 0;

      if (!esCursoRegular && cruce && (mismoAula || mismoDocente)) {
        errores.add(
          `⛔ Conflicto con "${e.curso?.c_nomcur}" en BD el día ${h.dia}` +
            ` (${mismoAula ? 'misma aula' : ''}${mismoAula && mismoDocente ? ' y ' : ''}${mismoDocente ? 'mismo docente' : ''})`,
        );
      }
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
      const inicioNuevo = hNuevo.h_inicio ? parseHora(hNuevo.h_inicio) : null;
      const finNuevo = hNuevo.h_fin ? parseHora(hNuevo.h_fin) : null;
      if (!inicioNuevo || !finNuevo) continue;

      for (const hExistente of turnoHorarios) {
        if (hNuevo.dia !== hExistente.dia) continue;

        const inicioExistente = parseHora(hExistente.h_inicio || '');
        const finExistente = parseHora(hExistente.h_fin || '');

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

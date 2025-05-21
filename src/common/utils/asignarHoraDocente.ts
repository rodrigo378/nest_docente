import { PrismaService } from 'src/prisma/prisma.service';
import { createLog } from './log.util';

export const asignarHoraDocente = async (
  prisma: PrismaService,
  docente_id: number,
  user_id: number,
) => {
  const bloquesUnicos = await prisma.horario.findMany({
    where: { docente_id },
    select: {
      dia: true,
      h_inicio: true,
      h_fin: true,
      n_horas: true,
    },
    distinct: ['dia', 'h_inicio', 'h_fin'],
  });

  const totalHoras = bloquesUnicos.reduce(
    (suma, bloque) => suma + (bloque.n_horas || 0),
    0,
  );

  await prisma.docente.update({
    where: { id: docente_id },
    data: { h_total: totalHoras },
  });

  await createLog(
    prisma,
    user_id,
    'docente',
    'UPDATE',
    `Se recalculó la carga horaria total del docente ${docente_id} considerando bloques únicos`,
    null,
    {},
    {
      docente_id,
      h_total: totalHoras,
    },
  );
};

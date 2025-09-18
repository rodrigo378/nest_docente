// === Helpers: Normalizar día y tiempos ===
type HHMM = `${number}:${number}`;
type Intervalo = { ini: number; fin: number }; // minutos desde 00:00

const toMin = (hhmm: HHMM) => {
  const [h, m] = hhmm.split(':').map(Number);
  return h * 60 + m;
};
const toHHMM = (min: number) => {
  const h = Math.floor(min / 60)
    .toString()
    .padStart(2, '0');
  const m = (min % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
};

const stripAccents = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '');

function normDia(
  dia: string,
): 'lu' | 'ma' | 'mi' | 'ju' | 'vi' | 'sa' | 'do' | null {
  if (!dia) return null;
  const s = stripAccents(String(dia).trim().toLowerCase());
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  if (['lu', 'ma', 'mi', 'ju', 'vi', 'sa', 'do'].includes(s)) return s as any;
  if (s.startsWith('lun')) return 'lu';
  if (s.startsWith('mar')) return 'ma';
  if (s.startsWith('mie')) return 'mi';
  if (s.startsWith('jue')) return 'ju';
  if (s.startsWith('vie')) return 'vi';
  if (s.startsWith('sab')) return 'sa';
  if (s.startsWith('dom')) return 'do';
  if (s === 'lunes') return 'lu';
  if (s === 'martes') return 'ma';
  if (s === 'miercoles') return 'mi';
  if (s === 'jueves') return 'ju';
  if (s === 'viernes') return 'vi';
  if (s === 'sabado') return 'sa';
  if (s === 'domingo') return 'do';
  return null;
}

// Si tus Date vienen como "2024-01-02T18:00:00.000Z" (UTC), usa UTC para evitar desplazamientos.
// Cambia a false si quieres usar hora local del servidor:
const USE_UTC = true;
const getMinutesFromDate = (dt: Date) =>
  USE_UTC
    ? dt.getUTCHours() * 60 + dt.getUTCMinutes()
    : dt.getHours() * 60 + dt.getMinutes();

function merge(intervalos: Intervalo[]): Intervalo[] {
  if (!intervalos.length) return [];
  const res: Intervalo[] = [];
  intervalos.sort((a, b) => a.ini - b.ini);
  let cur = { ...intervalos[0] };
  for (let i = 1; i < intervalos.length; i++) {
    const it = intervalos[i];
    if (it.ini <= cur.fin)
      cur.fin = Math.max(cur.fin, it.fin); // solapados/contiguos
    else {
      res.push(cur);
      cur = { ...it };
    }
  }
  res.push(cur);
  return res;
}

function restaVentana(ventana: Intervalo, ocupados: Intervalo[]): Intervalo[] {
  const libres: Intervalo[] = [];
  let cursor = ventana.ini;
  for (const b of ocupados) {
    if (b.fin <= cursor) continue;
    if (b.ini > ventana.fin) break;
    const ini = Math.max(cursor, ventana.ini);
    const fin = Math.min(b.ini, ventana.fin);
    if (fin > ini) libres.push({ ini, fin });
    cursor = Math.max(cursor, b.fin);
  }
  if (cursor < ventana.fin) libres.push({ ini: cursor, fin: ventana.fin });
  return libres;
}

export function calcularDisponibilidad(
  horarios: Array<{
    dia: string;
    h_inicio: Date | string | null;
    h_fin: Date | string | null;
  }>,
  jornadaBase: Record<
    'lu' | 'ma' | 'mi' | 'ju' | 'vi' | 'sa' | 'do',
    { ini: HHMM; fin: HHMM }
  >,
) {
  // 1) Agrupa ocupados por día normalizado (lu, ma, ...)
  const porDia = new Map<string, Intervalo[]>();

  for (const h of horarios) {
    if (!h || !h.h_inicio || !h.h_fin || !h.dia) continue;

    const key = normDia(h.dia);
    if (!key) continue;

    // Acepta Date o string ISO
    const iniDate =
      typeof h.h_inicio === 'string' ? new Date(h.h_inicio) : h.h_inicio;
    const finDate = typeof h.h_fin === 'string' ? new Date(h.h_fin) : h.h_fin;

    const ini = getMinutesFromDate(iniDate);
    const fin = getMinutesFromDate(finDate);
    if (fin <= ini) continue;

    if (!porDia.has(key)) porDia.set(key, []);
    porDia.get(key)!.push({ ini, fin });
  }

  // 2) Calcula disponibilidad por cada día de la jornada
  const resultado: Record<
    string,
    {
      ocupados: { ini: string; fin: string }[];
      libres: { ini: string; fin: string }[];
    }
  > = {};

  (
    Object.keys(jornadaBase) as Array<
      'lu' | 'ma' | 'mi' | 'ju' | 'vi' | 'sa' | 'do'
    >
  ).forEach((dia) => {
    const ventana = {
      ini: toMin(jornadaBase[dia].ini),
      fin: toMin(jornadaBase[dia].fin),
    };
    const ocupados = merge(
      (porDia.get(dia) || []).filter((iv) => iv.fin > iv.ini),
    );
    const libres =
      ventana.fin > ventana.ini ? restaVentana(ventana, ocupados) : [];
    resultado[dia] = {
      ocupados: ocupados.map((iv) => ({
        ini: toHHMM(iv.ini),
        fin: toHHMM(iv.fin),
      })),
      libres: libres.map((iv) => ({
        ini: toHHMM(iv.ini),
        fin: toHHMM(iv.fin),
      })),
    };
  });

  return resultado;
}

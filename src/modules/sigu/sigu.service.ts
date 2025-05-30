import { Injectable } from '@nestjs/common';
import { GetCursoDto } from './dto/getCursoDto';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaReadonlyService } from 'src/prisma/readonly.service';

interface CursoQuery {
  n_codper: number;
  c_codmod: string;
  c_nommod: string;
  c_codfac: string;
  c_codesp: string;
  n_ciclo: number;
  c_ciclo: string;
  c_codcur: string;
  c_nomcur: string;
  n_ht: number;
  n_hp: number;
  equivalencias: string | null;
}

@Injectable()
export class SiguService {
  constructor(
    private readonly prismaReadonly: PrismaReadonlyService,
    private readonly prismaService: PrismaService,
  ) {}

  async getEspecialidades() {
    return await this.prismaReadonly.$queryRawUnsafe(
      `SELECT codfac, codesp, nomesp, estado, c_abrevesp 
        FROM tb_especialidad 
        WHERE codfac IN ('S', 'E')`,
    );
  }

  async getCarreras(n_ciclo: number, c_codfac: string) {
    return await this.prismaReadonly.$queryRawUnsafe(
      `select 
        tp.c_codmod,
        tp.c_codfac,
        tp.c_codesp,
        tb.nomesp,
        tp.c_ciclo,
        tp.n_ciclo
      from tb_plan_estudio_curso tp
      inner join tb_especialidad tb on (tp.c_codfac  = tb.codfac and tp.c_codesp  = tb.codesp)
      where n_ciclo = ? and c_codfac = ?
      group by tp.c_codfac, tp.c_codesp, tp.c_ciclo, tp.n_ciclo  , tp.c_codmod
      -- order by tp.c_ciclo;
      order by tb.nomesp, tp.n_ciclo -- , tp.c_codmod;
        `,
      n_ciclo,
      c_codfac,
    );
  }

  async getCicloCarreras(c_codfac: string) {
    return await this.prismaReadonly.$queryRawUnsafe(
      `SELECT 
        es.nomesp AS especialidad,
        GROUP_CONCAT(DISTINCT pe.c_ciclo ORDER BY pe.c_ciclo SEPARATOR ', ') AS ciclos
      FROM tb_plan_estudio_curso pe
      JOIN tb_especialidad es 
        ON pe.c_codesp = es.codesp  
        AND pe.c_codfac = es.codfac
      WHERE pe.c_codfac = ?
      GROUP BY es.nomesp;`,
      c_codfac,
    );
  }

  async getCursos(getCursoDto: GetCursoDto) {
    const turno = await this.prismaService.turno.findFirst({
      where: {
        n_codper: getCursoDto.n_codper,
        n_codpla: getCursoDto.n_codpla,
        c_codfac: getCursoDto.c_codfac,
        c_codesp: getCursoDto.c_codesp,
        n_ciclo: Number(getCursoDto.n_ciclo),
        c_codmod: Number(getCursoDto.c_codmod),
        c_grpcur: getCursoDto.c_grpcur,
      },
    });

    if (!turno) {
      return [];
    }

    const cursosSigu = await this.prismaReadonly.$queryRawUnsafe<CursoQuery[]>(
      `SELECT
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
          tpee.c_nomcur_equ,
          tp.c_curup as h_umaPlus
        FROM
          tb_plan_estudio_curso tp
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
          tp.n_codper IN (2023, 2025) 
          AND tp.c_codfac = ?
          AND tp.c_codesp = ?
          AND tp.n_ciclo = ?
          AND tp.c_codmod = ?
        GROUP BY
          tp.n_codper, tp.c_codmod, tb.c_nommod, tp.c_codfac, t_f.nom_fac,
          tp.c_codesp, t_e.nomesp, tp.c_area, tpec.c_nom_cur_area,
          tp.c_codcur, tp.c_nomcur, tp.n_ciclo, tp.c_ciclo,
          tp.n_ht, tp.n_hp,
          tpee.n_codper_equ, tpee.c_codmod_equ, tpee.c_codfac_equ,
          tpee.c_codesp_equ, tpee.c_codcur_equ, tpee.c_nomcur_equ,
          tp.c_curup
        ORDER BY tp.c_nomcur;`,
      getCursoDto.c_codfac,
      getCursoDto.c_codesp,
      getCursoDto.n_ciclo,
      getCursoDto.c_codmod,
    );

    const cursosLocales = await this.prismaService.curso.findMany({
      where: {
        turno_id: turno.id,
      },
      include: {
        cursosPadres: true,
      },
    });

    const cursosFinal = await Promise.all(
      cursosSigu.map(async (curso) => {
        const match = cursosLocales.find(
          (c) =>
            String(c.n_codper) === String(curso.n_codper) &&
            Number(c.c_codmod) === Number(curso.c_codmod) &&
            c.c_codfac === curso.c_codfac &&
            c.c_codesp === curso.c_codesp &&
            c.c_codcur === curso.c_codcur,
        );

        let tipoAgrupado: number | null = null;
        let c_alu_total = match?.c_alu ?? null;

        if (match?.cursosPadres?.[0]?.padre_curso_id) {
          tipoAgrupado = match.cursosPadres[0].tipo;

          try {
            const cursosDelGrupo =
              await this.prismaService.grupo_sincro.findMany({
                where: {
                  padre_curso_id: match.cursosPadres[0].padre_curso_id,
                },
              });

            let sumaCAlu = 0;
            for (const curso of cursosDelGrupo) {
              const cursoDB = await this.prismaService.curso.findFirst({
                where: { id: curso.curso_id },
                select: { c_alu: true },
              });
              if (cursoDB?.c_alu) sumaCAlu += cursoDB.c_alu;
            }

            // console.log(
            // `🔢 Total c_alu del grupo [${match.cursosPadres[0].padre_curso_id}]:`,
            // sumaCAlu,
            // );
            c_alu_total = sumaCAlu;
          } catch (err) {
            console.error('❌ Error al obtener cursos del grupo:', err);
          }
        }

        return {
          ...curso,
          tipoAgrupado,
          c_alu: c_alu_total,
        };
      }),
    );

    return cursosFinal;
  }

  // async getCursos(getCursoDto: GetCursoDto) {
  //   return await this.prismaReadonly.$queryRawUnsafe(
  //     `SELECT
  //       tp.n_codper,
  //       tp.c_codmod,
  //       tb.c_nommod,
  //       tp.c_codfac,
  //       tp.c_codesp,
  //       tp.c_area,
  //       tpec.c_nom_cur_area,
  //       tp.n_ciclo,
  //       tp.c_ciclo,
  //       tp.c_codcur,
  //       tp.c_nomcur,
  //       tp.n_ht,
  //       tp.n_hp
  //     FROM
  //       tb_plan_estudio_curso tp
  //       INNER JOIN tb_modalidad tb ON tb.c_codmod = tp.c_codmod
  //       INNER JOIN tb_plan_estudio_curso_area tpec ON tpec.c_cod_cur_area = tp.c_area
  //     WHERE
  //       tp.n_codper IN ( 2023, 2025 )
  //       AND tp.c_codfac = ?
  //       AND tp.c_codesp = ?
  //       AND tp.n_ciclo = ?
  //       AND tp.c_codmod = ?
  //     GROUP BY
  //       tp.n_codper,
  //       tp.c_codmod,
  //       tp.c_codfac,
  //       tp.c_codesp,
  //       tp.c_area,
  //       tpec.c_nom_cur_area,
  //       tp.c_codcur,
  //       tp.c_nomcur,
  //       tp.n_ciclo,
  //       tp.c_ciclo,
  //       tp.n_ht,
  //       tp.n_hp
  //     ORDER BY
  //       tp.c_nomcur;
  //       `,
  // getCursoDto.c_codfac,
  // getCursoDto.c_codesp,
  // getCursoDto.n_ciclo,
  // getCursoDto.c_codmod,
  //   );
  // }
  // async getCursos(getCursoDto: GetCursoDto) {
  //   return await this.prismaReadonly.$queryRawUnsafe(
  //     `SELECT distinct
  //       tp.n_codper,
  //       tp.c_codmod,
  //       tb.c_nommod,
  //       tp.c_codfac,
  //       tp.c_codesp,
  //       tp.n_ciclo,
  //       tp.c_ciclo,
  //       tp.c_codcur,
  //       tp.c_nomcur,
  //       tp.n_ht,
  //       tp.n_hp,
  //       te.n_codper_equ,
  //       te.c_codmod_equ,
  //       te.c_codfac_equ,
  //       te.c_codesp_equ,
  //       te.c_codcur_equ,
  //       te.c_nomcur_equ
  //     FROM
  //       tb_plan_estudio_curso tp
  //         INNER JOIN
  //       tb_modalidad tb ON tb.c_codmod = tp.c_codmod
  //         INNER JOIN
  //     (select distinct
  //       te.*,
  //       tp.c_nomcur as c_nomcur_equ
  //     from tb_plan_estudio_equ te
  //     inner join tb_plan_estudio_curso tp on te.c_codcur_equ = tp.c_codcur) te ON te.c_codcur_equ = tp.c_codcur
  //     WHERE
  //       tp.n_codper IN (2023 , 2025)
  //       AND tp.c_codfac = ?
  //       AND tp.c_codesp = ?
  //       AND tp.n_ciclo = ?
  //       AND tp.c_codmod = ?
  //     GROUP BY tp.n_codper , tp.c_codmod , tp.c_codfac , tp.c_codesp , tp.c_codcur , tp.c_nomcur , tp.n_ciclo , tp.c_ciclo , tp.n_ht , tp.n_hp, te.n_codper_equ,
  //       te.c_codmod_equ,
  //       te.c_codfac_equ,
  //       te.c_codesp_equ,
  //       te.c_codcur_equ,
  //       te.c_nomcur_equ
  //     ORDER BY tp.c_nomcur;
  //       `,
  //     getCursoDto.c_codfac,
  //     getCursoDto.c_codesp,
  //     getCursoDto.n_ciclo,
  //     getCursoDto.c_codmod,
  //   );
  // }

  async getEquivalencias() {
    return await this.prismaReadonly.$queryRawUnsafe(`
      SELECT * FROM tb_plan_estudio_equ WHERE n_codper in (2023, 2025)
    `);
  }
}

// SELECT distinct
//     tp.n_codper,
//     tp.c_codmod,
//     tb.c_nommod,
//     tp.c_codfac,
//     tp.c_codesp,
//     tp.n_ciclo,
//     tp.c_ciclo,
//     tp.c_codcur,
//     tp.c_nomcur,
//     tp.n_ht,
//     tp.n_hp,
//     te.n_codper_equ,
//     te.c_codmod_equ,
//     te.c_codfac_equ,
//     te.c_codesp_equ,
//     te.c_codcur_equ,
//     te.c_nomcur_equ
// FROM
//     tb_plan_estudio_curso tp
//         INNER JOIN
//     tb_modalidad tb ON tb.c_codmod = tp.c_codmod
//             INNER JOIN
//     (select distinct
// 		te.*,
// 		tp.c_nomcur as c_nomcur_equ
// 	from tb_plan_estudio_equ te
// 	inner join tb_plan_estudio_curso tp on te.c_codcur_equ = tp.c_codcur) te ON te.c_codcur_equ = tp.c_codcur
// WHERE
//     tp.n_codper IN (2023 , 2025)
//         AND tp.c_codfac = 'S'
//         AND tp.c_codesp = 'S1'
//         AND tp.n_ciclo = 1
//         AND tp.c_codmod = 1
// GROUP BY tp.n_codper , tp.c_codmod , tp.c_codfac , tp.c_codesp , tp.c_codcur , tp.c_nomcur , tp.n_ciclo , tp.c_ciclo , tp.n_ht , tp.n_hp, te.n_codper_equ,
//     te.c_codmod_equ,
//     te.c_codfac_equ,
//     te.c_codesp_equ,
//     te.c_codcur_equ,
//     te.c_nomcur_equ
// ORDER BY tp.c_nomcur;

// select * from tb_plan_estudio_curso where c_codcur = "ANI 102";
// select distinct
// 	te.*,
//     tp.c_nomcur as c_nomcur_equ
// from tb_plan_estudio_equ te
// inner join tb_plan_estudio_curso tp on te.c_codcur_equ = tp.c_codcur;

// REGISTRA EXAMENES Y PRACTICAS = EP
// DOCENTE OFICIAL = DO
// DOCENTE TEORIA = E
// DOCENTE PRACTICA = P
// NO REGISTRA EVALUACIONES = NR

/* 
  Exportar al sigu

  1 => Se crean los cursos
  select * from tb_curso_grupo where n_codper = 20251;
  {
    n_codper: 20251,
    c_codfac: E,
    c_codcur: ANI01001,
    c_grpcur: N1,
    c_codmod: 2,
    d_freg: 2024-11-29 11:51:59, => fecha de creacion
    c_codesp: E4,
    n_codpla: 2023,
    c_sedcod: 1, => no cambia
    id_unidad_estudio_plan:  12 => varia nose 
    n_sync_plan: 1, => no cambia
    n_tipprog: 1, => no cambia
    lock: 0 => no cambia
    moodle: 0 => no cambia
  }

  // 2 => se le asigna docente
  select * from tb_doc_cur_grp where n_codper = 20251;
  {
    c_dnidoc:  0289293,
    n_codper: 20251,
    c_codmod: 1,
    c_codfac: S,
    c_codcur: PESG5024,
    c_grpcur: T1,
    c_tipo: EP, => nose cambia
    c_categoria: P => no cambia nose,
    c_codesp: S2
    n_codpla: 2025,
    c_sedcod: 1 => no cambia
  }

  // 3 => se le asigna horario docente
  select * from tb_cur_grp_hor where n_codper = 20251;
  {
    id: 17838,
    n_codper: 20251,
    c_codfac: S,
    c_codcur: PSI0703,
    c_grpcur: N1,
    c_dnidoc: 23937540,
    n_numdia: 1,
    c_hh_ini: 19,
    c_min_ini: 40,
    c_hh_fin: 19,
    c_min_fin: 40,
    n_break: 0 => no cambia
    d_freg: 2024-11-28 11:01:47,
    c_codmod: 2,
    c_tipo: TEV
    id_aula: 0 => cambia,
    c_codesp: S4,
    n_codpla: 2025,
    c_sedcod: 1 => no cambia
  }

  // 4 negativo => 5 positivo
  select * from tb_curso_grupo_sincro ORDER BY courseid DESC
  {
    courseid: -1 => negativo
    c_codfac: S
    c_codesp: S1
    c_sedcod: 1
    c_codcur: SESG3031
    c_grpcur: CS1
    n_codper: 20251
    c_codmod: 2
    n_codpla: 2025
    tipo: 1
    f_reg: 2025-05-08 14:51:41
    f_upd: 2025-05-08 14:51:41
    orden: 1
    shortname: SESG3031-1-251-CS1 => null
    name: INGLÉS I (ENF CS1) => null
  }

  // 5 asignar numero de vacantes
  select * from tb_cur_grp_vac;
  {
    n_codper: 20201
    c_codfac: E
    c_codcur: EEGG107
    c_grpcur: N1
    n_vactot: 10 => vacatentes totales igual
    n_vacmax: 10 => vacantes maxima igual
    n_vacmat: 10 => vacantes matriculadas
    c_codadm: null => no cambia  
    d_freg: null => no cambia 
    d_fact: null => no cambia 
    c_codmod: 2
    c_codesp: E3
    n_codpla: 2025
    c_sedcod: 1 => no cambia
  }

*/

// 186
// 189
// 190
// 191
// 192
// 193
// 194
// 195
// 196
// 197
// 198
// 199
// 200
// 201
// 202
// 203
// 204
// 205
// 206
// 207
// 208
// 209
// 210
// 211
// 212
// 213
// 214
// 215
// 216
// 217
// 218
// 219
// 220
// 221
// 222
// 223
// 224
// 225
// 226
// 227
// 228
// 229
// 230
// 231
// 2120
// 2121
// 2123
// 2124
// 2132
// 2133
// 2134
// 2135
// 2136
// 2139
// 2140
// 2145
// 2146
// 2147
// 2148
// 2149
// 2150
// 2151
// 2152
// 2153
// 2154
// 2155
// 2156
// 2157
// 2158
// 2159
// 2160
// 2161
// 2162
// 2163
// 2164
// 2165
// 2166
// 2167
// 2168
// 2169
// 2170
// 2171
// 2172
// 2173
// 2174
// 2175
// 2176
// 2177
// 2178
// 2179
// 2180
// 2181
// 2182
// 2183
// 2184
// 2185
// 2186
// 2187
// 2188
// 2189
// 2190
// 2191
// 2192
// 2193
// 2194
// 2195
// 2196
// 2197
// 2198
// 2199
// 2200
// 2201
// 2202
// 2203
// 2204
// 2205
// 2206
// 2207
// 2208
// 2209
// 2210
// 2211
// 2212
// 2213
// 2214
// 2215
// 2216
// 2217
// 2218
// 2219
// 2220
// 2221
// 2222
// 2223
// 2224
// 2225
// 2226
// 2227
// 2228
// 2229
// 2230
// 2231
// 2232
// 2233
// 2234
// 2235
// 2236
// 2237
// 2238
// 2239
// 2240
// 2241
// 2242
// 2243
// 2244
// 2245
// 2246
// 2247
// 2248
// 2249
// 2250
// 2251
// 2252
// 2253
// 2254
// 2255
// 2256
// 2257
// 2258
// 2259
// 2260
// 2261
// 2262
// 2263
// 2264
// 2265
// 2266
// 2267
// 2268
// 2269
// 2270
// 2271
// 2272
// 2273
// 2274
// 2275
// 2276
// 2277
// 2278
// 2279
// 2280
// 2281
// 2282
// 2283
// 2284
// 2285
// 2286
// 2287
// 2288
// 2289
// 2290
// 2291
// 2292
// 2293
// 2294
// 2295
// 2296
// 2297
// 2298
// 2299
// 2300
// 2301
// 2302
// 2303
// 2304
// 2305
// 2306
// 2307
// 2308
// 2309
// 2310
// 2311
// 2312
// 2313
// 2314
// 2315


Object.defineProperty(exports, "__esModule", { value: true });

const {
  Decimal,
  objectEnumValues,
  makeStrictEnum,
  Public,
  getRuntime,
  skip
} = require('./runtime/index-browser.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.5.0
 * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
 */
Prisma.prismaVersion = {
  client: "6.5.0",
  engine: "173f8d54f8d52e692c7e27e72a88314ec7aeff60"
}

Prisma.PrismaClientKnownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientKnownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)};
Prisma.PrismaClientUnknownRequestError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientUnknownRequestError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientRustPanicError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientRustPanicError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientInitializationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientInitializationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.PrismaClientValidationError = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`PrismaClientValidationError is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`sqltag is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.empty = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`empty is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.join = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`join is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.raw = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`raw is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.getExtensionContext is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}
Prisma.defineExtension = () => {
  const runtimeName = getRuntime().prettyName;
  throw new Error(`Extensions.defineExtension is unable to run in this browser environment, or has been bundled for the browser (running in ${runtimeName}).
In case this error is unexpected for you, please report it in https://pris.ly/prisma-prisma-bug-report`,
)}

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}



/**
 * Enums
 */

exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.AlumnoScalarFieldEnum = {
  codigo: 'codigo',
  paterno: 'paterno',
  materno: 'materno',
  nombres: 'nombres',
  facultad: 'facultad',
  regimen: 'regimen',
  are_pri: 'are_pri',
  are_sec: 'are_sec',
  c_codesp: 'c_codesp',
  semestre: 'semestre',
  ano_est: 'ano_est',
  seccion: 'seccion',
  sexo: 'sexo',
  condicion: 'condicion',
  usuario: 'usuario',
  fechamat: 'fechamat',
  hora: 'hora',
  codcurri: 'codcurri',
  resadsalu: 'resadsalu',
  nva_resol: 'nva_resol',
  promo: 'promo',
  fchaexpe: 'fchaexpe',
  id_raco: 'id_raco',
  intranet: 'intranet',
  id_modal: 'id_modal',
  sedcod: 'sedcod',
  n_codpln: 'n_codpln',
  foto_carnet: 'foto_carnet',
  sitalu: 'sitalu',
  id_cliente: 'id_cliente',
  id_tab_turno: 'id_tab_turno',
  n_nota_adm: 'n_nota_adm',
  n_pering: 'n_pering',
  n_grado: 'n_grado',
  c_escala_pension: 'c_escala_pension',
  c_flag_nuevo_esq_dscto: 'c_flag_nuevo_esq_dscto'
};

exports.Prisma.Campo_extraScalarFieldEnum = {
  id: 'id',
  tabla: 'tabla',
  tipo: 'tipo',
  nombre: 'nombre',
  longitud: 'longitud',
  required: 'required',
  estado: 'estado',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Campo_extra_opcionScalarFieldEnum = {
  id: 'id',
  campo_extra: 'campo_extra',
  descripcion: 'descripcion',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Campo_extra_tablaScalarFieldEnum = {
  id: 'id',
  tabla: 'tabla',
  nombre: 'nombre',
  estado: 'estado',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Campo_extra_tipoScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  esquema: 'esquema',
  clase: 'clase',
  longitud: 'longitud',
  estado: 'estado',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Campo_extra_valorScalarFieldEnum = {
  id_tabla: 'id_tabla',
  campo_extra: 'campo_extra',
  valor: 'valor',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.CurlleScalarFieldEnum = {
  codalu: 'codalu',
  codper: 'codper',
  codcur: 'codcur',
  cargo: 'cargo',
  notcurlle: 'notcurlle',
  user_name: 'user_name',
  user_fech: 'user_fech',
  tar: 'tar',
  curs_conva: 'curs_conva',
  reso_conva: 'reso_conva',
  periodo: 'periodo',
  numcred: 'numcred',
  d_fecha: 'd_fecha',
  n_cicper: 'n_cicper',
  nota_sub: 'nota_sub',
  reso_sub: 'reso_sub',
  cndcurlle: 'cndcurlle',
  n_codpla: 'n_codpla',
  id: 'id',
  c_grpcur: 'c_grpcur',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  c_estado_conv: 'c_estado_conv',
  nota_conv_tmp: 'nota_conv_tmp'
};

exports.Prisma.Eval_moodle_siguScalarFieldEnum = {
  idevaluacion: 'idevaluacion',
  idmoodle: 'idmoodle',
  nombre_eval: 'nombre_eval',
  nombre_moodle: 'nombre_moodle',
  f_reg: 'f_reg'
};

exports.Prisma.Rep_reporteScalarFieldEnum = {
  id_reporte: 'id_reporte',
  nombre_reporte: 'nombre_reporte',
  tipo_reporte: 'tipo_reporte',
  estado_reporte: 'estado_reporte',
  visible: 'visible'
};

exports.Prisma.Rep_reporte_db_orderbyScalarFieldEnum = {
  id_orderby: 'id_orderby',
  id_table: 'id_table',
  orderby_column: 'orderby_column',
  orderby_direction: 'orderby_direction',
  orderby_order: 'orderby_order'
};

exports.Prisma.Rep_reporte_db_selectScalarFieldEnum = {
  id_select: 'id_select',
  id_table: 'id_table',
  id_resultado: 'id_resultado',
  select_column: 'select_column',
  select_alias: 'select_alias',
  select_status: 'select_status',
  select_order: 'select_order'
};

exports.Prisma.Rep_reporte_db_tableScalarFieldEnum = {
  id_table: 'id_table',
  id_reporte: 'id_reporte',
  table_name: 'table_name',
  distinct: 'distinct'
};

exports.Prisma.Rep_reporte_db_whereScalarFieldEnum = {
  id_where: 'id_where',
  id_table: 'id_table',
  where_column: 'where_column',
  where_operator: 'where_operator',
  where_value: 'where_value',
  where_boolean: 'where_boolean',
  where_order: 'where_order'
};

exports.Prisma.Rep_reporte_filtroScalarFieldEnum = {
  id_filtro: 'id_filtro',
  id_reporte: 'id_reporte',
  id_where: 'id_where',
  nombre_filtro: 'nombre_filtro',
  cod_fuente: 'cod_fuente',
  estado_filtro: 'estado_filtro',
  orden_filtro: 'orden_filtro',
  visible: 'visible'
};

exports.Prisma.Rep_reporte_filtro_fuenteScalarFieldEnum = {
  cod_fuente: 'cod_fuente',
  fuente_tipo: 'fuente_tipo',
  fuente_clase: 'fuente_clase',
  fuente_metodo: 'fuente_metodo',
  fuente_input: 'fuente_input'
};

exports.Prisma.Rep_reporte_inputScalarFieldEnum = {
  id_input: 'id_input',
  input_type: 'input_type',
  input_label: 'input_label',
  input_placeholder: 'input_placeholder'
};

exports.Prisma.Rep_reporte_input_optionScalarFieldEnum = {
  id_option: 'id_option',
  id_input: 'id_input',
  option_value: 'option_value',
  option_label: 'option_label',
  option_operator: 'option_operator',
  option_status: 'option_status',
  option_order: 'option_order'
};

exports.Prisma.Rep_reporte_resultadoScalarFieldEnum = {
  id_resultado: 'id_resultado',
  id_reporte: 'id_reporte',
  nombre_resultado: 'nombre_resultado'
};

exports.Prisma.Rep_reporte_salidaScalarFieldEnum = {
  id_salida: 'id_salida',
  id_reporte: 'id_reporte',
  id_resultado: 'id_resultado',
  visible: 'visible',
  nombre_salida: 'nombre_salida',
  tipo_salida: 'tipo_salida',
  limite: 'limite'
};

exports.Prisma.Scr_tb_score_categoriaScalarFieldEnum = {
  id_score_categoria: 'id_score_categoria',
  id_score_entidad: 'id_score_entidad',
  val_score_min: 'val_score_min',
  val_score_max: 'val_score_max',
  nombre: 'nombre',
  peso: 'peso',
  btn_tipo: 'btn_tipo',
  orden: 'orden',
  estado: 'estado',
  created_at: 'created_at',
  updated_at: 'updated_at',
  created_by: 'created_by',
  updated_by: 'updated_by'
};

exports.Prisma.Scr_tb_score_entidadScalarFieldEnum = {
  id_score_entidad: 'id_score_entidad',
  entidad: 'entidad',
  tb_entidad: 'tb_entidad',
  tb_entidad_score: 'tb_entidad_score'
};

exports.Prisma.Semipresencial_23ScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmod: 'c_codmod',
  id_turno: 'id_turno'
};

exports.Prisma.Semipresencial_alu_23ScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmod: 'c_codmod'
};

exports.Prisma.Sga_egre_alu_seguir_cabScalarFieldEnum = {
  id: 'id',
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  situ_actual: 'situ_actual'
};

exports.Prisma.Sga_egre_alu_seguir_detScalarFieldEnum = {
  id: 'id',
  cab_id: 'cab_id',
  tipo_empleo: 'tipo_empleo',
  tiempo: 'tiempo',
  medio: 'medio',
  nombre_empre: 'nombre_empre',
  ruc: 'ruc',
  ubicacion: 'ubicacion',
  actividad: 'actividad',
  tipo_org: 'tipo_org',
  cargo: 'cargo',
  tipo_cargo: 'tipo_cargo',
  personal_cargo: 'personal_cargo',
  tipo_jornada: 'tipo_jornada',
  area_desempe_o: 'area_desempe_o',
  inicio: 'inicio',
  fin: 'fin',
  motivo: 'motivo',
  salario: 'salario',
  logros: 'logros',
  estado: 'estado',
  obs: 'obs',
  c_codesp: 'c_codesp',
  rel_trab_esp: 'rel_trab_esp',
  c_sugerencias: 'c_sugerencias',
  motivo_sin_trabajo: 'motivo_sin_trabajo'
};

exports.Prisma.Sga_licencias_zoomScalarFieldEnum = {
  id: 'id',
  tituloAula: 'tituloAula',
  api_key: 'api_key',
  api_secret: 'api_secret',
  account_id: 'account_id',
  email_relacionado_api: 'email_relacionado_api',
  estado: 'estado',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Sga_ms_cursoScalarFieldEnum = {
  c_codcur: 'c_codcur',
  c_nomcur: 'c_nomcur',
  id_tc: 'id_tc',
  n_ht: 'n_ht',
  n_hp: 'n_hp',
  n_cr: 'n_cr',
  prereq: 'prereq',
  resoling: 'resoling',
  resolcor: 'resolcor',
  user_ing: 'user_ing',
  d_seguir: 'd_seguir',
  c_tipcur: 'c_tipcur',
  d_borrado: 'd_borrado'
};

exports.Prisma.Sga_reg_alu_zoomScalarFieldEnum = {
  id: 'id',
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codreunionzoom: 'c_codreunionzoom',
  id_registrant: 'id_registrant'
};

exports.Prisma.Sga_reuniones_zoomScalarFieldEnum = {
  id: 'id',
  idLicenciaZoom: 'idLicenciaZoom',
  idReunionZoom: 'idReunionZoom',
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  c_grpcur: 'c_grpcur',
  c_codcur: 'c_codcur',
  temaReunion: 'temaReunion',
  tipoReunionZoom: 'tipoReunionZoom',
  fechaInicioReunion: 'fechaInicioReunion',
  fechaFinReunion: 'fechaFinReunion',
  duracion_minutos: 'duracion_minutos',
  estado: 'estado',
  anulado: 'anulado',
  created_at: 'created_at',
  updated_at: 'updated_at',
  unificado: 'unificado',
  codUnificado: 'codUnificado',
  idOcurrenciaZoom: 'idOcurrenciaZoom'
};

exports.Prisma.Sga_tb_adm_clienteScalarFieldEnum = {
  id_cliente: 'id_cliente',
  id_fase: 'id_fase',
  id_mod_ing: 'id_mod_ing',
  c_apepat: 'c_apepat',
  c_apemat: 'c_apemat',
  c_nombres: 'c_nombres',
  c_tipdoc: 'c_tipdoc',
  c_numdoc: 'c_numdoc',
  d_fecnac: 'd_fecnac',
  c_dptonac: 'c_dptonac',
  c_provnac: 'c_provnac',
  c_distnac: 'c_distnac',
  c_dptodom: 'c_dptodom',
  c_provdom: 'c_provdom',
  c_distdom: 'c_distdom',
  c_dir: 'c_dir',
  c_codpos: 'c_codpos',
  c_fono: 'c_fono',
  c_celu: 'c_celu',
  c_email: 'c_email',
  c_procedencia: 'c_procedencia',
  c_colg_ubicacion: 'c_colg_ubicacion',
  c_tippro: 'c_tippro',
  c_anoegreso: 'c_anoegreso',
  c_codfac1: 'c_codfac1',
  c_codesp1: 'c_codesp1',
  c_codfac2: 'c_codfac2',
  c_codesp2: 'c_codesp2',
  c_sedcod: 'c_sedcod',
  c_codmod: 'c_codmod',
  id_tab_turno: 'id_tab_turno',
  id_tab_sitalu: 'id_tab_sitalu',
  c_nomapo: 'c_nomapo',
  c_dniapo: 'c_dniapo',
  c_fonoapo: 'c_fonoapo',
  c_celuapo: 'c_celuapo',
  c_parentescoapo: 'c_parentescoapo',
  c_nomapo_2: 'c_nomapo_2',
  c_dniapo_2: 'c_dniapo_2',
  c_fonoapo_2: 'c_fonoapo_2',
  c_celuapo_2: 'c_celuapo_2',
  c_parentescoapo_2: 'c_parentescoapo_2',
  id_proceso: 'id_proceso',
  id_tab_alu_contact: 'id_tab_alu_contact',
  c_obs: 'c_obs',
  c_sexo: 'c_sexo',
  c_paisnac: 'c_paisnac',
  id_user: 'id_user',
  created_at: 'created_at',
  updated_at: 'updated_at',
  cod_asesor: 'cod_asesor',
  f_updated_asesor: 'f_updated_asesor',
  user_upd_asesor: 'user_upd_asesor',
  c_procedencia_ext: 'c_procedencia_ext',
  b_pago: 'b_pago',
  f_val_pago: 'f_val_pago',
  user_val_pago: 'user_val_pago',
  b_rec_pago: 'b_rec_pago',
  c_rec_motivo: 'c_rec_motivo',
  f_rec_pago: 'f_rec_pago',
  user_rec_pago: 'user_rec_pago',
  b_upd_voucher: 'b_upd_voucher',
  c_procedencia_ext_anio: 'c_procedencia_ext_anio',
  c_canales: 'c_canales',
  c_seguimiento: 'c_seguimiento',
  n_nota: 'n_nota',
  c_fijo: 'c_fijo',
  c_datacadiat: 'c_datacadiat',
  c_tiptrabiat: 'c_tiptrabiat',
  c_entilabact: 'c_entilabact',
  c_tipprogiat: 'c_tipprogiat',
  c_ietnica: 'c_ietnica',
  c_lengua_nat: 'c_lengua_nat',
  c_idioma_ext: 'c_idioma_ext',
  c_cond_discap: 'c_cond_discap',
  c_codigo_orcid: 'c_codigo_orcid',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype',
  d_size: 'd_size'
};

exports.Prisma.Sga_tb_adm_cliente_segScalarFieldEnum = {
  id: 'id',
  id_cliente: 'id_cliente',
  id_tipo: 'id_tipo',
  c_seguimiento: 'c_seguimiento',
  c_observacion: 'c_observacion',
  c_estado: 'c_estado',
  d_fecha: 'd_fecha',
  d_fecha_fin: 'd_fecha_fin',
  id_user: 'id_user'
};

exports.Prisma.Sga_tb_adm_faseScalarFieldEnum = {
  id_fase: 'id_fase',
  c_nomfase: 'c_nomfase'
};

exports.Prisma.Sga_tb_adm_filesScalarFieldEnum = {
  id: 'id',
  c_numdoc: 'c_numdoc',
  id_proceso: 'id_proceso',
  d_original_name: 'd_original_name',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype',
  d_size: 'd_size',
  d_fec_reg: 'd_fec_reg',
  c_docreq: 'c_docreq'
};

exports.Prisma.Sga_tb_adm_procesoScalarFieldEnum = {
  id_proceso: 'id_proceso',
  c_codpro: 'c_codpro',
  c_nompro: 'c_nompro',
  d_ini: 'd_ini',
  d_fin: 'd_fin',
  c_activo: 'c_activo',
  d_borrado: 'd_borrado',
  c_web: 'c_web',
  c_codfac: 'c_codfac',
  c_descripcion: 'c_descripcion'
};

exports.Prisma.Sga_tb_adm_text_formScalarFieldEnum = {
  id: 'id',
  tipo: 'tipo',
  description: 'description',
  estado: 'estado'
};

exports.Prisma.Sga_tb_admision_vacantesScalarFieldEnum = {
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmod: 'c_codmod',
  n_codper: 'n_codper',
  c_sedcod: 'c_sedcod',
  n_cantidad_vacantes: 'n_cantidad_vacantes',
  n_cantidad_mat: 'n_cantidad_mat'
};

exports.Prisma.Sga_tb_asistalu_dict_clase_progScalarFieldEnum = {
  id: 'id',
  c_dnidoc: 'c_dnidoc',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  n_dia: 'n_dia',
  c_tipo_clase: 'c_tipo_clase',
  n_codper: 'n_codper',
  c_aula: 'c_aula',
  c_link: 'c_link',
  d_fh_inicio_prog: 'd_fh_inicio_prog',
  d_fh_fin_prog: 'd_fh_fin_prog',
  c_nomcur: 'c_nomcur',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  n_codpla: 'n_codpla',
  c_codesp: 'c_codesp',
  n_break: 'n_break',
  id_grp_repetido: 'id_grp_repetido',
  id_curso_grupo_cincro: 'id_curso_grupo_cincro'
};

exports.Prisma.Sga_tb_asistdoc_dict_clase_progScalarFieldEnum = {
  id_dictado_prog: 'id_dictado_prog',
  c_dnidoc: 'c_dnidoc',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  n_dia: 'n_dia',
  c_tipo_docente: 'c_tipo_docente',
  c_tipo_clase: 'c_tipo_clase',
  c_estado_dictado: 'c_estado_dictado',
  c_yyyy: 'c_yyyy',
  c_mm: 'c_mm',
  c_dd: 'c_dd',
  c_hh: 'c_hh',
  c_mi: 'c_mi',
  n_codper: 'n_codper',
  c_aula: 'c_aula',
  c_fh_inicio_prog: 'c_fh_inicio_prog',
  c_fh_fin_prog: 'c_fh_fin_prog',
  c_fh_inicio: 'c_fh_inicio',
  c_fh_fin: 'c_fh_fin',
  d_fh_inicio_prog: 'd_fh_inicio_prog',
  d_fh_fin_prog: 'd_fh_fin_prog',
  d_fh_inicio: 'd_fh_inicio',
  d_fh_fin: 'd_fh_fin',
  c_nomcur: 'c_nomcur',
  id_motivo: 'id_motivo',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  n_codpla: 'n_codpla',
  c_codesp: 'c_codesp',
  n_break: 'n_break',
  n_flag: 'n_flag',
  id_prog_clase: 'id_prog_clase'
};

exports.Prisma.Sga_tb_boletin_aluScalarFieldEnum = {
  cod_anu: 'cod_anu',
  c_codfac: 'c_codfac',
  c_codper: 'c_codper',
  c_codmod: 'c_codmod',
  c_codsed: 'c_codsed',
  c_descripcion: 'c_descripcion',
  activo: 'activo',
  fecha_inicio: 'fecha_inicio',
  fecha_fin: 'fecha_fin',
  created_at: 'created_at',
  updated_at: 'updated_at',
  c_codesp: 'c_codesp',
  n_ciclo: 'n_ciclo',
  c_grpcur: 'c_grpcur'
};

exports.Prisma.Sga_tb_boletin_docScalarFieldEnum = {
  cod_anu: 'cod_anu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_grpcur: 'c_grpcur',
  n_codper: 'n_codper',
  n_ciclo: 'n_ciclo',
  c_descripcion: 'c_descripcion',
  activo: 'activo',
  fecha_inicio: 'fecha_inicio',
  fecha_fin: 'fecha_fin',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Sga_tb_campanaScalarFieldEnum = {
  id_campana: 'id_campana',
  n_codper: 'n_codper',
  id_proceso: 'id_proceso',
  c_ind_gen: 'c_ind_gen',
  c_obj_gen: 'c_obj_gen',
  c_cant_gen: 'c_cant_gen',
  c_fecha_ini: 'c_fecha_ini',
  c_fecha_fin: 'c_fecha_fin',
  usuario: 'usuario',
  c_fecha_reg: 'c_fecha_reg'
};

exports.Prisma.Sga_tb_campana_cabScalarFieldEnum = {
  id_campana: 'id_campana',
  n_mes: 'n_mes',
  ind_mes: 'ind_mes',
  obj_mes: 'obj_mes',
  cant_mes: 'cant_mes',
  cant_sem: 'cant_sem',
  estado: 'estado',
  c_fecha_ini_mes: 'c_fecha_ini_mes',
  c_fecha_fin_mes: 'c_fecha_fin_mes'
};

exports.Prisma.Sga_tb_campana_detScalarFieldEnum = {
  id_campana: 'id_campana',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  n_mes: 'n_mes',
  n_sem: 'n_sem',
  ind_sem: 'ind_sem',
  obj_sem: 'obj_sem',
  cant_sem: 'cant_sem',
  estado: 'estado',
  c_fecha_ini_sem: 'c_fecha_ini_sem',
  c_fecha_fin_sem: 'c_fecha_fin_sem'
};

exports.Prisma.Sga_tb_campana_espScalarFieldEnum = {
  id_campana: 'id_campana',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  ind_esp: 'ind_esp',
  obj_esp: 'obj_esp',
  cant_esp: 'cant_esp'
};

exports.Prisma.Sga_tb_campa_aScalarFieldEnum = {
  id_campa_a: 'id_campa_a',
  n_codper: 'n_codper',
  id_proceso: 'id_proceso',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_ind_gen: 'c_ind_gen',
  c_obj_gen: 'c_obj_gen',
  c_fecha_ini: 'c_fecha_ini',
  c_fecha_fin: 'c_fecha_fin',
  c_ind_sem: 'c_ind_sem',
  c_obj_sem: 'c_obj_sem'
};

exports.Prisma.Sga_tb_cargoScalarFieldEnum = {
  id: 'id',
  cod_cargo: 'cod_cargo',
  nom_cargo: 'nom_cargo',
  nom_oficina: 'nom_oficina',
  nom_autoridad: 'nom_autoridad',
  activo: 'activo',
  cargo_resol: 'cargo_resol',
  d_fecha: 'd_fecha'
};

exports.Prisma.Sga_tb_control_alumnoScalarFieldEnum = {
  id: 'id',
  c_codalu: 'c_codalu',
  d_fecha: 'd_fecha',
  id_usuario: 'id_usuario'
};

exports.Prisma.Sga_tb_doc_gradoScalarFieldEnum = {
  c_dnidoc: 'c_dnidoc',
  c_codgra: 'c_codgra',
  univcod: 'univcod',
  d_fecha: 'd_fecha',
  c_mencion: 'c_mencion',
  d_seguir: 'd_seguir',
  c_pais: 'c_pais'
};

exports.Prisma.Sga_tb_log_alumnoScalarFieldEnum = {
  id: 'id',
  c_codalu: 'c_codalu',
  date: 'date',
  tipo: 'tipo'
};

exports.Prisma.Sga_tb_log_docenteScalarFieldEnum = {
  id: 'id',
  c_dnidoc: 'c_dnidoc',
  date: 'date'
};

exports.Prisma.Sga_tb_modalidad_ingresoScalarFieldEnum = {
  id_mod_ing: 'id_mod_ing',
  c_descri: 'c_descri',
  d_borrado: 'd_borrado',
  c_web: 'c_web'
};

exports.Prisma.Sgb_tb_alu_certificadoScalarFieldEnum = {
  id_alu_certificado: 'id_alu_certificado',
  c_codalu: 'c_codalu',
  c_institucion: 'c_institucion',
  c_des_certificado: 'c_des_certificado',
  d_fecha_certificado: 'd_fecha_certificado',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Sgb_tb_alu_conocimientoScalarFieldEnum = {
  id_alu_conocimiento: 'id_alu_conocimiento',
  c_codalu: 'c_codalu',
  c_des_conocimiento: 'c_des_conocimiento',
  c_nivel_conocimiento: 'c_nivel_conocimiento',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Sgb_tb_alu_cursoScalarFieldEnum = {
  id_alu_curso: 'id_alu_curso',
  c_codalu: 'c_codalu',
  c_institucion: 'c_institucion',
  c_nivel_est: 'c_nivel_est',
  c_des_curso: 'c_des_curso',
  c_estado_curso: 'c_estado_curso',
  c_per_mes1: 'c_per_mes1',
  c_per_ano1: 'c_per_ano1',
  c_per_mes2: 'c_per_mes2',
  c_per_ano2: 'c_per_ano2',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Sgb_tb_alu_cvScalarFieldEnum = {
  id: 'id',
  c_codalu: 'c_codalu',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype',
  d_size: 'd_size',
  d_fec_reg: 'd_fec_reg'
};

exports.Prisma.Sgb_tb_alu_experiencia_profesionalScalarFieldEnum = {
  id_alu_ep: 'id_alu_ep',
  c_codalu: 'c_codalu',
  c_empresa_ep: 'c_empresa_ep',
  c_sector_ep: 'c_sector_ep',
  c_cargo_ep: 'c_cargo_ep',
  c_area_cargo_ep: 'c_area_cargo_ep',
  c_activo_ep: 'c_activo_ep',
  c_per_mes1: 'c_per_mes1',
  c_per_ano1: 'c_per_ano1',
  c_per_mes2: 'c_per_mes2',
  c_per_ano2: 'c_per_ano2',
  c_funciones_logos_ep: 'c_funciones_logos_ep',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Sgb_tb_alu_f_acadScalarFieldEnum = {
  id_alu_f_acad: 'id_alu_f_acad',
  c_codalu: 'c_codalu',
  c_institucion: 'c_institucion',
  c_nivel_est: 'c_nivel_est',
  c_des_f_acad: 'c_des_f_acad',
  c_estado_f_acad: 'c_estado_f_acad',
  c_per_mes1: 'c_per_mes1',
  c_per_ano1: 'c_per_ano1',
  c_per_mes2: 'c_per_mes2',
  c_per_ano2: 'c_per_ano2',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Sgb_tb_alu_idiomaScalarFieldEnum = {
  id_alu_idioma: 'id_alu_idioma',
  c_codalu: 'c_codalu',
  c_idioma: 'c_idioma',
  c_idioma_nivel: 'c_idioma_nivel',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Sgb_tb_alu_interesScalarFieldEnum = {
  c_codalu: 'c_codalu',
  c_des_interes: 'c_des_interes',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Sgb_tb_alu_perfilScalarFieldEnum = {
  c_codalu: 'c_codalu',
  c_perfil: 'c_perfil',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Sgb_tb_alu_postulanteScalarFieldEnum = {
  id_alu_postula: 'id_alu_postula',
  c_codalu: 'c_codalu',
  id_oferta: 'id_oferta',
  d_fecha_postula: 'd_fecha_postula',
  cod_etapa: 'cod_etapa'
};

exports.Prisma.Sgb_tb_alu_referenciaScalarFieldEnum = {
  id_alu_refe: 'id_alu_refe',
  c_codalu: 'c_codalu',
  c_nombres_refe: 'c_nombres_refe',
  c_cargo_refe: 'c_cargo_refe',
  c_empresa_refe: 'c_empresa_refe',
  c_email_refe: 'c_email_refe',
  c_fono1: 'c_fono1',
  c_fono2: 'c_fono2',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Sgb_tb_alu_seminarioScalarFieldEnum = {
  id_alu_seminario: 'id_alu_seminario',
  c_codalu: 'c_codalu',
  c_institucion: 'c_institucion',
  c_titulo: 'c_titulo',
  c_des_seminario: 'c_des_seminario',
  c_estado_curso: 'c_estado_curso',
  c_per_mes1: 'c_per_mes1',
  c_per_ano1: 'c_per_ano1',
  c_per_mes2: 'c_per_mes2',
  c_per_ano2: 'c_per_ano2',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Sgb_tb_ofertaScalarFieldEnum = {
  id_oferta: 'id_oferta',
  c_sitalu: 'c_sitalu',
  n_codper: 'n_codper',
  c_ciclo: 'c_ciclo',
  c_codesp: 'c_codesp',
  id_empresa: 'id_empresa',
  c_titulo: 'c_titulo',
  c_competencia: 'c_competencia',
  c_funciones: 'c_funciones',
  c_conocimientos: 'c_conocimientos',
  c_area_oficina: 'c_area_oficina',
  d_fecha_caduca: 'd_fecha_caduca',
  c_salario: 'c_salario',
  n_vacantes: 'n_vacantes',
  c_destino: 'c_destino',
  c_horario: 'c_horario',
  c_pais: 'c_pais',
  c_dpto: 'c_dpto',
  c_link: 'c_link',
  d_fecha_solicita: 'd_fecha_solicita',
  c_estado: 'c_estado',
  c_datos_postulacion: 'c_datos_postulacion',
  c_info_adicional: 'c_info_adicional',
  c_beneficios: 'c_beneficios'
};

exports.Prisma.Sged_tb_eva_doc_cabScalarFieldEnum = {
  id: 'id',
  d_nro: 'd_nro',
  n_codper: 'n_codper',
  c_dnidoc: 'c_dnidoc',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  n_codpla: 'n_codpla',
  d_fecha_eva: 'd_fecha_eva',
  d_fecha_registro: 'd_fecha_registro',
  d_nota: 'd_nota',
  d_archivo: 'd_archivo',
  c_observacion: 'c_observacion',
  c_estado: 'c_estado'
};

exports.Prisma.Sged_tb_eva_doc_detScalarFieldEnum = {
  id: 'id',
  eva_doc_cab_id: 'eva_doc_cab_id',
  eva_doc_preg_id: 'eva_doc_preg_id',
  d_resultado: 'd_resultado'
};

exports.Prisma.Sged_tb_eva_doc_pregScalarFieldEnum = {
  id: 'id',
  c_descripcion: 'c_descripcion',
  n_orden: 'n_orden'
};

exports.Prisma.Sgh_tb_cursos_proyectadosScalarFieldEnum = {
  n_codper: 'n_codper',
  n_codpln: 'n_codpln',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_nomcur: 'c_nomcur',
  n_ciclo: 'n_ciclo',
  n_cantproy: 'n_cantproy'
};

exports.Prisma.Sgt_tb_alu_beca_autorizacionScalarFieldEnum = {
  id_alu_beca: 'id_alu_beca',
  n_codper: 'n_codper',
  c_grupo: 'c_grupo',
  id_beca: 'id_beca',
  c_codalu: 'c_codalu',
  d_seguir: 'd_seguir',
  c_obs: 'c_obs',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_user: 'c_user',
  n_monto_dscto: 'n_monto_dscto',
  c_estado: 'c_estado'
};

exports.Prisma.Sgt_tb_alu_cuotaScalarFieldEnum = {
  id_cuota: 'id_cuota',
  id_escala: 'id_escala',
  id_cuota_ciclo: 'id_cuota_ciclo',
  c_escala_pension: 'c_escala_pension',
  n_codper: 'n_codper',
  id_vence: 'id_vence',
  c_codalu: 'c_codalu',
  id_tipdoc: 'id_tipdoc',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  n_total_regular: 'n_total_regular',
  n_total_pagar: 'n_total_pagar',
  n_total_pagar2: 'n_total_pagar2',
  c_estado: 'c_estado',
  id_beca: 'id_beca',
  c_numope: 'c_numope',
  n_mora: 'n_mora',
  d_mora_lock: 'd_mora_lock',
  c_ccosto: 'c_ccosto',
  id_tipo: 'id_tipo',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  d_fec_perdida_dscto: 'd_fec_perdida_dscto',
  n_monto_perdido: 'n_monto_perdido',
  d_fec_envio_noti: 'd_fec_envio_noti',
  n_porc_dscto_auto: 'n_porc_dscto_auto',
  n_flag_dscto_auto: 'n_flag_dscto_auto',
  c_flag_rec: 'c_flag_rec',
  n_monto_rec: 'n_monto_rec',
  d_fec_perdida_dscto_pp: 'd_fec_perdida_dscto_pp',
  c_flag_rec_pp: 'c_flag_rec_pp',
  n_monto_rec_pp: 'n_monto_rec_pp',
  c_becas_arr: 'c_becas_arr',
  n_dscto_manual: 'n_dscto_manual',
  n_aumento_manual: 'n_aumento_manual',
  n_saldo_favor: 'n_saldo_favor',
  n_dscto_adicional: 'n_dscto_adicional',
  created_at: 'created_at'
};

exports.Prisma.Sgt_tb_alu_cuota_20242_pg_seg_elimScalarFieldEnum = {
  id_cuota: 'id_cuota',
  id_escala: 'id_escala',
  id_cuota_ciclo: 'id_cuota_ciclo',
  c_escala_pension: 'c_escala_pension',
  n_codper: 'n_codper',
  id_vence: 'id_vence',
  c_codalu: 'c_codalu',
  id_tipdoc: 'id_tipdoc',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  n_total_regular: 'n_total_regular',
  n_total_pagar: 'n_total_pagar',
  n_total_pagar2: 'n_total_pagar2',
  c_estado: 'c_estado',
  id_beca: 'id_beca',
  c_numope: 'c_numope',
  n_mora: 'n_mora',
  d_mora_lock: 'd_mora_lock',
  c_ccosto: 'c_ccosto',
  id_tipo: 'id_tipo',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  d_fec_perdida_dscto: 'd_fec_perdida_dscto',
  n_monto_perdido: 'n_monto_perdido',
  d_fec_envio_noti: 'd_fec_envio_noti',
  n_porc_dscto_auto: 'n_porc_dscto_auto',
  n_flag_dscto_auto: 'n_flag_dscto_auto'
};

exports.Prisma.Sgt_tb_alu_cuota_20251_es_seg_elimScalarFieldEnum = {
  id_cuota: 'id_cuota',
  id_escala: 'id_escala',
  id_cuota_ciclo: 'id_cuota_ciclo',
  c_escala_pension: 'c_escala_pension',
  n_codper: 'n_codper',
  id_vence: 'id_vence',
  c_codalu: 'c_codalu',
  id_tipdoc: 'id_tipdoc',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  n_total_regular: 'n_total_regular',
  n_total_pagar: 'n_total_pagar',
  n_total_pagar2: 'n_total_pagar2',
  c_estado: 'c_estado',
  id_beca: 'id_beca',
  c_numope: 'c_numope',
  n_mora: 'n_mora',
  d_mora_lock: 'd_mora_lock',
  c_ccosto: 'c_ccosto',
  id_tipo: 'id_tipo',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  d_fec_perdida_dscto: 'd_fec_perdida_dscto',
  n_monto_perdido: 'n_monto_perdido',
  d_fec_envio_noti: 'd_fec_envio_noti',
  n_porc_dscto_auto: 'n_porc_dscto_auto',
  n_flag_dscto_auto: 'n_flag_dscto_auto',
  c_flag_rec: 'c_flag_rec',
  n_monto_rec: 'n_monto_rec',
  d_fec_perdida_dscto_pp: 'd_fec_perdida_dscto_pp',
  c_flag_rec_pp: 'c_flag_rec_pp',
  n_monto_rec_pp: 'n_monto_rec_pp',
  c_becas_arr: 'c_becas_arr',
  n_dscto_manual: 'n_dscto_manual',
  n_aumento_manual: 'n_aumento_manual',
  n_saldo_favor: 'n_saldo_favor',
  created_at: 'created_at'
};

exports.Prisma.Sgt_tb_alu_cuota_dscto_adicionalScalarFieldEnum = {
  id: 'id',
  n_codper: 'n_codper',
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  id_cuota: 'id_cuota',
  c_cuota: 'c_cuota',
  n_monto: 'n_monto',
  c_obs: 'c_obs',
  c_user: 'c_user',
  created_at: 'created_at'
};

exports.Prisma.Sgt_tb_alu_cuota_matScalarFieldEnum = {
  id_alu_cuota_mat: 'id_alu_cuota_mat',
  c_codalu: 'c_codalu',
  c_pering: 'c_pering',
  c_descri: 'c_descri',
  n_codper: 'n_codper',
  n_monto_referencial: 'n_monto_referencial',
  id_tipo: 'id_tipo',
  c_label: 'c_label',
  cost_cred_id: 'cost_cred_id',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.Sgt_tb_alu_cuota_pensionScalarFieldEnum = {
  id_alu_cuota_pe: 'id_alu_cuota_pe',
  c_codalu: 'c_codalu',
  c_pering: 'c_pering',
  c_descri: 'c_descri',
  n_codper: 'n_codper',
  n_monto_referencial: 'n_monto_referencial',
  id_tipo: 'id_tipo',
  c_label: 'c_label',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.Sgt_tb_alu_cuota_retiro_dscto_manualScalarFieldEnum = {
  n_codper: 'n_codper',
  id_cuota: 'id_cuota',
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  n_total_regular: 'n_total_regular',
  n_total_pagar: 'n_total_pagar',
  d_vence: 'd_vence',
  c_estado: 'c_estado',
  c_cuota: 'c_cuota',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  c_numope: 'c_numope',
  id_tipo: 'id_tipo',
  id_beca: 'id_beca',
  d_fec_perdida_dscto: 'd_fec_perdida_dscto',
  n_monto_perdido: 'n_monto_perdido',
  n_mora: 'n_mora'
};

exports.Prisma.Sgt_tb_alu_cuota_saldo_favorScalarFieldEnum = {
  id: 'id',
  n_codper: 'n_codper',
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  id_cuota: 'id_cuota',
  c_cuota: 'c_cuota',
  n_monto: 'n_monto',
  c_obs: 'c_obs',
  c_user: 'c_user',
  created_at: 'created_at'
};

exports.Prisma.Sgt_tb_alu_cuota_scoreScalarFieldEnum = {
  id_cuota: 'id_cuota',
  n_codper: 'n_codper',
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  fec_vence: 'fec_vence',
  n_total_pagar: 'n_total_pagar',
  fec_pago: 'fec_pago',
  n_pago: 'n_pago',
  dias_pago: 'dias_pago',
  val_score: 'val_score',
  id_score_categoria: 'id_score_categoria',
  fec_score: 'fec_score',
  score_nombre: 'score_nombre'
};

exports.Prisma.Sgt_tb_alu_facturaScalarFieldEnum = {
  id: 'id',
  c_ruc: 'c_ruc',
  c_razsoc: 'c_razsoc',
  c_direccion: 'c_direccion',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  n_monto_fact: 'n_monto_fact',
  d_fecha_fact: 'd_fecha_fact',
  seguir: 'seguir',
  id_pago_det: 'id_pago_det',
  c_igvmonto: 'c_igvmonto',
  c_forma_pago: 'c_forma_pago',
  c_obs: 'c_obs',
  c_igvtipo: 'c_igvtipo'
};

exports.Prisma.Sgt_tb_alu_pago_anuladoScalarFieldEnum = {
  id_pago_anulado: 'id_pago_anulado',
  d_fecha_anulado: 'd_fecha_anulado',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  n_pago_anulado: 'n_pago_anulado',
  d_fec_pago: 'd_fec_pago',
  id_tipdoc: 'id_tipdoc',
  id_user: 'id_user'
};

exports.Prisma.Sgt_tb_alu_pago_asignadoScalarFieldEnum = {
  id: 'id',
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_ciclo: 'c_ciclo',
  c_grpcur: 'c_grpcur'
};

exports.Prisma.Sgt_tb_alu_pago_asignado_detScalarFieldEnum = {
  id: 'id',
  alu_pago_asignado_id: 'alu_pago_asignado_id',
  c_codalu: 'c_codalu',
  id_tipo: 'id_tipo',
  d_fec_venc: 'd_fec_venc',
  c_flag: 'c_flag',
  id_pago_cab: 'id_pago_cab'
};

exports.Prisma.Sgt_tb_alu_pago_asignado_det_elim_carnetScalarFieldEnum = {
  id: 'id',
  alu_pago_asignado_id: 'alu_pago_asignado_id',
  c_codalu: 'c_codalu',
  id_tipo: 'id_tipo',
  d_fec_venc: 'd_fec_venc',
  c_flag: 'c_flag',
  id_pago_cab: 'id_pago_cab'
};

exports.Prisma.Sgt_tb_alu_pago_asignado_det_elim_es_20251ScalarFieldEnum = {
  id: 'id',
  alu_pago_asignado_id: 'alu_pago_asignado_id',
  c_codalu: 'c_codalu',
  id_tipo: 'id_tipo',
  d_fec_venc: 'd_fec_venc',
  c_flag: 'c_flag',
  id_pago_cab: 'id_pago_cab'
};

exports.Prisma.Sgt_tb_alu_pago_asignado_det_elim_pg_20242ScalarFieldEnum = {
  id: 'id',
  alu_pago_asignado_id: 'alu_pago_asignado_id',
  c_codalu: 'c_codalu',
  id_tipo: 'id_tipo',
  d_fec_venc: 'd_fec_venc',
  c_flag: 'c_flag',
  id_pago_cab: 'id_pago_cab'
};

exports.Prisma.Sgt_tb_alu_pago_asignado_det_elim_se_20243ScalarFieldEnum = {
  id: 'id',
  alu_pago_asignado_id: 'alu_pago_asignado_id',
  c_codalu: 'c_codalu',
  id_tipo: 'id_tipo',
  d_fec_venc: 'd_fec_venc',
  c_flag: 'c_flag',
  id_pago_cab: 'id_pago_cab'
};

exports.Prisma.Sgt_tb_alu_pago_cabScalarFieldEnum = {
  id_pago_cab: 'id_pago_cab',
  id_cuota: 'id_cuota',
  n_codper: 'n_codper',
  c_codalu: 'c_codalu',
  c_razon_social: 'c_razon_social',
  c_tipdoc: 'c_tipdoc',
  c_numdocu: 'c_numdocu',
  c_estado: 'c_estado',
  n_cant: 'n_cant',
  n_tot_pago: 'n_tot_pago',
  n_mora: 'n_mora',
  n_precio: 'n_precio',
  n_igv: 'n_igv',
  id_tipo: 'id_tipo',
  c_estado_pago: 'c_estado_pago',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_ciclo: 'c_ciclo',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_sedcod_pago: 'c_sedcod_pago'
};

exports.Prisma.Sgt_tb_alu_pago_detScalarFieldEnum = {
  id_pago_det: 'id_pago_det',
  id_pago_cab: 'id_pago_cab',
  c_estado_pago_cab: 'c_estado_pago_cab',
  c_codalu: 'c_codalu',
  c_numope: 'c_numope',
  c_numorden: 'c_numorden',
  id_tipdoc: 'id_tipdoc',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  c_numdoc_rel: 'c_numdoc_rel',
  c_origen: 'c_origen',
  n_pago: 'n_pago',
  n_precio: 'n_precio',
  c_afecta: 'c_afecta',
  n_igv: 'n_igv',
  c_estado: 'c_estado',
  d_fec_pago: 'd_fec_pago',
  c_user: 'c_user',
  id_tipo_moneda: 'id_tipo_moneda',
  d_seguir: 'd_seguir',
  d_fec_imp: 'd_fec_imp',
  id_pago_doc: 'id_pago_doc'
};

exports.Prisma.Sgt_tb_alu_pago_docScalarFieldEnum = {
  id_pago_doc: 'id_pago_doc',
  id_tipodoc: 'id_tipodoc',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  id_alu_factura: 'id_alu_factura',
  c_codalu: 'c_codalu',
  d_fecdoc: 'd_fecdoc',
  d_fecreg: 'd_fecreg',
  c_estado_doc: 'c_estado_doc',
  n_pago: 'n_pago',
  n_precio: 'n_precio',
  n_igv: 'n_igv',
  c_usureg: 'c_usureg',
  n_codper: 'n_codper',
  c_sedcod: 'c_sedcod',
  c_sedcod_pago: 'c_sedcod_pago',
  c_ciclo: 'c_ciclo',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_forma_pago: 'c_forma_pago',
  c_obs: 'c_obs',
  c_qr: 'c_qr',
  c_nube_pdf: 'c_nube_pdf',
  c_ruta_txt: 'c_ruta_txt'
};

exports.Prisma.Sgt_tb_alu_pago_doc_cuotaScalarFieldEnum = {
  id_pago_doc_cuota: 'id_pago_doc_cuota',
  id_pago_doc: 'id_pago_doc',
  nro_cuota: 'nro_cuota',
  val_cuota: 'val_cuota',
  fec_cuota: 'fec_cuota',
  fec_pago: 'fec_pago',
  fec_registro: 'fec_registro',
  c_user: 'c_user'
};

exports.Prisma.Sgt_tb_alu_pago_doc_detScalarFieldEnum = {
  id_pago_doc_det: 'id_pago_doc_det',
  id_pago_doc: 'id_pago_doc',
  descri_pago: 'descri_pago',
  monto_pago: 'monto_pago',
  monto_precio: 'monto_precio',
  tipo_afecta: 'tipo_afecta',
  monto_igv: 'monto_igv',
  origen_pago: 'origen_pago',
  id_cuota: 'id_cuota',
  tipo_cuota: 'tipo_cuota',
  val_cuota: 'val_cuota',
  mora_cuota: 'mora_cuota'
};

exports.Prisma.Sgt_tb_alu_pago_eliminadoScalarFieldEnum = {
  id_pago_eliminado: 'id_pago_eliminado',
  d_fecha_eliminado: 'd_fecha_eliminado',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  n_pago_eliminado: 'n_pago_eliminado',
  d_fec_pago: 'd_fec_pago',
  id_tipodoc: 'id_tipodoc',
  id_user: 'id_user',
  id_cuota: 'id_cuota'
};

exports.Prisma.Sgt_tb_alu_pago_obsScalarFieldEnum = {
  c_codalu: 'c_codalu',
  c_obs: 'c_obs',
  n_codper: 'n_codper'
};

exports.Prisma.Sgt_tb_alu_pago_variosScalarFieldEnum = {
  id_pago_varios: 'id_pago_varios',
  id_tipo_pago: 'id_tipo_pago',
  c_codalu: 'c_codalu',
  c_numope: 'c_numope',
  c_numdoc: 'c_numdoc',
  d_fecha_pago: 'd_fecha_pago',
  n_codper: 'n_codper',
  n_pago: 'n_pago',
  d_seguir: 'd_seguir'
};

exports.Prisma.Sgt_tb_beca_autorizacionScalarFieldEnum = {
  id_beca: 'id_beca',
  c_descri: 'c_descri',
  c_porc: 'c_porc',
  c_label: 'c_label',
  n_coeficiente: 'n_coeficiente',
  d_seguir: 'd_seguir',
  d_borrado: 'd_borrado'
};

exports.Prisma.Sgt_tb_cta_bancoScalarFieldEnum = {
  id_cta_banco: 'id_cta_banco',
  c_nro_cta: 'c_nro_cta',
  c_cci: 'c_cci',
  c_moneda: 'c_moneda',
  c_cta_contable: 'c_cta_contable',
  c_label: 'c_label'
};

exports.Prisma.Sgt_tb_descuento_cuotaScalarFieldEnum = {
  id: 'id',
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  n_ciclo: 'n_ciclo',
  n_monto: 'n_monto',
  d_seguir: 'd_seguir'
};

exports.Prisma.Sgt_tb_egreso_autorizaScalarFieldEnum = {
  id_egreso: 'id_egreso',
  id_responsable: 'id_responsable',
  sit_egreso: 'sit_egreso',
  concepto_egreso: 'concepto_egreso',
  autorizado_egreso: 'autorizado_egreso',
  solicitante_egreso: 'solicitante_egreso',
  monto_egreso: 'monto_egreso',
  fecha_egreso: 'fecha_egreso',
  hora_egreso: 'hora_egreso',
  n_ccosto: 'n_ccosto',
  facultad_egreso: 'facultad_egreso',
  cod_user_autoriza: 'cod_user_autoriza',
  c_sedcod: 'c_sedcod',
  n_vuelto: 'n_vuelto',
  d_fecha_vuelto: 'd_fecha_vuelto',
  user_reing: 'user_reing',
  id_tipodoc: 'id_tipodoc',
  c_numdoc: 'c_numdoc',
  c_origen: 'c_origen',
  c_numope: 'c_numope',
  c_razon_social: 'c_razon_social',
  c_numdocu: 'c_numdocu'
};

exports.Prisma.Sgt_tb_escala_pagoScalarFieldEnum = {
  id_escala: 'id_escala',
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  n_cr: 'n_cr',
  n_monto_mes: 'n_monto_mes',
  c_escala_pension: 'c_escala_pension',
  d_seguir: 'd_seguir'
};

exports.Prisma.Sgt_tb_impuestoScalarFieldEnum = {
  id_impuesto: 'id_impuesto',
  c_impuesto_cod: 'c_impuesto_cod',
  c_impuesto_abrev: 'c_impuesto_abrev',
  c_impuesto_nombre: 'c_impuesto_nombre',
  c_factor_tipo: 'c_factor_tipo',
  n_factor: 'n_factor',
  c_estado: 'c_estado'
};

exports.Prisma.Sgt_tb_incremento_x_repScalarFieldEnum = {
  id: 'id',
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  n_ciclo: 'n_ciclo',
  n_porcen: 'n_porcen',
  d_seguir: 'd_seguir'
};

exports.Prisma.Sgt_tb_nota_creditoScalarFieldEnum = {
  id_nota_credito: 'id_nota_credito',
  c_serdoc_nota: 'c_serdoc_nota',
  c_numdoc_nota: 'c_numdoc_nota',
  d_fecha_nota: 'd_fecha_nota',
  d_fec_pago: 'd_fec_pago',
  id_nota_credito_tipo: 'id_nota_credito_tipo',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  c_motivo: 'c_motivo',
  id_tipdoc: 'id_tipdoc',
  n_monto: 'n_monto',
  id_user: 'id_user',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Sgt_tb_nota_credito_tipoScalarFieldEnum = {
  id_nota_credito_tipo: 'id_nota_credito_tipo',
  c_descripcion: 'c_descripcion'
};

exports.Prisma.Sgt_tb_origen_pagoScalarFieldEnum = {
  c_origen_cod: 'c_origen_cod',
  c_origen_label: 'c_origen_label',
  c_origen_desc: 'c_origen_desc',
  c_estado: 'c_estado',
  n_orden: 'n_orden'
};

exports.Prisma.Sgt_tb_pago_asigandoScalarFieldEnum = {
  id: 'id',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_ciclo: 'c_ciclo'
};

exports.Prisma.Sgt_tb_pago_asigando_detScalarFieldEnum = {
  id: 'id',
  pago_asignado_id: 'pago_asignado_id',
  id_tipo: 'id_tipo'
};

exports.Prisma.Sgt_tb_promocionScalarFieldEnum = {
  id_promo: 'id_promo',
  n_codper: 'n_codper',
  c_sedcod: 'c_sedcod',
  c_descripcion: 'c_descripcion',
  id_promovinculada: 'id_promovinculada',
  c_estado: 'c_estado',
  d_freg: 'd_freg',
  c_user: 'c_user'
};

exports.Prisma.Sgt_tb_promocion_aluScalarFieldEnum = {
  id: 'id',
  id_promo: 'id_promo',
  n_codper: 'n_codper',
  c_sedcod: 'c_sedcod',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_nomesp: 'c_nomesp',
  c_codalu: 'c_codalu',
  c_nomalu: 'c_nomalu',
  c_ciclo: 'c_ciclo',
  n_cuota: 'n_cuota',
  c_cuo_pagadas: 'c_cuo_pagadas',
  c_monto: 'c_monto',
  c_estado_prom: 'c_estado_prom',
  d_fecprom: 'd_fecprom',
  id_cuota: 'id_cuota'
};

exports.Prisma.Sgt_tb_promocion_progScalarFieldEnum = {
  id: 'id',
  id_promo: 'id_promo',
  n_codper: 'n_codper',
  c_codesp: 'c_codesp',
  c_sedcod: 'c_sedcod',
  c_ciclo: 'c_ciclo',
  n_cuota: 'n_cuota',
  m_cuota: 'm_cuota',
  d_fecprog: 'd_fecprog',
  c_estado_prog: 'c_estado_prog'
};

exports.Prisma.Sgt_tb_promocion_reglaScalarFieldEnum = {
  id_promo: 'id_promo',
  id_regla: 'id_regla',
  id_tipo: 'id_tipo',
  c_numcuota: 'c_numcuota',
  c_rango: 'c_rango',
  d_inicio: 'd_inicio',
  d_vencimiento: 'd_vencimiento',
  c_estado: 'c_estado',
  d_reg: 'd_reg'
};

exports.Prisma.Sgt_tb_prorrogaScalarFieldEnum = {
  id: 'id',
  id_cuota: 'id_cuota',
  id_tab_opc: 'id_tab_opc',
  d_fecha_prorroga: 'd_fecha_prorroga',
  c_observacion: 'c_observacion',
  c_user: 'c_user',
  d_reg: 'd_reg'
};

exports.Prisma.Sgt_tb_serie_doc_pagoScalarFieldEnum = {
  id_serie: 'id_serie',
  tipdoc: 'tipdoc',
  serie: 'serie',
  numero: 'numero',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.Sgt_tb_tarifaScalarFieldEnum = {
  id_tarifa: 'id_tarifa',
  id_tipo: 'id_tipo',
  c_descri: 'c_descri',
  c_label: 'c_label',
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_sedcod: 'c_sedcod',
  c_codmod: 'c_codmod',
  c_pering: 'c_pering',
  n_monto_referencial: 'n_monto_referencial',
  n_mora: 'n_mora',
  id_user: 'id_user',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Sgt_tb_tarifa_cuota_cicloScalarFieldEnum = {
  id: 'id',
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  n_ciclo: 'n_ciclo',
  n_monto: 'n_monto',
  d_seguir: 'd_seguir'
};

exports.Prisma.Sgt_tb_tarifa_matricula_credScalarFieldEnum = {
  id: 'id',
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  n_ciclo: 'n_ciclo',
  n_monto: 'n_monto',
  d_seguir: 'd_seguir'
};

exports.Prisma.Sgt_tb_tipo_doc_pagoScalarFieldEnum = {
  id_tipdoc: 'id_tipdoc',
  c_descrip: 'c_descrip',
  n_numdoc: 'n_numdoc'
};

exports.Prisma.Sgt_tb_tipo_monedaScalarFieldEnum = {
  id_tipo_moneda: 'id_tipo_moneda',
  c_descri: 'c_descri',
  c_label: 'c_label',
  n_cambio: 'n_cambio'
};

exports.Prisma.Sgt_tb_tipo_pagoScalarFieldEnum = {
  id_tipo: 'id_tipo',
  c_descri: 'c_descri',
  c_label: 'c_label',
  n_monto_referencial: 'n_monto_referencial',
  n_mora: 'n_mora',
  c_cta_contable: 'c_cta_contable',
  c_debe1: 'c_debe1',
  c_debe2: 'c_debe2',
  c_haber1: 'c_haber1',
  d_seguir: 'd_seguir',
  d_borrado: 'd_borrado',
  n_max: 'n_max',
  c_categoria: 'c_categoria',
  c_pago_alu: 'c_pago_alu'
};

exports.Prisma.Sgt_tb_venc_pronto_pagoScalarFieldEnum = {
  id: 'id',
  n_codper: 'n_codper',
  c_grupo: 'c_grupo',
  d_vence: 'd_vence',
  d_seguir: 'd_seguir'
};

exports.Prisma.Sgt_tb_vencimientoScalarFieldEnum = {
  id_vence: 'id_vence',
  n_codper: 'n_codper',
  c_grupo: 'c_grupo',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  d_vence: 'd_vence',
  c_cuota: 'c_cuota',
  d_seguir: 'd_seguir',
  n_mora: 'n_mora'
};

exports.Prisma.Stg_espacioScalarFieldEnum = {
  id: 'id',
  cod_tipo_espacio: 'cod_tipo_espacio',
  peso_limite: 'peso_limite',
  peso_actual: 'peso_actual',
  prioridad: 'prioridad'
};

exports.Prisma.T_sedesScalarFieldEnum = {
  sedcod: 'sedcod',
  sednom: 'sednom',
  seddir: 'seddir',
  c_activo: 'c_activo',
  c_activo_web: 'c_activo_web',
  d_borrado: 'd_borrado',
  c_abrevsed: 'c_abrevsed'
};

exports.Prisma.Tb_admin_facultadScalarFieldEnum = {
  c_codadm: 'c_codadm',
  c_codfac: 'c_codfac'
};

exports.Prisma.Tb_admin_modalidadScalarFieldEnum = {
  c_codadm: 'c_codadm',
  c_codmod: 'c_codmod'
};

exports.Prisma.Tb_admin_usuarioScalarFieldEnum = {
  cod_admin: 'cod_admin',
  tipo_usuario_admin: 'tipo_usuario_admin',
  clave: 'clave',
  fecha_registro: 'fecha_registro',
  fecha_ultimo_acceso: 'fecha_ultimo_acceso',
  prefijo: 'prefijo',
  nombre: 'nombre',
  apellidos: 'apellidos',
  emails: 'emails',
  telefonos: 'telefonos',
  sexo: 'sexo',
  estado: 'estado',
  id_area: 'id_area',
  flag_t_area: 'flag_t_area',
  c_auth_egreso: 'c_auth_egreso',
  c_sedcod: 'c_sedcod',
  f_cambia_clave: 'f_cambia_clave',
  c_clave2: 'c_clave2'
};

exports.Prisma.Tb_alu_cur_grpScalarFieldEnum = {
  c_codalu: 'c_codalu',
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_estado: 'c_estado',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  d_date: 'd_date',
  semestre: 'semestre',
  c_sedcod: 'c_sedcod',
  c_codper: 'c_codper',
  observacion: 'observacion',
  c_codfacalu: 'c_codfacalu',
  c_codespalu: 'c_codespalu',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu'
};

exports.Prisma.Tb_alu_deportistaScalarFieldEnum = {
  id_alu_deportista: 'id_alu_deportista',
  d_registro: 'd_registro',
  c_codalu: 'c_codalu',
  descripcion: 'descripcion',
  c_estado: 'c_estado',
  c_borrado: 'c_borrado',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Tb_alu_evaScalarFieldEnum = {
  c_codalu: 'c_codalu',
  id_evaluacion: 'id_evaluacion',
  id_nota: 'id_nota',
  c_nota: 'c_nota',
  n_nota: 'n_nota',
  n_reclamo: 'n_reclamo',
  d_reg: 'd_reg',
  mdl_base: 'mdl_base',
  mdl_pro: 'mdl_pro',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.Tb_alu_eva_recScalarFieldEnum = {
  id_rectificacion: 'id_rectificacion',
  id_evaluacion: 'id_evaluacion',
  c_codalu: 'c_codalu',
  d_reg: 'd_reg',
  c_estado: 'c_estado',
  c_codadm: 'c_codadm',
  c_resol: 'c_resol',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype',
  d_size: 'd_size',
  c_motivo: 'c_motivo',
  c_resultado: 'c_resultado',
  c_motivo_rechazo: 'c_motivo_rechazo'
};

exports.Prisma.Tb_alu_eva_rec_docScalarFieldEnum = {
  id_rectificacion: 'id_rectificacion',
  id_evaluacion: 'id_evaluacion',
  c_codalu: 'c_codalu',
  c_dnidoc: 'c_dnidoc',
  n_nota: 'n_nota',
  d_reg: 'd_reg',
  c_codadm: 'c_codadm',
  d_update: 'd_update',
  d_dias_limite: 'd_dias_limite',
  c_estado: 'c_estado'
};

exports.Prisma.Tb_alu_eva_updScalarFieldEnum = {
  id_evaluacion: 'id_evaluacion',
  c_codalu: 'c_codalu',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  paterno: 'paterno',
  materno: 'materno',
  nombres: 'nombres',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_nomcur: 'c_nomcur',
  c_grpcur: 'c_grpcur',
  c_ciclo: 'c_ciclo',
  n_codpla: 'n_codpla',
  n_original: 'n_original',
  n_nota: 'n_nota'
};

exports.Prisma.Tb_alu_historialScalarFieldEnum = {
  id_alu_historial: 'id_alu_historial',
  d_registro: 'd_registro',
  c_grado: 'c_grado',
  c_codalu: 'c_codalu',
  accion_descripcion: 'accion_descripcion',
  observacion: 'observacion',
  c_borrado: 'c_borrado',
  c_tipo_accion: 'c_tipo_accion',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Tb_alu_psicofisicoScalarFieldEnum = {
  id_alu_psicofisico: 'id_alu_psicofisico',
  d_registro: 'd_registro',
  c_codalu: 'c_codalu',
  c_estado: 'c_estado',
  c_borrado: 'c_borrado',
  c_tipo_origen: 'c_tipo_origen',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Tb_alu_reincoporacionScalarFieldEnum = {
  id_alu_reincoporacion: 'id_alu_reincoporacion',
  d_registro: 'd_registro',
  c_codalu: 'c_codalu',
  c_estado: 'c_estado',
  c_borrado: 'c_borrado',
  c_tipo_reincoporacion: 'c_tipo_reincoporacion',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Tb_alu_rigorScalarFieldEnum = {
  id_alu_rigor: 'id_alu_rigor',
  d_registro: 'd_registro',
  c_codalu: 'c_codalu',
  descripcion: 'descripcion',
  c_borrado: 'c_borrado',
  c_tipo_rigor: 'c_tipo_rigor',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Tb_alum_pagoScalarFieldEnum = {
  id_pago: 'id_pago',
  c_codalu: 'c_codalu',
  n_monto: 'n_monto',
  d_fecha: 'd_fecha',
  c_tipo: 'c_tipo',
  c_numdoc: 'c_numdoc',
  c_detalle: 'c_detalle',
  n_yyyy: 'n_yyyy',
  n_codper: 'n_codper',
  c_codadm: 'c_codadm',
  n_tesor: 'n_tesor',
  n_exon: 'n_exon'
};

exports.Prisma.Tb_alumno_cambio_especScalarFieldEnum = {
  id_cambio: 'id_cambio',
  c_codalu: 'c_codalu',
  c_datos_antes: 'c_datos_antes',
  c_datos_ahora: 'c_datos_ahora',
  c_admin: 'c_admin',
  c_resol: 'c_resol',
  d_fecha: 'd_fecha',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.Tb_alumno_cambio_modalScalarFieldEnum = {
  id_cambio: 'id_cambio',
  c_codalu: 'c_codalu',
  c_datos_antes: 'c_datos_antes',
  c_datos_ahora: 'c_datos_ahora',
  c_admin: 'c_admin',
  d_fecha: 'd_fecha',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.Tb_alumno_cambio_sedeScalarFieldEnum = {
  id_cambio: 'id_cambio',
  c_codalu: 'c_codalu',
  c_datos_antes: 'c_datos_antes',
  c_datos_ahora: 'c_datos_ahora',
  c_admin: 'c_admin',
  c_resol: 'c_resol',
  d_fecha: 'd_fecha',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.Tb_alumno_cambio_situScalarFieldEnum = {
  id_cambio: 'id_cambio',
  c_codalu: 'c_codalu',
  c_datos_antes: 'c_datos_antes',
  c_datos_ahora: 'c_datos_ahora',
  c_admin: 'c_admin',
  c_resol: 'c_resol',
  d_fecha: 'd_fecha',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.Tb_alumno_consolidadoScalarFieldEnum = {
  c_numcer: 'c_numcer',
  c_codalu: 'c_codalu',
  c_user: 'c_user',
  c_tipcer: 'c_tipcer',
  d_fecha: 'd_fecha',
  n_prom: 'n_prom',
  c_ruta: 'c_ruta',
  c_alecer: 'c_alecer',
  n_crfg: 'n_crfg',
  n_crfp: 'n_crfp',
  n_crpp: 'n_crpp',
  n_crap: 'n_crap',
  n_cras: 'n_cras',
  n_crel: 'n_crel',
  n_crac: 'n_crac',
  c_codfac: 'c_codfac',
  c_newcer: 'c_newcer',
  c_carpet: 'c_carpet',
  id_consolidado: 'id_consolidado',
  n_yyyy: 'n_yyyy',
  n_orden: 'n_orden',
  d_seguir: 'd_seguir'
};

exports.Prisma.Tb_alumno_constanciaScalarFieldEnum = {
  c_numcer: 'c_numcer',
  c_codalu: 'c_codalu',
  c_user: 'c_user',
  c_tipcer: 'c_tipcer',
  d_fecha: 'd_fecha',
  c_codfac: 'c_codfac',
  n_yyyy: 'n_yyyy',
  n_orden: 'n_orden',
  d_seguir: 'd_seguir'
};

exports.Prisma.Tb_alumno_diplomaScalarFieldEnum = {
  id: 'id',
  c_tipreg: 'c_tipreg',
  c_tipdip: 'c_tipdip',
  c_codalu: 'c_codalu',
  id_diploma: 'id_diploma',
  n_numero: 'n_numero',
  c_coddip: 'c_coddip',
  d_fecreg: 'd_fecreg',
  c_usureg: 'c_usureg',
  diploma: 'diploma',
  name_file: 'name_file',
  size_file: 'size_file'
};

exports.Prisma.Tb_alumno_encuesta_procesoScalarFieldEnum = {
  id_alumno_encuesta_proceso: 'id_alumno_encuesta_proceso',
  id_encuesta: 'id_encuesta',
  c_codfac: 'c_codfac',
  n_codper: 'n_codper',
  c_matri: 'c_matri',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_sitalu: 'c_sitalu',
  d_disponible_inicio: 'd_disponible_inicio',
  d_disponible_fin: 'd_disponible_fin',
  n_estado: 'n_estado',
  n_grado: 'n_grado'
};

exports.Prisma.Tb_alumno_encuesta_registroopcScalarFieldEnum = {
  id_respuesta_opcion: 'id_respuesta_opcion',
  id_encuesta_proceso: 'id_encuesta_proceso',
  id_pregunta: 'id_pregunta',
  id_opcion: 'id_opcion',
  codigo_alumno: 'codigo_alumno',
  d_registro: 'd_registro',
  comentario: 'comentario'
};

exports.Prisma.Tb_alumno_encuesta_respuestaScalarFieldEnum = {
  id_alumno_encuesta: 'id_alumno_encuesta',
  codigo_alumno: 'codigo_alumno',
  d_inicio_encuesta: 'd_inicio_encuesta',
  d_fin_encuesta: 'd_fin_encuesta',
  c_estado: 'c_estado',
  id_alumno_encuesta_proceso: 'id_alumno_encuesta_proceso'
};

exports.Prisma.Tb_alumno_expeditoScalarFieldEnum = {
  id_expedito: 'id_expedito',
  n_yyyy: 'n_yyyy',
  c_codalu: 'c_codalu',
  d_fecha: 'd_fecha',
  c_codadm: 'c_codadm'
};

exports.Prisma.Tb_alumno_iaScalarFieldEnum = {
  id_ia: 'id_ia',
  c_codalu: 'c_codalu',
  promo: 'promo',
  n_numcred: 'n_numcred',
  n_ppond: 'n_ppond',
  c_codmod: 'c_codmod',
  d_fecha: 'd_fecha',
  n_count: 'n_count',
  c_user: 'c_user',
  c_logmaq: 'c_logmaq',
  c_numia: 'c_numia',
  n_yyyy: 'n_yyyy',
  n_orden: 'n_orden',
  c_codinf: 'c_codinf'
};

exports.Prisma.Tb_alumno_ia_txtScalarFieldEnum = {
  id: 'id',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_txt: 'c_txt',
  c_codmod: 'c_codmod'
};

exports.Prisma.Tb_alumno_licencia_matScalarFieldEnum = {
  id: 'id',
  n_codper: 'n_codper',
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  n_cant_periodos: 'n_cant_periodos',
  n_motivo: 'n_motivo',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype',
  d_size: 'd_size',
  c_user: 'c_user',
  d_fec_reg: 'd_fec_reg',
  c_resol_reing: 'c_resol_reing',
  c_admin_reing: 'c_admin_reing',
  n_codper_reing: 'n_codper_reing',
  d_fec_reing: 'd_fec_reing'
};

exports.Prisma.Tb_alumno_reingScalarFieldEnum = {
  id_reing: 'id_reing',
  c_codalu: 'c_codalu',
  c_datos_antes: 'c_datos_antes',
  c_datos_ahora: 'c_datos_ahora',
  c_admin: 'c_admin',
  c_resol: 'c_resol',
  d_fecha: 'd_fecha',
  n_codper: 'n_codper',
  n_codpln: 'n_codpln'
};

exports.Prisma.Tb_alumno_resScalarFieldEnum = {
  id_res: 'id_res',
  c_codalu: 'c_codalu',
  d_fecha: 'd_fecha',
  c_user: 'c_user',
  n_yyyy: 'n_yyyy',
  n_orden: 'n_orden',
  c_numres: 'c_numres',
  c_data: 'c_data',
  b_estado: 'b_estado'
};

exports.Prisma.Tb_alumno_reserva_matScalarFieldEnum = {
  c_codalu: 'c_codalu',
  c_resol: 'c_resol',
  c_admin: 'c_admin',
  n_codper: 'n_codper',
  d_fecha: 'd_fecha',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  id: 'id',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype',
  d_size: 'd_size',
  c_resol_reing: 'c_resol_reing',
  c_admin_reing: 'c_admin_reing',
  n_codper_reing: 'n_codper_reing',
  d_fec_reing: 'd_fec_reing'
};

exports.Prisma.Tb_alumno_token_claveScalarFieldEnum = {
  id_token: 'id_token',
  c_token: 'c_token',
  d_fecha_creado: 'd_fecha_creado',
  d_fecha_exp: 'd_fecha_exp',
  c_codigoalum: 'c_codigoalum',
  d_fecha_usado: 'd_fecha_usado'
};

exports.Prisma.Tb_area_adminScalarFieldEnum = {
  id_area: 'id_area',
  c_nom_area: 'c_nom_area',
  c_abrev: 'c_abrev',
  c_tipo: 'c_tipo',
  d_borrado: 'd_borrado',
  tra_alu: 'tra_alu'
};

exports.Prisma.Tb_asis_alumScalarFieldEnum = {
  id_asistencia: 'id_asistencia',
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_dnidoc: 'c_dnidoc',
  d_fecha: 'd_fecha',
  d_fecha_registro: 'd_fecha_registro',
  c_estado: 'c_estado',
  c_tema: 'c_tema',
  n_codpla: 'n_codpla',
  c_sedcod: 'c_sedcod',
  tipo: 'tipo',
  auto: 'auto',
  mins: 'mins',
  c_user_upd: 'c_user_upd',
  d_fecha_upd: 'd_fecha_upd'
};

exports.Prisma.Tb_asis_alum_detScalarFieldEnum = {
  id_asistencia: 'id_asistencia',
  c_codalu: 'c_codalu',
  c_estado: 'c_estado',
  seguir: 'seguir'
};

exports.Prisma.Tb_asis_alum_justifScalarFieldEnum = {
  id_justificacion: 'id_justificacion',
  c_codalu: 'c_codalu',
  id_asistencia: 'id_asistencia',
  c_estado_old: 'c_estado_old',
  c_argumento: 'c_argumento',
  c_file: 'c_file',
  d_seguir: 'd_seguir',
  usuario: 'usuario'
};

exports.Prisma.Tb_avancealuScalarFieldEnum = {
  codalu: 'codalu',
  codfac: 'codfac',
  codesp: 'codesp',
  codcur: 'codcur',
  nomcur: 'nomcur',
  numcre: 'numcre',
  codper: 'codper',
  numnota: 'numnota',
  ciclo: 'ciclo',
  prereq: 'prereq',
  resolucion: 'resolucion',
  promocion: 'promocion',
  regimen: 'regimen',
  numveces: 'numveces',
  tipcur: 'tipcur',
  area: 'area',
  estado: 'estado',
  codpln: 'codpln',
  prompond: 'prompond',
  prompondcaprob: 'prompondcaprob',
  credaprob: 'credaprob',
  credextrac: 'credextrac',
  codmod: 'codmod'
};

exports.Prisma.Tb_cal_acadScalarFieldEnum = {
  id: 'id',
  n_codper: 'n_codper',
  d_fec_ini: 'd_fec_ini',
  d_fec_fin: 'd_fec_fin',
  c_descripcion: 'c_descripcion',
  c_resaltar: 'c_resaltar'
};

exports.Prisma.Tb_cambio_modalidad_matriculaScalarFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmod: 'c_codmod',
  paren: 'paren',
  nombap: 'nombap',
  b_acepto: 'b_acepto',
  d_fecreg: 'd_fecreg'
};

exports.Prisma.Tb_carga_no_lectivaScalarFieldEnum = {
  id: 'id',
  id_tipo_carga: 'id_tipo_carga',
  c_dnidoc: 'c_dnidoc',
  hora_inicio: 'hora_inicio',
  hora_fin: 'hora_fin',
  c_ubicacion: 'c_ubicacion',
  n_numdia: 'n_numdia',
  fecha_registro: 'fecha_registro',
  usuario_registro: 'usuario_registro',
  estado: 'estado',
  n_codper: 'n_codper',
  confirmado: 'confirmado',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Tb_cargitaScalarFieldEnum = {
  contador: 'contador',
  date_: 'date_',
  contacer: 'contacer',
  direocr: 'direocr',
  containf: 'containf',
  cjefeusa: 'cjefeusa',
  cnomunid: 'cnomunid'
};

exports.Prisma.Tb_cargoScalarFieldEnum = {
  id_cargo: 'id_cargo',
  nombre_cargo: 'nombre_cargo',
  descripcion_cargo: 'descripcion_cargo',
  c_estado: 'c_estado'
};

exports.Prisma.Tb_carnet_aluScalarFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  id_tramite: 'id_tramite',
  c_estado: 'c_estado',
  d_seguir: 'd_seguir',
  c_user: 'c_user',
  n_codper: 'n_codper',
  d_reg: 'd_reg',
  d_act: 'd_act',
  c_duplicado: 'c_duplicado'
};

exports.Prisma.Tb_carnet_tramiteScalarFieldEnum = {
  id_tramite: 'id_tramite',
  fecha_registro: 'fecha_registro',
  c_usuario: 'c_usuario',
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_sede: 'c_sede',
  c_foto: 'c_foto'
};

exports.Prisma.Tb_chat_soporte_mensajeScalarFieldEnum = {
  id_mensaje: 'id_mensaje',
  cod_alumno: 'cod_alumno',
  cod_admin: 'cod_admin',
  tipo_remitente: 'tipo_remitente',
  tipo_receptor: 'tipo_receptor',
  mensaje: 'mensaje',
  fh_enviado: 'fh_enviado',
  fh_leido: 'fh_leido',
  sala: 'sala',
  c_activo: 'c_activo'
};

exports.Prisma.Tb_citaScalarFieldEnum = {
  id_cita: 'id_cita',
  c_codalu: 'c_codalu',
  id_tramite: 'id_tramite',
  hora_inicio: 'hora_inicio',
  hora_fin: 'hora_fin',
  n_numdia: 'n_numdia',
  registro: 'registro',
  entrega: 'entrega',
  estado: 'estado'
};

exports.Prisma.Tb_clase_sesionScalarFieldEnum = {
  id_sesion: 'id_sesion',
  cod_periodo: 'cod_periodo',
  cod_curso: 'cod_curso',
  llave_curso: 'llave_curso',
  cod_docente: 'cod_docente',
  n_dia: 'n_dia',
  hh_ini: 'hh_ini',
  mi_ini: 'mi_ini',
  hh_fin: 'hh_fin',
  mi_fin: 'mi_fin',
  tipo_clase: 'tipo_clase',
  tipo_dictado: 'tipo_dictado',
  estado: 'estado'
};

exports.Prisma.Tb_configuracionScalarFieldEnum = {
  c_sigu: 'c_sigu',
  c_intranet: 'c_intranet',
  c_modulo: 'c_modulo',
  c_descrip: 'c_descrip',
  c_estado: 'c_estado'
};

exports.Prisma.Tb_cur_grp_certScalarFieldEnum = {
  c_sedcod: 'c_sedcod',
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codalu: 'c_codalu',
  c_numcer: 'c_numcer',
  d_reg: 'd_reg'
};

exports.Prisma.Tb_cur_grp_evaScalarFieldEnum = {
  id_evaluacion: 'id_evaluacion',
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_tipo: 'c_tipo',
  c_concepto: 'c_concepto',
  c_nombre: 'c_nombre',
  n_suborden: 'n_suborden',
  n_orden: 'n_orden',
  n_peso_porc: 'n_peso_porc',
  n_obligatorio: 'n_obligatorio',
  d_prog: 'd_prog',
  c_estado: 'c_estado',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  d_fecreg: 'd_fecreg',
  c_acta: 'c_acta',
  c_sedcod: 'c_sedcod',
  id_cur_grp_unidad: 'id_cur_grp_unidad',
  id_unidad_estudio_plan: 'id_unidad_estudio_plan',
  id_unidad_estudio: 'id_unidad_estudio',
  id_unidad_estudio_evaluacion: 'id_unidad_estudio_evaluacion',
  n_sync_plan: 'n_sync_plan',
  c_flag: 'c_flag'
};

exports.Prisma.Tb_cur_grp_eva_estadoScalarFieldEnum = {
  id_evaluacion_estado: 'id_evaluacion_estado',
  id_evaluacion: 'id_evaluacion',
  c_estado: 'c_estado',
  c_codadm: 'c_codadm',
  d_fh_cambio: 'd_fh_cambio',
  c_motivo: 'c_motivo'
};

exports.Prisma.Tb_cur_grp_horScalarFieldEnum = {
  id_horario: 'id_horario',
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_dnidoc: 'c_dnidoc',
  n_numdia: 'n_numdia',
  c_hh_ini: 'c_hh_ini',
  c_mi_ini: 'c_mi_ini',
  c_hh_fin: 'c_hh_fin',
  c_mi_fin: 'c_mi_fin',
  n_break: 'n_break',
  c_codadm: 'c_codadm',
  d_freg: 'd_freg',
  c_codmod: 'c_codmod',
  c_tipo: 'c_tipo',
  id_aula: 'id_aula',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.Tb_cur_grp_pro_aluScalarFieldEnum = {
  c_codpro: 'c_codpro',
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codesp: 'c_codesp',
  c_codalu: 'c_codalu',
  n_promedio: 'n_promedio',
  id_nota: 'id_nota',
  c_promedio: 'c_promedio',
  d_reg: 'd_reg',
  n_codpla: 'n_codpla',
  id_cur_grp_unidad: 'id_cur_grp_unidad',
  mdl_pro: 'mdl_pro',
  mdl_base: 'mdl_base',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu'
};

exports.Prisma.Tb_cur_grp_pro_alu_comScalarFieldEnum = {
  c_codpro: 'c_codpro',
  n_codper: 'n_codper',
  n_codpla: 'n_codpla',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codalu: 'c_codalu',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  c_comentario: 'c_comentario',
  id_cur_grp_unidad: 'id_cur_grp_unidad',
  d_reg: 'd_reg',
  doc_reg: 'doc_reg',
  d_act: 'd_act',
  doc_act: 'doc_act'
};

exports.Prisma.Tb_cur_grp_undScalarFieldEnum = {
  id_cur_grp_unidad: 'id_cur_grp_unidad',
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  c_sedcod: 'c_sedcod',
  id_unidad_estudio_plan: 'id_unidad_estudio_plan',
  id_unidad_estudio: 'id_unidad_estudio',
  n_orden: 'n_orden',
  n_sync_plan: 'n_sync_plan',
  c_tipo_prom: 'c_tipo_prom',
  c_formula_prom: 'c_formula_prom'
};

exports.Prisma.Tb_cur_grp_und_eva_unidad_evaluacionScalarFieldEnum = {
  id_evaluacion: 'id_evaluacion',
  id_unidad_estudio_evaluacion: 'id_unidad_estudio_evaluacion',
  id_unidad_estudio: 'id_unidad_estudio',
  id_unidad_estudio_plan: 'id_unidad_estudio_plan'
};

exports.Prisma.Tb_cur_grp_und_unidadScalarFieldEnum = {
  id_cur_grp_unidad: 'id_cur_grp_unidad',
  id_unidad_estudio: 'id_unidad_estudio',
  id_unidad_estudio_plan: 'id_unidad_estudio_plan'
};

exports.Prisma.Tb_cur_grp_vacScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  n_vactot: 'n_vactot',
  n_vacmax: 'n_vacmax',
  n_vacmat: 'n_vacmat',
  c_codadm: 'c_codadm',
  d_freg: 'd_freg',
  d_fact: 'd_fact',
  c_codmod: 'c_codmod',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.Tb_curso_grupoScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codmod: 'c_codmod',
  d_freg: 'd_freg',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  n_cicalu: 'n_cicalu',
  c_sedcod: 'c_sedcod',
  id_unidad_estudio_plan: 'id_unidad_estudio_plan',
  n_sync_plan: 'n_sync_plan',
  c_iat_cofbk_tipo: 'c_iat_cofbk_tipo',
  c_iat_cofbk_siged: 'c_iat_cofbk_siged',
  c_iat_cofbk_fec: 'c_iat_cofbk_fec',
  d_fecha_inicio: 'd_fecha_inicio',
  d_fecha_fin: 'd_fecha_fin',
  c_tipcuriat: 'c_tipcuriat',
  c_tipeval: 'c_tipeval',
  c_tipcapiat: 'c_tipcapiat',
  n_costo_curso: 'n_costo_curso',
  c_tipcontra: 'c_tipcontra',
  c_sedcurso: 'c_sedcurso',
  c_entcerti: 'c_entcerti',
  n_totalhor: 'n_totalhor',
  n_pdp: 'n_pdp',
  n_tipprog: 'n_tipprog',
  n_minxhor: 'n_minxhor',
  c_iat_directiva: 'c_iat_directiva',
  c_estado: 'c_estado',
  c_certificado_alu: 'c_certificado_alu',
  c_certificado_doc: 'c_certificado_doc',
  lock: 'lock',
  moodle: 'moodle',
  n_encuesta: 'n_encuesta'
};

exports.Prisma.Tb_curso_grupo_informe_aludocScalarFieldEnum = {
  id_informe: 'id_informe',
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codmod: 'c_codmod',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  c_nombre: 'c_nombre',
  c_extension: 'c_extension',
  datetime: 'datetime'
};

exports.Prisma.Tb_curso_grupo_silaboScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_nombre: 'c_nombre',
  c_ruta: 'c_ruta',
  c_codesp: 'c_codesp'
};

exports.Prisma.Tb_curso_grupo_unidad_planScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  n_codpla: 'n_codpla',
  c_sedcod: 'c_sedcod',
  id_unidad_estudio_plan: 'id_unidad_estudio_plan'
};

exports.Prisma.Tb_curso_seccionScalarFieldEnum = {
  cod_periodo: 'cod_periodo',
  cod_facultad: 'cod_facultad',
  cod_curso: 'cod_curso',
  llave_curso: 'llave_curso'
};

exports.Prisma.Tb_dashboard_configuracionScalarFieldEnum = {
  c_id: 'c_id',
  c_filtro: 'c_filtro',
  c_descripcion: 'c_descripcion',
  c_condicion: 'c_condicion',
  c_valor: 'c_valor'
};

exports.Prisma.Tb_den_gradScalarFieldEnum = {
  id: 'id',
  c_grado: 'c_grado',
  c_codesp: 'c_codesp',
  c_abre_gyt: 'c_abre_gyt',
  c_sexo: 'c_sexo'
};

exports.Prisma.Tb_doc_cur_grpScalarFieldEnum = {
  c_dnidoc: 'c_dnidoc',
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_tipo: 'c_tipo',
  c_categoria: 'c_categoria',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  c_sedcod: 'c_sedcod',
  c_tema: 'c_tema',
  n_monto_doc: 'n_monto_doc',
  horas: 'horas'
};

exports.Prisma.Tb_doc_enc_respuesta_opcionScalarFieldEnum = {
  id_respuesta_opcion: 'id_respuesta_opcion',
  id_docente_encuesta: 'id_docente_encuesta',
  id_encuesta: 'id_encuesta',
  id_pregunta: 'id_pregunta',
  id_opcion: 'id_opcion',
  codigo_alumno: 'codigo_alumno',
  d_registro: 'd_registro',
  comentario: 'comentario'
};

exports.Prisma.Tb_doc_evaScalarFieldEnum = {
  c_dnidoc: 'c_dnidoc',
  id_evaluacion: 'id_evaluacion',
  d_reg: 'd_reg',
  d_ing: 'd_ing',
  c_estado: 'c_estado'
};

exports.Prisma.Tb_docente_encuestaScalarFieldEnum = {
  id_docente_encuesta: 'id_docente_encuesta',
  c_coddoc: 'c_coddoc',
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codmod: 'c_codmod',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  c_sedcod: 'c_sedcod',
  id_encuesta: 'id_encuesta',
  id_docente_encuesta_proceso: 'id_docente_encuesta_proceso',
  n_promedio: 'n_promedio'
};

exports.Prisma.Tb_docente_encuesta_procesoScalarFieldEnum = {
  id_docente_encuesta_proceso: 'id_docente_encuesta_proceso',
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codmod: 'c_codmod',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  c_sedcod: 'c_sedcod',
  d_disponible_inicio: 'd_disponible_inicio',
  d_disponible_fin: 'd_disponible_fin',
  n_estado: 'n_estado',
  n_visualizacion: 'n_visualizacion'
};

exports.Prisma.Tb_docente_encuesta_respuestaScalarFieldEnum = {
  id_docente_encuesta: 'id_docente_encuesta',
  codigo_alumno: 'codigo_alumno',
  d_inicio_encuesta: 'd_inicio_encuesta',
  d_fin_encuesta: 'd_fin_encuesta',
  c_estado: 'c_estado'
};

exports.Prisma.Tb_docente_fileScalarFieldEnum = {
  id: 'id',
  n_codper: 'n_codper',
  c_dnidoc: 'c_dnidoc',
  f_fecing: 'f_fecing',
  f_fecsal: 'f_fecsal',
  c_conddoc: 'c_conddoc',
  c_regimdoc: 'c_regimdoc',
  c_leyuniv: 'c_leyuniv',
  n_clases: 'n_clases',
  c_dictpreg: 'c_dictpreg',
  c_dictmaest: 'c_dictmaest',
  c_dictdoct: 'c_dictdoct',
  n_hrs_invest: 'n_hrs_invest',
  n_hrs_tutor: 'n_hrs_tutor',
  n_hrs_admin: 'n_hrs_admin',
  n_hrs_super: 'n_hrs_super',
  c_investdoc: 'c_investdoc',
  c_dinadoc: 'c_dinadoc'
};

exports.Prisma.Tb_docente_silaboScalarFieldEnum = {
  c_dni: 'c_dni',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  n_codpla: 'n_codpla',
  f_silabo: 'f_silabo',
  d_update: 'd_update',
  d_delete: 'd_delete',
  n_codper: 'n_codper',
  c_grpcur: 'c_grpcur'
};

exports.Prisma.Tb_docentesScalarFieldEnum = {
  c_dni: 'c_dni',
  codigo: 'codigo',
  nombres: 'nombres',
  codremu: 'codremu',
  departa: 'departa',
  cargo: 'cargo',
  condicion: 'condicion',
  categoria: 'categoria',
  cateremu: 'cateremu',
  username: 'username',
  fecha: 'fecha',
  c95: 'c95',
  tiptra: 'tiptra',
  ctrol: 'ctrol',
  periodo: 'periodo'
};

exports.Prisma.Tb_docuneScalarFieldEnum = {
  codigo: 'codigo',
  c_prefijo: 'c_prefijo',
  nombres: 'nombres',
  codremu: 'codremu',
  departa: 'departa',
  cargo: 'cargo',
  condicion: 'condicion',
  categoria: 'categoria',
  cateremu: 'cateremu',
  username: 'username',
  fechaing: 'fechaing',
  periodo: 'periodo',
  c_dni: 'c_dni',
  c_apepat: 'c_apepat',
  c_apemat: 'c_apemat',
  c_nombres: 'c_nombres',
  n_estado: 'n_estado',
  foto_doc: 'foto_doc',
  n_hrs_admin: 'n_hrs_admin',
  n_hrs_invest: 'n_hrs_invest',
  fechanac: 'fechanac',
  n_tiempo_dictado: 'n_tiempo_dictado',
  f_pago_por_hora: 'f_pago_por_hora',
  fecha_ingreso: 'fecha_ingreso',
  fecha_salida: 'fecha_salida',
  fecha: 'fecha',
  c_tipo: 'c_tipo',
  c_entidad: 'c_entidad',
  c_intendencia: 'c_intendencia'
};

exports.Prisma.Tb_empresaScalarFieldEnum = {
  id_empresa: 'id_empresa',
  c_ruc: 'c_ruc',
  c_razon_social: 'c_razon_social',
  fono1: 'fono1',
  fono2: 'fono2',
  c_email: 'c_email',
  c_descripcion: 'c_descripcion',
  c_codpais: 'c_codpais',
  c_dpto: 'c_dpto',
  c_contactos: 'c_contactos',
  c_page_web: 'c_page_web',
  c_url_img: 'c_url_img'
};

exports.Prisma.Tb_empresa_contactoScalarFieldEnum = {
  id_contacto: 'id_contacto',
  id_empresa: 'id_empresa',
  nombres_contacto: 'nombres_contacto',
  c_dni: 'c_dni',
  c_email: 'c_email',
  c_telefono: 'c_telefono',
  rol_empresa: 'rol_empresa',
  c_estado: 'c_estado'
};

exports.Prisma.Tb_encu_pregScalarFieldEnum = {
  n_idprg: 'n_idprg',
  n_orden: 'n_orden',
  c_dprg: 'c_dprg',
  c_activo: 'c_activo',
  c_bloque: 'c_bloque'
};

exports.Prisma.Tb_encu_respScalarFieldEnum = {
  n_idprg: 'n_idprg',
  c_rpta: 'c_rpta',
  n_ptje: 'n_ptje',
  c_drpta: 'c_drpta'
};

exports.Prisma.Tb_encuestaScalarFieldEnum = {
  id_encuesta: 'id_encuesta',
  c_nombre_encuesta: 'c_nombre_encuesta',
  c_tipo_encuesta: 'c_tipo_encuesta',
  d_borrado: 'd_borrado'
};

exports.Prisma.Tb_encuesta_bloqueScalarFieldEnum = {
  id_bloque: 'id_bloque',
  id_encuesta: 'id_encuesta',
  n_orden_bloque: 'n_orden_bloque',
  c_nombre_bloque: 'c_nombre_bloque',
  d_borrado_bloque: 'd_borrado_bloque'
};

exports.Prisma.Tb_encuesta_preguntaScalarFieldEnum = {
  id_pregunta: 'id_pregunta',
  id_encuesta: 'id_encuesta',
  id_bloque: 'id_bloque',
  c_tipo_pregunta: 'c_tipo_pregunta',
  n_orden_pregunta: 'n_orden_pregunta',
  c_titulo_pregunta: 'c_titulo_pregunta',
  c_detalle_pregunta: 'c_detalle_pregunta',
  c_mensaje_ayuda: 'c_mensaje_ayuda',
  c_mensaje_exito: 'c_mensaje_exito',
  c_mensaje_fallo: 'c_mensaje_fallo',
  d_borrado_pregunta: 'd_borrado_pregunta'
};

exports.Prisma.Tb_encuesta_pregunta_opcionScalarFieldEnum = {
  id_opcion: 'id_opcion',
  id_pregunta: 'id_pregunta',
  id_encuesta: 'id_encuesta',
  n_orden_opcion: 'n_orden_opcion',
  c_detalle_opcion: 'c_detalle_opcion',
  c_concepto: 'c_concepto',
  c_tipo_opcion: 'c_tipo_opcion',
  n_valor: 'n_valor',
  n_puntaje: 'n_puntaje',
  d_borrado_opcion: 'd_borrado_opcion'
};

exports.Prisma.Tb_envsScalarFieldEnum = {
  id_env: 'id_env',
  tipo: 'tipo',
  codigo: 'codigo',
  valor: 'valor',
  codigo_padre: 'codigo_padre',
  bloqueado: 'bloqueado',
  comentario: 'comentario'
};

exports.Prisma.Tb_especialidadScalarFieldEnum = {
  codfac: 'codfac',
  codesp: 'codesp',
  nomesp: 'nomesp',
  coduser: 'coduser',
  seccion: 'seccion',
  tesnew: 'tesnew',
  te_seccion: 'te_seccion',
  estado: 'estado',
  tiene_libreta: 'tiene_libreta',
  c_agil: 'c_agil',
  c_calendar: 'c_calendar',
  c_dashboard: 'c_dashboard',
  c_hor_uni: 'c_hor_uni',
  codsun: 'codsun',
  c_admision: 'c_admision',
  c_email_coord: 'c_email_coord',
  c_abrevesp: 'c_abrevesp',
  av_validate: 'av_validate',
  av_token: 'av_token',
  av_url: 'av_url',
  av_template: 'av_template',
  n_orden: 'n_orden',
  codint: 'codint',
  c_den_grad_bach: 'c_den_grad_bach',
  c_den_grad_tit: 'c_den_grad_tit'
};

exports.Prisma.Tb_estado_tramiteScalarFieldEnum = {
  id_estado: 'id_estado',
  c_descripcion: 'c_descripcion',
  c_estado: 'c_estado'
};

exports.Prisma.Tb_eva_condicionScalarFieldEnum = {
  id_eva_condicion: 'id_eva_condicion',
  codigo: 'codigo',
  nombre: 'nombre',
  prefijo: 'prefijo',
  titulo: 'titulo',
  sufijo: 'sufijo',
  descripcion: 'descripcion',
  fa_icon: 'fa_icon'
};

exports.Prisma.Tb_eva_condicion_notaScalarFieldEnum = {
  id_eva_nota: 'id_eva_nota',
  id_eva_condicion: 'id_eva_condicion',
  texto: 'texto',
  nota: 'nota',
  orden: 'orden',
  alerta: 'alerta'
};

exports.Prisma.Tb_eva_tipo_conceptoScalarFieldEnum = {
  c_tipo: 'c_tipo',
  c_concepto: 'c_concepto',
  n_max_c: 'n_max_c',
  n_max_t: 'n_max_t',
  c_nombre: 'c_nombre',
  n_estado: 'n_estado'
};

exports.Prisma.Tb_fac_esp_grpScalarFieldEnum = {
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codgrp: 'c_codgrp'
};

exports.Prisma.Tb_facultadScalarFieldEnum = {
  cod_fac: 'cod_fac',
  nom_fac: 'nom_fac',
  tiene_libreta: 'tiene_libreta',
  inicial: 'inicial',
  final: 'final',
  secciones: 'secciones',
  nom_abrev: 'nom_abrev',
  descdec: 'descdec',
  decano: 'decano',
  director: 'director',
  facnew: 'facnew',
  escnew: 'escnew',
  facant: 'facant',
  facant1: 'facant1',
  escant: 'escant',
  codsun: 'codsun',
  c_abrevfac: 'c_abrevfac',
  n_orden: 'n_orden'
};

exports.Prisma.Tb_ficha_perso_aluScalarFieldEnum = {
  c_codalu: 'c_codalu',
  c_dni: 'c_dni',
  c_email: 'c_email',
  c_email_institucional: 'c_email_institucional',
  f_fecnac: 'f_fecnac',
  c_sexo: 'c_sexo',
  c_fono: 'c_fono',
  c_celu: 'c_celu',
  c_tipcole: 'c_tipcole',
  c_nomcole: 'c_nomcole',
  c_clavel: 'c_clavel',
  c_clavee: 'c_clavee',
  f_clave_cambio: 'f_clave_cambio',
  c_dptodom: 'c_dptodom',
  c_provdom: 'c_provdom',
  c_distdom: 'c_distdom',
  c_dirdom: 'c_dirdom',
  c_dptonac: 'c_dptonac',
  c_provnac: 'c_provnac',
  c_distnac: 'c_distnac',
  c_dptocol: 'c_dptocol',
  c_provcol: 'c_provcol',
  c_distcol: 'c_distcol',
  d_actualiza: 'd_actualiza',
  c_pais: 'c_pais',
  cat: 'cat',
  situalab: 'situalab',
  tiplab: 'tiplab',
  codlab: 'codlab',
  apepatap: 'apepatap',
  apematap: 'apematap',
  nombap: 'nombap',
  paren: 'paren',
  otro: 'otro',
  telfap: 'telfap',
  celap: 'celap',
  dirap1: 'dirap1',
  dirap2: 'dirap2',
  dirap3: 'dirap3',
  dptoapo: 'dptoapo',
  provapo: 'provapo',
  distapo: 'distapo',
  nomref1: 'nomref1',
  parenref1: 'parenref1',
  telfref1: 'telfref1',
  nomref2: 'nomref2',
  parenref2: 'parenref2',
  telfref2: 'telfref2',
  c_tipdoc: 'c_tipdoc',
  c_ietnica: 'c_ietnica',
  c_anoegr: 'c_anoegr',
  c_trabaja: 'c_trabaja',
  c_acepto: 'c_acepto',
  c_acepto_acuerdo: 'c_acepto_acuerdo',
  c_operadoras: 'c_operadoras',
  d_acepta_terminos: 'd_acepta_terminos'
};

exports.Prisma.Tb_ficha_perso_docScalarFieldEnum = {
  c_dni: 'c_dni',
  c_tipdoc: 'c_tipdoc',
  c_numdoc: 'c_numdoc',
  c_telefono: 'c_telefono',
  c_celular: 'c_celular',
  c_email: 'c_email',
  c_email_institucional: 'c_email_institucional',
  f_fecnac: 'f_fecnac',
  c_dirdom: 'c_dirdom',
  c_clave1: 'c_clave1',
  c_clave2: 'c_clave2',
  c_sexo: 'c_sexo',
  c_codprov: 'c_codprov',
  c_coddept: 'c_coddept',
  c_coddist: 'c_coddist',
  c_pais: 'c_pais',
  c_ubigeo: 'c_ubigeo',
  d_actualiza: 'd_actualiza',
  d_rst_c1: 'd_rst_c1',
  d_act_c1: 'd_act_c1',
  d_rst_c2: 'd_rst_c2',
  d_act_c2: 'd_act_c2',
  d_acepta_terminos: 'd_acepta_terminos'
};

exports.Prisma.Tb_formulaScalarFieldEnum = {
  id_formula: 'id_formula',
  c_formula_nombre: 'c_formula_nombre',
  id_formula_origen: 'id_formula_origen'
};

exports.Prisma.Tb_formula_terminoScalarFieldEnum = {
  id_termino: 'id_termino',
  id_formula: 'id_formula',
  termino_tipo: 'termino_tipo',
  termino_funcion: 'termino_funcion',
  variable_tipo: 'variable_tipo',
  variable_cod: 'variable_cod',
  variable_fk: 'variable_fk',
  variable_valor: 'variable_valor',
  n_coeficiente: 'n_coeficiente',
  c_operador: 'c_operador',
  c_simbolo: 'c_simbolo',
  c_resumen: 'c_resumen',
  n_orden: 'n_orden',
  id_termino_padre: 'id_termino_padre'
};

exports.Prisma.Tb_libro_gradosScalarFieldEnum = {
  id_libro: 'id_libro',
  c_codalu: 'c_codalu',
  id_padron: 'id_padron',
  c_nombrelibro: 'c_nombrelibro',
  n_estado: 'n_estado',
  n_anulado: 'n_anulado',
  id_usuario: 'id_usuario',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Tb_log_adminScalarFieldEnum = {
  id_log_admin: 'id_log_admin',
  c_codadm: 'c_codadm',
  c_tabla: 'c_tabla',
  c_pk: 'c_pk',
  c_data_old: 'c_data_old',
  c_data_new: 'c_data_new',
  c_accion: 'c_accion',
  c_sql: 'c_sql',
  c_obs: 'c_obs',
  d_reg: 'd_reg'
};

exports.Prisma.Tb_log_izipayScalarFieldEnum = {
  id: 'id',
  c_codalu: 'c_codalu',
  c_descripcion: 'c_descripcion',
  d_fecha: 'd_fecha',
  c_estado: 'c_estado',
  c_obs: 'c_obs'
};

exports.Prisma.Tb_log_niubizScalarFieldEnum = {
  id: 'id',
  c_codalu: 'c_codalu',
  c_descripcion: 'c_descripcion',
  d_fecha: 'd_fecha',
  c_estado: 'c_estado',
  c_obs: 'c_obs'
};

exports.Prisma.Tb_mat_aluScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codalu: 'c_codalu',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  d_reg: 'd_reg',
  c_user: 'c_user',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  c_sedcod: 'c_sedcod',
  observacion: 'observacion',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu'
};

exports.Prisma.Tb_mat_alu_preScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codalu: 'c_codalu',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  d_reg: 'd_reg',
  c_user: 'c_user',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.Tb_mat_ficScalarFieldEnum = {
  c_codalu: 'c_codalu',
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  id_turno: 'id_turno',
  c_estado: 'c_estado',
  d_ini: 'd_ini',
  d_fin: 'd_fin',
  c_codmod: 'c_codmod',
  c_codesp: 'c_codesp',
  c_seccion: 'c_seccion',
  n_crealu: 'n_crealu',
  n_pplleacu: 'n_pplleacu',
  c_condicion: 'c_condicion',
  c_tipo: 'c_tipo',
  c_res: 'c_res',
  puesto: 'puesto',
  d_fecreg: 'd_fecreg',
  c_sedcod: 'c_sedcod',
  c_pordesap: 'c_pordesap',
  c_flag: 'c_flag',
  id_mat: 'id_mat'
};

exports.Prisma.Tb_mat_fic_detScalarFieldEnum = {
  c_codalu: 'c_codalu',
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_codmod: 'c_codmod',
  n_crecur: 'n_crecur',
  c_ciccur: 'c_ciccur',
  n_vecrep: 'n_vecrep',
  c_prereq: 'c_prereq',
  c_tipcur: 'c_tipcur',
  c_nomcur: 'c_nomcur',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  id_mat: 'id_mat',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu'
};

exports.Prisma.Tb_matric_concep_condicScalarFieldEnum = {
  c_concep: 'c_concep',
  c_condic: 'c_condic',
  c_detalle: 'c_detalle',
  c_alias: 'c_alias',
  c_nombre: 'c_nombre'
};

exports.Prisma.Tb_matricula_costoScalarFieldEnum = {
  id_costo: 'id_costo',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  n_codper: 'n_codper',
  c_codmat: 'c_codmat',
  c_concep: 'c_concep',
  c_condic: 'c_condic',
  c_momento: 'c_momento',
  n_monto: 'n_monto',
  n_estado: 'n_estado',
  n_unavez: 'n_unavez',
  c_detalle: 'c_detalle',
  d_fecha: 'd_fecha',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.Tb_matricula_especialidadScalarFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  n_codper: 'n_codper',
  n_estado: 'n_estado'
};

exports.Prisma.Tb_matricula_fechaScalarFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  n_codper: 'n_codper',
  c_concep: 'c_concep',
  c_condic: 'c_condic',
  d_fh_ini: 'd_fh_ini',
  d_fh_fin: 'd_fh_fin',
  n_estado: 'n_estado',
  id_fecha: 'id_fecha',
  c_codmat: 'c_codmat',
  c_sedcod: 'c_sedcod',
  d_fec_reg: 'd_fec_reg'
};

exports.Prisma.Tb_matricula_tipoScalarFieldEnum = {
  c_codmat: 'c_codmat',
  c_nommat: 'c_nommat'
};

exports.Prisma.Tb_matricula_turnoScalarFieldEnum = {
  id_turno: 'id_turno',
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_nombre: 'c_nombre',
  d_ini: 'd_ini',
  d_fin: 'd_fin',
  n_estado: 'n_estado',
  c_codmod: 'c_codmod',
  c_codesp: 'c_codesp',
  n_promedio: 'n_promedio',
  c_sedcod: 'c_sedcod',
  d_fec_reg: 'd_fec_reg'
};

exports.Prisma.Tb_modalidadScalarFieldEnum = {
  c_codmod: 'c_codmod',
  c_nommod: 'c_nommod',
  n_orden: 'n_orden',
  d_borrado: 'd_borrado',
  c_abrevmod: 'c_abrevmod'
};

exports.Prisma.Tb_moduloScalarFieldEnum = {
  codigo_modulo: 'codigo_modulo',
  nombre_modulo: 'nombre_modulo',
  detalle_modulo: 'detalle_modulo',
  ruta_icono_modulo: 'ruta_icono_modulo',
  ruta_enlace_modulo: 'ruta_enlace_modulo',
  modulo_padre: 'modulo_padre'
};

exports.Prisma.Tb_modulo_vistaScalarFieldEnum = {
  codigo_modulo: 'codigo_modulo',
  codigo_vista: 'codigo_vista',
  nombre_vista: 'nombre_vista',
  detalle_vista: 'detalle_vista',
  ruta_icono_vista: 'ruta_icono_vista',
  ruta_enlace_vista: 'ruta_enlace_vista'
};

exports.Prisma.Tb_notas_registradasScalarFieldEnum = {
  c_codalu: 'c_codalu',
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_estado: 'c_estado',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  n_prac01: 'n_prac01',
  n_prac02: 'n_prac02',
  n_prac03: 'n_prac03',
  n_prac04: 'n_prac04',
  n_promprac: 'n_promprac',
  n_proy01: 'n_proy01',
  n_proy02: 'n_proy02',
  n_proy03: 'n_proy03',
  n_proy04: 'n_proy04',
  n_promproy: 'n_promproy',
  n_exapar: 'n_exapar',
  n_exafin: 'n_exafin',
  n_promexa: 'n_promexa',
  n_promfinal: 'n_promfinal',
  d_date: 'd_date'
};

exports.Prisma.Tb_observacion_practicaScalarFieldEnum = {
  id_observacion: 'id_observacion',
  id_practica: 'id_practica',
  c_codadm: 'c_codadm',
  c_coddoc: 'c_coddoc',
  fecha_obs: 'fecha_obs',
  descripcion_obs: 'descripcion_obs',
  c_estado: 'c_estado'
};

exports.Prisma.Tb_padron_gradosScalarFieldEnum = {
  c_coduni: 'c_coduni',
  c_codalu: 'c_codalu',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  c_nomfac: 'c_nomfac',
  c_escuela: 'c_escuela',
  c_nompos: 'c_nompos',
  c_apepat: 'c_apepat',
  c_apemat: 'c_apemat',
  c_nombres: 'c_nombres',
  c_sexo: 'c_sexo',
  c_tipdoc: 'c_tipdoc',
  c_numdoc: 'c_numdoc',
  c_nomdip: 'c_nomdip',
  c_nomesp2: 'c_nomesp2',
  c_abre_gyt: 'c_abre_gyt',
  c_acto_tip: 'c_acto_tip',
  d_acto_fec: 'd_acto_fec',
  c_tesis: 'c_tesis',
  c_modalidad: 'c_modalidad',
  c_proc_rev_pais: 'c_proc_rev_pais',
  c_proc_rev_univ: 'c_proc_rev_univ',
  c_prov_rev_gra_ext: 'c_prov_rev_gra_ext',
  c_reso_num: 'c_reso_num',
  d_reso_fec: 'd_reso_fec',
  d_dipl_fec: 'd_dipl_fec',
  c_dipl_num: 'c_dipl_num',
  c_dipl_tip_emi: 'c_dipl_tip_emi',
  c_reg_libro: 'c_reg_libro',
  c_reg_folio: 'c_reg_folio',
  c_numreg: 'c_numreg',
  c_cargo1: 'c_cargo1',
  c_nomcar1: 'c_nomcar1',
  c_cargo2: 'c_cargo2',
  c_nomcar2: 'c_nomcar2',
  c_cargo3: 'c_cargo3',
  c_nomcar3: 'c_nomcar3',
  c_numofi: 'c_numofi',
  d_seguir: 'd_seguir',
  c_user: 'c_user',
  d_fec_update: 'd_fec_update',
  id_padron: 'id_padron',
  f_reg: 'f_reg',
  f_act: 'f_act',
  c_dir_ocrysa: 'c_dir_ocrysa',
  c_raz_soc_ist: 'c_raz_soc_ist',
  d_fec_mat: 'd_fec_mat',
  d_fec_cons: 'd_fec_cons',
  c_proc_bach: 'c_proc_bach',
  c_abre_gyt2: 'c_abre_gyt2',
  c_reso_num_fac: 'c_reso_num_fac',
  d_reso_rec: 'd_reso_rec',
  estado: 'estado',
  den_grad: 'den_grad',
  num_cred: 'num_cred',
  reg_metadato: 'reg_metadato',
  prog_estu: 'prog_estu',
  proc_titulo_ped: 'proc_titulo_ped',
  dipl_fec_dup: 'dipl_fec_dup',
  proc_pais_ext: 'proc_pais_ext',
  proc_univ_ext: 'proc_univ_ext',
  proc_grado_ext: 'proc_grado_ext',
  fec_mat_prog: 'fec_mat_prog',
  fec_inicio_prog: 'fec_inicio_prog',
  fec_fin_prog: 'fec_fin_prog',
  n_entregado: 'n_entregado',
  fec_entrega: 'fec_entrega',
  observacion: 'observacion',
  mostrar_alum: 'mostrar_alum',
  mod_obt: 'mod_obt',
  prog_acredit: 'prog_acredit',
  fec_inicio_acredit: 'fec_inicio_acredit',
  fec_fin_acredit: 'fec_fin_acredit',
  fec_inicio_mod_tit_acredit: 'fec_inicio_mod_tit_acredit',
  fec_fin_mod_tit_acredit: 'fec_fin_mod_tit_acredit',
  fec_solicit_grad_tit: 'fec_solicit_grad_tit',
  fec_trab_grad_tit: 'fec_trab_grad_tit',
  trab_invest_original: 'trab_invest_original',
  crit_rev: 'crit_rev',
  mod_sustentacion: 'mod_sustentacion',
  c_rtd_sunedu: 'c_rtd_sunedu',
  f_fec_rtd: 'f_fec_rtd',
  f_fec_ofi: 'f_fec_ofi',
  f_fec_res_fac: 'f_fec_res_fac',
  f_fec_con_fac_esc: 'f_fec_con_fac_esc',
  f_fec_entrega_dipl: 'f_fec_entrega_dipl',
  c_proc_rev_gra_ext: 'c_proc_rev_gra_ext',
  d_fec_egreso: 'd_fec_egreso',
  mec_uti: 'mec_uti',
  dep_ver_orig: 'dep_ver_orig',
  req_idm: 'req_idm',
  reso_num_dup_nue: 'reso_num_dup_nue',
  reso_fec_dup_nue: 'reso_fec_dup_nue',
  proc_inst_orig: 'proc_inst_orig'
};

exports.Prisma.Tb_padron_grados_copy1ScalarFieldEnum = {
  c_coduni: 'c_coduni',
  c_codalu: 'c_codalu',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  c_nomfac: 'c_nomfac',
  c_escuela: 'c_escuela',
  c_nompos: 'c_nompos',
  c_apepat: 'c_apepat',
  c_apemat: 'c_apemat',
  c_nombres: 'c_nombres',
  c_sexo: 'c_sexo',
  c_tipdoc: 'c_tipdoc',
  c_numdoc: 'c_numdoc',
  c_nomdip: 'c_nomdip',
  c_nomesp2: 'c_nomesp2',
  c_abre_gyt: 'c_abre_gyt',
  c_acto_tip: 'c_acto_tip',
  d_acto_fec: 'd_acto_fec',
  c_tesis: 'c_tesis',
  c_modalidad: 'c_modalidad',
  c_proc_rev_pais: 'c_proc_rev_pais',
  c_proc_rev_univ: 'c_proc_rev_univ',
  c_prov_rev_gra_ext: 'c_prov_rev_gra_ext',
  c_reso_num: 'c_reso_num',
  d_reso_fec: 'd_reso_fec',
  d_dipl_fec: 'd_dipl_fec',
  c_dipl_num: 'c_dipl_num',
  c_dipl_tip_emi: 'c_dipl_tip_emi',
  c_reg_libro: 'c_reg_libro',
  c_reg_folio: 'c_reg_folio',
  c_numreg: 'c_numreg',
  c_cargo1: 'c_cargo1',
  c_nomcar1: 'c_nomcar1',
  c_cargo2: 'c_cargo2',
  c_nomcar2: 'c_nomcar2',
  c_cargo3: 'c_cargo3',
  c_nomcar3: 'c_nomcar3',
  c_numofi: 'c_numofi',
  d_seguir: 'd_seguir',
  c_user: 'c_user',
  d_fec_update: 'd_fec_update',
  id_padron: 'id_padron',
  f_reg: 'f_reg',
  f_act: 'f_act',
  c_dir_ocrysa: 'c_dir_ocrysa',
  c_raz_soc_ist: 'c_raz_soc_ist',
  d_fec_mat: 'd_fec_mat',
  d_fec_cons: 'd_fec_cons',
  c_proc_bach: 'c_proc_bach',
  c_abre_gyt2: 'c_abre_gyt2',
  c_reso_num_fac: 'c_reso_num_fac',
  d_reso_rec: 'd_reso_rec',
  estado: 'estado',
  den_grad: 'den_grad',
  num_cred: 'num_cred',
  reg_metadato: 'reg_metadato',
  prog_estu: 'prog_estu',
  proc_titulo_ped: 'proc_titulo_ped',
  dipl_fec_dup: 'dipl_fec_dup',
  proc_pais_ext: 'proc_pais_ext',
  proc_univ_ext: 'proc_univ_ext',
  proc_grado_ext: 'proc_grado_ext',
  fec_mat_prog: 'fec_mat_prog',
  fec_inicio_prog: 'fec_inicio_prog',
  fec_fin_prog: 'fec_fin_prog',
  n_entregado: 'n_entregado',
  fec_entrega: 'fec_entrega',
  observacion: 'observacion',
  mostrar_alum: 'mostrar_alum',
  mod_obt: 'mod_obt',
  prog_acredit: 'prog_acredit',
  fec_inicio_acredit: 'fec_inicio_acredit',
  fec_fin_acredit: 'fec_fin_acredit',
  fec_inicio_mod_tit_acredit: 'fec_inicio_mod_tit_acredit',
  fec_fin_mod_tit_acredit: 'fec_fin_mod_tit_acredit',
  fec_solicit_grad_tit: 'fec_solicit_grad_tit',
  fec_trab_grad_tit: 'fec_trab_grad_tit',
  trab_invest_original: 'trab_invest_original',
  crit_rev: 'crit_rev',
  mod_sustentacion: 'mod_sustentacion',
  c_rtd_sunedu: 'c_rtd_sunedu',
  f_fec_rtd: 'f_fec_rtd',
  f_fec_ofi: 'f_fec_ofi',
  f_fec_res_fac: 'f_fec_res_fac',
  f_fec_con_fac_esc: 'f_fec_con_fac_esc',
  f_fec_entrega_dipl: 'f_fec_entrega_dipl',
  c_proc_rev_gra_ext: 'c_proc_rev_gra_ext',
  d_fec_egreso: 'd_fec_egreso',
  mec_uti: 'mec_uti',
  dep_ver_orig: 'dep_ver_orig',
  req_idm: 'req_idm',
  reso_num_dup_nue: 'reso_num_dup_nue',
  reso_fec_dup_nue: 'reso_fec_dup_nue',
  proc_inst_orig: 'proc_inst_orig'
};

exports.Prisma.Tb_padron_grados_maestroScalarFieldEnum = {
  id: 'id',
  tabla: 'tabla',
  descripcion: 'descripcion',
  d_seguir: 'd_seguir',
  orden: 'orden',
  estado: 'estado'
};

exports.Prisma.Tb_paisesScalarFieldEnum = {
  codpais: 'codpais',
  nombre: 'nombre'
};

exports.Prisma.Tb_parametrosScalarFieldEnum = {
  id_param: 'id_param',
  nombre_param: 'nombre_param',
  id_plantilla: 'id_plantilla',
  descripcion: 'descripcion',
  filliable: 'filliable'
};

exports.Prisma.Tb_parametros_disponiblesScalarFieldEnum = {
  id: 'id',
  codigo: 'codigo'
};

exports.Prisma.Tb_peracdScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_codfac: 'c_codfac',
  c_flgper: 'c_flgper',
  c_fweb_doc: 'c_fweb_doc',
  c_fweb_alu: 'c_fweb_alu',
  c_perlit: 'c_perlit',
  c_fweb_adm: 'c_fweb_adm',
  c_flgcurlle: 'c_flgcurlle',
  f_perini: 'f_perini',
  f_perfin: 'f_perfin'
};

exports.Prisma.Tb_perlleScalarFieldEnum = {
  codalu: 'codalu',
  codper: 'codper',
  codfac: 'codfac',
  numcurlle: 'numcurlle',
  numcurapr: 'numcurapr',
  numcrdlle: 'numcrdlle',
  numcrdapr: 'numcrdapr',
  pplle: 'pplle',
  pplleacu: 'pplleacu',
  crdkapracu: 'crdkapracu',
  codesp: 'codesp',
  periodo: 'periodo',
  credextrac: 'credextrac',
  n_cicrel: 'n_cicrel',
  estado: 'estado',
  credobli: 'credobli',
  credelec: 'credelec'
};

exports.Prisma.Tb_plan_estudio_credScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcre: 'c_codcre',
  n_ciclo_1: 'n_ciclo_1',
  n_ciclo_2: 'n_ciclo_2',
  n_ciclo_3: 'n_ciclo_3',
  n_ciclo_4: 'n_ciclo_4',
  n_ciclo_5: 'n_ciclo_5',
  n_ciclo_7: 'n_ciclo_7',
  n_ciclo_8: 'n_ciclo_8',
  n_ciclo_9: 'n_ciclo_9',
  n_ciclo_10: 'n_ciclo_10',
  n_ciclo_6: 'n_ciclo_6',
  n_totcre: 'n_totcre'
};

exports.Prisma.Tb_plan_estudio_cursoScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_nomcur: 'c_nomcur',
  n_ciclo: 'n_ciclo',
  c_ciclo: 'c_ciclo',
  n_ht: 'n_ht',
  n_hp: 'n_hp',
  n_cr: 'n_cr',
  c_tipcur: 'c_tipcur',
  c_area: 'c_area',
  c_sis_eva: 'c_sis_eva',
  n_estado: 'n_estado',
  c_prereq1: 'c_prereq1',
  c_prereq2: 'c_prereq2',
  c_prereq3: 'c_prereq3',
  c_prereq4: 'c_prereq4',
  id: 'id',
  n_modulo: 'n_modulo',
  n_pdp: 'n_pdp',
  n_tipprog: 'n_tipprog',
  c_publicado: 'c_publicado',
  c_curpre: 'c_curpre',
  c_curvir: 'c_curvir',
  c_curup: 'c_curup'
};

exports.Prisma.Tb_plan_estudio_curso_areaScalarFieldEnum = {
  c_cod_cur_area: 'c_cod_cur_area',
  c_nom_cur_area: 'c_nom_cur_area',
  d_borrado: 'd_borrado'
};

exports.Prisma.Tb_plan_estudio_curso_compScalarFieldEnum = {
  n_codper: 'n_codper',
  n_codpla: 'n_codpla',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_codcurdet: 'c_codcurdet',
  d_fecha: 'd_fecha',
  c_usuario: 'c_usuario',
  n_ht: 'n_ht',
  n_hp: 'n_hp',
  n_cr: 'n_cr'
};

exports.Prisma.Tb_plan_estudio_curso_reqScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_codcur_req: 'c_codcur_req',
  d_fecha: 'd_fecha'
};

exports.Prisma.Tb_plan_estudio_equScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  n_codper_equ: 'n_codper_equ',
  c_codmod_equ: 'c_codmod_equ',
  c_codfac_equ: 'c_codfac_equ',
  c_codesp_equ: 'c_codesp_equ',
  c_codcur_equ: 'c_codcur_equ'
};

exports.Prisma.Tb_plan_estudio_espScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  n_estado: 'n_estado',
  d_fec_res: 'd_fec_res',
  c_nro_res: 'c_nro_res',
  c_desc: 'c_desc',
  d_fecha: 'd_fecha'
};

exports.Prisma.Tb_plan_estudio_moduloScalarFieldEnum = {
  n_codpla: 'n_codpla',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  n_modulo: 'n_modulo',
  c_nommdl: 'c_nommdl',
  c_modulo: 'c_modulo'
};

exports.Prisma.Tb_plantillaScalarFieldEnum = {
  id: 'id',
  c_codtab: 'c_codtab',
  c_desc: 'c_desc',
  estado: 'estado',
  c_user: 'c_user',
  d_reg: 'd_reg',
  c_user_upd: 'c_user_upd',
  d_upd: 'd_upd'
};

exports.Prisma.Tb_practicaScalarFieldEnum = {
  id_practica: 'id_practica',
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  id_empresa: 'id_empresa',
  id_contacto: 'id_contacto',
  c_dnidoc: 'c_dnidoc',
  fecha_inicio: 'fecha_inicio',
  fecha_fin: 'fecha_fin',
  fecha_cierre: 'fecha_cierre',
  dia_practica: 'dia_practica',
  n_codper: 'n_codper',
  c_codcur: 'c_codcur',
  c_codgrp: 'c_codgrp',
  b_visita: 'b_visita',
  c_estado: 'c_estado',
  horas_practica: 'horas_practica',
  cod_cargo: 'cod_cargo',
  c_codmod: 'c_codmod',
  n_codpla: 'n_codpla',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.Tb_prog_claseScalarFieldEnum = {
  id: 'id',
  c_dnidoc: 'c_dnidoc',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  n_dia: 'n_dia',
  c_tipo_clase: 'c_tipo_clase',
  c_estado_dictado: 'c_estado_dictado',
  n_codper: 'n_codper',
  c_aula: 'c_aula',
  d_fh_inicio: 'd_fh_inicio',
  d_fh_fin: 'd_fh_fin',
  c_nomcur: 'c_nomcur',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  n_codpla: 'n_codpla',
  c_codesp: 'c_codesp',
  n_break: 'n_break',
  c_obs: 'c_obs',
  c_tema: 'c_tema',
  c_publica: 'c_publica'
};

exports.Prisma.Tb_registro_diplomaScalarFieldEnum = {
  id: 'id',
  c_tipreg: 'c_tipreg',
  c_dni: 'c_dni',
  c_nomalu: 'c_nomalu',
  c_sexo: 'c_sexo',
  d_fecnac: 'd_fecnac',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  n_codpln: 'n_codpln',
  c_nomesp: 'c_nomesp',
  c_menesp: 'c_menesp',
  c_codmod: 'c_codmod',
  c_nommod: 'c_nommod',
  c_enfmod: 'c_enfmod',
  c_numcred: 'c_numcred',
  c_nummod: 'c_nummod',
  n_constancia: 'n_constancia',
  d_fecegre: 'd_fecegre',
  c_formativo: 'c_formativo',
  n_registro: 'n_registro',
  n_registro_minedu: 'n_registro_minedu',
  d_fecemi: 'd_fecemi',
  c_idioma: 'c_idioma',
  d_fecreg: 'd_fecreg',
  c_usureg: 'c_usureg',
  c_codmodulo: 'c_codmodulo',
  c_descmodulo: 'c_descmodulo',
  c_numhor: 'c_numhor',
  c_den_grad: 'c_den_grad',
  d_fecinimod: 'd_fecinimod',
  d_fecfinmod: 'd_fecfinmod'
};

exports.Prisma.Tb_registro_diploma_maestroScalarFieldEnum = {
  id: 'id',
  c_tipreg: 'c_tipreg',
  c_abrevreg: 'c_abrevreg',
  c_nomreg: 'c_nomreg',
  c_orden: 'c_orden'
};

exports.Prisma.Tb_reporte_minedu_sede_maestroScalarFieldEnum = {
  id: 'id',
  sedcod: 'sedcod',
  departamento: 'departamento',
  provincia: 'provincia',
  distrito: 'distrito',
  dre_gre: 'dre_gre',
  direccion: 'direccion',
  resol_autorizacion: 'resol_autorizacion',
  resol_validacion: 'resol_validacion',
  c_centro_poblado: 'c_centro_poblado',
  c_amb_vraem: 'c_amb_vraem',
  c_amb_huallaga: 'c_amb_huallaga',
  c_tipo_sede: 'c_tipo_sede'
};

exports.Prisma.Tb_rol_accesoScalarFieldEnum = {
  id_rol_acceso: 'id_rol_acceso',
  nombre_rol: 'nombre_rol',
  detalle_rol: 'detalle_rol'
};

exports.Prisma.Tb_rol_acceso_modulo_vistaScalarFieldEnum = {
  id_rol_acceso: 'id_rol_acceso',
  nombre_clase: 'nombre_clase',
  nombre_metodo: 'nombre_metodo',
  codigo_modulo: 'codigo_modulo',
  codigo_vista: 'codigo_vista'
};

exports.Prisma.Tb_silaboScalarFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_sumi: 'c_sumi',
  c_obje: 'c_obje',
  c_rela: 'c_rela',
  c_cont_sem_1: 'c_cont_sem_1',
  c_cont_sem_2: 'c_cont_sem_2',
  c_cont_sem_3: 'c_cont_sem_3',
  c_cont_sem_4: 'c_cont_sem_4',
  c_cont_sem_5: 'c_cont_sem_5',
  c_cont_sem_6: 'c_cont_sem_6',
  c_cont_sem_7: 'c_cont_sem_7',
  c_cont_sem_8: 'c_cont_sem_8',
  c_cont_sem_9: 'c_cont_sem_9',
  c_cont_sem_10: 'c_cont_sem_10',
  c_cont_sem_11: 'c_cont_sem_11',
  c_cont_sem_12: 'c_cont_sem_12',
  c_cont_sem_13: 'c_cont_sem_13',
  c_cont_sem_14: 'c_cont_sem_14',
  c_cont_sem_15: 'c_cont_sem_15',
  c_cont_sem_16: 'c_cont_sem_16',
  c_meto: 'c_meto',
  c_bibl: 'c_bibl',
  n_codpla: 'n_codpla'
};

exports.Prisma.Tb_sincronizacion_moodleScalarFieldEnum = {
  id: 'id',
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  n_codpla: 'n_codpla',
  n_ciclo: 'n_ciclo',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  d_fecha_ini: 'd_fecha_ini',
  d_fecha_fin: 'd_fecha_fin',
  c_estado: 'c_estado',
  d_fecha_reg: 'd_fecha_reg',
  c_user: 'c_user'
};

exports.Prisma.Tb_sms_consumoScalarFieldEnum = {
  id: 'id',
  limite: 'limite',
  consumo: 'consumo'
};

exports.Prisma.Tb_sms_defaultScalarFieldEnum = {
  id: 'id',
  titulo: 'titulo',
  texto: 'texto',
  d_borrado: 'd_borrado'
};

exports.Prisma.Tb_tabla_opcionScalarFieldEnum = {
  id_tab_opc: 'id_tab_opc',
  c_codtab: 'c_codtab',
  c_descri: 'c_descri',
  n_ord: 'n_ord',
  c_activo: 'c_activo',
  c_tabla: 'c_tabla',
  id_user: 'id_user',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Tb_tipo_carga_lectivaScalarFieldEnum = {
  id: 'id',
  descripcion: 'descripcion',
  estado: 'estado',
  color: 'color',
  c_c9: 'c_c9',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Tb_tra_fol_est_aluScalarFieldEnum = {
  c_codalu: 'c_codalu',
  c_estado: 'c_estado',
  c_record: 'c_record',
  c_obs: 'c_obs',
  c_user: 'c_user',
  d_fec_reg: 'd_fec_reg',
  d_fec_upd: 'd_fec_upd',
  c_diploma1: 'c_diploma1'
};

exports.Prisma.Tb_tra_fol_reqScalarFieldEnum = {
  id_requisito: 'id_requisito',
  c_desc_req: 'c_desc_req',
  n_numero: 'n_numero',
  id_modalidad: 'id_modalidad',
  d_adjunta: 'd_adjunta',
  d_borrado: 'd_borrado',
  c_docreq: 'c_docreq'
};

exports.Prisma.Tb_tra_fol_req_entregadosScalarFieldEnum = {
  id_requisito: 'id_requisito',
  c_obs: 'c_obs',
  c_codalu: 'c_codalu',
  c_user: 'c_user',
  d_validado: 'd_validado',
  d_archivo: 'd_archivo',
  c_docreq: 'c_docreq',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype',
  d_size: 'd_size',
  d_fec_reg: 'd_fec_reg',
  d_fec_upd: 'd_fec_upd',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  d_fec_rec: 'd_fec_rec',
  c_user_rec: 'c_user_rec'
};

exports.Prisma.Tb_tra_origenScalarFieldEnum = {
  id_tramite: 'id_tramite',
  id_tipo_tramite: 'id_tipo_tramite',
  c_codalu: 'c_codalu',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  c_tipoper: 'c_tipoper',
  c_user: 'c_user',
  c_estado: 'c_estado',
  obs_finalizar: 'obs_finalizar',
  d_fec_reg: 'd_fec_reg',
  d_fec_upd: 'd_fec_upd',
  d_borrado: 'd_borrado',
  c_user_borrado: 'c_user_borrado',
  c_voucher: 'c_voucher',
  c_fecpag: 'c_fecpag',
  c_monpag: 'c_monpag',
  b_alumno: 'b_alumno',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype',
  d_size: 'd_size',
  id_tipdoc: 'id_tipdoc',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  c_monto_referencial: 'c_monto_referencial',
  id_tipo_pago: 'id_tipo_pago',
  c_origen_pago: 'c_origen_pago',
  c_estado_pago: 'c_estado_pago',
  c_conformidad: 'c_conformidad',
  d_fecha_conformidad: 'd_fecha_conformidad',
  b_cita: 'b_cita',
  c_anulacion_obs: 'c_anulacion_obs'
};

exports.Prisma.Tb_tra_pasosScalarFieldEnum = {
  id_tra_pasos: 'id_tra_pasos',
  id_tipo_tramite: 'id_tipo_tramite',
  id_tramite: 'id_tramite',
  d_fec_envio: 'd_fec_envio',
  d_fec_recep: 'd_fec_recep',
  id_area_ori: 'id_area_ori',
  id_area_dest: 'id_area_dest',
  id_facu_ori: 'id_facu_ori',
  id_facu_dest: 'id_facu_dest',
  n_contador: 'n_contador',
  c_user: 'c_user',
  c_obs: 'c_obs',
  c_atendido: 'c_atendido',
  d_fec_atencion: 'd_fec_atencion'
};

exports.Prisma.Tb_tra_pasos_filesScalarFieldEnum = {
  id: 'id',
  id_tra_pasos: 'id_tra_pasos',
  d_original_name: 'd_original_name',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype',
  d_size: 'd_size',
  d_fec_reg: 'd_fec_reg'
};

exports.Prisma.Tb_tra_tipo_reqScalarFieldEnum = {
  id_requisito: 'id_requisito',
  c_desc_req: 'c_desc_req',
  id_tipo_tramite: 'id_tipo_tramite',
  d_adjunta: 'd_adjunta',
  d_adjunta_valida: 'd_adjunta_valida',
  c_plantilla: 'c_plantilla',
  d_observacion: 'd_observacion',
  d_borrado: 'd_borrado'
};

exports.Prisma.Tb_tra_tipo_req_entScalarFieldEnum = {
  id_tramite: 'id_tramite',
  id_tipo_tramite: 'id_tipo_tramite',
  id_requisito: 'id_requisito',
  c_obs: 'c_obs',
  c_text: 'c_text',
  d_validado: 'd_validado',
  c_correccion_alu: 'c_correccion_alu',
  d_correccion_alu: 'd_correccion_alu',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype',
  d_size: 'd_size'
};

exports.Prisma.Tb_tra_tiposScalarFieldEnum = {
  id_tipo_tramite: 'id_tipo_tramite',
  c_descri: 'c_descri',
  c_abrev: 'c_abrev',
  c_descripcion: 'c_descripcion',
  n_dias: 'n_dias',
  b_alumno: 'b_alumno',
  b_cita: 'b_cita',
  b_egresado: 'b_egresado',
  b_pago: 'b_pago',
  id_tipopago: 'id_tipopago',
  d_borrado: 'd_borrado'
};

exports.Prisma.Tb_ubigeo2006ScalarFieldEnum = {
  id: 'id',
  coddpto: 'coddpto',
  codprov: 'codprov',
  coddist: 'coddist',
  nombre: 'nombre'
};

exports.Prisma.Tb_une_aulaScalarFieldEnum = {
  id_aula: 'id_aula',
  c_codaula: 'c_codaula',
  c_detalle: 'c_detalle',
  id_pab: 'id_pab',
  n_piso: 'n_piso',
  n_capacidad: 'n_capacidad',
  c_obs: 'c_obs'
};

exports.Prisma.Tb_une_pabScalarFieldEnum = {
  id_pab: 'id_pab',
  c_codfac: 'c_codfac',
  c_nompab: 'c_nompab'
};

exports.Prisma.Tb_une_pab_aulaScalarFieldEnum = {
  n_codpab: 'n_codpab',
  c_codaula: 'c_codaula',
  c_detalle: 'c_detalle',
  n_piso: 'n_piso',
  n_capacidad: 'n_capacidad',
  c_obs: 'c_obs',
  c_lon: 'c_lon',
  c_lat: 'c_lat'
};

exports.Prisma.Tb_unidad_estudioScalarFieldEnum = {
  id_unidad_estudio: 'id_unidad_estudio',
  id_plan: 'id_plan',
  c_unidad_nombre: 'c_unidad_nombre',
  c_unidad_label: 'c_unidad_label',
  n_eval_unica: 'n_eval_unica',
  n_eval_total: 'n_eval_total',
  n_eval_opc: 'n_eval_opc',
  n_tiene_prom: 'n_tiene_prom',
  c_tipo_prom: 'c_tipo_prom',
  c_formula_prom: 'c_formula_prom',
  id_formula_prom: 'id_formula_prom',
  c_prom_label: 'c_prom_label',
  n_prom_decimales: 'n_prom_decimales',
  c_prom_redondeo: 'c_prom_redondeo',
  n_orden: 'n_orden',
  n_unidad_estado: 'n_unidad_estado',
  n_tiene_comentario: 'n_tiene_comentario',
  n_grupo_concepto: 'n_grupo_concepto',
  id_unidad_padre: 'id_unidad_padre',
  id_unidad_origen: 'id_unidad_origen'
};

exports.Prisma.Tb_unidad_estudio_categoriaScalarFieldEnum = {
  id_unidad_estudio: 'id_unidad_estudio',
  id_categoria: 'id_categoria'
};

exports.Prisma.Tb_unidad_estudio_conceptoScalarFieldEnum = {
  id_concepto: 'id_concepto',
  id_unidad: 'id_unidad',
  id_plan: 'id_plan',
  c_concepto: 'c_concepto',
  estado: 'estado',
  c_condicion: 'c_condicion',
  ver_nota: 'ver_nota'
};

exports.Prisma.Tb_unidad_estudio_concepto_condicionScalarFieldEnum = {
  id_condicion: 'id_condicion',
  id_concepto: 'id_concepto',
  id_eva_condicion: 'id_eva_condicion',
  estado: 'estado',
  c_sexo: 'c_sexo',
  n_grado: 'n_grado'
};

exports.Prisma.Tb_unidad_estudio_condicionScalarFieldEnum = {
  id_condicion: 'id_condicion',
  id_unidad_estudio: 'id_unidad_estudio',
  id_plan: 'id_plan',
  id_eva_condicion: 'id_eva_condicion',
  estado: 'estado'
};

exports.Prisma.Tb_unidad_estudio_evaluacionScalarFieldEnum = {
  id_unidad_evaluacion: 'id_unidad_evaluacion',
  id_unidad: 'id_unidad',
  id_plan: 'id_plan',
  c_evaluacion_nombre: 'c_evaluacion_nombre',
  c_evaluacion_label: 'c_evaluacion_label',
  c_tipo: 'c_tipo',
  c_concepto: 'c_concepto',
  n_orden: 'n_orden',
  n_suborden: 'n_suborden',
  n_obligatorio: 'n_obligatorio',
  n_peso_porc: 'n_peso_porc',
  n_modifica_nombre: 'n_modifica_nombre',
  id_evaluacion_origen: 'id_evaluacion_origen'
};

exports.Prisma.Tb_unidad_estudio_planScalarFieldEnum = {
  id_unidad_estudio_plan: 'id_unidad_estudio_plan',
  c_plan_nombre: 'c_plan_nombre',
  c_plan_descripcion: 'c_plan_descripcion',
  n_plan_estado: 'n_plan_estado',
  id_plan_origen: 'id_plan_origen'
};

exports.Prisma.Tb_unidad_estudio_plan_categoriaScalarFieldEnum = {
  id_plan: 'id_plan',
  id_categoria: 'id_categoria',
  peso_categoria: 'peso_categoria'
};

exports.Prisma.Tb_unidad_estudio_plan_promScalarFieldEnum = {
  id_unidad_estudio_plan: 'id_unidad_estudio_plan',
  c_codpro: 'c_codpro',
  id_formula: 'id_formula',
  n_orden: 'n_orden',
  c_promedio_nombre: 'c_promedio_nombre',
  c_promedio_descripcion: 'c_promedio_descripcion',
  n_decimales: 'n_decimales',
  id_plan_origen: 'id_plan_origen',
  c_redondeo: 'c_redondeo',
  n_tiene_comentario: 'n_tiene_comentario'
};

exports.Prisma.Tb_unidad_estudio_plan_prom_condicionScalarFieldEnum = {
  id_condicion: 'id_condicion',
  id_plan: 'id_plan',
  codpro: 'codpro',
  id_eva_condicion: 'id_eva_condicion',
  estado: 'estado'
};

exports.Prisma.Tb_unidad_estudio_plan_prom_configScalarFieldEnum = {
  id_unidad_estudio_plan: 'id_unidad_estudio_plan',
  id_termino: 'id_termino',
  id_formula: 'id_formula',
  puede_cambiar_coeficiente: 'puede_cambiar_coeficiente',
  puede_cambiar_simbolo: 'puede_cambiar_simbolo',
  id_plan_origen: 'id_plan_origen',
  id_termino_origen: 'id_termino_origen'
};

exports.Prisma.Tb_usuario_rol_accesoScalarFieldEnum = {
  id_usuario: 'id_usuario',
  id_rol_acceso: 'id_rol_acceso',
  tipo_permiso: 'tipo_permiso',
  fecha_inicio_permiso: 'fecha_inicio_permiso',
  fecha_fin_permiso: 'fecha_fin_permiso',
  estado_permiso: 'estado_permiso'
};

exports.Prisma.Temp_presencialScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  semestre: 'semestre',
  c_turno: 'c_turno'
};

exports.Prisma.Temp_upd_id_evaluacionScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  modalidad_oficial: 'modalidad_oficial',
  modalidad_actual: 'modalidad_actual',
  c_codalu: 'c_codalu',
  id_evaluacion_actual: 'id_evaluacion_actual',
  id_evaluacion_correcto: 'id_evaluacion_correcto'
};

exports.Prisma.Tmp_mat_20251ScalarFieldEnum = {
  c_codalu: 'c_codalu',
  turno: 'turno',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  id_turno: 'id_turno'
};

exports.Prisma.Tmp_mat_seg_20243ScalarFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  turno: 'turno',
  id_turno: 'id_turno'
};

exports.Prisma.Tmp_pago_asignado_det_elim_20243_euScalarFieldEnum = {
  id: 'id',
  alu_pago_asignado_id: 'alu_pago_asignado_id',
  c_codalu: 'c_codalu',
  id_tipo: 'id_tipo',
  d_fec_venc: 'd_fec_venc',
  c_flag: 'c_flag',
  id_pago_cab: 'id_pago_cab'
};

exports.Prisma.Tmp_patron_egre_1ScalarFieldEnum = {
  ID: 'ID',
  CODUNIV: 'CODUNIV',
  RAZ_SOC: 'RAZ_SOC',
  MATRI_FEC: 'MATRI_FEC',
  FAC_NOM: 'FAC_NOM',
  CARR_PROG: 'CARR_PROG',
  ESC_POS: 'ESC_POS',
  EGRES_FEC: 'EGRES_FEC',
  APEPAT: 'APEPAT',
  APEMAT: 'APEMAT',
  NOMBRE: 'NOMBRE',
  SEXO: 'SEXO',
  DOCU_TIP: 'DOCU_TIP',
  DOCU_NUM: 'DOCU_NUM',
  PROC_BACH: 'PROC_BACH',
  GRAD_TITU: 'GRAD_TITU',
  DEN_GRAD: 'DEN_GRAD',
  SEG_ESP: 'SEG_ESP',
  TRAB_INV: 'TRAB_INV',
  NUM_CRED: 'NUM_CRED',
  REG_METADATO: 'REG_METADATO',
  PROG_ESTU: 'PROG_ESTU',
  PROC_TITULO_PED: 'PROC_TITULO_PED',
  MOD_OBT: 'MOD_OBT',
  PROG_ACREDIT: 'PROG_ACREDIT',
  FEC_INICIO_ACREDIT: 'FEC_INICIO_ACREDIT',
  FEC_FIN_ACREDIT: 'FEC_FIN_ACREDIT',
  FEC_INICIO_MOD_TIT_ACREDIT: 'FEC_INICIO_MOD_TIT_ACREDIT',
  FEC_FIN_MOD_TIT_ACREDIT: 'FEC_FIN_MOD_TIT_ACREDIT',
  FEC_SOLICIT_GRAD_TIT: 'FEC_SOLICIT_GRAD_TIT',
  FEC_TRAB_GRAD_TIT: 'FEC_TRAB_GRAD_TIT',
  TRAB_INVEST_ORIGINAL: 'TRAB_INVEST_ORIGINAL',
  MOD_EST: 'MOD_EST',
  ABRE_GYT: 'ABRE_GYT',
  PROC_REV_PAIS: 'PROC_REV_PAIS',
  PROC_REV_UNIV: 'PROC_REV_UNIV',
  PROC_REV_GRADO: 'PROC_REV_GRADO',
  CRIT_REV: 'CRIT_REV',
  RESO_NUM: 'RESO_NUM',
  RESO_FEC: 'RESO_FEC',
  DIPL_FEC_ORG: 'DIPL_FEC_ORG',
  DIPL_FEC_DUP: 'DIPL_FEC_DUP',
  DIPL_NUM: 'DIPL_NUM',
  DIPL_TIP_EMI: 'DIPL_TIP_EMI',
  REG_LIBRO: 'REG_LIBRO',
  REG_FOLIO: 'REG_FOLIO',
  REG_REGISTRO: 'REG_REGISTRO',
  CARGO1: 'CARGO1',
  AUTORIDAD1: 'AUTORIDAD1',
  CARGO2: 'CARGO2',
  AUTORIDAD2: 'AUTORIDAD2',
  CARGO3: 'CARGO3',
  AUTORIDAD3: 'AUTORIDAD3',
  PROC_PAIS_EXT: 'PROC_PAIS_EXT',
  PROC_UNIV_EXT: 'PROC_UNIV_EXT',
  PROC_GRADO_EXT: 'PROC_GRADO_EXT',
  REG_OFICIO: 'REG_OFICIO',
  FEC_MAT_PROG: 'FEC_MAT_PROG',
  FEC_INICIO_PROG: 'FEC_INICIO_PROG',
  FEC_FIN_PROG: 'FEC_FIN_PROG',
  MOD_SUSTENTACION: 'MOD_SUSTENTACION',
  PROC_INST_ORIG: 'PROC_INST_ORIG'
};

exports.Prisma.Tmp_patron_egre_2ScalarFieldEnum = {
  ID: 'ID',
  COD_UNIV: 'COD_UNIV',
  RAZ_SOC: 'RAZ_SOC',
  FAC_NOM: 'FAC_NOM',
  ESC_POS: 'ESC_POS',
  PRIM_APE: 'PRIM_APE',
  SEG_APE: 'SEG_APE',
  NOMBRE: 'NOMBRE',
  SEXO: 'SEXO',
  DOCU_TIP: 'DOCU_TIP',
  DOCU_NUM: 'DOCU_NUM',
  MATRI_FEC: 'MATRI_FEC',
  EGRES_FEC: 'EGRES_FEC',
  ABRE_GYT: 'ABRE_GYT',
  CARR_PROG: 'CARR_PROG',
  DEN_GRAD: 'DEN_GRAD',
  SEG_ESP: 'SEG_ESP',
  PROC_BACH: 'PROC_BACH',
  PROC_INST_ORIG: 'PROC_INST_ORIG',
  PROC_TITULO_PED: 'PROC_TITULO_PED',
  PROG_ESTU: 'PROG_ESTU',
  NUM_CRED: 'NUM_CRED',
  MOD_OBT: 'MOD_OBT',
  MOD_EST: 'MOD_EST',
  REG_METADATO: 'REG_METADATO',
  TRAB_INV: 'TRAB_INV',
  REQ_IDM: 'REQ_IDM',
  PROG_ACREDIT: 'PROG_ACREDIT',
  FEC_INICIO_ACREDIT: 'FEC_INICIO_ACREDIT',
  FEC_FIN_ACREDIT: 'FEC_FIN_ACREDIT',
  FEC_INI_TRA_TIT: 'FEC_INI_TRA_TIT',
  TRAB_INVEST_ORIGINAL: 'TRAB_INVEST_ORIGINAL',
  MEC_UTI: 'MEC_UTI',
  DEP_VER_ORIG: 'DEP_VER_ORIG',
  PROC_REV_PAIS: 'PROC_REV_PAIS',
  PROC_REV_UNIV: 'PROC_REV_UNIV',
  PROC_REV_GRADO: 'PROC_REV_GRADO',
  CRIT_REV: 'CRIT_REV',
  RESO_NUM: 'RESO_NUM',
  RESO_FEC: 'RESO_FEC',
  RESO_NUM_DUP_NUE: 'RESO_NUM_DUP_NUE',
  RESO_FEC_DUP_NUE: 'RESO_FEC_DUP_NUE',
  DIPL_FEC_ORG: 'DIPL_FEC_ORG',
  DIPL_FEC_DUP_NUE: 'DIPL_FEC_DUP_NUE',
  DIPL_NUM: 'DIPL_NUM',
  DIPL_TIP_EMI: 'DIPL_TIP_EMI',
  REG_LIBRO: 'REG_LIBRO',
  REG_FOLIO: 'REG_FOLIO',
  REG_REGISTRO: 'REG_REGISTRO',
  CARGO1: 'CARGO1',
  AUTORIDAD1: 'AUTORIDAD1',
  CARGO2: 'CARGO2',
  AUTORIDAD2: 'AUTORIDAD2',
  CARGO3: 'CARGO3',
  AUTORIDAD3: 'AUTORIDAD3',
  PROC_PAIS_EXT: 'PROC_PAIS_EXT',
  PROC_UNIV_EXT: 'PROC_UNIV_EXT',
  PROC_GRADO_EXT: 'PROC_GRADO_EXT',
  REG_OFICIO: 'REG_OFICIO',
  FEC_MAT_MOD: 'FEC_MAT_MOD',
  FEC_INICIO_MOD: 'FEC_INICIO_MOD',
  FEC_FIN_MOD: 'FEC_FIN_MOD',
  MOD_SUSTENTACI_N: 'MOD_SUSTENTACI_N',
  SUNEDU: 'SUNEDU'
};

exports.Prisma.Tmp_tb_mat_alu_242ScalarFieldEnum = {
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  n_codpla: 'n_codpla',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  cantmat: 'cantmat'
};

exports.Prisma.Top_atencionScalarFieldEnum = {
  idatencion: 'idatencion',
  codtriaje: 'codtriaje',
  codalu: 'codalu',
  codpatologia: 'codpatologia',
  codcond: 'codcond',
  motconsulta: 'motconsulta',
  apetito: 'apetito',
  sed: 'sed',
  sue_o: 'sue_o',
  estadoanimo: 'estadoanimo',
  orina: 'orina',
  deposicion: 'deposicion',
  anotacion: 'anotacion',
  diagnostico: 'diagnostico',
  cantdias: 'cantdias',
  observacion: 'observacion',
  fechaatencion: 'fechaatencion',
  usuarioatencion: 'usuarioatencion',
  ultimavisita: 'ultimavisita',
  estado: 'estado'
};

exports.Prisma.Top_atencion_externaScalarFieldEnum = {
  idatexterna: 'idatexterna',
  idatencion: 'idatencion',
  lugarreferido: 'lugarreferido',
  fechareferido: 'fechareferido',
  rutaarchivo: 'rutaarchivo'
};

exports.Prisma.Top_condicionScalarFieldEnum = {
  codcond: 'codcond',
  desccond: 'desccond'
};

exports.Prisma.Top_especialidadScalarFieldEnum = {
  codesp: 'codesp',
  nomesp: 'nomesp',
  estado: 'estado'
};

exports.Prisma.Top_evolucionScalarFieldEnum = {
  id_evolucion: 'id_evolucion',
  id_atencion: 'id_atencion',
  evolucion: 'evolucion',
  indicacion: 'indicacion',
  d_registro: 'd_registro',
  c_borrado: 'c_borrado',
  id_user: 'id_user',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Top_fichamedicaScalarFieldEnum = {
  id_fichamedica: 'id_fichamedica',
  d_registro: 'd_registro',
  calificacion: 'calificacion',
  observaciones: 'observaciones',
  recomendaciones: 'recomendaciones',
  motivo_examen: 'motivo_examen',
  c_borrado: 'c_borrado',
  id_user: 'id_user',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Top_medicamentoScalarFieldEnum = {
  codmed: 'codmed',
  descmed: 'descmed',
  undmed: 'undmed',
  stockmin: 'stockmin',
  stockmax: 'stockmax',
  estado: 'estado'
};

exports.Prisma.Top_patologiaScalarFieldEnum = {
  codpatologia: 'codpatologia',
  codesp: 'codesp',
  descpatologia: 'descpatologia',
  estado: 'estado'
};

exports.Prisma.Top_triajeScalarFieldEnum = {
  codtriaje: 'codtriaje',
  codalu: 'codalu',
  codesp: 'codesp',
  talla: 'talla',
  peso: 'peso',
  alergia: 'alergia',
  descalergia: 'descalergia',
  temperatura: 'temperatura',
  respiracion: 'respiracion',
  presarterial: 'presarterial',
  saturacion: 'saturacion',
  freccardiaca: 'freccardiaca',
  prioridad: 'prioridad',
  fecharegistro: 'fecharegistro',
  usuarioregistro: 'usuarioregistro'
};

exports.Prisma.Top_user_especialidadScalarFieldEnum = {
  id_user_especialidad: 'id_user_especialidad',
  d_registro: 'd_registro',
  c_user: 'c_user',
  id_especialidad: 'id_especialidad',
  c_borrado: 'c_borrado',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.Umaplus_231_recScalarFieldEnum = {
  id_evaluacion: 'id_evaluacion',
  c_codalu: 'c_codalu',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  paterno: 'paterno',
  materno: 'materno',
  nombres: 'nombres',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  n_nomcur: 'n_nomcur',
  c_grpcur: 'c_grpcur',
  n_codplan: 'n_codplan',
  n_nota: 'n_nota'
};

exports.Prisma.UsersScalarFieldEnum = {
  id: 'id',
  name: 'name',
  email: 'email',
  password: 'password',
  remember_token: 'remember_token',
  created_at: 'created_at',
  updated_at: 'updated_at'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};

exports.Prisma.alumnoOrderByRelevanceFieldEnum = {
  codigo: 'codigo',
  paterno: 'paterno',
  materno: 'materno',
  nombres: 'nombres',
  facultad: 'facultad',
  regimen: 'regimen',
  are_pri: 'are_pri',
  are_sec: 'are_sec',
  c_codesp: 'c_codesp',
  semestre: 'semestre',
  ano_est: 'ano_est',
  seccion: 'seccion',
  sexo: 'sexo',
  condicion: 'condicion',
  usuario: 'usuario',
  hora: 'hora',
  codcurri: 'codcurri',
  resadsalu: 'resadsalu',
  nva_resol: 'nva_resol',
  promo: 'promo',
  id_raco: 'id_raco',
  intranet: 'intranet',
  id_modal: 'id_modal',
  sedcod: 'sedcod',
  foto_carnet: 'foto_carnet',
  sitalu: 'sitalu',
  id_tab_turno: 'id_tab_turno',
  c_escala_pension: 'c_escala_pension',
  c_flag_nuevo_esq_dscto: 'c_flag_nuevo_esq_dscto'
};

exports.Prisma.campo_extraOrderByRelevanceFieldEnum = {
  nombre: 'nombre',
  longitud: 'longitud',
  required: 'required',
  estado: 'estado'
};

exports.Prisma.campo_extra_opcionOrderByRelevanceFieldEnum = {
  descripcion: 'descripcion'
};

exports.Prisma.campo_extra_tablaOrderByRelevanceFieldEnum = {
  tabla: 'tabla',
  nombre: 'nombre',
  estado: 'estado'
};

exports.Prisma.campo_extra_tipoOrderByRelevanceFieldEnum = {
  nombre: 'nombre',
  esquema: 'esquema',
  clase: 'clase',
  longitud: 'longitud',
  estado: 'estado'
};

exports.Prisma.campo_extra_valorOrderByRelevanceFieldEnum = {
  id_tabla: 'id_tabla',
  valor: 'valor'
};

exports.Prisma.curlleOrderByRelevanceFieldEnum = {
  codalu: 'codalu',
  codper: 'codper',
  codcur: 'codcur',
  cargo: 'cargo',
  user_name: 'user_name',
  tar: 'tar',
  curs_conva: 'curs_conva',
  reso_conva: 'reso_conva',
  reso_sub: 'reso_sub',
  cndcurlle: 'cndcurlle',
  c_grpcur: 'c_grpcur',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  c_estado_conv: 'c_estado_conv'
};

exports.Prisma.eval_moodle_siguOrderByRelevanceFieldEnum = {
  nombre_eval: 'nombre_eval',
  nombre_moodle: 'nombre_moodle'
};

exports.Prisma.rep_reporteOrderByRelevanceFieldEnum = {
  nombre_reporte: 'nombre_reporte',
  tipo_reporte: 'tipo_reporte'
};

exports.Prisma.rep_reporte_db_orderbyOrderByRelevanceFieldEnum = {
  orderby_column: 'orderby_column',
  orderby_direction: 'orderby_direction'
};

exports.Prisma.rep_reporte_db_selectOrderByRelevanceFieldEnum = {
  select_column: 'select_column',
  select_alias: 'select_alias'
};

exports.Prisma.rep_reporte_db_tableOrderByRelevanceFieldEnum = {
  table_name: 'table_name'
};

exports.Prisma.rep_reporte_db_whereOrderByRelevanceFieldEnum = {
  where_column: 'where_column',
  where_operator: 'where_operator',
  where_value: 'where_value',
  where_boolean: 'where_boolean'
};

exports.Prisma.rep_reporte_filtroOrderByRelevanceFieldEnum = {
  nombre_filtro: 'nombre_filtro',
  cod_fuente: 'cod_fuente'
};

exports.Prisma.rep_reporte_filtro_fuenteOrderByRelevanceFieldEnum = {
  cod_fuente: 'cod_fuente',
  fuente_tipo: 'fuente_tipo',
  fuente_clase: 'fuente_clase',
  fuente_metodo: 'fuente_metodo'
};

exports.Prisma.rep_reporte_inputOrderByRelevanceFieldEnum = {
  input_type: 'input_type',
  input_label: 'input_label',
  input_placeholder: 'input_placeholder'
};

exports.Prisma.rep_reporte_input_optionOrderByRelevanceFieldEnum = {
  option_value: 'option_value',
  option_label: 'option_label',
  option_operator: 'option_operator'
};

exports.Prisma.rep_reporte_resultadoOrderByRelevanceFieldEnum = {
  nombre_resultado: 'nombre_resultado'
};

exports.Prisma.rep_reporte_salidaOrderByRelevanceFieldEnum = {
  nombre_salida: 'nombre_salida',
  tipo_salida: 'tipo_salida'
};

exports.Prisma.scr_tb_score_categoriaOrderByRelevanceFieldEnum = {
  nombre: 'nombre',
  btn_tipo: 'btn_tipo',
  created_by: 'created_by',
  updated_by: 'updated_by'
};

exports.Prisma.scr_tb_score_entidadOrderByRelevanceFieldEnum = {
  entidad: 'entidad',
  tb_entidad: 'tb_entidad',
  tb_entidad_score: 'tb_entidad_score'
};

exports.Prisma.semipresencial_23OrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.semipresencial_alu_23OrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.sga_egre_alu_seguir_cabOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  situ_actual: 'situ_actual'
};

exports.Prisma.sga_egre_alu_seguir_detOrderByRelevanceFieldEnum = {
  tipo_empleo: 'tipo_empleo',
  tiempo: 'tiempo',
  medio: 'medio',
  nombre_empre: 'nombre_empre',
  ruc: 'ruc',
  ubicacion: 'ubicacion',
  actividad: 'actividad',
  tipo_org: 'tipo_org',
  cargo: 'cargo',
  tipo_cargo: 'tipo_cargo',
  personal_cargo: 'personal_cargo',
  tipo_jornada: 'tipo_jornada',
  area_desempe_o: 'area_desempe_o',
  motivo: 'motivo',
  salario: 'salario',
  logros: 'logros',
  estado: 'estado',
  obs: 'obs',
  c_codesp: 'c_codesp',
  rel_trab_esp: 'rel_trab_esp',
  c_sugerencias: 'c_sugerencias',
  motivo_sin_trabajo: 'motivo_sin_trabajo'
};

exports.Prisma.sga_licencias_zoomOrderByRelevanceFieldEnum = {
  tituloAula: 'tituloAula',
  api_key: 'api_key',
  api_secret: 'api_secret',
  account_id: 'account_id',
  email_relacionado_api: 'email_relacionado_api'
};

exports.Prisma.sga_ms_cursoOrderByRelevanceFieldEnum = {
  c_codcur: 'c_codcur',
  c_nomcur: 'c_nomcur',
  id_tc: 'id_tc',
  prereq: 'prereq',
  resoling: 'resoling',
  resolcor: 'resolcor',
  user_ing: 'user_ing',
  c_tipcur: 'c_tipcur'
};

exports.Prisma.sga_reg_alu_zoomOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codreunionzoom: 'c_codreunionzoom',
  id_registrant: 'id_registrant'
};

exports.Prisma.sga_reuniones_zoomOrderByRelevanceFieldEnum = {
  idReunionZoom: 'idReunionZoom',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_grpcur: 'c_grpcur',
  c_codcur: 'c_codcur',
  temaReunion: 'temaReunion',
  idOcurrenciaZoom: 'idOcurrenciaZoom'
};

exports.Prisma.sga_tb_adm_clienteOrderByRelevanceFieldEnum = {
  id_mod_ing: 'id_mod_ing',
  c_apepat: 'c_apepat',
  c_apemat: 'c_apemat',
  c_nombres: 'c_nombres',
  c_tipdoc: 'c_tipdoc',
  c_numdoc: 'c_numdoc',
  c_dptonac: 'c_dptonac',
  c_provnac: 'c_provnac',
  c_distnac: 'c_distnac',
  c_dptodom: 'c_dptodom',
  c_provdom: 'c_provdom',
  c_distdom: 'c_distdom',
  c_dir: 'c_dir',
  c_codpos: 'c_codpos',
  c_fono: 'c_fono',
  c_celu: 'c_celu',
  c_email: 'c_email',
  c_procedencia: 'c_procedencia',
  c_colg_ubicacion: 'c_colg_ubicacion',
  c_tippro: 'c_tippro',
  c_anoegreso: 'c_anoegreso',
  c_codfac1: 'c_codfac1',
  c_codesp1: 'c_codesp1',
  c_codfac2: 'c_codfac2',
  c_codesp2: 'c_codesp2',
  c_sedcod: 'c_sedcod',
  c_codmod: 'c_codmod',
  id_tab_turno: 'id_tab_turno',
  id_tab_sitalu: 'id_tab_sitalu',
  c_nomapo: 'c_nomapo',
  c_dniapo: 'c_dniapo',
  c_fonoapo: 'c_fonoapo',
  c_celuapo: 'c_celuapo',
  c_parentescoapo: 'c_parentescoapo',
  c_nomapo_2: 'c_nomapo_2',
  c_dniapo_2: 'c_dniapo_2',
  c_fonoapo_2: 'c_fonoapo_2',
  c_celuapo_2: 'c_celuapo_2',
  c_parentescoapo_2: 'c_parentescoapo_2',
  id_tab_alu_contact: 'id_tab_alu_contact',
  c_obs: 'c_obs',
  c_sexo: 'c_sexo',
  c_paisnac: 'c_paisnac',
  id_user: 'id_user',
  cod_asesor: 'cod_asesor',
  user_upd_asesor: 'user_upd_asesor',
  c_procedencia_ext: 'c_procedencia_ext',
  user_val_pago: 'user_val_pago',
  c_rec_motivo: 'c_rec_motivo',
  user_rec_pago: 'user_rec_pago',
  c_canales: 'c_canales',
  c_seguimiento: 'c_seguimiento',
  c_fijo: 'c_fijo',
  c_datacadiat: 'c_datacadiat',
  c_tiptrabiat: 'c_tiptrabiat',
  c_entilabact: 'c_entilabact',
  c_tipprogiat: 'c_tipprogiat',
  c_ietnica: 'c_ietnica',
  c_lengua_nat: 'c_lengua_nat',
  c_idioma_ext: 'c_idioma_ext',
  c_cond_discap: 'c_cond_discap',
  c_codigo_orcid: 'c_codigo_orcid',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype'
};

exports.Prisma.sga_tb_adm_cliente_segOrderByRelevanceFieldEnum = {
  id_tipo: 'id_tipo',
  c_seguimiento: 'c_seguimiento',
  c_observacion: 'c_observacion',
  c_estado: 'c_estado',
  id_user: 'id_user'
};

exports.Prisma.sga_tb_adm_faseOrderByRelevanceFieldEnum = {
  c_nomfase: 'c_nomfase'
};

exports.Prisma.sga_tb_adm_filesOrderByRelevanceFieldEnum = {
  c_numdoc: 'c_numdoc',
  d_original_name: 'd_original_name',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype',
  c_docreq: 'c_docreq'
};

exports.Prisma.sga_tb_adm_procesoOrderByRelevanceFieldEnum = {
  c_codpro: 'c_codpro',
  c_nompro: 'c_nompro',
  c_activo: 'c_activo',
  c_web: 'c_web',
  c_codfac: 'c_codfac',
  c_descripcion: 'c_descripcion'
};

exports.Prisma.sga_tb_adm_text_formOrderByRelevanceFieldEnum = {
  description: 'description'
};

exports.Prisma.sga_tb_admision_vacantesOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmod: 'c_codmod'
};

exports.Prisma.sga_tb_asistalu_dict_clase_progOrderByRelevanceFieldEnum = {
  c_dnidoc: 'c_dnidoc',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_tipo_clase: 'c_tipo_clase',
  c_aula: 'c_aula',
  c_link: 'c_link',
  c_nomcur: 'c_nomcur',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_codesp: 'c_codesp'
};

exports.Prisma.sga_tb_asistdoc_dict_clase_progOrderByRelevanceFieldEnum = {
  c_dnidoc: 'c_dnidoc',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_tipo_docente: 'c_tipo_docente',
  c_tipo_clase: 'c_tipo_clase',
  c_estado_dictado: 'c_estado_dictado',
  c_yyyy: 'c_yyyy',
  c_mm: 'c_mm',
  c_dd: 'c_dd',
  c_hh: 'c_hh',
  c_mi: 'c_mi',
  c_aula: 'c_aula',
  c_fh_inicio_prog: 'c_fh_inicio_prog',
  c_fh_fin_prog: 'c_fh_fin_prog',
  c_fh_inicio: 'c_fh_inicio',
  c_fh_fin: 'c_fh_fin',
  c_nomcur: 'c_nomcur',
  id_motivo: 'id_motivo',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_codesp: 'c_codesp'
};

exports.Prisma.sga_tb_boletin_aluOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_descripcion: 'c_descripcion',
  activo: 'activo',
  c_codesp: 'c_codesp',
  n_ciclo: 'n_ciclo',
  c_grpcur: 'c_grpcur'
};

exports.Prisma.sga_tb_boletin_docOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_grpcur: 'c_grpcur',
  c_descripcion: 'c_descripcion',
  activo: 'activo'
};

exports.Prisma.sga_tb_campanaOrderByRelevanceFieldEnum = {
  n_codper: 'n_codper',
  usuario: 'usuario'
};

exports.Prisma.sga_tb_campana_detOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.sga_tb_campana_espOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.sga_tb_campa_aOrderByRelevanceFieldEnum = {
  n_codper: 'n_codper',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.sga_tb_cargoOrderByRelevanceFieldEnum = {
  cod_cargo: 'cod_cargo',
  nom_cargo: 'nom_cargo',
  nom_oficina: 'nom_oficina',
  nom_autoridad: 'nom_autoridad',
  activo: 'activo',
  cargo_resol: 'cargo_resol'
};

exports.Prisma.sga_tb_control_alumnoOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  id_usuario: 'id_usuario'
};

exports.Prisma.sga_tb_doc_gradoOrderByRelevanceFieldEnum = {
  c_dnidoc: 'c_dnidoc',
  c_codgra: 'c_codgra',
  univcod: 'univcod',
  c_mencion: 'c_mencion',
  c_pais: 'c_pais'
};

exports.Prisma.sga_tb_log_alumnoOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  tipo: 'tipo'
};

exports.Prisma.sga_tb_log_docenteOrderByRelevanceFieldEnum = {
  c_dnidoc: 'c_dnidoc'
};

exports.Prisma.sga_tb_modalidad_ingresoOrderByRelevanceFieldEnum = {
  id_mod_ing: 'id_mod_ing',
  c_descri: 'c_descri',
  c_web: 'c_web'
};

exports.Prisma.sgb_tb_alu_certificadoOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_institucion: 'c_institucion',
  c_des_certificado: 'c_des_certificado',
  d_fecha_certificado: 'd_fecha_certificado'
};

exports.Prisma.sgb_tb_alu_conocimientoOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_des_conocimiento: 'c_des_conocimiento',
  c_nivel_conocimiento: 'c_nivel_conocimiento'
};

exports.Prisma.sgb_tb_alu_cursoOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_institucion: 'c_institucion',
  c_nivel_est: 'c_nivel_est',
  c_des_curso: 'c_des_curso',
  c_estado_curso: 'c_estado_curso',
  c_per_mes1: 'c_per_mes1',
  c_per_ano1: 'c_per_ano1',
  c_per_mes2: 'c_per_mes2',
  c_per_ano2: 'c_per_ano2'
};

exports.Prisma.sgb_tb_alu_cvOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype'
};

exports.Prisma.sgb_tb_alu_experiencia_profesionalOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_empresa_ep: 'c_empresa_ep',
  c_sector_ep: 'c_sector_ep',
  c_cargo_ep: 'c_cargo_ep',
  c_area_cargo_ep: 'c_area_cargo_ep',
  c_activo_ep: 'c_activo_ep',
  c_per_mes1: 'c_per_mes1',
  c_per_ano1: 'c_per_ano1',
  c_per_mes2: 'c_per_mes2',
  c_per_ano2: 'c_per_ano2',
  c_funciones_logos_ep: 'c_funciones_logos_ep'
};

exports.Prisma.sgb_tb_alu_f_acadOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_institucion: 'c_institucion',
  c_nivel_est: 'c_nivel_est',
  c_des_f_acad: 'c_des_f_acad',
  c_estado_f_acad: 'c_estado_f_acad',
  c_per_mes1: 'c_per_mes1',
  c_per_ano1: 'c_per_ano1',
  c_per_mes2: 'c_per_mes2',
  c_per_ano2: 'c_per_ano2'
};

exports.Prisma.sgb_tb_alu_idiomaOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_idioma: 'c_idioma',
  c_idioma_nivel: 'c_idioma_nivel'
};

exports.Prisma.sgb_tb_alu_interesOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_des_interes: 'c_des_interes'
};

exports.Prisma.sgb_tb_alu_perfilOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_perfil: 'c_perfil'
};

exports.Prisma.sgb_tb_alu_postulanteOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  cod_etapa: 'cod_etapa'
};

exports.Prisma.sgb_tb_alu_referenciaOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_nombres_refe: 'c_nombres_refe',
  c_cargo_refe: 'c_cargo_refe',
  c_empresa_refe: 'c_empresa_refe',
  c_email_refe: 'c_email_refe',
  c_fono1: 'c_fono1',
  c_fono2: 'c_fono2'
};

exports.Prisma.sgb_tb_alu_seminarioOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_institucion: 'c_institucion',
  c_titulo: 'c_titulo',
  c_des_seminario: 'c_des_seminario',
  c_estado_curso: 'c_estado_curso',
  c_per_mes1: 'c_per_mes1',
  c_per_ano1: 'c_per_ano1',
  c_per_mes2: 'c_per_mes2',
  c_per_ano2: 'c_per_ano2'
};

exports.Prisma.sgb_tb_ofertaOrderByRelevanceFieldEnum = {
  c_sitalu: 'c_sitalu',
  c_codesp: 'c_codesp',
  c_titulo: 'c_titulo',
  c_competencia: 'c_competencia',
  c_funciones: 'c_funciones',
  c_conocimientos: 'c_conocimientos',
  c_area_oficina: 'c_area_oficina',
  c_salario: 'c_salario',
  c_destino: 'c_destino',
  c_horario: 'c_horario',
  c_pais: 'c_pais',
  c_dpto: 'c_dpto',
  c_link: 'c_link',
  c_estado: 'c_estado',
  c_datos_postulacion: 'c_datos_postulacion',
  c_info_adicional: 'c_info_adicional',
  c_beneficios: 'c_beneficios'
};

exports.Prisma.sged_tb_eva_doc_cabOrderByRelevanceFieldEnum = {
  c_dnidoc: 'c_dnidoc',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  d_archivo: 'd_archivo',
  c_observacion: 'c_observacion',
  c_estado: 'c_estado'
};

exports.Prisma.sged_tb_eva_doc_detOrderByRelevanceFieldEnum = {
  d_resultado: 'd_resultado'
};

exports.Prisma.sged_tb_eva_doc_pregOrderByRelevanceFieldEnum = {
  c_descripcion: 'c_descripcion'
};

exports.Prisma.sgh_tb_cursos_proyectadosOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_nomcur: 'c_nomcur'
};

exports.Prisma.sgt_tb_alu_beca_autorizacionOrderByRelevanceFieldEnum = {
  c_grupo: 'c_grupo',
  c_codalu: 'c_codalu',
  c_obs: 'c_obs',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_user: 'c_user',
  c_estado: 'c_estado'
};

exports.Prisma.sgt_tb_alu_cuotaOrderByRelevanceFieldEnum = {
  c_escala_pension: 'c_escala_pension',
  c_codalu: 'c_codalu',
  id_tipdoc: 'id_tipdoc',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  c_estado: 'c_estado',
  c_numope: 'c_numope',
  c_ccosto: 'c_ccosto',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_flag_rec: 'c_flag_rec',
  c_flag_rec_pp: 'c_flag_rec_pp',
  c_becas_arr: 'c_becas_arr'
};

exports.Prisma.sgt_tb_alu_cuota_20242_pg_seg_elimOrderByRelevanceFieldEnum = {
  c_escala_pension: 'c_escala_pension',
  c_codalu: 'c_codalu',
  id_tipdoc: 'id_tipdoc',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  c_estado: 'c_estado',
  c_numope: 'c_numope',
  c_ccosto: 'c_ccosto',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.sgt_tb_alu_cuota_20251_es_seg_elimOrderByRelevanceFieldEnum = {
  c_escala_pension: 'c_escala_pension',
  c_codalu: 'c_codalu',
  id_tipdoc: 'id_tipdoc',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  c_estado: 'c_estado',
  c_numope: 'c_numope',
  c_ccosto: 'c_ccosto',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_flag_rec: 'c_flag_rec',
  c_flag_rec_pp: 'c_flag_rec_pp',
  c_becas_arr: 'c_becas_arr'
};

exports.Prisma.sgt_tb_alu_cuota_dscto_adicionalOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_cuota: 'c_cuota',
  c_obs: 'c_obs',
  c_user: 'c_user'
};

exports.Prisma.sgt_tb_alu_cuota_matOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_pering: 'c_pering',
  c_descri: 'c_descri',
  c_label: 'c_label',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.sgt_tb_alu_cuota_pensionOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_pering: 'c_pering',
  c_descri: 'c_descri',
  c_label: 'c_label',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.sgt_tb_alu_cuota_retiro_dscto_manualOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_estado: 'c_estado',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  c_numope: 'c_numope'
};

exports.Prisma.sgt_tb_alu_cuota_saldo_favorOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_cuota: 'c_cuota',
  c_obs: 'c_obs',
  c_user: 'c_user'
};

exports.Prisma.sgt_tb_alu_cuota_scoreOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  score_nombre: 'score_nombre'
};

exports.Prisma.sgt_tb_alu_facturaOrderByRelevanceFieldEnum = {
  c_ruc: 'c_ruc',
  c_razsoc: 'c_razsoc',
  c_direccion: 'c_direccion',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  c_forma_pago: 'c_forma_pago',
  c_obs: 'c_obs',
  c_igvtipo: 'c_igvtipo'
};

exports.Prisma.sgt_tb_alu_pago_anuladoOrderByRelevanceFieldEnum = {
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  id_tipdoc: 'id_tipdoc',
  id_user: 'id_user'
};

exports.Prisma.sgt_tb_alu_pago_asignadoOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_grpcur: 'c_grpcur'
};

exports.Prisma.sgt_tb_alu_pago_asignado_detOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_flag: 'c_flag'
};

exports.Prisma.sgt_tb_alu_pago_asignado_det_elim_carnetOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_flag: 'c_flag'
};

exports.Prisma.sgt_tb_alu_pago_asignado_det_elim_es_20251OrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_flag: 'c_flag'
};

exports.Prisma.sgt_tb_alu_pago_asignado_det_elim_pg_20242OrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_flag: 'c_flag'
};

exports.Prisma.sgt_tb_alu_pago_asignado_det_elim_se_20243OrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_flag: 'c_flag'
};

exports.Prisma.sgt_tb_alu_pago_cabOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_razon_social: 'c_razon_social',
  c_tipdoc: 'c_tipdoc',
  c_numdocu: 'c_numdocu',
  c_estado: 'c_estado',
  c_estado_pago: 'c_estado_pago',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_ciclo: 'c_ciclo',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_sedcod_pago: 'c_sedcod_pago'
};

exports.Prisma.sgt_tb_alu_pago_detOrderByRelevanceFieldEnum = {
  c_estado_pago_cab: 'c_estado_pago_cab',
  c_codalu: 'c_codalu',
  c_numope: 'c_numope',
  c_numorden: 'c_numorden',
  id_tipdoc: 'id_tipdoc',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  c_numdoc_rel: 'c_numdoc_rel',
  c_origen: 'c_origen',
  c_afecta: 'c_afecta',
  c_estado: 'c_estado',
  c_user: 'c_user'
};

exports.Prisma.sgt_tb_alu_pago_docOrderByRelevanceFieldEnum = {
  id_tipodoc: 'id_tipodoc',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  c_codalu: 'c_codalu',
  c_estado_doc: 'c_estado_doc',
  c_usureg: 'c_usureg',
  c_sedcod: 'c_sedcod',
  c_sedcod_pago: 'c_sedcod_pago',
  c_ciclo: 'c_ciclo',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_forma_pago: 'c_forma_pago',
  c_obs: 'c_obs',
  c_qr: 'c_qr',
  c_nube_pdf: 'c_nube_pdf',
  c_ruta_txt: 'c_ruta_txt'
};

exports.Prisma.sgt_tb_alu_pago_doc_cuotaOrderByRelevanceFieldEnum = {
  c_user: 'c_user'
};

exports.Prisma.sgt_tb_alu_pago_doc_detOrderByRelevanceFieldEnum = {
  descri_pago: 'descri_pago',
  tipo_afecta: 'tipo_afecta',
  origen_pago: 'origen_pago'
};

exports.Prisma.sgt_tb_alu_pago_eliminadoOrderByRelevanceFieldEnum = {
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  n_pago_eliminado: 'n_pago_eliminado',
  id_tipodoc: 'id_tipodoc',
  id_user: 'id_user'
};

exports.Prisma.sgt_tb_alu_pago_obsOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_obs: 'c_obs'
};

exports.Prisma.sgt_tb_alu_pago_variosOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_numope: 'c_numope',
  c_numdoc: 'c_numdoc'
};

exports.Prisma.sgt_tb_beca_autorizacionOrderByRelevanceFieldEnum = {
  c_descri: 'c_descri',
  c_porc: 'c_porc',
  c_label: 'c_label'
};

exports.Prisma.sgt_tb_cta_bancoOrderByRelevanceFieldEnum = {
  c_nro_cta: 'c_nro_cta',
  c_cci: 'c_cci',
  c_moneda: 'c_moneda',
  c_cta_contable: 'c_cta_contable',
  c_label: 'c_label'
};

exports.Prisma.sgt_tb_descuento_cuotaOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  n_ciclo: 'n_ciclo'
};

exports.Prisma.sgt_tb_egreso_autorizaOrderByRelevanceFieldEnum = {
  id_responsable: 'id_responsable',
  sit_egreso: 'sit_egreso',
  concepto_egreso: 'concepto_egreso',
  autorizado_egreso: 'autorizado_egreso',
  solicitante_egreso: 'solicitante_egreso',
  cod_user_autoriza: 'cod_user_autoriza',
  c_sedcod: 'c_sedcod',
  user_reing: 'user_reing',
  id_tipodoc: 'id_tipodoc',
  c_numdoc: 'c_numdoc',
  c_origen: 'c_origen',
  c_numope: 'c_numope',
  c_razon_social: 'c_razon_social',
  c_numdocu: 'c_numdocu'
};

exports.Prisma.sgt_tb_escala_pagoOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_escala_pension: 'c_escala_pension'
};

exports.Prisma.sgt_tb_impuestoOrderByRelevanceFieldEnum = {
  c_impuesto_cod: 'c_impuesto_cod',
  c_impuesto_abrev: 'c_impuesto_abrev',
  c_impuesto_nombre: 'c_impuesto_nombre',
  c_factor_tipo: 'c_factor_tipo',
  c_estado: 'c_estado'
};

exports.Prisma.sgt_tb_incremento_x_repOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  n_ciclo: 'n_ciclo'
};

exports.Prisma.sgt_tb_nota_creditoOrderByRelevanceFieldEnum = {
  c_serdoc_nota: 'c_serdoc_nota',
  c_numdoc_nota: 'c_numdoc_nota',
  id_nota_credito_tipo: 'id_nota_credito_tipo',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  c_motivo: 'c_motivo',
  id_tipdoc: 'id_tipdoc',
  id_user: 'id_user'
};

exports.Prisma.sgt_tb_nota_credito_tipoOrderByRelevanceFieldEnum = {
  id_nota_credito_tipo: 'id_nota_credito_tipo',
  c_descripcion: 'c_descripcion'
};

exports.Prisma.sgt_tb_origen_pagoOrderByRelevanceFieldEnum = {
  c_origen_cod: 'c_origen_cod',
  c_origen_label: 'c_origen_label',
  c_origen_desc: 'c_origen_desc',
  c_estado: 'c_estado'
};

exports.Prisma.sgt_tb_pago_asigandoOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.sgt_tb_promocionOrderByRelevanceFieldEnum = {
  c_sedcod: 'c_sedcod',
  c_descripcion: 'c_descripcion',
  c_user: 'c_user'
};

exports.Prisma.sgt_tb_promocion_aluOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_nomesp: 'c_nomesp',
  c_codalu: 'c_codalu',
  c_nomalu: 'c_nomalu',
  c_estado_prom: 'c_estado_prom'
};

exports.Prisma.sgt_tb_promocion_progOrderByRelevanceFieldEnum = {
  c_codesp: 'c_codesp',
  c_estado_prog: 'c_estado_prog'
};

exports.Prisma.sgt_tb_promocion_reglaOrderByRelevanceFieldEnum = {
  c_rango: 'c_rango'
};

exports.Prisma.sgt_tb_prorrogaOrderByRelevanceFieldEnum = {
  id_tab_opc: 'id_tab_opc',
  c_observacion: 'c_observacion',
  c_user: 'c_user'
};

exports.Prisma.sgt_tb_serie_doc_pagoOrderByRelevanceFieldEnum = {
  tipdoc: 'tipdoc',
  serie: 'serie',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.sgt_tb_tarifaOrderByRelevanceFieldEnum = {
  c_descri: 'c_descri',
  c_label: 'c_label',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_sedcod: 'c_sedcod',
  c_codmod: 'c_codmod',
  c_pering: 'c_pering',
  id_user: 'id_user'
};

exports.Prisma.sgt_tb_tarifa_cuota_cicloOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  n_ciclo: 'n_ciclo'
};

exports.Prisma.sgt_tb_tarifa_matricula_credOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  n_ciclo: 'n_ciclo'
};

exports.Prisma.sgt_tb_tipo_doc_pagoOrderByRelevanceFieldEnum = {
  id_tipdoc: 'id_tipdoc',
  c_descrip: 'c_descrip'
};

exports.Prisma.sgt_tb_tipo_monedaOrderByRelevanceFieldEnum = {
  c_descri: 'c_descri',
  c_label: 'c_label'
};

exports.Prisma.sgt_tb_tipo_pagoOrderByRelevanceFieldEnum = {
  c_descri: 'c_descri',
  c_label: 'c_label',
  c_cta_contable: 'c_cta_contable',
  c_debe1: 'c_debe1',
  c_debe2: 'c_debe2',
  c_haber1: 'c_haber1',
  c_categoria: 'c_categoria',
  c_pago_alu: 'c_pago_alu'
};

exports.Prisma.sgt_tb_venc_pronto_pagoOrderByRelevanceFieldEnum = {
  c_grupo: 'c_grupo'
};

exports.Prisma.sgt_tb_vencimientoOrderByRelevanceFieldEnum = {
  c_grupo: 'c_grupo',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.stg_espacioOrderByRelevanceFieldEnum = {
  cod_tipo_espacio: 'cod_tipo_espacio'
};

exports.Prisma.t_sedesOrderByRelevanceFieldEnum = {
  sedcod: 'sedcod',
  sednom: 'sednom',
  seddir: 'seddir',
  c_activo: 'c_activo',
  c_activo_web: 'c_activo_web',
  c_abrevsed: 'c_abrevsed'
};

exports.Prisma.tb_admin_facultadOrderByRelevanceFieldEnum = {
  c_codadm: 'c_codadm',
  c_codfac: 'c_codfac'
};

exports.Prisma.tb_admin_modalidadOrderByRelevanceFieldEnum = {
  c_codadm: 'c_codadm',
  c_codmod: 'c_codmod'
};

exports.Prisma.tb_admin_usuarioOrderByRelevanceFieldEnum = {
  cod_admin: 'cod_admin',
  clave: 'clave',
  prefijo: 'prefijo',
  nombre: 'nombre',
  apellidos: 'apellidos',
  emails: 'emails',
  telefonos: 'telefonos',
  sexo: 'sexo',
  c_auth_egreso: 'c_auth_egreso',
  c_sedcod: 'c_sedcod',
  c_clave2: 'c_clave2'
};

exports.Prisma.tb_alu_cur_grpOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_estado: 'c_estado',
  c_codesp: 'c_codesp',
  semestre: 'semestre',
  c_sedcod: 'c_sedcod',
  c_codper: 'c_codper',
  observacion: 'observacion',
  c_codfacalu: 'c_codfacalu',
  c_codespalu: 'c_codespalu',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu'
};

exports.Prisma.tb_alu_deportistaOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  descripcion: 'descripcion',
  c_estado: 'c_estado',
  c_borrado: 'c_borrado'
};

exports.Prisma.tb_alu_evaOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_nota: 'c_nota',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.tb_alu_eva_recOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_estado: 'c_estado',
  c_codadm: 'c_codadm',
  c_resol: 'c_resol',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype',
  c_motivo: 'c_motivo',
  c_resultado: 'c_resultado',
  c_motivo_rechazo: 'c_motivo_rechazo'
};

exports.Prisma.tb_alu_eva_rec_docOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_dnidoc: 'c_dnidoc',
  c_codadm: 'c_codadm'
};

exports.Prisma.tb_alu_eva_updOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  paterno: 'paterno',
  materno: 'materno',
  nombres: 'nombres',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_nomcur: 'c_nomcur',
  c_grpcur: 'c_grpcur',
  c_ciclo: 'c_ciclo'
};

exports.Prisma.tb_alu_historialOrderByRelevanceFieldEnum = {
  c_grado: 'c_grado',
  c_codalu: 'c_codalu',
  accion_descripcion: 'accion_descripcion',
  observacion: 'observacion',
  c_borrado: 'c_borrado',
  c_tipo_accion: 'c_tipo_accion'
};

exports.Prisma.tb_alu_psicofisicoOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_estado: 'c_estado',
  c_borrado: 'c_borrado',
  c_tipo_origen: 'c_tipo_origen'
};

exports.Prisma.tb_alu_reincoporacionOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_estado: 'c_estado',
  c_borrado: 'c_borrado',
  c_tipo_reincoporacion: 'c_tipo_reincoporacion'
};

exports.Prisma.tb_alu_rigorOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  descripcion: 'descripcion',
  c_borrado: 'c_borrado',
  c_tipo_rigor: 'c_tipo_rigor'
};

exports.Prisma.tb_alum_pagoOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_tipo: 'c_tipo',
  c_numdoc: 'c_numdoc',
  c_detalle: 'c_detalle',
  c_codadm: 'c_codadm'
};

exports.Prisma.tb_alumno_cambio_especOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_datos_antes: 'c_datos_antes',
  c_datos_ahora: 'c_datos_ahora',
  c_admin: 'c_admin',
  c_resol: 'c_resol',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.tb_alumno_cambio_modalOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_datos_antes: 'c_datos_antes',
  c_datos_ahora: 'c_datos_ahora',
  c_admin: 'c_admin',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.tb_alumno_cambio_sedeOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_datos_antes: 'c_datos_antes',
  c_datos_ahora: 'c_datos_ahora',
  c_admin: 'c_admin',
  c_resol: 'c_resol',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.tb_alumno_cambio_situOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_datos_antes: 'c_datos_antes',
  c_datos_ahora: 'c_datos_ahora',
  c_admin: 'c_admin',
  c_resol: 'c_resol',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.tb_alumno_consolidadoOrderByRelevanceFieldEnum = {
  c_numcer: 'c_numcer',
  c_codalu: 'c_codalu',
  c_user: 'c_user',
  c_tipcer: 'c_tipcer',
  d_fecha: 'd_fecha',
  c_ruta: 'c_ruta',
  c_alecer: 'c_alecer',
  c_codfac: 'c_codfac',
  c_newcer: 'c_newcer',
  c_carpet: 'c_carpet'
};

exports.Prisma.tb_alumno_constanciaOrderByRelevanceFieldEnum = {
  c_numcer: 'c_numcer',
  c_codalu: 'c_codalu',
  c_user: 'c_user',
  c_tipcer: 'c_tipcer',
  d_fecha: 'd_fecha',
  c_codfac: 'c_codfac'
};

exports.Prisma.tb_alumno_diplomaOrderByRelevanceFieldEnum = {
  c_tipreg: 'c_tipreg',
  c_tipdip: 'c_tipdip',
  c_codalu: 'c_codalu',
  id_diploma: 'id_diploma',
  c_coddip: 'c_coddip',
  c_usureg: 'c_usureg',
  diploma: 'diploma',
  name_file: 'name_file'
};

exports.Prisma.tb_alumno_encuesta_procesoOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_matri: 'c_matri',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_sitalu: 'c_sitalu'
};

exports.Prisma.tb_alumno_encuesta_registroopcOrderByRelevanceFieldEnum = {
  codigo_alumno: 'codigo_alumno',
  comentario: 'comentario'
};

exports.Prisma.tb_alumno_encuesta_respuestaOrderByRelevanceFieldEnum = {
  codigo_alumno: 'codigo_alumno',
  c_estado: 'c_estado'
};

exports.Prisma.tb_alumno_expeditoOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codadm: 'c_codadm'
};

exports.Prisma.tb_alumno_iaOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  promo: 'promo',
  c_codmod: 'c_codmod',
  c_user: 'c_user',
  c_logmaq: 'c_logmaq',
  c_numia: 'c_numia',
  c_codinf: 'c_codinf'
};

exports.Prisma.tb_alumno_ia_txtOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_txt: 'c_txt',
  c_codmod: 'c_codmod'
};

exports.Prisma.tb_alumno_licencia_matOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype',
  c_user: 'c_user',
  c_resol_reing: 'c_resol_reing',
  c_admin_reing: 'c_admin_reing'
};

exports.Prisma.tb_alumno_reingOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_datos_antes: 'c_datos_antes',
  c_datos_ahora: 'c_datos_ahora',
  c_admin: 'c_admin',
  c_resol: 'c_resol'
};

exports.Prisma.tb_alumno_resOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_user: 'c_user',
  c_numres: 'c_numres',
  c_data: 'c_data'
};

exports.Prisma.tb_alumno_reserva_matOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_resol: 'c_resol',
  c_admin: 'c_admin',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype',
  c_resol_reing: 'c_resol_reing',
  c_admin_reing: 'c_admin_reing'
};

exports.Prisma.tb_alumno_token_claveOrderByRelevanceFieldEnum = {
  c_token: 'c_token',
  c_codigoalum: 'c_codigoalum'
};

exports.Prisma.tb_area_adminOrderByRelevanceFieldEnum = {
  c_nom_area: 'c_nom_area',
  c_abrev: 'c_abrev',
  c_tipo: 'c_tipo',
  tra_alu: 'tra_alu'
};

exports.Prisma.tb_asis_alumOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_dnidoc: 'c_dnidoc',
  c_estado: 'c_estado',
  c_tema: 'c_tema',
  c_sedcod: 'c_sedcod',
  tipo: 'tipo',
  auto: 'auto',
  mins: 'mins',
  c_user_upd: 'c_user_upd'
};

exports.Prisma.tb_asis_alum_detOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_estado: 'c_estado'
};

exports.Prisma.tb_asis_alum_justifOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_estado_old: 'c_estado_old',
  c_argumento: 'c_argumento',
  c_file: 'c_file',
  usuario: 'usuario'
};

exports.Prisma.tb_avancealuOrderByRelevanceFieldEnum = {
  codalu: 'codalu',
  codfac: 'codfac',
  codesp: 'codesp',
  codcur: 'codcur',
  nomcur: 'nomcur',
  codper: 'codper',
  ciclo: 'ciclo',
  prereq: 'prereq',
  resolucion: 'resolucion',
  promocion: 'promocion',
  regimen: 'regimen',
  tipcur: 'tipcur',
  area: 'area',
  estado: 'estado',
  codmod: 'codmod'
};

exports.Prisma.tb_cal_acadOrderByRelevanceFieldEnum = {
  c_descripcion: 'c_descripcion',
  c_resaltar: 'c_resaltar'
};

exports.Prisma.tb_cambio_modalidad_matriculaOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmod: 'c_codmod',
  paren: 'paren',
  nombap: 'nombap'
};

exports.Prisma.tb_carga_no_lectivaOrderByRelevanceFieldEnum = {
  id_tipo_carga: 'id_tipo_carga',
  c_dnidoc: 'c_dnidoc',
  hora_inicio: 'hora_inicio',
  hora_fin: 'hora_fin',
  c_ubicacion: 'c_ubicacion',
  usuario_registro: 'usuario_registro',
  estado: 'estado',
  confirmado: 'confirmado'
};

exports.Prisma.tb_cargitaOrderByRelevanceFieldEnum = {
  direocr: 'direocr',
  cjefeusa: 'cjefeusa',
  cnomunid: 'cnomunid'
};

exports.Prisma.tb_cargoOrderByRelevanceFieldEnum = {
  nombre_cargo: 'nombre_cargo',
  descripcion_cargo: 'descripcion_cargo',
  c_estado: 'c_estado'
};

exports.Prisma.tb_carnet_aluOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_estado: 'c_estado',
  c_user: 'c_user',
  c_duplicado: 'c_duplicado'
};

exports.Prisma.tb_carnet_tramiteOrderByRelevanceFieldEnum = {
  c_usuario: 'c_usuario',
  c_codfac: 'c_codfac',
  c_sede: 'c_sede',
  c_foto: 'c_foto'
};

exports.Prisma.tb_chat_soporte_mensajeOrderByRelevanceFieldEnum = {
  cod_alumno: 'cod_alumno',
  cod_admin: 'cod_admin',
  tipo_remitente: 'tipo_remitente',
  tipo_receptor: 'tipo_receptor',
  mensaje: 'mensaje',
  sala: 'sala'
};

exports.Prisma.tb_citaOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  id_tramite: 'id_tramite'
};

exports.Prisma.tb_clase_sesionOrderByRelevanceFieldEnum = {
  cod_periodo: 'cod_periodo',
  cod_curso: 'cod_curso',
  llave_curso: 'llave_curso',
  cod_docente: 'cod_docente',
  hh_ini: 'hh_ini',
  mi_ini: 'mi_ini',
  hh_fin: 'hh_fin',
  mi_fin: 'mi_fin',
  tipo_clase: 'tipo_clase',
  tipo_dictado: 'tipo_dictado'
};

exports.Prisma.tb_configuracionOrderByRelevanceFieldEnum = {
  c_sigu: 'c_sigu',
  c_intranet: 'c_intranet',
  c_modulo: 'c_modulo',
  c_descrip: 'c_descrip',
  c_estado: 'c_estado'
};

exports.Prisma.tb_cur_grp_certOrderByRelevanceFieldEnum = {
  c_sedcod: 'c_sedcod',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codalu: 'c_codalu',
  c_numcer: 'c_numcer'
};

exports.Prisma.tb_cur_grp_evaOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_tipo: 'c_tipo',
  c_concepto: 'c_concepto',
  c_nombre: 'c_nombre',
  c_estado: 'c_estado',
  c_codesp: 'c_codesp',
  c_acta: 'c_acta',
  c_sedcod: 'c_sedcod',
  c_flag: 'c_flag'
};

exports.Prisma.tb_cur_grp_eva_estadoOrderByRelevanceFieldEnum = {
  c_estado: 'c_estado',
  c_codadm: 'c_codadm',
  c_motivo: 'c_motivo'
};

exports.Prisma.tb_cur_grp_horOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_dnidoc: 'c_dnidoc',
  c_hh_ini: 'c_hh_ini',
  c_mi_ini: 'c_mi_ini',
  c_hh_fin: 'c_hh_fin',
  c_mi_fin: 'c_mi_fin',
  c_codadm: 'c_codadm',
  c_codmod: 'c_codmod',
  c_tipo: 'c_tipo',
  c_codesp: 'c_codesp',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.tb_cur_grp_pro_aluOrderByRelevanceFieldEnum = {
  c_codpro: 'c_codpro',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codesp: 'c_codesp',
  c_codalu: 'c_codalu',
  c_promedio: 'c_promedio',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu'
};

exports.Prisma.tb_cur_grp_pro_alu_comOrderByRelevanceFieldEnum = {
  c_codpro: 'c_codpro',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codalu: 'c_codalu',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  c_comentario: 'c_comentario',
  doc_reg: 'doc_reg',
  doc_act: 'doc_act'
};

exports.Prisma.tb_cur_grp_undOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codesp: 'c_codesp',
  c_sedcod: 'c_sedcod',
  c_tipo_prom: 'c_tipo_prom',
  c_formula_prom: 'c_formula_prom'
};

exports.Prisma.tb_cur_grp_vacOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codadm: 'c_codadm',
  c_codmod: 'c_codmod',
  c_codesp: 'c_codesp',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.tb_curso_grupoOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codmod: 'c_codmod',
  c_codesp: 'c_codesp',
  c_sedcod: 'c_sedcod',
  c_iat_cofbk_tipo: 'c_iat_cofbk_tipo',
  c_iat_cofbk_siged: 'c_iat_cofbk_siged',
  c_iat_cofbk_fec: 'c_iat_cofbk_fec',
  c_tipcuriat: 'c_tipcuriat',
  c_tipeval: 'c_tipeval',
  c_tipcapiat: 'c_tipcapiat',
  c_tipcontra: 'c_tipcontra',
  c_sedcurso: 'c_sedcurso',
  c_entcerti: 'c_entcerti',
  n_pdp: 'n_pdp',
  c_iat_directiva: 'c_iat_directiva',
  c_estado: 'c_estado',
  c_certificado_alu: 'c_certificado_alu',
  c_certificado_doc: 'c_certificado_doc',
  lock: 'lock',
  moodle: 'moodle'
};

exports.Prisma.tb_curso_grupo_informe_aludocOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codmod: 'c_codmod',
  c_codesp: 'c_codesp',
  c_nombre: 'c_nombre',
  c_extension: 'c_extension'
};

exports.Prisma.tb_curso_grupo_silaboOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_nombre: 'c_nombre',
  c_ruta: 'c_ruta',
  c_codesp: 'c_codesp'
};

exports.Prisma.tb_curso_grupo_unidad_planOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.tb_curso_seccionOrderByRelevanceFieldEnum = {
  cod_periodo: 'cod_periodo',
  cod_facultad: 'cod_facultad',
  cod_curso: 'cod_curso',
  llave_curso: 'llave_curso'
};

exports.Prisma.tb_dashboard_configuracionOrderByRelevanceFieldEnum = {
  c_filtro: 'c_filtro',
  c_descripcion: 'c_descripcion',
  c_condicion: 'c_condicion'
};

exports.Prisma.tb_den_gradOrderByRelevanceFieldEnum = {
  c_grado: 'c_grado',
  c_codesp: 'c_codesp',
  c_abre_gyt: 'c_abre_gyt',
  c_sexo: 'c_sexo'
};

exports.Prisma.tb_doc_cur_grpOrderByRelevanceFieldEnum = {
  c_dnidoc: 'c_dnidoc',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_tipo: 'c_tipo',
  c_categoria: 'c_categoria',
  c_codesp: 'c_codesp',
  c_sedcod: 'c_sedcod',
  c_tema: 'c_tema',
  horas: 'horas'
};

exports.Prisma.tb_doc_enc_respuesta_opcionOrderByRelevanceFieldEnum = {
  codigo_alumno: 'codigo_alumno',
  comentario: 'comentario'
};

exports.Prisma.tb_doc_evaOrderByRelevanceFieldEnum = {
  c_dnidoc: 'c_dnidoc',
  c_estado: 'c_estado'
};

exports.Prisma.tb_docente_encuestaOrderByRelevanceFieldEnum = {
  c_coddoc: 'c_coddoc',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codmod: 'c_codmod',
  c_codesp: 'c_codesp',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.tb_docente_encuesta_procesoOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codmod: 'c_codmod',
  c_codesp: 'c_codesp',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.tb_docente_encuesta_respuestaOrderByRelevanceFieldEnum = {
  codigo_alumno: 'codigo_alumno',
  c_estado: 'c_estado'
};

exports.Prisma.tb_docente_fileOrderByRelevanceFieldEnum = {
  n_codper: 'n_codper',
  c_dnidoc: 'c_dnidoc',
  c_conddoc: 'c_conddoc',
  c_regimdoc: 'c_regimdoc',
  c_leyuniv: 'c_leyuniv',
  c_dictpreg: 'c_dictpreg',
  c_dictmaest: 'c_dictmaest',
  c_dictdoct: 'c_dictdoct',
  c_investdoc: 'c_investdoc',
  c_dinadoc: 'c_dinadoc'
};

exports.Prisma.tb_docente_silaboOrderByRelevanceFieldEnum = {
  c_dni: 'c_dni',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  f_silabo: 'f_silabo',
  c_grpcur: 'c_grpcur'
};

exports.Prisma.tb_docentesOrderByRelevanceFieldEnum = {
  c_dni: 'c_dni',
  codigo: 'codigo',
  nombres: 'nombres',
  codremu: 'codremu',
  departa: 'departa',
  cargo: 'cargo',
  condicion: 'condicion',
  categoria: 'categoria',
  cateremu: 'cateremu',
  username: 'username',
  c95: 'c95',
  tiptra: 'tiptra',
  ctrol: 'ctrol',
  periodo: 'periodo'
};

exports.Prisma.tb_docuneOrderByRelevanceFieldEnum = {
  codigo: 'codigo',
  c_prefijo: 'c_prefijo',
  nombres: 'nombres',
  codremu: 'codremu',
  departa: 'departa',
  cargo: 'cargo',
  condicion: 'condicion',
  categoria: 'categoria',
  cateremu: 'cateremu',
  username: 'username',
  periodo: 'periodo',
  c_dni: 'c_dni',
  c_apepat: 'c_apepat',
  c_apemat: 'c_apemat',
  c_nombres: 'c_nombres',
  foto_doc: 'foto_doc',
  c_tipo: 'c_tipo',
  c_entidad: 'c_entidad',
  c_intendencia: 'c_intendencia'
};

exports.Prisma.tb_empresaOrderByRelevanceFieldEnum = {
  c_ruc: 'c_ruc',
  c_razon_social: 'c_razon_social',
  fono1: 'fono1',
  fono2: 'fono2',
  c_email: 'c_email',
  c_descripcion: 'c_descripcion',
  c_codpais: 'c_codpais',
  c_dpto: 'c_dpto',
  c_contactos: 'c_contactos',
  c_page_web: 'c_page_web',
  c_url_img: 'c_url_img'
};

exports.Prisma.tb_empresa_contactoOrderByRelevanceFieldEnum = {
  nombres_contacto: 'nombres_contacto',
  c_dni: 'c_dni',
  c_email: 'c_email',
  c_telefono: 'c_telefono',
  rol_empresa: 'rol_empresa',
  c_estado: 'c_estado'
};

exports.Prisma.tb_encu_pregOrderByRelevanceFieldEnum = {
  c_dprg: 'c_dprg',
  c_activo: 'c_activo',
  c_bloque: 'c_bloque'
};

exports.Prisma.tb_encu_respOrderByRelevanceFieldEnum = {
  c_rpta: 'c_rpta',
  c_drpta: 'c_drpta'
};

exports.Prisma.tb_encuestaOrderByRelevanceFieldEnum = {
  c_nombre_encuesta: 'c_nombre_encuesta',
  c_tipo_encuesta: 'c_tipo_encuesta'
};

exports.Prisma.tb_encuesta_bloqueOrderByRelevanceFieldEnum = {
  c_nombre_bloque: 'c_nombre_bloque'
};

exports.Prisma.tb_encuesta_preguntaOrderByRelevanceFieldEnum = {
  c_tipo_pregunta: 'c_tipo_pregunta',
  c_titulo_pregunta: 'c_titulo_pregunta',
  c_detalle_pregunta: 'c_detalle_pregunta',
  c_mensaje_ayuda: 'c_mensaje_ayuda',
  c_mensaje_exito: 'c_mensaje_exito',
  c_mensaje_fallo: 'c_mensaje_fallo'
};

exports.Prisma.tb_encuesta_pregunta_opcionOrderByRelevanceFieldEnum = {
  c_detalle_opcion: 'c_detalle_opcion',
  c_concepto: 'c_concepto',
  c_tipo_opcion: 'c_tipo_opcion'
};

exports.Prisma.tb_envsOrderByRelevanceFieldEnum = {
  tipo: 'tipo',
  codigo: 'codigo',
  valor: 'valor',
  codigo_padre: 'codigo_padre',
  comentario: 'comentario'
};

exports.Prisma.tb_especialidadOrderByRelevanceFieldEnum = {
  codfac: 'codfac',
  codesp: 'codesp',
  nomesp: 'nomesp',
  coduser: 'coduser',
  seccion: 'seccion',
  tesnew: 'tesnew',
  te_seccion: 'te_seccion',
  c_agil: 'c_agil',
  c_calendar: 'c_calendar',
  c_dashboard: 'c_dashboard',
  c_hor_uni: 'c_hor_uni',
  codsun: 'codsun',
  c_admision: 'c_admision',
  c_email_coord: 'c_email_coord',
  c_abrevesp: 'c_abrevesp',
  av_validate: 'av_validate',
  av_token: 'av_token',
  av_url: 'av_url',
  av_template: 'av_template',
  codint: 'codint',
  c_den_grad_bach: 'c_den_grad_bach',
  c_den_grad_tit: 'c_den_grad_tit'
};

exports.Prisma.tb_estado_tramiteOrderByRelevanceFieldEnum = {
  c_descripcion: 'c_descripcion'
};

exports.Prisma.tb_eva_condicionOrderByRelevanceFieldEnum = {
  codigo: 'codigo',
  nombre: 'nombre',
  prefijo: 'prefijo',
  titulo: 'titulo',
  sufijo: 'sufijo',
  descripcion: 'descripcion',
  fa_icon: 'fa_icon'
};

exports.Prisma.tb_eva_condicion_notaOrderByRelevanceFieldEnum = {
  texto: 'texto',
  alerta: 'alerta'
};

exports.Prisma.tb_eva_tipo_conceptoOrderByRelevanceFieldEnum = {
  c_tipo: 'c_tipo',
  c_concepto: 'c_concepto',
  c_nombre: 'c_nombre'
};

exports.Prisma.tb_fac_esp_grpOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codgrp: 'c_codgrp'
};

exports.Prisma.tb_facultadOrderByRelevanceFieldEnum = {
  cod_fac: 'cod_fac',
  nom_fac: 'nom_fac',
  inicial: 'inicial',
  final: 'final',
  secciones: 'secciones',
  nom_abrev: 'nom_abrev',
  descdec: 'descdec',
  decano: 'decano',
  director: 'director',
  facnew: 'facnew',
  escnew: 'escnew',
  facant: 'facant',
  facant1: 'facant1',
  escant: 'escant',
  codsun: 'codsun',
  c_abrevfac: 'c_abrevfac'
};

exports.Prisma.tb_ficha_perso_aluOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_dni: 'c_dni',
  c_email: 'c_email',
  c_email_institucional: 'c_email_institucional',
  c_sexo: 'c_sexo',
  c_fono: 'c_fono',
  c_celu: 'c_celu',
  c_tipcole: 'c_tipcole',
  c_nomcole: 'c_nomcole',
  c_clavel: 'c_clavel',
  c_clavee: 'c_clavee',
  c_dptodom: 'c_dptodom',
  c_provdom: 'c_provdom',
  c_distdom: 'c_distdom',
  c_dirdom: 'c_dirdom',
  c_dptonac: 'c_dptonac',
  c_provnac: 'c_provnac',
  c_distnac: 'c_distnac',
  c_dptocol: 'c_dptocol',
  c_provcol: 'c_provcol',
  c_distcol: 'c_distcol',
  c_pais: 'c_pais',
  cat: 'cat',
  situalab: 'situalab',
  tiplab: 'tiplab',
  codlab: 'codlab',
  apepatap: 'apepatap',
  apematap: 'apematap',
  nombap: 'nombap',
  paren: 'paren',
  otro: 'otro',
  telfap: 'telfap',
  celap: 'celap',
  dirap1: 'dirap1',
  dirap2: 'dirap2',
  dirap3: 'dirap3',
  dptoapo: 'dptoapo',
  provapo: 'provapo',
  distapo: 'distapo',
  nomref1: 'nomref1',
  parenref1: 'parenref1',
  telfref1: 'telfref1',
  nomref2: 'nomref2',
  parenref2: 'parenref2',
  telfref2: 'telfref2',
  c_tipdoc: 'c_tipdoc',
  c_ietnica: 'c_ietnica',
  c_anoegr: 'c_anoegr',
  c_trabaja: 'c_trabaja',
  c_acepto: 'c_acepto',
  c_acepto_acuerdo: 'c_acepto_acuerdo',
  c_operadoras: 'c_operadoras'
};

exports.Prisma.tb_ficha_perso_docOrderByRelevanceFieldEnum = {
  c_dni: 'c_dni',
  c_tipdoc: 'c_tipdoc',
  c_numdoc: 'c_numdoc',
  c_telefono: 'c_telefono',
  c_celular: 'c_celular',
  c_email: 'c_email',
  c_email_institucional: 'c_email_institucional',
  c_dirdom: 'c_dirdom',
  c_clave1: 'c_clave1',
  c_clave2: 'c_clave2',
  c_sexo: 'c_sexo',
  c_codprov: 'c_codprov',
  c_coddept: 'c_coddept',
  c_coddist: 'c_coddist',
  c_pais: 'c_pais',
  c_ubigeo: 'c_ubigeo'
};

exports.Prisma.tb_formulaOrderByRelevanceFieldEnum = {
  c_formula_nombre: 'c_formula_nombre'
};

exports.Prisma.tb_formula_terminoOrderByRelevanceFieldEnum = {
  termino_tipo: 'termino_tipo',
  termino_funcion: 'termino_funcion',
  variable_tipo: 'variable_tipo',
  variable_cod: 'variable_cod',
  variable_fk: 'variable_fk',
  c_operador: 'c_operador',
  c_simbolo: 'c_simbolo',
  c_resumen: 'c_resumen'
};

exports.Prisma.tb_libro_gradosOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_nombrelibro: 'c_nombrelibro',
  id_usuario: 'id_usuario'
};

exports.Prisma.tb_log_adminOrderByRelevanceFieldEnum = {
  c_codadm: 'c_codadm',
  c_tabla: 'c_tabla',
  c_pk: 'c_pk',
  c_data_old: 'c_data_old',
  c_data_new: 'c_data_new',
  c_accion: 'c_accion',
  c_sql: 'c_sql',
  c_obs: 'c_obs'
};

exports.Prisma.tb_log_izipayOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_descripcion: 'c_descripcion',
  c_estado: 'c_estado',
  c_obs: 'c_obs'
};

exports.Prisma.tb_log_niubizOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_descripcion: 'c_descripcion',
  c_estado: 'c_estado',
  c_obs: 'c_obs'
};

exports.Prisma.tb_mat_aluOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codalu: 'c_codalu',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_user: 'c_user',
  c_codesp: 'c_codesp',
  c_sedcod: 'c_sedcod',
  observacion: 'observacion',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu'
};

exports.Prisma.tb_mat_alu_preOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codalu: 'c_codalu',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_user: 'c_user',
  c_codesp: 'c_codesp',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu'
};

exports.Prisma.tb_mat_ficOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_estado: 'c_estado',
  c_codmod: 'c_codmod',
  c_codesp: 'c_codesp',
  c_seccion: 'c_seccion',
  c_condicion: 'c_condicion',
  c_tipo: 'c_tipo',
  c_res: 'c_res',
  puesto: 'puesto',
  c_sedcod: 'c_sedcod',
  c_pordesap: 'c_pordesap',
  c_flag: 'c_flag'
};

exports.Prisma.tb_mat_fic_detOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_codmod: 'c_codmod',
  c_prereq: 'c_prereq',
  c_tipcur: 'c_tipcur',
  c_nomcur: 'c_nomcur',
  c_codesp: 'c_codesp',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu'
};

exports.Prisma.tb_matric_concep_condicOrderByRelevanceFieldEnum = {
  c_concep: 'c_concep',
  c_condic: 'c_condic',
  c_detalle: 'c_detalle',
  c_alias: 'c_alias',
  c_nombre: 'c_nombre'
};

exports.Prisma.tb_matricula_costoOrderByRelevanceFieldEnum = {
  id_costo: 'id_costo',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmat: 'c_codmat',
  c_concep: 'c_concep',
  c_condic: 'c_condic',
  c_momento: 'c_momento',
  c_detalle: 'c_detalle',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.tb_matricula_especialidadOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.tb_matricula_fechaOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_concep: 'c_concep',
  c_condic: 'c_condic',
  c_codmat: 'c_codmat',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.tb_matricula_tipoOrderByRelevanceFieldEnum = {
  c_codmat: 'c_codmat',
  c_nommat: 'c_nommat'
};

exports.Prisma.tb_matricula_turnoOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_nombre: 'c_nombre',
  c_codmod: 'c_codmod',
  c_codesp: 'c_codesp',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.tb_modalidadOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_nommod: 'c_nommod',
  c_abrevmod: 'c_abrevmod'
};

exports.Prisma.tb_moduloOrderByRelevanceFieldEnum = {
  codigo_modulo: 'codigo_modulo',
  nombre_modulo: 'nombre_modulo',
  detalle_modulo: 'detalle_modulo',
  ruta_icono_modulo: 'ruta_icono_modulo',
  ruta_enlace_modulo: 'ruta_enlace_modulo',
  modulo_padre: 'modulo_padre'
};

exports.Prisma.tb_modulo_vistaOrderByRelevanceFieldEnum = {
  codigo_modulo: 'codigo_modulo',
  codigo_vista: 'codigo_vista',
  nombre_vista: 'nombre_vista',
  detalle_vista: 'detalle_vista',
  ruta_icono_vista: 'ruta_icono_vista',
  ruta_enlace_vista: 'ruta_enlace_vista'
};

exports.Prisma.tb_notas_registradasOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_estado: 'c_estado',
  c_codesp: 'c_codesp',
  n_prac01: 'n_prac01',
  n_prac02: 'n_prac02',
  n_prac03: 'n_prac03',
  n_prac04: 'n_prac04',
  n_proy01: 'n_proy01',
  n_proy02: 'n_proy02',
  n_proy03: 'n_proy03',
  n_proy04: 'n_proy04',
  n_exapar: 'n_exapar',
  n_exafin: 'n_exafin'
};

exports.Prisma.tb_observacion_practicaOrderByRelevanceFieldEnum = {
  c_codadm: 'c_codadm',
  c_coddoc: 'c_coddoc',
  descripcion_obs: 'descripcion_obs',
  c_estado: 'c_estado'
};

exports.Prisma.tb_padron_gradosOrderByRelevanceFieldEnum = {
  c_coduni: 'c_coduni',
  c_codalu: 'c_codalu',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  c_nomfac: 'c_nomfac',
  c_escuela: 'c_escuela',
  c_nompos: 'c_nompos',
  c_apepat: 'c_apepat',
  c_apemat: 'c_apemat',
  c_nombres: 'c_nombres',
  c_sexo: 'c_sexo',
  c_tipdoc: 'c_tipdoc',
  c_numdoc: 'c_numdoc',
  c_nomdip: 'c_nomdip',
  c_nomesp2: 'c_nomesp2',
  c_abre_gyt: 'c_abre_gyt',
  c_acto_tip: 'c_acto_tip',
  c_tesis: 'c_tesis',
  c_modalidad: 'c_modalidad',
  c_proc_rev_pais: 'c_proc_rev_pais',
  c_proc_rev_univ: 'c_proc_rev_univ',
  c_prov_rev_gra_ext: 'c_prov_rev_gra_ext',
  c_reso_num: 'c_reso_num',
  c_dipl_num: 'c_dipl_num',
  c_dipl_tip_emi: 'c_dipl_tip_emi',
  c_reg_libro: 'c_reg_libro',
  c_reg_folio: 'c_reg_folio',
  c_numreg: 'c_numreg',
  c_cargo1: 'c_cargo1',
  c_nomcar1: 'c_nomcar1',
  c_cargo2: 'c_cargo2',
  c_nomcar2: 'c_nomcar2',
  c_cargo3: 'c_cargo3',
  c_nomcar3: 'c_nomcar3',
  c_numofi: 'c_numofi',
  c_user: 'c_user',
  c_dir_ocrysa: 'c_dir_ocrysa',
  c_raz_soc_ist: 'c_raz_soc_ist',
  c_proc_bach: 'c_proc_bach',
  c_abre_gyt2: 'c_abre_gyt2',
  c_reso_num_fac: 'c_reso_num_fac',
  estado: 'estado',
  den_grad: 'den_grad',
  reg_metadato: 'reg_metadato',
  prog_estu: 'prog_estu',
  proc_titulo_ped: 'proc_titulo_ped',
  proc_pais_ext: 'proc_pais_ext',
  proc_univ_ext: 'proc_univ_ext',
  proc_grado_ext: 'proc_grado_ext',
  n_entregado: 'n_entregado',
  observacion: 'observacion',
  mostrar_alum: 'mostrar_alum',
  mod_obt: 'mod_obt',
  prog_acredit: 'prog_acredit',
  trab_invest_original: 'trab_invest_original',
  crit_rev: 'crit_rev',
  mod_sustentacion: 'mod_sustentacion',
  c_rtd_sunedu: 'c_rtd_sunedu',
  c_proc_rev_gra_ext: 'c_proc_rev_gra_ext',
  mec_uti: 'mec_uti',
  dep_ver_orig: 'dep_ver_orig',
  req_idm: 'req_idm',
  reso_num_dup_nue: 'reso_num_dup_nue',
  proc_inst_orig: 'proc_inst_orig'
};

exports.Prisma.tb_padron_grados_copy1OrderByRelevanceFieldEnum = {
  c_coduni: 'c_coduni',
  c_codalu: 'c_codalu',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  c_nomfac: 'c_nomfac',
  c_escuela: 'c_escuela',
  c_nompos: 'c_nompos',
  c_apepat: 'c_apepat',
  c_apemat: 'c_apemat',
  c_nombres: 'c_nombres',
  c_sexo: 'c_sexo',
  c_tipdoc: 'c_tipdoc',
  c_numdoc: 'c_numdoc',
  c_nomdip: 'c_nomdip',
  c_nomesp2: 'c_nomesp2',
  c_abre_gyt: 'c_abre_gyt',
  c_acto_tip: 'c_acto_tip',
  c_tesis: 'c_tesis',
  c_modalidad: 'c_modalidad',
  c_proc_rev_pais: 'c_proc_rev_pais',
  c_proc_rev_univ: 'c_proc_rev_univ',
  c_prov_rev_gra_ext: 'c_prov_rev_gra_ext',
  c_reso_num: 'c_reso_num',
  c_dipl_num: 'c_dipl_num',
  c_dipl_tip_emi: 'c_dipl_tip_emi',
  c_reg_libro: 'c_reg_libro',
  c_reg_folio: 'c_reg_folio',
  c_numreg: 'c_numreg',
  c_cargo1: 'c_cargo1',
  c_nomcar1: 'c_nomcar1',
  c_cargo2: 'c_cargo2',
  c_nomcar2: 'c_nomcar2',
  c_cargo3: 'c_cargo3',
  c_nomcar3: 'c_nomcar3',
  c_numofi: 'c_numofi',
  c_user: 'c_user',
  c_dir_ocrysa: 'c_dir_ocrysa',
  c_raz_soc_ist: 'c_raz_soc_ist',
  c_proc_bach: 'c_proc_bach',
  c_abre_gyt2: 'c_abre_gyt2',
  c_reso_num_fac: 'c_reso_num_fac',
  estado: 'estado',
  den_grad: 'den_grad',
  reg_metadato: 'reg_metadato',
  prog_estu: 'prog_estu',
  proc_titulo_ped: 'proc_titulo_ped',
  proc_pais_ext: 'proc_pais_ext',
  proc_univ_ext: 'proc_univ_ext',
  proc_grado_ext: 'proc_grado_ext',
  n_entregado: 'n_entregado',
  observacion: 'observacion',
  mostrar_alum: 'mostrar_alum',
  mod_obt: 'mod_obt',
  prog_acredit: 'prog_acredit',
  trab_invest_original: 'trab_invest_original',
  crit_rev: 'crit_rev',
  mod_sustentacion: 'mod_sustentacion',
  c_rtd_sunedu: 'c_rtd_sunedu',
  c_proc_rev_gra_ext: 'c_proc_rev_gra_ext',
  mec_uti: 'mec_uti',
  dep_ver_orig: 'dep_ver_orig',
  req_idm: 'req_idm',
  reso_num_dup_nue: 'reso_num_dup_nue',
  proc_inst_orig: 'proc_inst_orig'
};

exports.Prisma.tb_padron_grados_maestroOrderByRelevanceFieldEnum = {
  tabla: 'tabla',
  descripcion: 'descripcion',
  estado: 'estado'
};

exports.Prisma.tb_paisesOrderByRelevanceFieldEnum = {
  codpais: 'codpais',
  nombre: 'nombre'
};

exports.Prisma.tb_parametrosOrderByRelevanceFieldEnum = {
  nombre_param: 'nombre_param',
  descripcion: 'descripcion'
};

exports.Prisma.tb_parametros_disponiblesOrderByRelevanceFieldEnum = {
  codigo: 'codigo'
};

exports.Prisma.tb_peracdOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_codfac: 'c_codfac',
  c_flgper: 'c_flgper',
  c_fweb_doc: 'c_fweb_doc',
  c_fweb_alu: 'c_fweb_alu',
  c_perlit: 'c_perlit',
  c_fweb_adm: 'c_fweb_adm'
};

exports.Prisma.tb_perlleOrderByRelevanceFieldEnum = {
  codalu: 'codalu',
  codper: 'codper',
  codfac: 'codfac',
  codesp: 'codesp',
  periodo: 'periodo',
  estado: 'estado'
};

exports.Prisma.tb_plan_estudio_credOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcre: 'c_codcre'
};

exports.Prisma.tb_plan_estudio_cursoOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_nomcur: 'c_nomcur',
  c_ciclo: 'c_ciclo',
  c_tipcur: 'c_tipcur',
  c_area: 'c_area',
  c_sis_eva: 'c_sis_eva',
  c_prereq1: 'c_prereq1',
  c_prereq2: 'c_prereq2',
  c_prereq3: 'c_prereq3',
  c_prereq4: 'c_prereq4',
  id: 'id',
  n_pdp: 'n_pdp',
  c_publicado: 'c_publicado'
};

exports.Prisma.tb_plan_estudio_curso_areaOrderByRelevanceFieldEnum = {
  c_cod_cur_area: 'c_cod_cur_area',
  c_nom_cur_area: 'c_nom_cur_area'
};

exports.Prisma.tb_plan_estudio_curso_compOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_codcurdet: 'c_codcurdet',
  c_usuario: 'c_usuario'
};

exports.Prisma.tb_plan_estudio_curso_reqOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_codcur_req: 'c_codcur_req'
};

exports.Prisma.tb_plan_estudio_equOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_codmod_equ: 'c_codmod_equ',
  c_codfac_equ: 'c_codfac_equ',
  c_codesp_equ: 'c_codesp_equ',
  c_codcur_equ: 'c_codcur_equ'
};

exports.Prisma.tb_plan_estudio_espOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_nro_res: 'c_nro_res',
  c_desc: 'c_desc'
};

exports.Prisma.tb_plan_estudio_moduloOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_nommdl: 'c_nommdl',
  c_modulo: 'c_modulo'
};

exports.Prisma.tb_plantillaOrderByRelevanceFieldEnum = {
  c_codtab: 'c_codtab',
  c_desc: 'c_desc',
  c_user: 'c_user',
  c_user_upd: 'c_user_upd'
};

exports.Prisma.tb_practicaOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_dnidoc: 'c_dnidoc',
  c_codcur: 'c_codcur',
  c_codgrp: 'c_codgrp',
  c_estado: 'c_estado',
  cod_cargo: 'cod_cargo',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod'
};

exports.Prisma.tb_prog_claseOrderByRelevanceFieldEnum = {
  c_dnidoc: 'c_dnidoc',
  c_codfac: 'c_codfac',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_tipo_clase: 'c_tipo_clase',
  c_estado_dictado: 'c_estado_dictado',
  c_aula: 'c_aula',
  c_nomcur: 'c_nomcur',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_codesp: 'c_codesp',
  c_obs: 'c_obs',
  c_tema: 'c_tema',
  c_publica: 'c_publica'
};

exports.Prisma.tb_registro_diplomaOrderByRelevanceFieldEnum = {
  c_tipreg: 'c_tipreg',
  c_dni: 'c_dni',
  c_nomalu: 'c_nomalu',
  c_sexo: 'c_sexo',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  n_codpln: 'n_codpln',
  c_nomesp: 'c_nomesp',
  c_menesp: 'c_menesp',
  c_nommod: 'c_nommod',
  c_enfmod: 'c_enfmod',
  n_constancia: 'n_constancia',
  c_formativo: 'c_formativo',
  n_registro: 'n_registro',
  n_registro_minedu: 'n_registro_minedu',
  c_idioma: 'c_idioma',
  c_usureg: 'c_usureg',
  c_codmodulo: 'c_codmodulo',
  c_descmodulo: 'c_descmodulo',
  c_den_grad: 'c_den_grad'
};

exports.Prisma.tb_registro_diploma_maestroOrderByRelevanceFieldEnum = {
  c_tipreg: 'c_tipreg',
  c_abrevreg: 'c_abrevreg',
  c_nomreg: 'c_nomreg'
};

exports.Prisma.tb_reporte_minedu_sede_maestroOrderByRelevanceFieldEnum = {
  sedcod: 'sedcod',
  departamento: 'departamento',
  provincia: 'provincia',
  distrito: 'distrito',
  dre_gre: 'dre_gre',
  direccion: 'direccion',
  resol_autorizacion: 'resol_autorizacion',
  resol_validacion: 'resol_validacion',
  c_centro_poblado: 'c_centro_poblado',
  c_amb_vraem: 'c_amb_vraem',
  c_amb_huallaga: 'c_amb_huallaga',
  c_tipo_sede: 'c_tipo_sede'
};

exports.Prisma.tb_rol_accesoOrderByRelevanceFieldEnum = {
  nombre_rol: 'nombre_rol',
  detalle_rol: 'detalle_rol'
};

exports.Prisma.tb_rol_acceso_modulo_vistaOrderByRelevanceFieldEnum = {
  nombre_clase: 'nombre_clase',
  nombre_metodo: 'nombre_metodo',
  codigo_modulo: 'codigo_modulo',
  codigo_vista: 'codigo_vista'
};

exports.Prisma.tb_silaboOrderByRelevanceFieldEnum = {
  c_codmod: 'c_codmod',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_sumi: 'c_sumi',
  c_obje: 'c_obje',
  c_rela: 'c_rela',
  c_cont_sem_1: 'c_cont_sem_1',
  c_cont_sem_2: 'c_cont_sem_2',
  c_cont_sem_3: 'c_cont_sem_3',
  c_cont_sem_4: 'c_cont_sem_4',
  c_cont_sem_5: 'c_cont_sem_5',
  c_cont_sem_6: 'c_cont_sem_6',
  c_cont_sem_7: 'c_cont_sem_7',
  c_cont_sem_8: 'c_cont_sem_8',
  c_cont_sem_9: 'c_cont_sem_9',
  c_cont_sem_10: 'c_cont_sem_10',
  c_cont_sem_11: 'c_cont_sem_11',
  c_cont_sem_12: 'c_cont_sem_12',
  c_cont_sem_13: 'c_cont_sem_13',
  c_cont_sem_14: 'c_cont_sem_14',
  c_cont_sem_15: 'c_cont_sem_15',
  c_cont_sem_16: 'c_cont_sem_16',
  c_meto: 'c_meto',
  c_bibl: 'c_bibl'
};

exports.Prisma.tb_sincronizacion_moodleOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_user: 'c_user'
};

exports.Prisma.tb_sms_defaultOrderByRelevanceFieldEnum = {
  titulo: 'titulo',
  texto: 'texto'
};

exports.Prisma.tb_tabla_opcionOrderByRelevanceFieldEnum = {
  c_codtab: 'c_codtab',
  c_descri: 'c_descri',
  c_activo: 'c_activo',
  c_tabla: 'c_tabla',
  id_user: 'id_user'
};

exports.Prisma.tb_tipo_carga_lectivaOrderByRelevanceFieldEnum = {
  descripcion: 'descripcion',
  estado: 'estado',
  color: 'color',
  c_c9: 'c_c9'
};

exports.Prisma.tb_tra_fol_est_aluOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_estado: 'c_estado',
  c_record: 'c_record',
  c_obs: 'c_obs',
  c_user: 'c_user',
  c_diploma1: 'c_diploma1'
};

exports.Prisma.tb_tra_fol_reqOrderByRelevanceFieldEnum = {
  c_desc_req: 'c_desc_req',
  id_modalidad: 'id_modalidad',
  d_adjunta: 'd_adjunta',
  c_docreq: 'c_docreq'
};

exports.Prisma.tb_tra_fol_req_entregadosOrderByRelevanceFieldEnum = {
  c_obs: 'c_obs',
  c_codalu: 'c_codalu',
  c_user: 'c_user',
  d_validado: 'd_validado',
  d_archivo: 'd_archivo',
  c_docreq: 'c_docreq',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  c_user_rec: 'c_user_rec'
};

exports.Prisma.tb_tra_origenOrderByRelevanceFieldEnum = {
  id_tramite: 'id_tramite',
  c_codalu: 'c_codalu',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  c_tipoper: 'c_tipoper',
  c_user: 'c_user',
  c_estado: 'c_estado',
  obs_finalizar: 'obs_finalizar',
  c_user_borrado: 'c_user_borrado',
  c_voucher: 'c_voucher',
  c_fecpag: 'c_fecpag',
  c_monpag: 'c_monpag',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype',
  id_tipdoc: 'id_tipdoc',
  c_serdoc: 'c_serdoc',
  c_numdoc: 'c_numdoc',
  c_origen_pago: 'c_origen_pago',
  c_estado_pago: 'c_estado_pago',
  c_conformidad: 'c_conformidad',
  c_anulacion_obs: 'c_anulacion_obs'
};

exports.Prisma.tb_tra_pasosOrderByRelevanceFieldEnum = {
  id_tramite: 'id_tramite',
  id_facu_ori: 'id_facu_ori',
  id_facu_dest: 'id_facu_dest',
  c_user: 'c_user',
  c_obs: 'c_obs',
  c_atendido: 'c_atendido'
};

exports.Prisma.tb_tra_pasos_filesOrderByRelevanceFieldEnum = {
  d_original_name: 'd_original_name',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype'
};

exports.Prisma.tb_tra_tipo_reqOrderByRelevanceFieldEnum = {
  c_desc_req: 'c_desc_req',
  d_adjunta: 'd_adjunta',
  c_plantilla: 'c_plantilla'
};

exports.Prisma.tb_tra_tipo_req_entOrderByRelevanceFieldEnum = {
  id_tramite: 'id_tramite',
  c_obs: 'c_obs',
  c_text: 'c_text',
  d_validado: 'd_validado',
  d_archivo: 'd_archivo',
  d_extension: 'd_extension',
  d_mimetype: 'd_mimetype'
};

exports.Prisma.tb_tra_tiposOrderByRelevanceFieldEnum = {
  c_descri: 'c_descri',
  c_abrev: 'c_abrev',
  c_descripcion: 'c_descripcion'
};

exports.Prisma.tb_ubigeo2006OrderByRelevanceFieldEnum = {
  coddpto: 'coddpto',
  codprov: 'codprov',
  coddist: 'coddist',
  nombre: 'nombre'
};

exports.Prisma.tb_une_aulaOrderByRelevanceFieldEnum = {
  c_codaula: 'c_codaula',
  c_detalle: 'c_detalle',
  c_obs: 'c_obs'
};

exports.Prisma.tb_une_pabOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_nompab: 'c_nompab'
};

exports.Prisma.tb_une_pab_aulaOrderByRelevanceFieldEnum = {
  c_codaula: 'c_codaula',
  c_detalle: 'c_detalle',
  c_obs: 'c_obs',
  c_lon: 'c_lon',
  c_lat: 'c_lat'
};

exports.Prisma.tb_unidad_estudioOrderByRelevanceFieldEnum = {
  c_unidad_nombre: 'c_unidad_nombre',
  c_unidad_label: 'c_unidad_label',
  c_tipo_prom: 'c_tipo_prom',
  c_formula_prom: 'c_formula_prom',
  c_prom_label: 'c_prom_label',
  c_prom_redondeo: 'c_prom_redondeo'
};

exports.Prisma.tb_unidad_estudio_conceptoOrderByRelevanceFieldEnum = {
  c_concepto: 'c_concepto',
  c_condicion: 'c_condicion'
};

exports.Prisma.tb_unidad_estudio_concepto_condicionOrderByRelevanceFieldEnum = {
  c_sexo: 'c_sexo'
};

exports.Prisma.tb_unidad_estudio_evaluacionOrderByRelevanceFieldEnum = {
  c_evaluacion_nombre: 'c_evaluacion_nombre',
  c_evaluacion_label: 'c_evaluacion_label',
  c_tipo: 'c_tipo',
  c_concepto: 'c_concepto'
};

exports.Prisma.tb_unidad_estudio_planOrderByRelevanceFieldEnum = {
  c_plan_nombre: 'c_plan_nombre',
  c_plan_descripcion: 'c_plan_descripcion'
};

exports.Prisma.tb_unidad_estudio_plan_promOrderByRelevanceFieldEnum = {
  c_codpro: 'c_codpro',
  c_promedio_nombre: 'c_promedio_nombre',
  c_promedio_descripcion: 'c_promedio_descripcion',
  c_redondeo: 'c_redondeo'
};

exports.Prisma.tb_unidad_estudio_plan_prom_condicionOrderByRelevanceFieldEnum = {
  codpro: 'codpro'
};

exports.Prisma.tb_usuario_rol_accesoOrderByRelevanceFieldEnum = {
  id_usuario: 'id_usuario',
  tipo_permiso: 'tipo_permiso'
};

exports.Prisma.temp_presencialOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_turno: 'c_turno'
};

exports.Prisma.temp_upd_id_evaluacionOrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  modalidad_oficial: 'modalidad_oficial',
  modalidad_actual: 'modalidad_actual',
  c_codalu: 'c_codalu'
};

exports.Prisma.tmp_mat_20251OrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  turno: 'turno',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp'
};

exports.Prisma.tmp_mat_seg_20243OrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  turno: 'turno'
};

exports.Prisma.tmp_pago_asignado_det_elim_20243_euOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_flag: 'c_flag'
};

exports.Prisma.tmp_patron_egre_1OrderByRelevanceFieldEnum = {
  CODUNIV: 'CODUNIV',
  RAZ_SOC: 'RAZ_SOC',
  MATRI_FEC: 'MATRI_FEC',
  FAC_NOM: 'FAC_NOM',
  CARR_PROG: 'CARR_PROG',
  ESC_POS: 'ESC_POS',
  EGRES_FEC: 'EGRES_FEC',
  APEPAT: 'APEPAT',
  APEMAT: 'APEMAT',
  NOMBRE: 'NOMBRE',
  SEXO: 'SEXO',
  DOCU_TIP: 'DOCU_TIP',
  DOCU_NUM: 'DOCU_NUM',
  PROC_BACH: 'PROC_BACH',
  GRAD_TITU: 'GRAD_TITU',
  DEN_GRAD: 'DEN_GRAD',
  SEG_ESP: 'SEG_ESP',
  TRAB_INV: 'TRAB_INV',
  NUM_CRED: 'NUM_CRED',
  REG_METADATO: 'REG_METADATO',
  PROG_ESTU: 'PROG_ESTU',
  PROC_TITULO_PED: 'PROC_TITULO_PED',
  MOD_OBT: 'MOD_OBT',
  PROG_ACREDIT: 'PROG_ACREDIT',
  FEC_INICIO_ACREDIT: 'FEC_INICIO_ACREDIT',
  FEC_FIN_ACREDIT: 'FEC_FIN_ACREDIT',
  FEC_INICIO_MOD_TIT_ACREDIT: 'FEC_INICIO_MOD_TIT_ACREDIT',
  FEC_FIN_MOD_TIT_ACREDIT: 'FEC_FIN_MOD_TIT_ACREDIT',
  FEC_SOLICIT_GRAD_TIT: 'FEC_SOLICIT_GRAD_TIT',
  FEC_TRAB_GRAD_TIT: 'FEC_TRAB_GRAD_TIT',
  TRAB_INVEST_ORIGINAL: 'TRAB_INVEST_ORIGINAL',
  MOD_EST: 'MOD_EST',
  ABRE_GYT: 'ABRE_GYT',
  PROC_REV_PAIS: 'PROC_REV_PAIS',
  PROC_REV_UNIV: 'PROC_REV_UNIV',
  PROC_REV_GRADO: 'PROC_REV_GRADO',
  CRIT_REV: 'CRIT_REV',
  RESO_NUM: 'RESO_NUM',
  RESO_FEC: 'RESO_FEC',
  DIPL_FEC_ORG: 'DIPL_FEC_ORG',
  DIPL_FEC_DUP: 'DIPL_FEC_DUP',
  DIPL_NUM: 'DIPL_NUM',
  DIPL_TIP_EMI: 'DIPL_TIP_EMI',
  REG_LIBRO: 'REG_LIBRO',
  REG_FOLIO: 'REG_FOLIO',
  REG_REGISTRO: 'REG_REGISTRO',
  CARGO1: 'CARGO1',
  AUTORIDAD1: 'AUTORIDAD1',
  CARGO2: 'CARGO2',
  AUTORIDAD2: 'AUTORIDAD2',
  CARGO3: 'CARGO3',
  AUTORIDAD3: 'AUTORIDAD3',
  PROC_PAIS_EXT: 'PROC_PAIS_EXT',
  PROC_UNIV_EXT: 'PROC_UNIV_EXT',
  PROC_GRADO_EXT: 'PROC_GRADO_EXT',
  REG_OFICIO: 'REG_OFICIO',
  FEC_MAT_PROG: 'FEC_MAT_PROG',
  FEC_INICIO_PROG: 'FEC_INICIO_PROG',
  FEC_FIN_PROG: 'FEC_FIN_PROG',
  MOD_SUSTENTACION: 'MOD_SUSTENTACION',
  PROC_INST_ORIG: 'PROC_INST_ORIG'
};

exports.Prisma.tmp_patron_egre_2OrderByRelevanceFieldEnum = {
  COD_UNIV: 'COD_UNIV',
  RAZ_SOC: 'RAZ_SOC',
  FAC_NOM: 'FAC_NOM',
  ESC_POS: 'ESC_POS',
  PRIM_APE: 'PRIM_APE',
  SEG_APE: 'SEG_APE',
  NOMBRE: 'NOMBRE',
  SEXO: 'SEXO',
  DOCU_TIP: 'DOCU_TIP',
  DOCU_NUM: 'DOCU_NUM',
  MATRI_FEC: 'MATRI_FEC',
  EGRES_FEC: 'EGRES_FEC',
  ABRE_GYT: 'ABRE_GYT',
  CARR_PROG: 'CARR_PROG',
  DEN_GRAD: 'DEN_GRAD',
  SEG_ESP: 'SEG_ESP',
  PROC_BACH: 'PROC_BACH',
  PROC_INST_ORIG: 'PROC_INST_ORIG',
  PROC_TITULO_PED: 'PROC_TITULO_PED',
  PROG_ESTU: 'PROG_ESTU',
  NUM_CRED: 'NUM_CRED',
  MOD_OBT: 'MOD_OBT',
  MOD_EST: 'MOD_EST',
  REG_METADATO: 'REG_METADATO',
  TRAB_INV: 'TRAB_INV',
  REQ_IDM: 'REQ_IDM',
  PROG_ACREDIT: 'PROG_ACREDIT',
  FEC_INICIO_ACREDIT: 'FEC_INICIO_ACREDIT',
  FEC_FIN_ACREDIT: 'FEC_FIN_ACREDIT',
  FEC_INI_TRA_TIT: 'FEC_INI_TRA_TIT',
  TRAB_INVEST_ORIGINAL: 'TRAB_INVEST_ORIGINAL',
  MEC_UTI: 'MEC_UTI',
  DEP_VER_ORIG: 'DEP_VER_ORIG',
  PROC_REV_PAIS: 'PROC_REV_PAIS',
  PROC_REV_UNIV: 'PROC_REV_UNIV',
  PROC_REV_GRADO: 'PROC_REV_GRADO',
  CRIT_REV: 'CRIT_REV',
  RESO_NUM: 'RESO_NUM',
  RESO_FEC: 'RESO_FEC',
  RESO_NUM_DUP_NUE: 'RESO_NUM_DUP_NUE',
  RESO_FEC_DUP_NUE: 'RESO_FEC_DUP_NUE',
  DIPL_FEC_ORG: 'DIPL_FEC_ORG',
  DIPL_FEC_DUP_NUE: 'DIPL_FEC_DUP_NUE',
  DIPL_NUM: 'DIPL_NUM',
  DIPL_TIP_EMI: 'DIPL_TIP_EMI',
  REG_LIBRO: 'REG_LIBRO',
  REG_FOLIO: 'REG_FOLIO',
  REG_REGISTRO: 'REG_REGISTRO',
  CARGO1: 'CARGO1',
  AUTORIDAD1: 'AUTORIDAD1',
  CARGO2: 'CARGO2',
  AUTORIDAD2: 'AUTORIDAD2',
  CARGO3: 'CARGO3',
  AUTORIDAD3: 'AUTORIDAD3',
  PROC_PAIS_EXT: 'PROC_PAIS_EXT',
  PROC_UNIV_EXT: 'PROC_UNIV_EXT',
  PROC_GRADO_EXT: 'PROC_GRADO_EXT',
  REG_OFICIO: 'REG_OFICIO',
  FEC_MAT_MOD: 'FEC_MAT_MOD',
  FEC_INICIO_MOD: 'FEC_INICIO_MOD',
  FEC_FIN_MOD: 'FEC_FIN_MOD',
  MOD_SUSTENTACI_N: 'MOD_SUSTENTACI_N',
  SUNEDU: 'SUNEDU'
};

exports.Prisma.tmp_tb_mat_alu_242OrderByRelevanceFieldEnum = {
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codmod: 'c_codmod',
  c_sedcod: 'c_sedcod',
  c_codcur: 'c_codcur',
  c_grpcur: 'c_grpcur'
};

exports.Prisma.top_atencionOrderByRelevanceFieldEnum = {
  codtriaje: 'codtriaje',
  codalu: 'codalu',
  motconsulta: 'motconsulta',
  anotacion: 'anotacion',
  diagnostico: 'diagnostico',
  usuarioatencion: 'usuarioatencion',
  estado: 'estado'
};

exports.Prisma.top_atencion_externaOrderByRelevanceFieldEnum = {
  lugarreferido: 'lugarreferido',
  rutaarchivo: 'rutaarchivo'
};

exports.Prisma.top_condicionOrderByRelevanceFieldEnum = {
  desccond: 'desccond'
};

exports.Prisma.top_especialidadOrderByRelevanceFieldEnum = {
  nomesp: 'nomesp',
  estado: 'estado'
};

exports.Prisma.top_evolucionOrderByRelevanceFieldEnum = {
  id_atencion: 'id_atencion',
  evolucion: 'evolucion',
  indicacion: 'indicacion',
  c_borrado: 'c_borrado',
  id_user: 'id_user'
};

exports.Prisma.top_fichamedicaOrderByRelevanceFieldEnum = {
  calificacion: 'calificacion',
  observaciones: 'observaciones',
  recomendaciones: 'recomendaciones',
  motivo_examen: 'motivo_examen',
  c_borrado: 'c_borrado',
  id_user: 'id_user'
};

exports.Prisma.top_medicamentoOrderByRelevanceFieldEnum = {
  descmed: 'descmed',
  undmed: 'undmed',
  estado: 'estado'
};

exports.Prisma.top_patologiaOrderByRelevanceFieldEnum = {
  codesp: 'codesp',
  descpatologia: 'descpatologia',
  estado: 'estado'
};

exports.Prisma.top_triajeOrderByRelevanceFieldEnum = {
  codtriaje: 'codtriaje',
  codalu: 'codalu',
  descalergia: 'descalergia',
  usuarioregistro: 'usuarioregistro'
};

exports.Prisma.top_user_especialidadOrderByRelevanceFieldEnum = {
  c_user: 'c_user',
  id_especialidad: 'id_especialidad',
  c_borrado: 'c_borrado'
};

exports.Prisma.umaplus_231_recOrderByRelevanceFieldEnum = {
  c_codalu: 'c_codalu',
  c_codfac_alu: 'c_codfac_alu',
  c_codesp_alu: 'c_codesp_alu',
  paterno: 'paterno',
  materno: 'materno',
  nombres: 'nombres',
  c_codfac: 'c_codfac',
  c_codesp: 'c_codesp',
  c_codcur: 'c_codcur',
  n_nomcur: 'n_nomcur',
  c_grpcur: 'c_grpcur'
};

exports.Prisma.usersOrderByRelevanceFieldEnum = {
  name: 'name',
  email: 'email',
  password: 'password',
  remember_token: 'remember_token'
};


exports.Prisma.ModelName = {
  alumno: 'alumno',
  campo_extra: 'campo_extra',
  campo_extra_opcion: 'campo_extra_opcion',
  campo_extra_tabla: 'campo_extra_tabla',
  campo_extra_tipo: 'campo_extra_tipo',
  campo_extra_valor: 'campo_extra_valor',
  curlle: 'curlle',
  eval_moodle_sigu: 'eval_moodle_sigu',
  rep_reporte: 'rep_reporte',
  rep_reporte_db_orderby: 'rep_reporte_db_orderby',
  rep_reporte_db_select: 'rep_reporte_db_select',
  rep_reporte_db_table: 'rep_reporte_db_table',
  rep_reporte_db_where: 'rep_reporte_db_where',
  rep_reporte_filtro: 'rep_reporte_filtro',
  rep_reporte_filtro_fuente: 'rep_reporte_filtro_fuente',
  rep_reporte_input: 'rep_reporte_input',
  rep_reporte_input_option: 'rep_reporte_input_option',
  rep_reporte_resultado: 'rep_reporte_resultado',
  rep_reporte_salida: 'rep_reporte_salida',
  scr_tb_score_categoria: 'scr_tb_score_categoria',
  scr_tb_score_entidad: 'scr_tb_score_entidad',
  semipresencial_23: 'semipresencial_23',
  semipresencial_alu_23: 'semipresencial_alu_23',
  sga_egre_alu_seguir_cab: 'sga_egre_alu_seguir_cab',
  sga_egre_alu_seguir_det: 'sga_egre_alu_seguir_det',
  sga_licencias_zoom: 'sga_licencias_zoom',
  sga_ms_curso: 'sga_ms_curso',
  sga_reg_alu_zoom: 'sga_reg_alu_zoom',
  sga_reuniones_zoom: 'sga_reuniones_zoom',
  sga_tb_adm_cliente: 'sga_tb_adm_cliente',
  sga_tb_adm_cliente_seg: 'sga_tb_adm_cliente_seg',
  sga_tb_adm_fase: 'sga_tb_adm_fase',
  sga_tb_adm_files: 'sga_tb_adm_files',
  sga_tb_adm_proceso: 'sga_tb_adm_proceso',
  sga_tb_adm_text_form: 'sga_tb_adm_text_form',
  sga_tb_admision_vacantes: 'sga_tb_admision_vacantes',
  sga_tb_asistalu_dict_clase_prog: 'sga_tb_asistalu_dict_clase_prog',
  sga_tb_asistdoc_dict_clase_prog: 'sga_tb_asistdoc_dict_clase_prog',
  sga_tb_boletin_alu: 'sga_tb_boletin_alu',
  sga_tb_boletin_doc: 'sga_tb_boletin_doc',
  sga_tb_campana: 'sga_tb_campana',
  sga_tb_campana_cab: 'sga_tb_campana_cab',
  sga_tb_campana_det: 'sga_tb_campana_det',
  sga_tb_campana_esp: 'sga_tb_campana_esp',
  sga_tb_campa_a: 'sga_tb_campa_a',
  sga_tb_cargo: 'sga_tb_cargo',
  sga_tb_control_alumno: 'sga_tb_control_alumno',
  sga_tb_doc_grado: 'sga_tb_doc_grado',
  sga_tb_log_alumno: 'sga_tb_log_alumno',
  sga_tb_log_docente: 'sga_tb_log_docente',
  sga_tb_modalidad_ingreso: 'sga_tb_modalidad_ingreso',
  sgb_tb_alu_certificado: 'sgb_tb_alu_certificado',
  sgb_tb_alu_conocimiento: 'sgb_tb_alu_conocimiento',
  sgb_tb_alu_curso: 'sgb_tb_alu_curso',
  sgb_tb_alu_cv: 'sgb_tb_alu_cv',
  sgb_tb_alu_experiencia_profesional: 'sgb_tb_alu_experiencia_profesional',
  sgb_tb_alu_f_acad: 'sgb_tb_alu_f_acad',
  sgb_tb_alu_idioma: 'sgb_tb_alu_idioma',
  sgb_tb_alu_interes: 'sgb_tb_alu_interes',
  sgb_tb_alu_perfil: 'sgb_tb_alu_perfil',
  sgb_tb_alu_postulante: 'sgb_tb_alu_postulante',
  sgb_tb_alu_referencia: 'sgb_tb_alu_referencia',
  sgb_tb_alu_seminario: 'sgb_tb_alu_seminario',
  sgb_tb_oferta: 'sgb_tb_oferta',
  sged_tb_eva_doc_cab: 'sged_tb_eva_doc_cab',
  sged_tb_eva_doc_det: 'sged_tb_eva_doc_det',
  sged_tb_eva_doc_preg: 'sged_tb_eva_doc_preg',
  sgh_tb_cursos_proyectados: 'sgh_tb_cursos_proyectados',
  sgt_tb_alu_beca_autorizacion: 'sgt_tb_alu_beca_autorizacion',
  sgt_tb_alu_cuota: 'sgt_tb_alu_cuota',
  sgt_tb_alu_cuota_20242_pg_seg_elim: 'sgt_tb_alu_cuota_20242_pg_seg_elim',
  sgt_tb_alu_cuota_20251_es_seg_elim: 'sgt_tb_alu_cuota_20251_es_seg_elim',
  sgt_tb_alu_cuota_dscto_adicional: 'sgt_tb_alu_cuota_dscto_adicional',
  sgt_tb_alu_cuota_mat: 'sgt_tb_alu_cuota_mat',
  sgt_tb_alu_cuota_pension: 'sgt_tb_alu_cuota_pension',
  sgt_tb_alu_cuota_retiro_dscto_manual: 'sgt_tb_alu_cuota_retiro_dscto_manual',
  sgt_tb_alu_cuota_saldo_favor: 'sgt_tb_alu_cuota_saldo_favor',
  sgt_tb_alu_cuota_score: 'sgt_tb_alu_cuota_score',
  sgt_tb_alu_factura: 'sgt_tb_alu_factura',
  sgt_tb_alu_pago_anulado: 'sgt_tb_alu_pago_anulado',
  sgt_tb_alu_pago_asignado: 'sgt_tb_alu_pago_asignado',
  sgt_tb_alu_pago_asignado_det: 'sgt_tb_alu_pago_asignado_det',
  sgt_tb_alu_pago_asignado_det_elim_carnet: 'sgt_tb_alu_pago_asignado_det_elim_carnet',
  sgt_tb_alu_pago_asignado_det_elim_es_20251: 'sgt_tb_alu_pago_asignado_det_elim_es_20251',
  sgt_tb_alu_pago_asignado_det_elim_pg_20242: 'sgt_tb_alu_pago_asignado_det_elim_pg_20242',
  sgt_tb_alu_pago_asignado_det_elim_se_20243: 'sgt_tb_alu_pago_asignado_det_elim_se_20243',
  sgt_tb_alu_pago_cab: 'sgt_tb_alu_pago_cab',
  sgt_tb_alu_pago_det: 'sgt_tb_alu_pago_det',
  sgt_tb_alu_pago_doc: 'sgt_tb_alu_pago_doc',
  sgt_tb_alu_pago_doc_cuota: 'sgt_tb_alu_pago_doc_cuota',
  sgt_tb_alu_pago_doc_det: 'sgt_tb_alu_pago_doc_det',
  sgt_tb_alu_pago_eliminado: 'sgt_tb_alu_pago_eliminado',
  sgt_tb_alu_pago_obs: 'sgt_tb_alu_pago_obs',
  sgt_tb_alu_pago_varios: 'sgt_tb_alu_pago_varios',
  sgt_tb_beca_autorizacion: 'sgt_tb_beca_autorizacion',
  sgt_tb_cta_banco: 'sgt_tb_cta_banco',
  sgt_tb_descuento_cuota: 'sgt_tb_descuento_cuota',
  sgt_tb_egreso_autoriza: 'sgt_tb_egreso_autoriza',
  sgt_tb_escala_pago: 'sgt_tb_escala_pago',
  sgt_tb_impuesto: 'sgt_tb_impuesto',
  sgt_tb_incremento_x_rep: 'sgt_tb_incremento_x_rep',
  sgt_tb_nota_credito: 'sgt_tb_nota_credito',
  sgt_tb_nota_credito_tipo: 'sgt_tb_nota_credito_tipo',
  sgt_tb_origen_pago: 'sgt_tb_origen_pago',
  sgt_tb_pago_asigando: 'sgt_tb_pago_asigando',
  sgt_tb_pago_asigando_det: 'sgt_tb_pago_asigando_det',
  sgt_tb_promocion: 'sgt_tb_promocion',
  sgt_tb_promocion_alu: 'sgt_tb_promocion_alu',
  sgt_tb_promocion_prog: 'sgt_tb_promocion_prog',
  sgt_tb_promocion_regla: 'sgt_tb_promocion_regla',
  sgt_tb_prorroga: 'sgt_tb_prorroga',
  sgt_tb_serie_doc_pago: 'sgt_tb_serie_doc_pago',
  sgt_tb_tarifa: 'sgt_tb_tarifa',
  sgt_tb_tarifa_cuota_ciclo: 'sgt_tb_tarifa_cuota_ciclo',
  sgt_tb_tarifa_matricula_cred: 'sgt_tb_tarifa_matricula_cred',
  sgt_tb_tipo_doc_pago: 'sgt_tb_tipo_doc_pago',
  sgt_tb_tipo_moneda: 'sgt_tb_tipo_moneda',
  sgt_tb_tipo_pago: 'sgt_tb_tipo_pago',
  sgt_tb_venc_pronto_pago: 'sgt_tb_venc_pronto_pago',
  sgt_tb_vencimiento: 'sgt_tb_vencimiento',
  stg_espacio: 'stg_espacio',
  t_sedes: 't_sedes',
  tb_admin_facultad: 'tb_admin_facultad',
  tb_admin_modalidad: 'tb_admin_modalidad',
  tb_admin_usuario: 'tb_admin_usuario',
  tb_alu_cur_grp: 'tb_alu_cur_grp',
  tb_alu_deportista: 'tb_alu_deportista',
  tb_alu_eva: 'tb_alu_eva',
  tb_alu_eva_rec: 'tb_alu_eva_rec',
  tb_alu_eva_rec_doc: 'tb_alu_eva_rec_doc',
  tb_alu_eva_upd: 'tb_alu_eva_upd',
  tb_alu_historial: 'tb_alu_historial',
  tb_alu_psicofisico: 'tb_alu_psicofisico',
  tb_alu_reincoporacion: 'tb_alu_reincoporacion',
  tb_alu_rigor: 'tb_alu_rigor',
  tb_alum_pago: 'tb_alum_pago',
  tb_alumno_cambio_espec: 'tb_alumno_cambio_espec',
  tb_alumno_cambio_modal: 'tb_alumno_cambio_modal',
  tb_alumno_cambio_sede: 'tb_alumno_cambio_sede',
  tb_alumno_cambio_situ: 'tb_alumno_cambio_situ',
  tb_alumno_consolidado: 'tb_alumno_consolidado',
  tb_alumno_constancia: 'tb_alumno_constancia',
  tb_alumno_diploma: 'tb_alumno_diploma',
  tb_alumno_encuesta_proceso: 'tb_alumno_encuesta_proceso',
  tb_alumno_encuesta_registroopc: 'tb_alumno_encuesta_registroopc',
  tb_alumno_encuesta_respuesta: 'tb_alumno_encuesta_respuesta',
  tb_alumno_expedito: 'tb_alumno_expedito',
  tb_alumno_ia: 'tb_alumno_ia',
  tb_alumno_ia_txt: 'tb_alumno_ia_txt',
  tb_alumno_licencia_mat: 'tb_alumno_licencia_mat',
  tb_alumno_reing: 'tb_alumno_reing',
  tb_alumno_res: 'tb_alumno_res',
  tb_alumno_reserva_mat: 'tb_alumno_reserva_mat',
  tb_alumno_token_clave: 'tb_alumno_token_clave',
  tb_area_admin: 'tb_area_admin',
  tb_asis_alum: 'tb_asis_alum',
  tb_asis_alum_det: 'tb_asis_alum_det',
  tb_asis_alum_justif: 'tb_asis_alum_justif',
  tb_avancealu: 'tb_avancealu',
  tb_cal_acad: 'tb_cal_acad',
  tb_cambio_modalidad_matricula: 'tb_cambio_modalidad_matricula',
  tb_carga_no_lectiva: 'tb_carga_no_lectiva',
  tb_cargita: 'tb_cargita',
  tb_cargo: 'tb_cargo',
  tb_carnet_alu: 'tb_carnet_alu',
  tb_carnet_tramite: 'tb_carnet_tramite',
  tb_chat_soporte_mensaje: 'tb_chat_soporte_mensaje',
  tb_cita: 'tb_cita',
  tb_clase_sesion: 'tb_clase_sesion',
  tb_configuracion: 'tb_configuracion',
  tb_cur_grp_cert: 'tb_cur_grp_cert',
  tb_cur_grp_eva: 'tb_cur_grp_eva',
  tb_cur_grp_eva_estado: 'tb_cur_grp_eva_estado',
  tb_cur_grp_hor: 'tb_cur_grp_hor',
  tb_cur_grp_pro_alu: 'tb_cur_grp_pro_alu',
  tb_cur_grp_pro_alu_com: 'tb_cur_grp_pro_alu_com',
  tb_cur_grp_und: 'tb_cur_grp_und',
  tb_cur_grp_und_eva_unidad_evaluacion: 'tb_cur_grp_und_eva_unidad_evaluacion',
  tb_cur_grp_und_unidad: 'tb_cur_grp_und_unidad',
  tb_cur_grp_vac: 'tb_cur_grp_vac',
  tb_curso_grupo: 'tb_curso_grupo',
  tb_curso_grupo_informe_aludoc: 'tb_curso_grupo_informe_aludoc',
  tb_curso_grupo_silabo: 'tb_curso_grupo_silabo',
  tb_curso_grupo_unidad_plan: 'tb_curso_grupo_unidad_plan',
  tb_curso_seccion: 'tb_curso_seccion',
  tb_dashboard_configuracion: 'tb_dashboard_configuracion',
  tb_den_grad: 'tb_den_grad',
  tb_doc_cur_grp: 'tb_doc_cur_grp',
  tb_doc_enc_respuesta_opcion: 'tb_doc_enc_respuesta_opcion',
  tb_doc_eva: 'tb_doc_eva',
  tb_docente_encuesta: 'tb_docente_encuesta',
  tb_docente_encuesta_proceso: 'tb_docente_encuesta_proceso',
  tb_docente_encuesta_respuesta: 'tb_docente_encuesta_respuesta',
  tb_docente_file: 'tb_docente_file',
  tb_docente_silabo: 'tb_docente_silabo',
  tb_docentes: 'tb_docentes',
  tb_docune: 'tb_docune',
  tb_empresa: 'tb_empresa',
  tb_empresa_contacto: 'tb_empresa_contacto',
  tb_encu_preg: 'tb_encu_preg',
  tb_encu_resp: 'tb_encu_resp',
  tb_encuesta: 'tb_encuesta',
  tb_encuesta_bloque: 'tb_encuesta_bloque',
  tb_encuesta_pregunta: 'tb_encuesta_pregunta',
  tb_encuesta_pregunta_opcion: 'tb_encuesta_pregunta_opcion',
  tb_envs: 'tb_envs',
  tb_especialidad: 'tb_especialidad',
  tb_estado_tramite: 'tb_estado_tramite',
  tb_eva_condicion: 'tb_eva_condicion',
  tb_eva_condicion_nota: 'tb_eva_condicion_nota',
  tb_eva_tipo_concepto: 'tb_eva_tipo_concepto',
  tb_fac_esp_grp: 'tb_fac_esp_grp',
  tb_facultad: 'tb_facultad',
  tb_ficha_perso_alu: 'tb_ficha_perso_alu',
  tb_ficha_perso_doc: 'tb_ficha_perso_doc',
  tb_formula: 'tb_formula',
  tb_formula_termino: 'tb_formula_termino',
  tb_libro_grados: 'tb_libro_grados',
  tb_log_admin: 'tb_log_admin',
  tb_log_izipay: 'tb_log_izipay',
  tb_log_niubiz: 'tb_log_niubiz',
  tb_mat_alu: 'tb_mat_alu',
  tb_mat_alu_pre: 'tb_mat_alu_pre',
  tb_mat_fic: 'tb_mat_fic',
  tb_mat_fic_det: 'tb_mat_fic_det',
  tb_matric_concep_condic: 'tb_matric_concep_condic',
  tb_matricula_costo: 'tb_matricula_costo',
  tb_matricula_especialidad: 'tb_matricula_especialidad',
  tb_matricula_fecha: 'tb_matricula_fecha',
  tb_matricula_tipo: 'tb_matricula_tipo',
  tb_matricula_turno: 'tb_matricula_turno',
  tb_modalidad: 'tb_modalidad',
  tb_modulo: 'tb_modulo',
  tb_modulo_vista: 'tb_modulo_vista',
  tb_notas_registradas: 'tb_notas_registradas',
  tb_observacion_practica: 'tb_observacion_practica',
  tb_padron_grados: 'tb_padron_grados',
  tb_padron_grados_copy1: 'tb_padron_grados_copy1',
  tb_padron_grados_maestro: 'tb_padron_grados_maestro',
  tb_paises: 'tb_paises',
  tb_parametros: 'tb_parametros',
  tb_parametros_disponibles: 'tb_parametros_disponibles',
  tb_peracd: 'tb_peracd',
  tb_perlle: 'tb_perlle',
  tb_plan_estudio_cred: 'tb_plan_estudio_cred',
  tb_plan_estudio_curso: 'tb_plan_estudio_curso',
  tb_plan_estudio_curso_area: 'tb_plan_estudio_curso_area',
  tb_plan_estudio_curso_comp: 'tb_plan_estudio_curso_comp',
  tb_plan_estudio_curso_req: 'tb_plan_estudio_curso_req',
  tb_plan_estudio_equ: 'tb_plan_estudio_equ',
  tb_plan_estudio_esp: 'tb_plan_estudio_esp',
  tb_plan_estudio_modulo: 'tb_plan_estudio_modulo',
  tb_plantilla: 'tb_plantilla',
  tb_practica: 'tb_practica',
  tb_prog_clase: 'tb_prog_clase',
  tb_registro_diploma: 'tb_registro_diploma',
  tb_registro_diploma_maestro: 'tb_registro_diploma_maestro',
  tb_reporte_minedu_sede_maestro: 'tb_reporte_minedu_sede_maestro',
  tb_rol_acceso: 'tb_rol_acceso',
  tb_rol_acceso_modulo_vista: 'tb_rol_acceso_modulo_vista',
  tb_silabo: 'tb_silabo',
  tb_sincronizacion_moodle: 'tb_sincronizacion_moodle',
  tb_sms_consumo: 'tb_sms_consumo',
  tb_sms_default: 'tb_sms_default',
  tb_tabla_opcion: 'tb_tabla_opcion',
  tb_tipo_carga_lectiva: 'tb_tipo_carga_lectiva',
  tb_tra_fol_est_alu: 'tb_tra_fol_est_alu',
  tb_tra_fol_req: 'tb_tra_fol_req',
  tb_tra_fol_req_entregados: 'tb_tra_fol_req_entregados',
  tb_tra_origen: 'tb_tra_origen',
  tb_tra_pasos: 'tb_tra_pasos',
  tb_tra_pasos_files: 'tb_tra_pasos_files',
  tb_tra_tipo_req: 'tb_tra_tipo_req',
  tb_tra_tipo_req_ent: 'tb_tra_tipo_req_ent',
  tb_tra_tipos: 'tb_tra_tipos',
  tb_ubigeo2006: 'tb_ubigeo2006',
  tb_une_aula: 'tb_une_aula',
  tb_une_pab: 'tb_une_pab',
  tb_une_pab_aula: 'tb_une_pab_aula',
  tb_unidad_estudio: 'tb_unidad_estudio',
  tb_unidad_estudio_categoria: 'tb_unidad_estudio_categoria',
  tb_unidad_estudio_concepto: 'tb_unidad_estudio_concepto',
  tb_unidad_estudio_concepto_condicion: 'tb_unidad_estudio_concepto_condicion',
  tb_unidad_estudio_condicion: 'tb_unidad_estudio_condicion',
  tb_unidad_estudio_evaluacion: 'tb_unidad_estudio_evaluacion',
  tb_unidad_estudio_plan: 'tb_unidad_estudio_plan',
  tb_unidad_estudio_plan_categoria: 'tb_unidad_estudio_plan_categoria',
  tb_unidad_estudio_plan_prom: 'tb_unidad_estudio_plan_prom',
  tb_unidad_estudio_plan_prom_condicion: 'tb_unidad_estudio_plan_prom_condicion',
  tb_unidad_estudio_plan_prom_config: 'tb_unidad_estudio_plan_prom_config',
  tb_usuario_rol_acceso: 'tb_usuario_rol_acceso',
  temp_presencial: 'temp_presencial',
  temp_upd_id_evaluacion: 'temp_upd_id_evaluacion',
  tmp_mat_20251: 'tmp_mat_20251',
  tmp_mat_seg_20243: 'tmp_mat_seg_20243',
  tmp_pago_asignado_det_elim_20243_eu: 'tmp_pago_asignado_det_elim_20243_eu',
  tmp_patron_egre_1: 'tmp_patron_egre_1',
  tmp_patron_egre_2: 'tmp_patron_egre_2',
  tmp_tb_mat_alu_242: 'tmp_tb_mat_alu_242',
  top_atencion: 'top_atencion',
  top_atencion_externa: 'top_atencion_externa',
  top_condicion: 'top_condicion',
  top_especialidad: 'top_especialidad',
  top_evolucion: 'top_evolucion',
  top_fichamedica: 'top_fichamedica',
  top_medicamento: 'top_medicamento',
  top_patologia: 'top_patologia',
  top_triaje: 'top_triaje',
  top_user_especialidad: 'top_user_especialidad',
  umaplus_231_rec: 'umaplus_231_rec',
  users: 'users'
};

/**
 * This is a stub Prisma Client that will error at runtime if called.
 */
class PrismaClient {
  constructor() {
    return new Proxy(this, {
      get(target, prop) {
        let message
        const runtime = getRuntime()
        if (runtime.isEdge) {
          message = `PrismaClient is not configured to run in ${runtime.prettyName}. In order to run Prisma Client on edge runtime, either:
- Use Prisma Accelerate: https://pris.ly/d/accelerate
- Use Driver Adapters: https://pris.ly/d/driver-adapters
`;
        } else {
          message = 'PrismaClient is unable to run in this browser environment, or has been bundled for the browser (running in `' + runtime.prettyName + '`).'
        }
        
        message += `
If this is unexpected, please open an issue: https://pris.ly/prisma-prisma-bug-report`

        throw new Error(message)
      }
    })
  }
}

exports.PrismaClient = PrismaClient

Object.assign(exports, Prisma)

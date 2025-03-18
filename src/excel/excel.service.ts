import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as XLSX from 'xlsx';
import * as fs from 'fs';

@Injectable()
export class ExcelService {
  constructor(private prisma: PrismaService) {}

  async importExcelFromPath(filePath: string) {
    try {
      // Leer el archivo Excel desde la ruta especificada
      const fileBuffer = fs.readFileSync(filePath);
      const workbook = XLSX.read(fileBuffer, { type: 'buffer' });

      // Obtener la primera hoja
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];

      // Convertir a JSON
      const jsonData: any[] = XLSX.utils.sheet_to_json(worksheet);

      // Insertar en la base de datos
      for (const data of jsonData) {
        const generales = data['GENERALES'];

        const validGenerales = generales ? String(generales) : 'Transversales'; 

        await this.prisma.curso.create({
          data: {
            n_codper: Number(data['n_codper']),
            c_codmod: String(data['c_codmod']),
            c_codfac: String(data['c_codfac']),
            c_codesp: String(data['c_codesp']),
            c_codcur: String(data['c_codcur']),
            c_nomcur: String(data['c_nomcur']),
            generales: validGenerales,
          },
        });
      }

      return { message: 'Importación completada con éxito' };
    } catch (error) {
      throw new Error(`Error al importar el archivo: ${error.message}`);
    }
  }
}

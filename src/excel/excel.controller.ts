import { Controller, Get, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { ExcelService } from './excel.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

@Controller('excel')
export class ExcelController {
    constructor(private readonly excelService: ExcelService) {}
    
    @Get('import-local')
    async importLocalExcel() {
      const filePath = 'C:/Users/VICTOR.SINCHE/nest_docente/uploads/curso.xlsx'; // Ruta del archivo
      return this.excelService.importExcelFromPath(filePath);
    }
}

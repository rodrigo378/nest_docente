import { PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get<string>('DATABASE_URL'), // ✅ Asegura que sea un string
        },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.$connect(); // ✅ Intentar conectar Prisma
      console.log('✅ V2'); // 🔍 Confirmación de conexión
      console.log('✅ Prisma conectado correctamente'); // 🔍 Confirmación de conexión
    } catch (error) {
      console.error('❌ Error al conectar a la base de datos:', error);
      process.exit(1); // 🔴 Detiene la aplicación si la DB no está disponible
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect(); // ✅ Cerrar la conexión cuando el módulo se destruye
      console.log('🛑 Prisma desconectado correctamente');
    } catch (error) {
      console.error('⚠️ Error al desconectar Prisma:', error);
    }
  }
}

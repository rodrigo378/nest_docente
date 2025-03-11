import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get<string>('DATABASE_URL'), // ✅ Se asegura de que sea un `string`
        },
      },
    });
  }

  async onModuleInit() {
    await this.$connect(); // ✅ Conectar Prisma al iniciar el módulo
    console.log('✅ Prisma conectado correctamente'); // 🔍 Verificación de conexión
  }

  async onModuleDestroy() {
    await this.$disconnect(); // ✅ Cerrar la conexión cuando el módulo se destruye
  }
}

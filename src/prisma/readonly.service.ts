import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaReadonlyService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor(configService: ConfigService) {
    super({
      datasources: {
        db: {
          url: configService.get<string>('DATABASE_URL_READONLY'), // 🔹 Conexión a la DB de solo lectura
        },
      },
    });
  }

  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ Prisma readonly segunda DB conectado correctamente');
    } catch (error) {
      console.error('❌ Error al conectar a la segunda base de datos readonly:', error.message);
      process.exit(1);
    }
  }

  async onModuleDestroy() {
    try {
      await this.$disconnect();
      console.log('🛑 Prisma readonly segunda BD desconectado correctamente');
    } catch (error) {
      console.error('⚠️ Error al desconectar Prisma readonly segunda BD:', error.message);
    }
  }
}

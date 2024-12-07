import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    // Init
    await this.$connect();
  }

  // Encerra a aplicação quando o banco é encerrado
  // enableShutdownHooks(app: INestApplication){
  //     this.$on('beforeExit', async () => {
  //         await app.close();
  //     })
  // }
}

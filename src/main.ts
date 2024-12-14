import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaNotFoundExceptionFilter } from './exception-filters/prisma-not-found-exception-filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: 422
  }));
  app.useGlobalFilters(new PrismaNotFoundExceptionFilter())

  // Swagger 
  const config = new DocumentBuilder()
    .setTitle('Category and Products')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  
  SwaggerModule.setup('api', app, documentFactory);
  await app.listen(process.env.PORT ?? 3000);
  app.enableShutdownHooks();
}
bootstrap();

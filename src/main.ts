import { ILoggerService } from '@app/global/logger/adapter';
import { ISecretsService } from '@app/global/secrets/adapter';
import { RequestMethod } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { LogAxiosErrorInterceptor } from 'nestjs-convert-to-curl';

import { description, name, version } from '../package.json';
import { AppExceptionFilter } from './filters/http-exception.filter';
import { ExceptionInterceptor } from './interceptors/http-exception.interceptor';
import { AppModule } from './modules/app.module';
import { ApiException } from './utils/exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });

  const loggerService = app.get(ILoggerService);

  loggerService.setContext(name);
  app.useGlobalFilters(new AppExceptionFilter(loggerService));
  app.useGlobalInterceptors(new ExceptionInterceptor(), new LogAxiosErrorInterceptor());

  const { ENV, PORT } = app.get(ISecretsService);

  app.useLogger(loggerService);

  app.setGlobalPrefix('api', {
    exclude: [{ path: 'health', method: RequestMethod.GET }],
  });

  const config = new DocumentBuilder()
    .setTitle(name)
    .setDescription(description)
    .setVersion(version)
    .addTag('API Documentation')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  loggerService.log(`🟢 API listening at ${PORT} on ${ENV?.toUpperCase()} 🟢\n`, 'Application');

  await app.listen(PORT);

  loggerService.log(`🔵 Swagger listening at ${await app.getUrl()}/docs 🔵 \n`, 'Swaggger');

  process.on('unhandledRejection', (error: ApiException) => {
    error.context = 'unhandledRejection';
    loggerService.error(error);
  });
}

bootstrap();

import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'; //配置swagger
import * as helmet from 'helmet'; //防止跨站脚本攻击
// import * as csurf from 'csurf'; //CSRF保护：跨站点请求伪造
import { NestExpressApplication } from '@nestjs/platform-express'; //模板引擎
import * as dotenv from 'dotenv'; //用于读取环境变量

import { AppModule } from './app.module';
import { ResponseInterceptor } from 'common/interceptors/transform.interceptor';
import { HttpExceptionFilter } from 'common/filters/http-exception.filter';

dotenv.config();
const PORT = process.env.PORT || 8000;
const PREFIX = process.env.PREFIX || '/';

async function bootstrap() {
  // const app = await NestFactory.create(AppModule);
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  //静态资源公开路径：localhost:3000/static/1.png
  app.useStaticAssets('public', {
    prefix: '/static/',
  });

  //模板引擎配置
  app.setBaseViewsDir('views'); //模板引擎目录
  app.setViewEngine('ejs'); //模板渲染引擎

  // 路径前缀：如：http://www.dmyxs.com/api/v1/user
  app.setGlobalPrefix('api/v1');

  //cors：跨域资源共享
  // 方式一：允许跨站访问，app.enableCors();
  // 方式二：const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();

  app.use(helmet());
  // app.use(csurf());

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalInterceptors(new ResponseInterceptor());

  const swaggerOptions = new DocumentBuilder()
    .setTitle('nestjs-api-文档')
    .setDescription('nestjs-api-说明')
    .setVersion('1.0')
    .addBasicAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup(`${PREFIX}/doc`, app, document);

  await app.listen(PORT, () => {
    Logger.log(`当前环境: ${process.env.NODE_ENV}`);
    Logger.log(
      `服务已经启动,接口请访问:http://wwww.localhost:${PORT}/${PREFIX}`,
    );
    Logger.log(
      `服务已经启动,文档请访问:http://wwww.localhost:${PORT}/${PREFIX}/doc`,
    );
  });
}
bootstrap();

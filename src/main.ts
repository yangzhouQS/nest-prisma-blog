import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import Validate from './common/validate';
import { TransformInterceptor } from './common/transform.inteceptor';

const port = process.env.PORT || 3000;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new Validate());

  app.useGlobalInterceptors(new TransformInterceptor());

  await app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`);
  });
}
bootstrap();

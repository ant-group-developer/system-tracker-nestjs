import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors();

	await app.listen(process.env.PORT || 7878);
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();

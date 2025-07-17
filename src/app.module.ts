import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfoModule } from './modules/info/info.module';

@Module({
	imports: [ConfigModule.forRoot(), InfoModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InfoModule } from './modules/info/info.modules';

@Module({
	imports: [InfoModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}

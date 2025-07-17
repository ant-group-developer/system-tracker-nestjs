import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { InfoController } from './info.controller';
import { InfoService } from './info.service';

@Module({
	imports: [
		ClientsModule.register([
			{
				name: 'VPS_STATS_SERVICE',
				transport: Transport.RMQ,
				options: {
					urls: ['amqp://admin:123456@localhost:5672'],
					queue: 'vps_stats_queue',
					queueOptions: { durable: true },
				},
			},
		]),
	],
	controllers: [InfoController],
	providers: [InfoService],
})
export class InfoModule {}

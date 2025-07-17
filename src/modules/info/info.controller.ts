import { Controller, Get } from '@nestjs/common';
import { InfoService } from './info.service';

@Controller('info')
export class InfoController {
	constructor(private readonly infoService: InfoService) {}

	@Get('core')
	async getInfo() {
		return this.infoService.getInfoAndSend();
	}

	@Get('status')
	async getStatus() {
		return this.infoService.getStatusAndSend();
	}

	@Get('docker')
	async getDocker() {
		return this.infoService.getDocker();
	}

	@Get('docker/all')
	async getDockerAll() {
		return this.infoService.getDockerAll();
	}
}

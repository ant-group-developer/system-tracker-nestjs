import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import * as systeminformation from 'systeminformation';

@Injectable()
export class InfoService {
	constructor(
		@Inject('VPS_STATS_SERVICE') private readonly rabbitClient: ClientProxy,
	) {}

	async getInfo() {
		return systeminformation.getStaticData();
	}

	async getInfoAndSend() {
		const info = await this.getInfo();
		this.rabbitClient.emit('vps.core', info);
		return info;
	}

	async getStatus() {
		const status = await systeminformation.getDynamicData();
		return status;
	}

	async getStatusAndSend() {
		const status = await this.getStatus();
		this.rabbitClient.emit('vps.status', status);
		return status;
	}

	async getDocker() {
		const containerProcess =
			await systeminformation.dockerContainerProcesses();
		const containerStats = await systeminformation.dockerContainerStats();
		const containers = await systeminformation.dockerContainers();
		const images = await systeminformation.dockerImages();
		const volumns = await systeminformation.dockerVolumes();

		return {
			containerProcess,
			containerStats,
			containers,
			images,
			volumns,
		};
	}

	getDockerAll() {
		return systeminformation.dockerAll();
	}
}

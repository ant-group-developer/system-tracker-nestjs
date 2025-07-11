import { Injectable } from '@nestjs/common';
import * as systeminformation from 'systeminformation';

@Injectable()
export class InfoService {
	constructor() {}

	async getInfo() {
		const info = await systeminformation.getStaticData();
		return info;
	}

	async getStatus() {
		const status = await systeminformation.getDynamicData();
		return status;
	}
}

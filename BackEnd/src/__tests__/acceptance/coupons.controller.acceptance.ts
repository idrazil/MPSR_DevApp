import { Client } from '@loopback/testlab';
import { MsprDevAppBackendApplication } from '../..';
import { setupApplication } from './test-helper';

describe('Coupons Controller', () => {
	let app: MsprDevAppBackendApplication;
	let client: Client;

	before('setupApplication', async () => {
		({ app, client } = await setupApplication());
	});

	after(async () => {
		await app.stop();
	});

	it('Get all coupons', async () => {
		await client.get('/coupons').expect(200);
	});
});

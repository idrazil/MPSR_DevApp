import { inject } from '@loopback/core';
import { DefaultCrudRepository } from '@loopback/repository';
import { MongodbDataSource } from '../datasources';
import { Coupons, CouponsRelations } from '../models';

export class CouponsRepository extends DefaultCrudRepository<
	Coupons,
	typeof Coupons.prototype.id,
	CouponsRelations
> {
	constructor(@inject('datasources.mongodb') dataSource: MongodbDataSource) {
		super(Coupons, dataSource);
	}
}

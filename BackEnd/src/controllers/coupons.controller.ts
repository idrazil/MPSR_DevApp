import {
	Count,
	CountSchema,
	Filter,
	FilterExcludingWhere,
	repository,
	Where,
} from '@loopback/repository';
import {
	del,
	get,
	getModelSchemaRef,
	param,
	patch,
	post,
	put,
	requestBody,
} from '@loopback/rest';
import { Coupons } from '../models';
import { CouponsRepository } from '../repositories';

export class CouponsController {
	constructor(
		@repository(CouponsRepository)
		public couponsRepository: CouponsRepository
	) {}

	@post('/coupons', {
		responses: {
			'200': {
				description: 'Coupons model instance',
				content: {
					'application/json': { schema: getModelSchemaRef(Coupons) },
				},
			},
		},
	})
	async create(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Coupons, {
						title: 'NewCoupons',
						exclude: ['id'],
					}),
				},
			},
		})
		coupons: Omit<Coupons, 'id'>
	): Promise<Coupons> {
		return this.couponsRepository.create(coupons);
	}

	@get('/coupons/count', {
		responses: {
			'200': {
				description: 'Coupons model count',
				content: { 'application/json': { schema: CountSchema } },
			},
		},
	})
	async count(@param.where(Coupons) where?: Where<Coupons>): Promise<Count> {
		return this.couponsRepository.count(where);
	}

	@get('/coupons', {
		responses: {
			'200': {
				description: 'Array of Coupons model instances',
				content: {
					'application/json': {
						schema: {
							type: 'array',
							items: getModelSchemaRef(Coupons, {
								includeRelations: true,
							}),
						},
					},
				},
			},
		},
	})
	async find(
		@param.filter(Coupons) filter?: Filter<Coupons>
	): Promise<Coupons[]> {
		return this.couponsRepository.find(filter);
	}

	@patch('/coupons', {
		responses: {
			'200': {
				description: 'Coupons PATCH success count',
				content: { 'application/json': { schema: CountSchema } },
			},
		},
	})
	async updateAll(
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Coupons, { partial: true }),
				},
			},
		})
		coupons: Coupons,
		@param.where(Coupons) where?: Where<Coupons>
	): Promise<Count> {
		return this.couponsRepository.updateAll(coupons, where);
	}

	@get('/coupons/{id}', {
		responses: {
			'200': {
				description: 'Coupons model instance',
				content: {
					'application/json': {
						schema: getModelSchemaRef(Coupons, {
							includeRelations: true,
						}),
					},
				},
			},
		},
	})
	async findById(
		@param.path.string('id') id: string,
		@param.filter(Coupons, { exclude: 'where' })
		filter?: FilterExcludingWhere<Coupons>
	): Promise<Coupons> {
		return this.couponsRepository.findById(id, filter);
	}

	@patch('/coupons/{id}', {
		responses: {
			'204': {
				description: 'Coupons PATCH success',
			},
		},
	})
	async updateById(
		@param.path.string('id') id: string,
		@requestBody({
			content: {
				'application/json': {
					schema: getModelSchemaRef(Coupons, { partial: true }),
				},
			},
		})
		coupons: Coupons
	): Promise<void> {
		await this.couponsRepository.updateById(id, coupons);
	}

	@put('/coupons/{id}', {
		responses: {
			'204': {
				description: 'Coupons PUT success',
			},
		},
	})
	async replaceById(
		@param.path.string('id') id: string,
		@requestBody() coupons: Coupons
	): Promise<void> {
		await this.couponsRepository.replaceById(id, coupons);
	}

	@del('/coupons/{id}', {
		responses: {
			'204': {
				description: 'Coupons DELETE success',
			},
		},
	})
	async deleteById(@param.path.string('id') id: string): Promise<void> {
		await this.couponsRepository.deleteById(id);
	}
}

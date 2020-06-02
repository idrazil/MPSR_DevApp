import { inject, lifeCycleObserver, LifeCycleObserver } from '@loopback/core';
import { juggler } from '@loopback/repository';

const config = {
	name: 'mongodb',
	connector: 'mongodb',
	url:
		'mongodb://ano:root@mspr-dev-appli-b3-shard-00-00-s6wxi.mongodb.net:27017,mspr-dev-appli-b3-shard-00-01-s6wxi.mongodb.net:27017,mspr-dev-appli-b3-shard-00-02-s6wxi.mongodb.net:27017/test?ssl=true&replicaSet=mspr-dev-appli-b3-shard-0&authSource=admin&retryWrites=true&w=majority',
	useNewUrlParser: true,
};
// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
	implements LifeCycleObserver {
	static dataSourceName = 'mongodb';
	static readonly defaultConfig = config;

	constructor(
		@inject('datasources.config.mongodb', { optional: true })
		dsConfig: object = config
	) {
		super(dsConfig);
	}
}

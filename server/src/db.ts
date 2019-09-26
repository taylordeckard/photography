import { constants } from '@app/constants';
import * as _ from 'lodash-es';
import { v1 } from 'neo4j-driver';

class Neo4jDB {
	private driver: ReturnType<typeof v1.driver>;
	constructor () {
		this.driver = v1.driver(
			constants.db.uri,
			v1.auth.basic(constants.db.user, constants.db.password),
		);
	}

	public async query (
		query: string,
		props?: { [key: string]: string },
		path?: string,
	) {
		const session = this.driver.session()
		let result;
		result = await session.run(query, props);
		if (result) {
			return _.map(result.records, record => {
				const recordObject = record.toObject();
				if (path) {
					return _.get(recordObject, path);
				}
				return recordObject;
			});
		}
		session.close();
	}
}

export const neo4jDB = new Neo4jDB();

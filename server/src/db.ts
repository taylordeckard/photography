import { constants } from '@app/constants';
import * as _ from 'lodash-es';
import { v1 } from 'neo4j-driver';

const neo4jIntsToStrings = (json: any): any => {
	const pluckAndModify = (isMatch: (t: any[]) => boolean, transformValue: (t: any) => any) =>
		Object.entries(json)
			.filter(isMatch)
			.reduce((acc, [key, value]) => ({ ...acc, [key]: transformValue(value) }), {});
	return Object.assign(
		json,
		pluckAndModify(([, value]) => typeof value === 'object', neo4jIntsToStrings),
		pluckAndModify(([, value]) => v1.isInt(value), value => value.toString()),
	);
};

class Neo4jDB {
	private driver: ReturnType<typeof v1.driver>;
	constructor () {
		this.driver = v1.driver(
			constants.db.uri,
			v1.auth.basic(constants.db.user, constants.db.password),
		);
	}

	public async query (query: string, props?: { [key: string]: string }) {
		const session = this.driver.session()
		let result;
		result = await session.run(query, props);
		session.close();
		if (result) {
			return _.map(result.records, record => {
				return neo4jIntsToStrings(record.toObject());
			});
		}
		return result;
	}
}

export const neo4jDB = new Neo4jDB();

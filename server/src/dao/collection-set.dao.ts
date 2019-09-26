import { neo4jDB } from '@app/db';

const GET_ROOT_COLLECTION_SETS = 'MATCH (cs) WHERE NOT (cs:CollectionSet)<--() RETURN cs';
const GET_ALL_COLLECTION_SETS = 'MATCH (cs:CollectionSet) RETURN cs';

export class CollectionSetDAO {
	public static getCollectionSets () {
		return neo4jDB.query(GET_ALL_COLLECTION_SETS, null, 'cs.properties');
	}
}

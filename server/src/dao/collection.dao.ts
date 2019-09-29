import { neo4jDB } from '@app/db';
import { CollectionType, ICollection, IExpectedHierarchyResponse } from '@app/types';
import { buildHierarchy, genUUID } from './utils';

const GET_ROOT_COLLECTIONS = 'MATCH (cs) WHERE NOT (cs:Collection)<--() RETURN cs';
const GET_ALL_COLLECTIONS = 'MATCH p = (a:Collection)-[:HAS*]->(b:Collection) WITH *,' +
	' relationships(p) AS r RETURN a,r,b';
const GET_CHILDLESS_COLLECTIONS = 'MATCH (a:Collection) WHERE NOT (a)-->(:Collection)' +
	' AND NOT (:Collection)-->(a) RETURN a';
const GET_LEAVES = 'MATCH (a:Collection { label: "`Wildlife" })-[:HAS*]-(n) WHERE NOT (n)-->() RETURN n';
const CREATE_COLLECTION = `CREATE (cs:Collection {` +
	`label: $label,` +
	`type: ${CollectionType.COLLECTION},` +
	`uuid: $uuid` +
`})`;
const UPDATE_COLLECTION = `MATCH (cs:Collection { uuid: $uuid }) SET cs = {
	label: $label,
	type: ${CollectionType.COLLECTION},
	uuid: $uuid
}`
const DELETE_COLLECTION = 'MATCH (cs:Collection { uuid: $uuid }) DETACH DELETE cs';

export class CollectionsDAO {
	public static createCollection (label: string) {
		const uuid = genUUID();
		return neo4jDB.query(CREATE_COLLECTION, { label, uuid });
	}
	public static async getCollections () {
		// get collections connected to other collections
		const graphCollections: IExpectedHierarchyResponse[] = await neo4jDB
			.query(GET_ALL_COLLECTIONS) as IExpectedHierarchyResponse[];
		// get collections only connected to photos 
		const childlessCollections = await neo4jDB
			.query(GET_CHILDLESS_COLLECTIONS) as IExpectedHierarchyResponse[];
		return buildHierarchy([
			...childlessCollections,
			...graphCollections,
		]);
	}
	public static updateCollection (coll: ICollection) {
		return neo4jDB.query(UPDATE_COLLECTION, { label: coll.label, uuid: coll.uuid })
	}
	public static deleteCollection (uuid: string) {
		return neo4jDB.query(DELETE_COLLECTION, { uuid })
	}
}

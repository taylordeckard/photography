import { ICollection } from './Collection'
import { INeo4jRecord } from './Neo4jRecord';
import { IPhoto } from './Photo';
import { IRelationship } from './Relationship';

export interface IExpectedHierarchyResponse {
	a: INeo4jRecord<ICollection>;
	b: INeo4jRecord<ICollection>;
	r: IRelationship[];
}

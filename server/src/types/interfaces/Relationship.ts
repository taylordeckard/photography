export interface IRelationship {
	identity: string;
	type: 'HAS';
	start: string;
	end: string;
	properties: {};
}

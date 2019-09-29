export enum CollectionType {
	COLLECTION = 'COLLECTION',
	PHOTO = 'PHOTO',
}

export interface Collection {
	content?: Collection[];
	label: string;
	type: CollectionType;
	numChildren?: number;
	uuid: string;
}

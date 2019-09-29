import { CollectionType } from '../enums/CollectionType';
import { ICollection, IPhoto } from './';

export interface ICollection {
	content?: ICollection[];
	label: string;
	type: CollectionType;
	numChildren?: number;
	uuid: string;
}

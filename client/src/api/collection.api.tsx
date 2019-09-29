import { Collection } from '../types';
import { http } from './utils';

class CollectionAPIClass {
	private apiBase = process.env.REACT_APP_API_BASE;

	public getCollections () {
		return http<Collection[]>(`${this.apiBase}/collection`);
	}
}

export const CollectionAPI = new CollectionAPIClass();

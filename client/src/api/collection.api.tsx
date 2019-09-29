class CollectionAPIClass {
	private apiBase = process.env.REACT_APP_API_BASE;

	public getCollections () {
		return fetch(`${this.apiBase}/collection`);
	}
}

export const CollectionAPI = new CollectionAPIClass();

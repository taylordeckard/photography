export interface INeo4jRecord<T> {
	identity: string;
	labels: string[];
	properties: T;
}

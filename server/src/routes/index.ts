import { IAppRoute } from '@app/types';
import { collectionRoutes } from './collection.routes';

export const appRoutes: IAppRoute[] = [
	...collectionRoutes,
];

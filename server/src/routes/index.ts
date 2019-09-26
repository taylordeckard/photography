import { IAppRoute } from '@app/types';
import { collectionSetRoutes } from './collection-set.routes';
import { collectionRoutes } from './collection.routes';

export const appRoutes: IAppRoute[] = [
	...collectionRoutes,
	...collectionSetRoutes,
];

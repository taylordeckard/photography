import { CollectionSetDAO } from '@app/dao';
import { IAppRoute } from '@app/types';
import { Context } from 'koa';

export const collectionSetRoutes: IAppRoute[] = [
	{
		handler: (ctx: Context) => {
			ctx.body = { success: true };
		},
		method: 'post',
		path: '/collection-set',
	},
	{
		handler: async (ctx: Context) => {
			ctx.body = await CollectionSetDAO.getCollectionSets();
		},
		method: 'get',
		path: '/collection-set',
	}
];


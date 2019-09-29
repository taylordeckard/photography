import { CollectionsDAO } from '@app/dao';
import { Context } from 'koa';
import { IAppRoute } from '../types';

export const collectionRoutes: IAppRoute[] = [
	{
		handler: (ctx: Context) => {
			ctx.body = { success: true };
		},
		method: 'post',
		path: '/collection',
	},
	{
		handler: async (ctx: Context) => {
			ctx.body = await CollectionsDAO.getCollections();
		},
		method: 'get',
		path: '/collection',
	}
];


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
		handler: (ctx: Context) => {
			ctx.body = { commonName: 'Bald Eagle', scientificName: 'haliaeetus leucocephalus' };
		},
		method: 'get',
		path: '/collection',
	}
];


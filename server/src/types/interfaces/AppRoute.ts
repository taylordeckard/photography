import { Context } from 'koa';

export type AppRouteMethod = 'delete' | 'get' | 'head' | 'patch' | 'post' | 'put';
export type AppRouteHandler = (ctx: Context, next?: () => Promise<any>) => void;
export interface IAppRoute {
	handler: AppRouteHandler | AppRouteHandler[];
	method: AppRouteMethod;
	path: string;
}

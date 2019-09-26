import { IAppRoute } from '@app/types';
import Router from 'koa-router';
import * as _ from 'lodash-es';

export function buildRoutes (router: Router, routes: IAppRoute[]) {
	_.each(routes, route => {
		if (_.isArray(route.handler)) {
			_.invoke(router, [route.method], route.path, ...route.handler);
		} else {
			_.invoke(router, [route.method], route.path, route.handler);
		}
	});
}

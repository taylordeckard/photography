import { buildRoutes } from '@app/build-routes';
import { constants } from '@app/constants';
import { appRoutes } from '@app/routes';
import { Logger } from '@app/utils';
import Koa, { Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import Router from 'koa-router';

const app = new Koa();

if (!constants.production) {
	app.use(async (ctx, next) => {
		ctx.set('Access-Control-Allow-Origin', '*');
		ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
		ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
		await next();
	});
}

/* Adds middleware to append Logger to context */
app.use(async (ctx, next) => {
	ctx.state.logger = Logger;
	await next();
});

/* Read JSON bodies in requests */
app.use(bodyParser({
	formLimit: '100kb',
	jsonLimit: '100kb',
}));

/* Log all errors */
app.on('error', error => {
	Logger.error(`request error: ${error}`);
});

const router = new Router();

buildRoutes(router, appRoutes);

app.use(router.routes());

app.listen(constants.appPort);
Logger.info(`Listening on port ${constants.appPort}`);

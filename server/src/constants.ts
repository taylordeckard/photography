import * as env from './environment.json';

export const constants = {
	...env,
	appPort: 3000,
	production: false,
};

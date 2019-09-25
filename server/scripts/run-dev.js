/* eslint-disable */
const { spawn } = require('child_process');
const chalk = require('chalk');
const kill = require('tree-kill');

let isCompiled = false;
let webpackProcess;
let nodemonProcess;

const runServe = () => {
	nodemonProcess = spawn('npm', ['run', 'start:dev']);
	nodemonProcess.stdout.on('data', data => {
		console.info(data.toString());
	});
	nodemonProcess.stderr.on('data', data => {
		console.error(chalk.red(data.toString()));
	});
};

const runWatch = () => {
	webpackProcess = spawn('npm', ['run', 'watch']);
	webpackProcess.stdout.on('data', data => {
		const dataString = data.toString();
		if (/No type errors found/.test(dataString)) {
			console.info(chalk.black.bgGreen(`[webpack] ${dataString}`));
		} else if (/WARNING/.test(dataString)) {
			console.info(chalk.black.bgYellow(`[webpack] ${dataString}`));
		} else {
			console.info(chalk.magenta(`[webpack] ${dataString}`));
		}
		if (!isCompiled && /\[built\]/.test(dataString)) {
			// once compiled, run serve
			runServe();
			isCompiled = true;
		}
	});
	webpackProcess.stderr.on('data', data => {
		const dataString = data.toString();
		if (/ERROR/.test(dataString)) {
			console.info(chalk.white.bgRed(`[webpack] ${dataString}`));
		} else {
			console.info(chalk.magenta(`[webpack] ${dataString}`));
		}
	});
};

let killed = false;
function exitHandler (options, exitCode) {
	if (!killed) {
		killed = true;
		console.log(chalk.black.bgYellow('  Shutting down...  '));
		kill(nodemonProcess.pid);
		kill(webpackProcess.pid);
		process.exit();
	}
}

process.on('exit', exitHandler);
process.on('SIGINT', exitHandler);
process.on('SIGUSR1', exitHandler);
process.on('SIGUSR2', exitHandler);
process.on('uncaughtException', exitHandler);

// run watch immediately
runWatch();

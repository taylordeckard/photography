const svgPaths = [
	'icons/caret-down.svg',
	'icons/caret-up.svg',
	'icons/dark-mode.svg',
	'icons/light-mode.svg',
];

export function loadSVGs () {
	svgPaths.forEach(path => {
		fetch(path);
	});
}

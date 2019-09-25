const svgPaths = [
	'icons/dark-mode.svg',
	'icons/light-mode.svg',
];

export function loadSVGs () {
	svgPaths.forEach(path => {
		fetch(path);
	});
}

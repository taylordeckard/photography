const THEME_LS_KEY = 'taylordeckard.me-photography-portfolio-mode';

export class ThemeLoader {
	private _theme: 'dark' | 'light' = 'dark';
	public get theme () {
		return this._theme;
	}
	public set theme (theme: 'dark' | 'light') {
		if (theme === 'dark' || theme === 'light') {
			this._theme = theme;
			localStorage.setItem(THEME_LS_KEY, theme);
		} else {
			this._theme = 'dark';
		}
	}
	constructor () {
		this.theme = localStorage.getItem(THEME_LS_KEY) as 'dark' | 'light';
	}

}

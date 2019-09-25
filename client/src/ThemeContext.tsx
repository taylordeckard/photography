import React from 'react';

export interface ThemeContextInterface {
	theme: 'dark' | 'light';
	toggleTheme: Function;
}

const ThemeContext = React.createContext<ThemeContextInterface>({
	theme: 'dark',
	toggleTheme: () => {},
});

export default ThemeContext;

import React, { useEffect, useRef, useState } from 'react';
import Header from './components/Header';
import CollectionBar from './components/CollectionBar';
import ThemeContext, { ThemeContextInterface } from './ThemeContext';
import { loadSVGs, ThemeLoader } from './utils';

loadSVGs();
const themeLoader = new ThemeLoader();

const App: React.FC = () => {
	/**
	 * THEME CONTEXT
	 */
	const themeRef = useRef<ThemeContextInterface>();
	const toggleTheme = () => {
		if (themeRef.current) {
			const newTheme = themeRef.current.theme === 'dark' ? 'light' : 'dark';
			themeLoader.theme = newTheme;
			setTheme({
				...theme,
				theme: newTheme,
			});
		}
	};
	const defaultTheme: ThemeContextInterface = {
		toggleTheme,
		theme: themeLoader.theme,
	};
	const [theme, setTheme] = useState(defaultTheme);
	useEffect(() => {
		themeRef.current = theme;
	});
	const getAppTheme = () => {
		if (theme.theme === 'dark')  {
			return 'dark-theme';
		}

		return 'light-theme';
	};

	return (
		<ThemeContext.Provider value={theme}>
			<div className={getAppTheme()}>
				<Header/>
				<CollectionBar/>
			</div>
		</ThemeContext.Provider>
	);
}

export default App;

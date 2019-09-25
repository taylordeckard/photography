import React, { useState } from 'react';
import ThemeContext from '../ThemeContext';
import IconButton from './IconButton';

const AppThemeButton: React.FC = () => {
	const [isDarkMode, setIsDarkMode] = useState(true);
	return (
		<ThemeContext.Consumer>
		{({theme, toggleTheme}) => ( 
			<IconButton
				onClick={() => {
					toggleTheme();
					setIsDarkMode(!isDarkMode);
				}}
				src={isDarkMode ? 'icons/light-mode.svg' : 'icons/dark-mode.svg'}
				title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
			/>
		)}
		</ThemeContext.Consumer>
	);
}

export default AppThemeButton;

import React from 'react';
import AppThemeButton from './AppThemeButton';
import './ButtonBar.scss';

const ButtonBar: React.FC = () => {
	return (
		<div className="ButtonBar">
			<AppThemeButton/>
		</div>
	);
}

export default ButtonBar;

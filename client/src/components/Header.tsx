import React from 'react';
import './Header.scss';
import ButtonBar from './ButtonBar';

const Header: React.FC = () => {
	return (
		<div className="Header flex-center-vertical">
			<div>
				<h1>Taylor Deckard</h1>
				<div>
					<small className="text--muted">
						Software Engineer and Hobbyist Photographer
					</small>
				</div>
			</div>
			<div className="flex-right">
				<ButtonBar/>
			</div>
		</div>
	);
}

export default Header;

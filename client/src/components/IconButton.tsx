import React from 'react';
import './IconButton.scss';

interface IconButtonProps {
	onClick?: () => void;
	src: string;
	title?: string;
}

const IconButton: React.FC<IconButtonProps> = (props) => {
	return (
		<button className="IconButton" onClick={props.onClick} title={props.title}>
			<img alt="app-icon" src={props.src}/>
		</button>
	);
}

export default IconButton;

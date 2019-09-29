import React, { useState } from 'react';
import './CollectionRow.scss';
import { CollectionType } from '../types';
import Caret from './Caret';

interface CollectionRowProps {
	content?: CollectionRowProps[];
	label: string;
	type: CollectionType;
	numChildren?: number;
	uuid: string;
}

const CollectionRow: React.FC<CollectionRowProps> = (props) => {
	const [expanded, setExpanded] = useState(false);
	const [active, setActive] = useState(false);
	
	return (
		<div
			className={`CollectionRow flex flex-center-vertical${active ? ' active' : ''}`}
			onClick={() => setActive(true)}
		>
			<span title={props.label}>{ props.label }</span>
			<Caret expanded={expanded} setExpanded={setExpanded}/>
		</div>
	);
}

export default CollectionRow;

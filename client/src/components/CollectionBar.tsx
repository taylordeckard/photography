import React, { useEffect, useRef, useState } from 'react';
import './CollectionBar.scss';
import CollectionRow from './CollectionRow';
import WidthHandle from './WidthHandle';
import { CollectionAPI } from '../api';
import { CollectionType } from '../types';

const CollectionBar: React.FC = () => {
	const [width, setWidth] = useState(300);
	const widthRef = useRef<number>(width);

	const updateWidth = (delta: number) => {
		setWidth(widthRef.current + delta);
	};

	useEffect(() => {
		widthRef.current = width;
	});

	const getCollections = async () => {
		const collections = await CollectionAPI.getCollections();
		console.log(collections);
	};

	getCollections();

	return (
		<div
			className="CollectionBar"
			style={{ width: `${width}px` }}
		>
			<CollectionRow
				label="Wildlife"
				type={CollectionType.COLLECTION}
				uuid="1"
			/>
			<WidthHandle updateWidth={updateWidth}/>
		</div>
	);
}

export default CollectionBar;

import React, { useEffect, useRef, useState } from 'react';
import './CollectionBar.scss';
import CollectionRow from './CollectionRow';
import WidthHandle from './WidthHandle';
import { CollectionAPI } from '../api';
import { Collection } from '../types';

const CollectionBar: React.FC = () => {
	const [width, setWidth] = useState(300);
	const [collections, setCollections] = useState<Collection[]>([]);
	const widthRef = useRef<number>(width);

	const updateWidth = (delta: number) => {
		setWidth(widthRef.current + delta);
	};

	useEffect(() => {
		widthRef.current = width;
	});

	const getCollections = async () => {
		const collections = await CollectionAPI.getCollections();
		setCollections(collections);
	};

	useEffect(() => {
		getCollections();
	}, []);


	return (
		<div
			className="CollectionBar"
			style={{ width: `${width}px` }}
		>
			{collections.map(coll => <CollectionRow key={coll.uuid}  collection={coll}/>)}
			<WidthHandle updateWidth={updateWidth}/>
		</div>
	);
}

export default CollectionBar;

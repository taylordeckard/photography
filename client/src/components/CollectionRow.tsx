import React, { useEffect, useState } from 'react';
import './CollectionRow.scss';
import { Collection } from '../types';
import Caret from './Caret';
import { SharedState } from '../SharedState';
import { filter, map, startWith } from 'rxjs/operators';

export interface CollectionRowProps {
	collection: Collection;
	depth?: number;
}

const CollectionRow: React.FC<CollectionRowProps> = (props) => {
	const [expanded, setExpanded] = useState(false);
	const [active, setActive] = useState(false);
	const depth = props.depth || 0;

	const showContent = () => {
		if (expanded) {
			return props.collection.content && props.collection.content.map(coll => {
				return <CollectionRow
					key={coll.uuid}
					collection={coll}
					depth={depth + 1}
				/>
			});
		}
	};

	const showCaret = () => {
		if (props.collection.content) {
			return (<Caret expanded={expanded} setExpanded={setExpanded}/>);
		}
	}

	const onRowClick = () => {
		SharedState.selectedCollection = props.collection;
	}

	useEffect(() => {
		const stateSub = SharedState.changes
			.pipe(
				startWith(SharedState.current),
				filter(state => typeof state.selectedCollection !== 'undefined'),
				map(state => state.selectedCollection),
			)
			.subscribe(selectedCollection => {
				if (selectedCollection && selectedCollection.uuid === props.collection.uuid) {
					setActive(true);
				} else {
					setActive(false);
				}
			});
		
		return () => {
			stateSub.unsubscribe();
		};
	}, [props.collection.uuid]);
	
	return (
		<React.Fragment>
			<div
				className={`CollectionRow flex flex-center-vertical${active ? ' active' : ''}`}
				style={{ marginLeft: `${(10 * depth) + 10}px` }}
				onClick={onRowClick}
			>
				<span title={props.collection.label}>{props.collection.label}</span>
				{showCaret()}
			</div>
			{showContent()}
		</React.Fragment>
	);
}

export default CollectionRow;

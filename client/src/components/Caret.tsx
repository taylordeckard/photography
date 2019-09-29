import React from 'react';

interface CaretProps {
	expanded: boolean;
	setExpanded: (expanded: boolean) => void,
}

const Caret: React.FC<CaretProps> = (props) => {
	const toggleExpand = (expanded: boolean) => {
		props.setExpanded(expanded);
	}

	if (props.expanded) {
		return (
			<img
				className="flex-align-end"
				src="icons/caret-up.svg"
				alt="Click to Collapse"
				onClick={() => toggleExpand(false)}
			/>
		);
	}

	return (
		<img
			className="flex-align-end"
			src="icons/caret-down.svg"
			alt="Click to Expand"
			onClick={() => toggleExpand(true)}
		/>
	);
}

export default Caret;

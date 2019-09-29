import React from 'react';

interface CaretProps {
	expanded: boolean;
	setExpanded: (expanded: boolean) => void,
}

const Caret: React.FC<CaretProps> = (props) => {
	const toggleExpand = (event: React.MouseEvent, expanded: boolean) => {
		event.stopPropagation();
		props.setExpanded(expanded);
	}

	if (props.expanded) {
		return (
			<img
				className="flex-align-end"
				src="icons/caret-up.svg"
				alt="Hide Contents"
				title="Hide Contents"
				onClick={(event) => toggleExpand(event, false)}
			/>
		);
	}

	return (
		<img
			className="flex-align-end"
			src="icons/caret-down.svg"
			alt="Show Contents"
			title="Show Contents"
			onClick={(event) => toggleExpand(event, true)}
		/>
	);
}

export default Caret;

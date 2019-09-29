import React, { useEffect, useRef, useState } from 'react';
import './WidthHandle.scss';

interface WidthHandleProps {
	updateWidth: (delta: number) => void;
}

const WidthHandle: React.FC<WidthHandleProps> = (props) => {
	const mouseIsDownRef = useRef<boolean>();
	const positionRef = useRef<number>();
	const [mouseIsDown, setMouseIsDown] = useState(false);
	const [position, setPosition] = useState();

	const onMouseMove = (event: MouseEvent) => {
		if (mouseIsDownRef.current) {
			const newPosition = event.pageX;
			const delta = newPosition - (positionRef.current || 0);
			setPosition(newPosition);
			props.updateWidth(delta);
		}
	}

	const onMouseDown = (event: React.MouseEvent) => {
		event.preventDefault();
		setPosition(event.pageX);
		setMouseIsDown(true);
	};

	const onMouseUp = (event: MouseEvent) => {
		event.preventDefault();
		setMouseIsDown(false);
	};

	useEffect(() => {
		mouseIsDownRef.current = mouseIsDown;
	}, [mouseIsDown]);

	useEffect(() => {
		positionRef.current = position;
	}, [position]);

	useEffect(() => {
		document.addEventListener('mousemove', onMouseMove, true)
		document.addEventListener('mouseup', onMouseUp, true)

		return () => {
			document.removeEventListener('mousemove', onMouseMove, true);
			document.removeEventListener('mouseup', onMouseUp, true);
		};
	});

	return (
		<div
			className="WidthHandle"
			onMouseDown={onMouseDown}
		>
		</div>
	);
}

export default WidthHandle;

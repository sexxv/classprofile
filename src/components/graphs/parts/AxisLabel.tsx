type LabelProps = {
	fontSize: number;
	text: string;
	x: number;
	y: number;
};

export function HorizontalLabel(props: LabelProps) {
	const { fontSize, text, x, y } = props;

	return (
		<text
			x={x}
			y={y}
			fontSize={`${fontSize}px`}
			textAnchor="middle"
			alignmentBaseline="middle"
			fill="currentColor"
		>
			{text}
		</text>
	);
}

export function VerticalLabel(props: LabelProps) {
	const { fontSize, text, x, y } = props;

	return (
		<text
			fontSize={`${fontSize}px`}
			textAnchor="middle"
			alignmentBaseline="middle"
			transform={`translate(${x}, ${y}) rotate(-90)`}
			fill="currentColor"
		>
			{text}
		</text>
	);
}

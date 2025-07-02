type GraphTitleProps = {
	titleSize: number;
	titleText: string;
	xOffset?: number;
	yOffset?: number;
	color?: string;
	textAnchor?: string;
};

export default function GraphTitle(props: GraphTitleProps) {
	const {
		titleSize,
		titleText,
		xOffset = 0,
		yOffset = titleSize,
		color = "currentColor",
		textAnchor = "middle",
	} = props;

	return (
		<text
			fill={color}
			strokeWidth={0}
			fontSize={`${titleSize}px`}
			x={xOffset}
			y={yOffset}
			textAnchor={textAnchor}
			alignmentBaseline="middle"
		>
			{titleText}
		</text>
	);
}

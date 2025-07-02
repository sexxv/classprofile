type LegendProps = {
	// Legend corner position (x, y)
	// If direction is 'asc', this is the bottom.
	// If direction is 'desc', this is the top.
	// If alignTo is "left", this is the left,
	// and legend labels are to the right of the color boxes.
	// If alignTo is "right", this is the right,
	// and legend labels are to the left of the color boxes.
	x: number;
	y: number;
	alignTo: "left" | "right";
	direction: "asc" | "desc";

	// Legend format values
	colorIndicatorSize: number;
	textOffset: number;
	textSize: number;
	indicatorGap: number;

	legendItems: {
		color: string;
		label: string;
	}[];

	backingWidth?: number;
	backingFill?: string;
	backingStroke?: string;
	backingPadding?: number;
};

export default function Legend(props: LegendProps) {
	const {
		x,
		y,
		alignTo,
		direction,

		colorIndicatorSize,
		textOffset,
		textSize,
		indicatorGap,

		legendItems,
		backingWidth,
		backingFill = "currentColor",
		backingStroke = "currentColor",
		backingPadding = 0,
	} = props;

	let dy: number;
	let boxYOffset: number;
	switch (direction) {
		case "asc":
			dy = -colorIndicatorSize - indicatorGap;
			boxYOffset = -colorIndicatorSize;
			break;
		case "desc":
			dy = colorIndicatorSize + indicatorGap;
			boxYOffset = 0;
			break;
	}

	return (
		<g>
			{backingWidth &&
				(() => {
					const height =
						Math.abs(dy) * legendItems.length +
						2 * backingPadding -
						indicatorGap;
					switch (alignTo) {
						case "left":
							return (
								<rect
									x={x - backingWidth + backingPadding}
									y={dy > 0 ? y - backingPadding : y - backingPadding - height}
									width={backingWidth}
									height={height}
									fill={backingFill}
									stroke={backingStroke}
									strokeWidth={1}
								/>
							);
						case "right":
							return (
								<rect
									x={x - backingWidth + backingPadding}
									y={dy > 0 ? y - backingPadding : y - backingPadding - height}
									width={backingWidth}
									height={height}
									fill={backingFill}
									stroke={backingStroke}
									strokeWidth={1}
								/>
							);
					}
				})()}
			{(() => {
				switch (alignTo) {
					case "left":
						return legendItems.map((legend, index) => (
							<g key={index}>
								<rect
									x={x}
									y={y + dy * index + boxYOffset}
									width={colorIndicatorSize}
									height={colorIndicatorSize}
									fill={legend.color}
								/>
								<text
									x={x + colorIndicatorSize + textOffset}
									y={y + dy * index + boxYOffset + colorIndicatorSize / 2}
									textAnchor="start"
									alignmentBaseline="middle"
									fontSize={textSize}
								>
									{legend.label}
								</text>
							</g>
						));
					case "right":
						return legendItems.map((legend, index) => (
							<g key={index}>
								<rect
									x={x - colorIndicatorSize}
									y={y + dy * index + boxYOffset}
									width={colorIndicatorSize}
									height={colorIndicatorSize}
									fill={legend.color}
								/>
								<text
									x={x - colorIndicatorSize - textOffset}
									y={y + dy * index + boxYOffset + colorIndicatorSize / 2}
									textAnchor="end"
									alignmentBaseline="middle"
									fontSize={textSize}
									fill="currentColor"
								>
									{legend.label}
								</text>
							</g>
						));
				}
			})()}
		</g>
	);
}

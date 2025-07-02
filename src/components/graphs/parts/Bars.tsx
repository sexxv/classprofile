type HorizontalBarsProps = {
	bins: number[];
	xScale: (a: number) => number;
	x0: number;
	y0: number;
	y1: number;
	binSpacing: number;
	barColor?: string;
	showCounts?: boolean;
	excludeZeroCounts?: boolean;
	countSize?: number;
	color?: string;
};

export function HorizontalBars(props: HorizontalBarsProps) {
	const {
		bins,
		xScale,
		x0,
		y0,
		y1,
		binSpacing,
		barColor = "currentColor",
		showCounts = true,
		excludeZeroCounts = true,
		countSize = "inherit",
		color = "currentColor",
	} = props;

	const binCount = bins.length;
	const binHeight = (y1 - y0 - binSpacing) / binCount;

	return (
		<g>
			{bins.map((bin, index) => (
				<rect
					fill={barColor}
					key={index}
					x={x0}
					width={xScale(bin) - x0}
					y={y0 + binHeight * index + binSpacing}
					height={binHeight - binSpacing}
				/>
			))}

			{showCounts &&
				bins.flatMap(
					(bin, index) =>
						(!excludeZeroCounts || bin !== 0) && (
							<text
								key={index}
								fill={color}
								strokeWidth={0}
								fontSize={countSize}
								x={xScale(bin) + 8}
								y={y0 + index * binHeight + (binHeight + binSpacing) / 2}
								alignmentBaseline="middle"
								textAnchor="start"
							>
								{bin}
							</text>
						),
				)}
		</g>
	);
}

type VerticalBarsProps = {
	bins: number[];
	yScale: (y: number) => number;
	x0: number;
	x1: number;
	y: number;
	binSpacing: number;
	barColor?: string;
	showCounts?: boolean;
	excludeZeroCounts?: boolean;
	color?: string;
};

export function VerticalBars(props: VerticalBarsProps) {
	const {
		bins,
		yScale,
		x0,
		x1,
		y,
		binSpacing,
		barColor = "currentColor",
		showCounts = true,
		excludeZeroCounts = true,
		color = "currentColor",
	} = props;

	const binCount = bins.length;
	const binWidth = (x1 - x0 - binSpacing) / binCount;

	return (
		<g>
			{bins.map((bin, index) => (
				<rect
					fill={barColor}
					key={index}
					x={x0 + binWidth * index + binSpacing}
					y={yScale(bin)}
					width={binWidth - binSpacing}
					height={y - yScale(bin)}
				/>
			))}

			{showCounts &&
				bins.flatMap(
					(bin, index) =>
						(!excludeZeroCounts || bin !== 0) && (
							<text
								key={index}
								fill={color}
								strokeWidth={0}
								x={x0 + index * binWidth + (binWidth + binSpacing) / 2}
								y={yScale(bin) - 12}
								textAnchor="middle"
							>
								{bin}
							</text>
						),
				)}
		</g>
	);
}

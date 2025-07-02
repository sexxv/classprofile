import { scaleLinear } from "d3";

// this is just text justification
function getTextLines(
	text: string,
	fontSize: number,
	maxWidth: number,
): string[] {
	const words = String(text).split(" ");
	const lines: string[] = [];
	let currLine = words[0] || "";

	for (let i = 1; i < words.length; i++) {
		const word = words[i];
		const testLine = `${currLine} ${word}`;
		const testLineWidth = testLine.length * fontSize * 0.6; // wacky magic constant math

		if (testLineWidth > maxWidth) {
			lines.push(currLine);
			currLine = word;
		} else {
			currLine = testLine;
		}
	}
	lines.push(currLine); // add last line

	return lines;
}

type GraphAxisProps = unknown;

type HorizontalGraphAxisProps = {
	x1: number;
	x2: number;
	y: number;
};

export function HorizontalGraphAxis(props: HorizontalGraphAxisProps) {
	const { x1, x2, y } = props;
	return (
		<g stroke="currentColor">
			<line x1={x1} y1={y} x2={x2} y2={y} />
		</g>
	);
}

type VerticalGraphAxisProps = GraphAxisProps & {
	x: number;
	y1: number;
	y2: number;
};

export function VerticalGraphAxis(props: VerticalGraphAxisProps) {
	const { x, y1, y2 } = props;
	return (
		<g stroke="currentColor">
			<line x1={x} y1={y1} x2={x} y2={y2} />
		</g>
	);
}

type TickProps = {
	ticks: string[] | number[];
	tickSize: number;
	labelSize: number;
	labelOffset?: number;
	labelOrientation?: number;
	stroke?: string;
	color?: string;
};

type HorizontalTicksProps = TickProps & {
	x1: number;
	x2: number;
	y: number;
};

export function HorizontalTicks(props: HorizontalTicksProps) {
	const {
		x1,
		x2,
		y,
		ticks,
		tickSize,
		labelSize,
		labelOffset = tickSize + labelSize,
		labelOrientation = 0,
		stroke = "currentColor",
		color = "currentColor",
	} = props;

	const xScale = scaleLinear([0, ticks.length - 1], [x1, x2]);

	return (
		<g stroke={stroke}>
			{tickSize &&
				ticks.map((_, index) => (
					<line
						key={index}
						x1={xScale(index)}
						y1={y}
						x2={xScale(index)}
						y2={y + tickSize}
					/>
				))}
			{ticks.map((label, index) => (
				<text
					fill={color}
					key={index}
					strokeWidth={0}
					fontSize={`${labelSize}px`}
					transform={`translate(${xScale(index)}, ${
						y + labelOffset
					}) rotate(${labelOrientation})`}
					textAnchor={labelOrientation != 0 ? "start" : "middle"}
				>
					{label}
				</text>
			))}
		</g>
	);
}

type VerticalTicksProps = TickProps & {
	x: number;
	y1: number;
	y2: number;
	maxWidth?: number;
};

export function VerticalTicks(props: VerticalTicksProps) {
	const {
		x,
		y1,
		y2,
		ticks,
		tickSize,
		labelSize,
		labelOffset = tickSize + 2,
		labelOrientation = 0,
		stroke = "currentColor",
		color = "currentColor",
		maxWidth = Infinity,
	} = props;

	const yScale = scaleLinear([0, ticks.length - 1], [y1, y2]);

	return (
		<g stroke={stroke}>
			{tickSize &&
				ticks.map((_, index) => (
					<line
						key={index}
						x1={x}
						y1={yScale(index)}
						x2={x - tickSize}
						y2={yScale(index)}
					/>
				))}
			{ticks.map((label, index) => {
				const lines = getTextLines(label.toString(), labelSize, maxWidth);

				return (
					<g key={index}>
						{lines.map((line, lineIndex) => {
							const linesCount = lines.length;
							const middleOffset = ((linesCount - 1) / 2) * labelSize;
							const lineYOffset = lineIndex * labelSize - middleOffset;

							return (
								<text
									key={lineIndex}
									fill={color}
									strokeWidth={0}
									fontSize={`${labelSize}px`}
									x={x - labelOffset}
									y={yScale(index) + lineYOffset}
									textAnchor="end"
									dominantBaseline="middle"
									transform={`rotate(${labelOrientation})`}
								>
									{line}
								</text>
							);
						})}
					</g>
				);
			})}
		</g>
	);
}

type HorizontalBinsProps = HorizontalTicksProps & {
	binSpacing: number;
};

export function HorizontalBins(props: HorizontalBinsProps) {
	const {
		x1,
		x2,
		y,
		ticks,
		tickSize,
		labelSize,
		labelOffset = tickSize + labelSize,
		labelOrientation = 0,
		stroke = "currentColor",
		color = "currentColor",
		binSpacing,
	} = props;

	const binCount = ticks.length;
	const binWidth = (x2 - x1 - binSpacing * (ticks.length + 1)) / binCount;

	const xScale = scaleLinear(
		[0, ticks.length - 1],
		[x1 + binSpacing + binWidth / 2, x2 - binSpacing - binWidth / 2],
	);

	return (
		<g stroke={stroke}>
			{tickSize &&
				ticks.map((_, index) => (
					<line
						key={index}
						x1={xScale(index)}
						y1={y}
						x2={xScale(index)}
						y2={y + tickSize}
					/>
				))}
			{ticks.map((label, index) => (
				<text
					fill={color}
					key={index}
					strokeWidth={0}
					fontSize={`${labelSize}px`}
					transform={`translate(${xScale(index)}, ${
						y + labelOffset
					}) rotate(${labelOrientation})`}
					textAnchor={labelOrientation ? "start" : "middle"}
				>
					{label}
				</text>
			))}
		</g>
	);
}

type VerticalBinsProps = VerticalTicksProps & {
	binSpacing: number;
};

export function VerticalBins(props: VerticalBinsProps) {
	const {
		x,
		y1,
		y2,
		ticks,
		tickSize,
		labelSize,
		labelOffset = tickSize + labelSize,
		labelOrientation = 0,
		stroke = "currentColor",
		color = "currentColor",
		binSpacing,
		maxWidth = 250,
	} = props;

	const binCount = ticks.length;
	const availableHeight = Math.abs(y1 - y2) - binSpacing * (binCount + 1);
	const binHeight = availableHeight / binCount;

	const yScale = scaleLinear()
		.domain([0, binCount - 1])
		.range(
			y1 > y2
				? [y1 - binSpacing - binHeight / 2, y2 + binSpacing + binHeight / 2]
				: [y1 + binSpacing + binHeight / 2, y2 - binSpacing - binHeight / 2],
		);

	return (
		<g stroke={stroke}>
			{tickSize &&
				ticks.map((_, index) => (
					<line
						key={index}
						x1={x}
						y1={yScale(index)}
						x2={x - tickSize}
						y2={yScale(index)}
					/>
				))}

			{ticks.map((label, index) => {
				const lines = getTextLines(label.toString(), labelSize, maxWidth);

				return (
					<g key={index}>
						{lines.map((line, lineIndex) => {
							const linesCount = lines.length;
							const middleOffset = ((linesCount - 1) / 2) * labelSize;
							const lineYOffset = lineIndex * labelSize - middleOffset;

							return (
								<text
									key={lineIndex}
									fill={color}
									strokeWidth={0}
									fontSize={`${labelSize}px`}
									x={x - labelOffset}
									y={yScale(index) + lineYOffset}
									textAnchor="end"
									dominantBaseline="middle"
									transform={`rotate(${labelOrientation})`}
								>
									{line}
								</text>
							);
						})}
					</g>
				);
			})}
		</g>
	);
}

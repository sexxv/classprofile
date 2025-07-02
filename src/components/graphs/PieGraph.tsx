import { sum } from "d3";
import { GraphBounds, LabelFormat, TextStyle } from "./GraphBase";
import GraphTitle from "./parts/GraphTitle";
import { MultilineLabel } from "./parts/MultilineLabel";
import ScaledSVG from "./parts/ScaledSVG";

type PieGraphProps = LabelFormat &
	TextStyle &
	GraphBounds & {
		slices: number[];
		colors: string[];
		radius: number;
		showCounts?: boolean;
		countSize?: number;
		countRadius?: number;
		labels?: string[];
		labelSize?: number;
		labelMargin?: number;
		/**
		 * What angle (in radians) to start drawing slices from.
		 * Defaults to 0.
		 */
		angleOffset?: number;
		sliceCCWFlag?: boolean;
	};

export default function PieGraph(props: PieGraphProps) {
	const {
		fontFamily,
		titleSize = 24,
		width,
		height,
		titleOffset,
		title = "",
		slices,
		colors,
		radius,
		labelSize,
		labelMargin,
		labels,
		color = "white",
		showCounts = true,
		countSize = 12,
		countRadius = radius * 0.6,
		angleOffset = 0,
		sliceCCWFlag = false,
	} = props;

	const centerX = width / 2;
	const centerY = height / 2;

	const pieSum = sum(slices);
	let tempSum = 0;
	const partialSums = slices.map((slice) => {
		const temp = tempSum;
		tempSum += slice;
		return temp;
	});

	const angleDirection = sliceCCWFlag ? -1 : 1;
	const sweepFlag = sliceCCWFlag ? 0 : 1;

	const toRad = (partialSum: number) => {
		return angleOffset + angleDirection * (partialSum / pieSum) * Math.PI * 2;
	};

	const sliceRender: React.ReactNode[] = [];
	const countRender: React.ReactNode[] = [];
	const labelRender: React.ReactNode[] = [];

	slices.forEach((value, index) => {
		if (value === 0) {
			return;
		}

		if (value === pieSum) {
			sliceRender.push(
				<g key={index}>
					<circle
						cx={centerX}
						cy={centerY}
						r={radius}
						fill={colors[index]}
						strokeWidth={0}
					/>
				</g>,
			);
			labelRender.push(
				<text
					key={index}
					fill={color}
					fontSize={labelSize}
					x={centerX}
					y={centerY}
					alignmentBaseline="middle"
					textAnchor="middle"
				>
					{labels && labels[index]}: {value}
				</text>,
			);
			// If the pie graph is just one thing, we only
			// want to draw a circle and label it with that thing
			return;
		}

		const startAngle = toRad(partialSums[index]);
		const endAngle = toRad(partialSums[index] + value);
		const midAngle = startAngle + (endAngle - startAngle) / 2;

		// When large-arc-flag is 0, arc drawing takes the shortest path.
		// For slices representing more than half of responses,
		// we need to take the longer path by setting the large-arc-flag to 1.
		const largeArcFlag = Math.abs(endAngle - startAngle) > Math.PI ? 1 : 0;

		const startPoint = `M ${Math.cos(startAngle) * radius + centerX} ${
			Math.sin(startAngle) * radius + centerY
		}`;
		const arcTo = `A ${radius} ${radius} 0 ${largeArcFlag} ${sweepFlag} ${
			Math.cos(endAngle) * radius + centerX
		} ${Math.sin(endAngle) * radius + centerY}`;
		const pieCenter = `L ${centerX} ${centerY}`;

		sliceRender.push(
			<path
				key={index}
				d={`${startPoint} ${arcTo} ${pieCenter}`}
				fill={colors[index]}
				strokeWidth={0}
			/>,
		);

		if (labelMargin !== undefined) {
			labelRender.push(
				<MultilineLabel
					key={index}
					fill={color}
					fontSize={labelSize}
					x={Math.cos(midAngle) * (radius + labelMargin) + centerX}
					y={Math.sin(midAngle) * (radius + labelMargin) + centerY}
					alignmentBaseline="middle"
					textAnchor={
						// If the label would be placed nearly directly above or below the slice,
						// we want to anchor it by the middle so the text is actually centered on the slice
						Math.abs((midAngle % Math.PI) - Math.PI / 2) < Math.PI / 12
							? "middle"
							: // Otherwise, align to text start/end so the text is out of the way of the graph
								Math.cos(midAngle) > 0
								? "start"
								: "end"
					}
					text={labels ? labels[index] : value.toString()}
					lineHeight={labelSize}
				/>,
			);
		}

		if (showCounts) {
			countRender.push(
				<text
					key={index}
					fill={colors[index] === "#FFFFFF" ? "#373737" : color}
					fontSize={countSize}
					x={Math.cos(midAngle) * countRadius + centerX}
					y={Math.sin(midAngle) * countRadius + centerY}
					alignmentBaseline="middle"
					textAnchor="middle"
				>
					{value}
				</text>,
			);
		}
	});

	return (
		<ScaledSVG width={width} height={height} fontFamily={fontFamily}>
			<GraphTitle
				titleSize={titleSize}
				titleText={title}
				xOffset={width / 2}
				yOffset={titleOffset}
				color={color}
			/>
			<g>{sliceRender}</g>
			<g>{labelRender}</g>
			<g>{countRender}</g>
		</ScaledSVG>
	);
}

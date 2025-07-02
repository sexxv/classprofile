import survey3Data from "@/data/cleaned/survey3.json";
import ScaledSVG from "../parts/ScaledSVG";
import { GraphBounds } from "../GraphBase";

// Why are ring sizes
const SIZE_TO_DIAMETER = {
	"2": 13.26,
	"2.5": 13.67,
	"3": 14.07,
	"3.5": 14.48,
	"4": 14.88,
	"4.5": 15.29,
	"5": 15.7,
	"5.5": 16.1,
	"6": 16.51,
	"6.5": 16.92,
	"7": 17.32,
	"7.5": 17.73,
	"8": 18.14,
};

const IRON_RING_DATA = survey3Data["What is your iron ring size?"];

// Ring thickness at the thickest part
// Source: I measured my own ring and I'm assuming it's constant
const RING_MAX_THICKNESS = 1;

// It's a pictogram
export function IronRingGraph(props: GraphBounds) {
	const { height, width, marginTop, marginLeft } = props;

	// Distances between rings
	const scale = 0.55;
	const dx = 25 * scale;
	const dy = 25 * scale;

	return (
		<ScaledSVG height={height} width={width}>
			<text
				x={marginLeft / 2}
				y={1}
				textAnchor="middle"
				alignmentBaseline="hanging"
				fontSize={5}
				fill="white"
			>
				Ring Size
			</text>
			<text
				x={marginLeft}
				y={1}
				textAnchor="start"
				alignmentBaseline="hanging"
				fontSize={5}
				fill="white"
			>
				# of Respondents
			</text>
			<line
				x1={marginLeft - 10}
				x2={marginLeft - 10}
				y1={0}
				y2={height}
				stroke="white"
				strokeWidth={0.5 * scale}
			/>
			{IRON_RING_DATA.labels.map((ringSize, index) => {
				const count = IRON_RING_DATA.counts[index];
				const diameter =
					SIZE_TO_DIAMETER[ringSize as keyof typeof SIZE_TO_DIAMETER] ?? 0;
				return (
					<g key={ringSize} fontSize={5} fill="white">
						{new Array(count).fill(0).map((_, ringNo) => {
							return (
								<IronRing
									key={ringNo}
									centerX={marginLeft + ringNo * dx + (scale * diameter) / 2}
									centerY={marginTop * scale + index * dy}
									diameter={diameter}
									scale={scale}
								/>
							);
						})}
						<text
							x={marginLeft / 2}
							y={marginTop * scale + index * dy}
							textAnchor="middle"
							alignmentBaseline="middle"
						>
							{ringSize}
						</text>
						<line
							x1={10}
							x2={300}
							y1={marginTop * scale + (index - 0.5) * dy}
							y2={marginTop * scale + (index - 0.5) * dy}
							stroke="white"
							strokeWidth={0.5 * scale}
						/>
					</g>
				);
			})}
		</ScaledSVG>
	);
}

type IronRingProps = {
	centerX: number;
	centerY: number;
	diameter: number;

	scale: number;
};

function IronRing(props: IronRingProps) {
	const { centerX, centerY, diameter, scale } = props;

	const r = (diameter / 2) * scale;

	// Actually thirteen points, since we repeat the first one to create a closed loop
	// This forms the outer dodecagon (12-sided shape)
	const twelvePoints = [];
	for (let i = 0; i <= 12; ++i) {
		twelvePoints.push(
			`L ${centerX + (r + RING_MAX_THICKNESS * scale) * Math.cos((i / 6) * Math.PI)} ${centerY + (r + RING_MAX_THICKNESS * scale) * Math.sin((i / 6) * Math.PI)}`,
		);
	}
	const outerEdge = twelvePoints.join(" ");

	// First we draw an inner circle, and then the outer dodecagon,
	// creating a closed ring shape.
	const innerRing = `M ${centerX + r} ${centerY}
		A ${r} ${r} 0 0 0 ${centerX - r} ${centerY}
		A ${r} ${r} 0 0 0 ${centerX + r} ${centerY}
		${outerEdge}
	`;

	return <path d={`${innerRing}`} fill="gray" />;
}

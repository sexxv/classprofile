import { nice, scaleLinear, ticks } from "d3";
import { PropsWithChildren } from "react";
import { LabelFormat, TextStyle, type GraphBounds } from "./GraphBase";
import {
	HorizontalGraphAxis,
	HorizontalTicks,
	VerticalGraphAxis,
	VerticalTicks,
} from "./parts/Axis";
import { HorizontalLabel, VerticalLabel } from "./parts/AxisLabel";
import GraphTitle from "./parts/GraphTitle";
import ScaledSVG from "./parts/ScaledSVG";

type LineGraphProps = PropsWithChildren<
	LabelFormat &
		TextStyle &
		GraphBounds & {
			lines: number[][];
			lineColors?: string[];
			xLabels: string[];
			points?: ((x: number, y: number, index: number) => React.ReactNode)[];
		}
>;

export default function LineGraph(props: LineGraphProps) {
	const {
		lines,
		lineColors = "currentColor",
		fontFamily,
		titleSize = 24,
		fontSize = 10,
		xLabels,
		width,
		height,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		titleOffset = 0,
		yLabelOffset = 0,
		title = "",
		xAxisTitle = "",
		yAxisTitle = "",
		points,

		children,
	} = props;

	const xScale = scaleLinear(
		[0, lines[0].length - 1],
		[marginLeft + 10, width - marginRight - 10],
	);
	const maxY = lines.reduce((prev, curr) => Math.max(prev, ...curr), -Infinity);
	const numTicks = maxY <= 20 ? maxY : 10;

	const [minTickY, maxTickY] = nice(0, maxY, numTicks);
	const yLabels =
		maxY <= 20
			? Array(maxY + 1)
					.fill(0)
					.map((_, index) => index)
			: ticks(minTickY, maxTickY, numTicks);
	const yScale = scaleLinear(
		[minTickY, maxTickY],
		[height - marginBottom, marginTop],
	);
	const yNumberWidth = maxY <= 1000 ? 0 : 10;

	const updatedYLabels = yLabels.map((label) => {
		if (label % 1000 === 0) {
			return new Intl.NumberFormat("en", {
				notation: "compact",
				compactDisplay: "short",
				maximumFractionDigits: 1,
			}).format(label);
		}

		return label;
	});

	return (
		<ScaledSVG width={width} height={height} fontFamily={fontFamily}>
			<GraphTitle
				titleSize={titleSize}
				titleText={title}
				xOffset={width / 2}
				yOffset={titleOffset}
			/>
			<VerticalLabel
				x={marginLeft - 20 - yNumberWidth}
				y={height / 2}
				fontSize={fontSize}
				text={yAxisTitle}
			/>
			<HorizontalLabel
				x={width / 2}
				y={height - marginBottom + yLabelOffset}
				fontSize={fontSize}
				text={xAxisTitle}
			/>

			<VerticalGraphAxis
				x={marginLeft}
				y1={marginTop}
				y2={height - marginBottom}
			/>
			<VerticalTicks
				ticks={updatedYLabels as string[]}
				tickSize={5}
				labelSize={fontSize}
				labelOrientation={0}
				x={marginLeft}
				y1={height - marginBottom}
				y2={marginTop}
			/>
			<HorizontalGraphAxis
				x1={marginLeft}
				x2={width - marginRight}
				y={height - marginBottom}
			/>
			<HorizontalTicks
				ticks={xLabels}
				tickSize={5}
				labelSize={fontSize}
				labelOrientation={45}
				x1={xScale(0)}
				x2={xScale(lines[0].length - 1)}
				y={height - marginBottom}
			/>

			<g strokeWidth={2}>
				{lines.map((line, idx) => (
					<polyline
						stroke={idx < lineColors.length ? lineColors[idx] : "currentColor"}
						key={idx}
						fill="none"
						points={line
							.map((point, index) => `${xScale(index)}, ${yScale(point)}`)
							.join(" ")}
					/>
				))}
				{points !== undefined &&
					lines.map((line, idx) =>
						line.map((point, index) =>
							points[idx](xScale(index), yScale(point), index),
						),
					)}
			</g>

			{children}
		</ScaledSVG>
	);
}

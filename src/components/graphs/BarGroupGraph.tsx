import { nice, scaleLinear, ticks } from "d3";
import { PropsWithChildren } from "react";
import { SurveyResult } from "../common/surveyData";
import { GraphBounds } from "./GraphBase";
import {
	HorizontalBins,
	HorizontalGraphAxis,
	HorizontalTicks,
	VerticalBins,
	VerticalGraphAxis,
	VerticalTicks,
} from "./parts/Axis";
import { HorizontalLabel, VerticalLabel } from "./parts/AxisLabel";
import { HorizontalDashLines, VerticalDashLines } from "./parts/DottedAxis";
import ScaledSVG from "./parts/ScaledSVG";

type BarGroupGraphProps = PropsWithChildren<
	GraphBounds & {
		/**
		 * Indexed by [group #][bar #]
		 */
		data: number[][];
		groupLabels: string[];

		groupGap: number;
		barGap: number;

		barColors: string[];

		labelSize: number;
		labelOrientation?: number;
		tickSize: number;

		xAxisTitle: string;
		yAxisTitle: string;

		maxLabelWidth?: number;

		includeDottedAxis?: boolean;
	}
>;

export function VerticalBarGroupGraph(props: BarGroupGraphProps) {
	const {
		width,
		height,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		data,
		groupLabels,

		groupGap,
		barGap,
		barColors,

		labelSize,
		labelOrientation,
		tickSize,

		xAxisTitle,
		yAxisTitle,
		children,
		includeDottedAxis = true,
	} = props;

	const numGroups = data.length;
	const groupWidthIfGapsAreSane =
		(width - marginLeft - marginRight - groupGap * (numGroups + 1)) / numGroups;
	const groupWidth =
		groupWidthIfGapsAreSane <= 0
			? (width - marginLeft - marginRight) / numGroups
			: groupWidthIfGapsAreSane;
	const gap = groupWidthIfGapsAreSane <= 0 ? 0 : groupGap;

	const dataMin = Math.min(
		data.reduce((prev, curr) => Math.min(prev, ...curr), Infinity),
		0,
	);
	const dataMax = data.reduce(
		(prev, curr) => Math.max(prev, ...curr),
		-Infinity,
	);

	const numTicks = dataMax <= 20 ? Math.ceil(dataMax) : 10;

	const [yMin, yMax] = nice(dataMin, dataMax, numTicks);
	const yLabels = ticks(yMin, yMax, numTicks);
	const yScale = scaleLinear([yMin, yMax], [height - marginBottom, marginTop]);

	return (
		<ScaledSVG height={height} width={width}>
			<VerticalGraphAxis
				x={marginLeft}
				y1={height - marginBottom}
				y2={marginTop}
			/>
			<VerticalTicks
				ticks={yLabels}
				tickSize={tickSize}
				labelSize={labelSize}
				x={marginLeft}
				y1={height - marginBottom}
				y2={marginTop}
			/>
			<HorizontalBins
				ticks={groupLabels}
				tickSize={0}
				labelSize={labelSize}
				x1={marginLeft}
				x2={width - marginRight}
				y={height - marginBottom}
				binSpacing={groupGap}
				labelOrientation={labelOrientation}
			/>
			{includeDottedAxis && (
				<HorizontalDashLines
					xMin={marginLeft}
					xMax={width - marginRight}
					scale={yScale}
					ticks={yLabels}
					stroke={"rgba(255, 255, 255, 0.5)"}
				/>
			)}
			{data.map((group, index) => (
				<VerticalBarGroup
					key={index}
					groupSize={groupWidth}
					barGap={barGap}
					data={group}
					barColors={barColors}
					scale={yScale}
					x={marginLeft + gap * (1 + index) + groupWidth * index}
					y={height - marginBottom}
				/>
			))}
			<HorizontalLabel
				fontSize={labelSize}
				text={xAxisTitle}
				x={width / 2}
				y={height - labelSize}
			/>
			{/* if the y gets to big this starts looking like % of respondents, so we need yAxisTitle */}
			{yMax > 20 && (
				<VerticalLabel
					fontSize={labelSize}
					text={yAxisTitle}
					x={labelSize + 20}
					y={height / 2}
				/>
			)}

			<HorizontalGraphAxis
				x1={marginLeft}
				x2={width - marginRight}
				y={height - marginBottom}
			/>
			{children}
		</ScaledSVG>
	);
}

export function HorizontalBarGroupGraph(props: BarGroupGraphProps) {
	const {
		width,
		height,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		data,
		groupLabels,

		groupGap,
		barGap,
		barColors,

		labelSize,
		labelOrientation,
		tickSize,

		xAxisTitle,
		yAxisTitle,

		maxLabelWidth = Infinity,

		children,
		includeDottedAxis = true,
	} = props;

	const numGroups = data.length;
	const groupHeightIfGapsAreSane =
		(height - marginBottom - marginTop - groupGap * (numGroups + 1)) /
		numGroups;
	const groupHeight =
		groupHeightIfGapsAreSane <= 0
			? (height - marginBottom - marginTop) / numGroups
			: groupHeightIfGapsAreSane;
	const gap = groupHeightIfGapsAreSane <= 0 ? 0 : groupGap;

	const dataMin = Math.min(
		data.reduce((prev, curr) => Math.min(prev, ...curr), Infinity),
		0,
	);
	const dataMax = data.reduce(
		(prev, curr) => Math.max(prev, ...curr),
		-Infinity,
	);

	const numTicks = dataMax <= 20 ? Math.ceil(dataMax) : 10;

	const [xMin, xMax] = nice(dataMin, dataMax, numTicks);
	const xLabels = ticks(xMin, xMax, numTicks);
	const xScale = scaleLinear([xMin, xMax], [marginLeft, width - marginRight]);

	return (
		<ScaledSVG height={height} width={width}>
			<HorizontalGraphAxis
				x1={marginLeft}
				x2={width - marginRight}
				y={height - marginBottom}
			/>
			<HorizontalTicks
				ticks={xLabels}
				tickSize={tickSize}
				labelSize={labelSize}
				x1={marginLeft}
				x2={width - marginRight}
				y={height - marginBottom}
			/>
			<VerticalBins
				ticks={groupLabels}
				tickSize={0}
				labelSize={labelSize}
				x={marginLeft}
				y1={marginTop}
				y2={height - marginBottom}
				binSpacing={groupGap}
				labelOrientation={labelOrientation}
				maxWidth={maxLabelWidth}
			/>
			{includeDottedAxis && (
				<VerticalDashLines
					yMin={marginTop}
					yMax={height - marginBottom}
					scale={xScale}
					ticks={xLabels}
					stroke={"rgba(255, 255, 255, 0.5)"}
				/>
			)}
			{data.map((group, index) => (
				<HorizontalBarGroup
					key={index}
					groupSize={groupHeight}
					barGap={barGap}
					data={group}
					barColors={barColors}
					scale={xScale}
					x={marginLeft}
					y={marginTop + gap * (1 + index) + groupHeight * index}
				/>
			))}
			<HorizontalLabel
				fontSize={labelSize}
				text={xAxisTitle}
				x={marginLeft + (width - marginLeft - marginRight) / 2}
				y={height - labelSize}
			/>
			<VerticalLabel
				fontSize={labelSize}
				text={yAxisTitle}
				x={labelSize}
				y={height / 2}
			/>

			<VerticalGraphAxis
				x={marginLeft}
				y1={height - marginBottom}
				y2={marginTop}
			/>
			{children}
		</ScaledSVG>
	);
}

type BarGroupProps = {
	groupSize: number;
	barGap: number;
	data: number[];
	barColors: string[];
	scale: (d: number) => number;

	x: number;
	y: number;
};

export function VerticalBarGroup(props: BarGroupProps) {
	const { groupSize, barGap, data, barColors, scale, x, y } = props;

	// If bars would be zero width, pretend the gap is zero.
	const barWidth =
		barGap * (data.length - 1) >= groupSize
			? groupSize / data.length
			: (groupSize - barGap * (data.length - 1)) / data.length;
	const gap = barGap * (data.length - 1) >= groupSize ? 0 : barGap;

	return (
		<g>
			{data.map((bar, i) => (
				<rect
					key={i}
					x={x + i * (barWidth + gap)}
					y={scale(bar)}
					width={barWidth}
					height={y - scale(bar)}
					fill={barColors[i]}
				/>
			))}
		</g>
	);
}

export function HorizontalBarGroup(props: BarGroupProps) {
	const { groupSize, barGap, data, barColors, scale, x, y } = props;

	// If bars would be zero width, pretend the gap is zero.
	const barHeight =
		barGap * (data.length - 1) >= groupSize
			? groupSize / data.length
			: (groupSize - barGap * (data.length - 1)) / data.length;
	const gap = barGap * (data.length - 1) >= groupSize ? 0 : barGap;

	return (
		<g>
			{data.map((bar, i) => (
				<rect
					key={i}
					x={x}
					y={y + i * (barHeight + gap)}
					width={scale(bar) - x}
					height={barHeight}
					fill={barColors[i]}
				/>
			))}
		</g>
	);
}

/**
 * Returns the results of multiple datasets in a rectangular 2D array.
 * @param datasets
 */
export function makeDatasetRectangular(datasets: SurveyResult[]) {
	const labelSet = new Set<string>();
	// Step 1: Collect all labels into a set...
	datasets.forEach((result) =>
		result.labels.forEach((label) => labelSet.add(label.toString())),
	);
	// Step 2: Create a sorted list of labels:
	const sortedLabels = Array.from(labelSet).sort();
	// Step 3: Create inverse mapping of labels to indices in the sorted list
	const inverseMap: Record<string, number> = {};
	sortedLabels.forEach((label, index) => (inverseMap[label] = index));
	// Step 4: Remap data to a rectangular array.
	// Zeros are inserted for counts where labels are not applicable.
	const data = datasets.map((result) => {
		const newRow = Array(sortedLabels.length).fill(0);
		result.labels.forEach((label, index) => {
			newRow[inverseMap[label]] = result.counts[index];
		});

		return newRow;
	});

	return {
		sortedLabels,
		data,
	};
}

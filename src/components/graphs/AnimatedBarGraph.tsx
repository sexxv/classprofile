"use client";

import { useEffect, useRef } from "react";
import { GraphBounds } from "./GraphBase";
import ScaledSVG from "./parts/ScaledSVG";

// TODO make separate stylesheet
import { nice, scaleLinear, ticks } from "d3";
import {
	HorizontalBins,
	HorizontalGraphAxis,
	VerticalBins,
	VerticalGraphAxis,
} from "./parts/Axis";
import { HorizontalLabel, VerticalLabel } from "./parts/AxisLabel";
import GraphTitle from "./parts/GraphTitle";

// Found through brute force.
// Too few, and ticks may "spawn in" without animation
// Too many and unecessary ticks may appear within the clipping rectangle due to small spacing.
const MAX_NUMBER_OF_EXTRA_TICKS_IN_CASE_D3_SPAWNS_MORE = 5;

type AnimatedBarGraphProps = GraphBounds & {
	/**
	 * Data indexed by [label]
	 */
	data: number[];
	/**
	 * The x-axis labels.
	 */
	labels: string[];

	tickSize: number;
	xTickLabelSize: number;
	yTickLabelSize: number;
	binSpacing: number;

	title: string;
	xAxisTitle: string;
	yAxisTitle: string;
	axisLabelSize: number;
	titleSize: number;

	textColor: string;
	barColor: string;

	showCounts?: boolean;
	countSize?: number;

	maxLabelWidth?: number;
};

/**
 * A graph for a dataset with multiple samples with the same
 * labels (e.g. ratings) for multiple options (e.g. courses).
 *
 * A vertical bar graph is rendered only for the currently selected option,
 * and a different option can be chosen using toggle buttons,
 * which will cause:
 * - The bars to transition to new values
 * - The y-axis to rescale if necessary
 */
export function AnimatedVerticalBarGraph(props: AnimatedBarGraphProps) {
	const {
		width,
		height,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		data,
		labels,

		tickSize,
		xTickLabelSize,
		yTickLabelSize,
		binSpacing,
		axisLabelSize,
		xAxisTitle,
		yAxisTitle,
		title,
		titleSize,

		textColor,
		barColor,

		showCounts = true,
		countSize = "inherit",
	} = props;

	const binWidth =
		(width - marginLeft - marginRight - binSpacing * (labels.length + 1)) /
		labels.length;

	// All of this is just to get scaling to work out nicely
	const maxY = Math.max(...data);
	const maxTicksMinusOne = 10;
	const numTicks = maxY <= maxTicksMinusOne ? maxY : maxTicksMinusOne;
	const [minTickY, maxTickY] = nice(0, maxY, numTicks);
	const yLabels =
		maxY <= maxTicksMinusOne
			? // Even if we need fewer than the maximum numebr of ticks,
				// we intentonally generate them so we can animate them in on demand.
				// Due to the y-scaler, these ticks will just float off of the vertical axis,
				// and there's a clipping path that'll make these floating ticks invisible
				Array(
					maxTicksMinusOne +
						1 +
						MAX_NUMBER_OF_EXTRA_TICKS_IN_CASE_D3_SPAWNS_MORE,
				)
					.fill(0)
					.map((_, index) => index)
			: ticks(minTickY, maxTickY, numTicks);
	if (
		yLabels.length <
		maxTicksMinusOne + 1 + MAX_NUMBER_OF_EXTRA_TICKS_IN_CASE_D3_SPAWNS_MORE
	) {
		const dy = yLabels[yLabels.length - 1] - yLabels[yLabels.length - 2];
		for (
			let i = yLabels.length;
			i <
			maxTicksMinusOne + 1 + MAX_NUMBER_OF_EXTRA_TICKS_IN_CASE_D3_SPAWNS_MORE;
			++i
		) {
			yLabels.push(yLabels[yLabels.length - 1] + dy);
		}
	}

	const yScale = scaleLinear(
		[minTickY, maxTickY],
		[height - marginBottom, marginTop + 10],
	);

	return (
		<>
			<ScaledSVG width={width} height={height + titleSize} fill={textColor}>
				<GraphTitle
					titleSize={titleSize}
					titleText={title}
					textAnchor="start"
				/>
				<g>
					<g fill={barColor}>
						{data.map((value, index) => (
							<AnimatedBar
								key={index}
								x={marginLeft + binSpacing + (binSpacing + binWidth) * index}
								width={binWidth}
								y={yScale(value) + titleSize}
								height={height - marginBottom - yScale(value)}
								color={barColor}
							/>
						))}
					</g>
					{showCounts &&
						data.map((value, index) => (
							<AnimatedCount
								key={index}
								x={
									marginLeft +
									(binSpacing + binWidth) * index +
									(binWidth + binSpacing) / 2
								}
								y={yScale(value) - 20 + titleSize}
								count={value}
								fontSize={countSize}
							/>
						))}
				</g>
				<VerticalGraphAxis
					x={marginLeft}
					y1={height - marginBottom + titleSize}
					y2={marginTop + titleSize}
				/>
				<clipPath
					id={`tickClipperVertical${0}-${marginTop + titleSize}-${width}-${height - marginTop}`}
				>
					<rect
						x={0}
						y={marginTop + titleSize}
						width={width}
						height={height - marginTop}
					/>
				</clipPath>
				<g
					clipPath={`url(#tickClipperVertical${0}-${marginTop + titleSize}-${width}-${height - marginTop})`}
				>
					{yLabels.map((y, index) => (
						<AnimatedVerticalTick
							key={index}
							x1={marginLeft}
							x2={marginLeft - tickSize}
							y={yScale(y) + titleSize}
							label={`${y}`}
							tickSize={tickSize}
							labelSize={yTickLabelSize}
							color={textColor}
						/>
					))}
				</g>
				<VerticalLabel
					fontSize={axisLabelSize}
					text={yAxisTitle}
					x={axisLabelSize + marginLeft / 2}
					y={height / 2 + titleSize}
				/>
				<HorizontalGraphAxis
					x1={marginLeft}
					x2={width - marginRight}
					y={height - marginBottom + titleSize}
				/>
				<HorizontalBins
					ticks={labels}
					tickSize={0}
					labelSize={xTickLabelSize}
					x1={marginLeft}
					x2={width - marginRight}
					y={height - marginBottom + titleSize}
					binSpacing={binSpacing}
				/>
				<HorizontalLabel
					fontSize={axisLabelSize}
					text={xAxisTitle}
					x={width / 2}
					y={height - axisLabelSize + titleSize}
				/>
			</ScaledSVG>
		</>
	);
}

export function AnimatedHorizontalBarGraph(props: AnimatedBarGraphProps) {
	const {
		width,
		height,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		data,
		labels,

		tickSize,
		xTickLabelSize,
		yTickLabelSize,
		binSpacing,
		axisLabelSize,
		xAxisTitle,
		yAxisTitle,
		title,
		titleSize,

		textColor,
		barColor,

		showCounts = true,
		countSize = 10,

		maxLabelWidth = 250,
	} = props;

	const binHeight =
		(height - marginTop - marginBottom - binSpacing * (labels.length + 1)) /
		labels.length;

	// All of this is just to get scaling to work out nicely
	const maxX = Math.max(...data);
	const maxTicksMinusOne = 10;
	const numTicks = maxX <= maxTicksMinusOne ? maxX : maxTicksMinusOne;
	const [minTickX, maxTickX] = nice(0, maxX, numTicks);
	const xLabels =
		maxX <= maxTicksMinusOne
			? // Even if we need fewer than the maximum number of ticks,
				// we intentonally generate them so we can animate them in on demand.
				// Due to the y-scaler, these ticks will just float off of the vertical axis,
				// and there's a clipping path that'll make these floating ticks invisible
				Array(
					maxTicksMinusOne +
						1 +
						MAX_NUMBER_OF_EXTRA_TICKS_IN_CASE_D3_SPAWNS_MORE,
				)
					.fill(0)
					.map((_, index) => index)
			: ticks(minTickX, maxTickX, numTicks);
	if (
		xLabels.length <
		maxTicksMinusOne + 1 + MAX_NUMBER_OF_EXTRA_TICKS_IN_CASE_D3_SPAWNS_MORE
	) {
		const dx = xLabels[xLabels.length - 1] - xLabels[xLabels.length - 2];
		for (
			let i = xLabels.length;
			i <
			maxTicksMinusOne + 1 + MAX_NUMBER_OF_EXTRA_TICKS_IN_CASE_D3_SPAWNS_MORE;
			++i
		) {
			xLabels.push(xLabels[xLabels.length - 1] + dx);
		}
	}

	const xScale = scaleLinear(
		[minTickX, maxTickX],
		[marginLeft, width - marginRight - 10],
	);

	return (
		<>
			<ScaledSVG width={width} height={height} fill={textColor}>
				<GraphTitle
					titleSize={titleSize}
					titleText={title}
					textAnchor="start"
				/>
				<g>
					{data.map((value, index) => (
						<AnimatedBar
							key={index}
							x={marginLeft}
							width={xScale(value) - marginLeft}
							y={marginTop + binSpacing + (binSpacing + binHeight) * index}
							height={binHeight}
							color={barColor}
						/>
					))}
					{showCounts &&
						data.map((value, index) => (
							<AnimatedCount
								key={index}
								x={xScale(value) + 20}
								y={
									marginTop +
									binSpacing / 2 +
									(binSpacing + binHeight) * index +
									(binHeight + binSpacing) / 2
								}
								count={value}
								fontSize={countSize}
							/>
						))}
				</g>
				<VerticalGraphAxis
					x={marginLeft}
					y1={height - marginBottom}
					y2={marginTop}
				/>
				<clipPath
					id={`tickClipper${0}-${height - marginBottom}-${width - marginRight}-${marginBottom}`}
				>
					<rect
						x={0}
						y={height - marginBottom}
						width={width - marginRight}
						height={marginBottom}
					/>
				</clipPath>
				<g
					clipPath={`url(#tickClipper${0}-${height - marginBottom}-${width - marginRight}-${marginBottom})`}
				>
					{xLabels.map((x, index) => (
						<AnimatedHorizontalTick
							key={index}
							x={xScale(x)}
							y1={height - marginBottom}
							y2={height - marginBottom + tickSize}
							label={`${x}`}
							tickSize={tickSize}
							labelSize={xTickLabelSize}
							color={textColor}
						/>
					))}
				</g>
				<VerticalLabel
					fontSize={axisLabelSize}
					text={yAxisTitle}
					x={marginLeft - axisLabelSize - 30}
					y={height / 2}
				/>
				<HorizontalGraphAxis
					x1={marginLeft}
					x2={width - marginRight}
					y={height - marginBottom}
				/>
				<VerticalBins
					ticks={labels}
					tickSize={0}
					labelSize={yTickLabelSize}
					x={marginLeft}
					y1={marginTop}
					y2={height - marginBottom}
					binSpacing={binSpacing}
					maxWidth={maxLabelWidth}
				/>
				<HorizontalLabel
					fontSize={axisLabelSize}
					text={xAxisTitle}
					x={(width + marginLeft - marginRight) / 2}
					y={height - axisLabelSize}
				/>
			</ScaledSVG>
		</>
	);
}

type AnimatedBarProps = {
	x: number;
	y: number;
	width: number;
	height: number;

	color: string;
};

function AnimatedBar(props: AnimatedBarProps) {
	const { x, y, width, height, color } = props;
	const stateRef = useRef({
		x,
		y,
		width,
		height,
		color,
	});
	const animationRef = useRef<SVGRectElement>(null);

	useEffect(() => {
		if (animationRef.current !== null) {
			const {
				x: lastX,
				y: lastY,
				width: lastWidth,
				height: lastHeight,
				color: lastColor,
			} = stateRef.current;

			animationRef.current.animate(
				[
					{
						x: `${lastX}px`,
						y: `${lastY}px`,
						width: `${lastWidth}px`,
						height: `${lastHeight}px`,
						fill: `${lastColor}`,
					},
					{
						x: `${x}px`,
						y: `${y}px`,
						width: `${width}px`,
						height: `${height}px`,
						fill: `${color}`,
					},
				],
				{
					duration: 300,
					fill: "forwards",
					iterations: 1,
					composite: "replace",
				},
			);
		}
		stateRef.current = {
			x,
			y,
			width,
			height,
			color,
		};
	}, [x, y, width, height, color]);

	return (
		<rect
			ref={animationRef}
			x={x}
			y={y}
			width={width}
			height={height}
			fill={color}
		/>
	);
}

type AnimatedVerticalTickProps = {
	x1: number;
	x2: number;
	y: number;
	label: string;
	tickSize: number;
	labelSize: number;
	color: string;
	maxWidth?: number;
};

function AnimatedVerticalTick(props: AnimatedVerticalTickProps) {
	const { x1, x2, y, label, tickSize, labelSize, color } = props;
	const stateRef = useRef({ y });
	const animationRef = useRef<SVGLineElement>(null);

	useEffect(() => {
		if (animationRef.current !== null) {
			const { y: lastY } = stateRef.current;
			animationRef.current.animate(
				[
					{
						transform: `translateY(${lastY}px)`,
					},
					{
						transform: `translateY(${y}px)`,
					},
				],
				{
					duration: 300,
					fill: "forwards",
					iterations: 1,
					composite: "replace",
				},
			);
		}
		stateRef.current = { y };
	}, [y]);

	return (
		<g ref={animationRef}>
			<text
				fill={color}
				strokeWidth={0}
				fontSize={`${labelSize}px`}
				x={x2 - tickSize}
				y={0}
				textAnchor="end"
				dominantBaseline="middle"
			>
				{label}
			</text>
			<line stroke={color} x1={x1} x2={x2} y1={0} y2={0} />
		</g>
	);
}

type AnimatedHorizontalTickProps = {
	x: number;
	y1: number;
	y2: number;
	label: string;
	tickSize: number;
	labelSize: number;
	color: string;
};

function AnimatedHorizontalTick(props: AnimatedHorizontalTickProps) {
	const { x, y1, y2, label, tickSize, labelSize, color } = props;
	const stateRef = useRef({ x });
	const animationRef = useRef<SVGLineElement>(null);

	useEffect(() => {
		if (animationRef.current !== null) {
			const { x: lastX } = stateRef.current;
			animationRef.current.animate(
				[
					{
						transform: `translateX(${lastX}px)`,
					},
					{
						transform: `translateX(${x}px)`,
					},
				],
				{
					duration: 300,
					fill: "forwards",
					iterations: 1,
					composite: "replace",
				},
			);
		}
		stateRef.current = {
			x,
		};
	}, [x]);

	return (
		<g ref={animationRef}>
			<text
				fill={color}
				strokeWidth={0}
				fontSize={`${labelSize}px`}
				x={0}
				y={y2 + tickSize + 5}
				textAnchor="middle"
				dominantBaseline="middle"
			>
				{label}
			</text>
			<line stroke={color} x1={0} x2={0} y1={y1} y2={y2} />
		</g>
	);
}

type AnimatedCountProps = {
	x: number;
	y: number;
	count: number;
	fontSize: number | "inherit";
};

function AnimatedCount(props: AnimatedCountProps) {
	const { x, y, count, fontSize } = props;
	const stateRef = useRef({
		x,
		y,
	});
	const animationRef = useRef<SVGTextElement>(null);

	useEffect(() => {
		if (animationRef.current !== null) {
			const { x: lastX, y: lastY } = stateRef.current;
			animationRef.current.animate(
				[
					{
						transform: `translate(${lastX}px, ${lastY}px)`,
					},
					{
						transform: `translate(${x}px, ${y}px)`,
					},
				],
				{
					duration: 300,
					fill: "forwards",
					iterations: 1,
					composite: "replace",
				},
			);
		}
		stateRef.current = {
			x,
			y,
		};
	}, [x, y]);

	return (
		<text
			ref={animationRef}
			strokeWidth={0}
			fill={"white"}
			fontSize={fontSize}
			transform={`translate(${x}, ${y})`}
			alignmentBaseline="middle"
			textAnchor="start"
		>
			{count === 0 ? "" : count}
		</text>
	);
}

"use client";
import { max, nice, scaleLinear, ticks } from "d3";
import { useState } from "react";
import { Emoji } from "../Emoji";
import styles from "../page.module.css";
import { GraphBounds, LabelFormat, TextStyle } from "./GraphBase";
import {
	HorizontalBins,
	HorizontalGraphAxis,
	HorizontalTicks,
	VerticalBins,
	VerticalGraphAxis,
	VerticalTicks,
} from "./parts/Axis";
import { HorizontalLabel, VerticalLabel } from "./parts/AxisLabel";
import { HorizontalBars, VerticalBars } from "./parts/Bars";
import GraphTitle from "./parts/GraphTitle";
import ScaledSVG from "./parts/ScaledSVG";

export type BarGraphProps = LabelFormat &
	TextStyle &
	GraphBounds & {
		bins: number[];
		labels: number[] | string[];
		multiLineLabels?: string[][]; // temp im so sorry
		barColor: string;
		binSpacing: number;
		showCounts?: boolean;
		maxLabelWidth?: number;
		/**
		 * Flag to fill in gaps for data with numeric labels.
		 * Defaults to false.
		 */
		fillInNumericGaps?: boolean;
		showOnesToggle?: boolean;
	};

export function HorizontalBarGraph(props: BarGraphProps) {
	const {
		bins,
		labels,
		fontFamily,
		titleSize = 24,
		fontSize = 9.5,
		width,
		height,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		titleOffset,
		xLabelOffset = 30,
		yLabelOffset = 30,
		title = "",
		xAxisTitle = "",
		yAxisTitle = "",
		barColor,
		binSpacing,
		showCounts = true,
		color = "currentColor",
		maxLabelWidth = 180,

		fillInNumericGaps = false,
		showOnesToggle,
	} = props;

	const [showOnes, setShowOnes] = useState(showOnesToggle ? false : true);

	const finalHeight = showOnes && showOnesToggle ? 600 : height;

	const [, maxX] = [0, max(bins) ?? 0];

	const numTicks = maxX <= 20 ? maxX : 10;

	const [minTickX, maxTickX] = nice(0, max(bins) ?? 0, numTicks);

	const xLabels =
		maxX <= 20
			? Array(maxX + 1)
					.fill(0)
					.map((_, index) => index)
			: ticks(minTickX, maxTickX, numTicks);

	const xScale = scaleLinear(
		[minTickX, maxTickX],
		[marginLeft, width - marginRight],
	);

	let renderBins = bins;
	let renderLabels = labels;

	if (fillInNumericGaps) {
		const maxXLabel = Math.max(...(labels as number[]));
		const filledRenderBins = new Array(maxXLabel + 1).fill(0);
		renderLabels = new Array(maxXLabel + 1).fill(0).map((_, i) => i);
		let labelIndex = 0;
		for (let i = 0; i <= maxXLabel; ++i) {
			if (labelIndex < labels.length && labels[labelIndex] == i) {
				filledRenderBins[i] = bins[labelIndex];
				++labelIndex;
			}
		}
		renderBins = filledRenderBins;

		if ("0" in renderLabels && filledRenderBins[0] === 0) {
			// remove 0 if it exists in the labels and has no value
			renderLabels = renderLabels.slice(1);
			renderBins = renderBins.slice(1);
		}
	}

	if (showOnesToggle && !showOnes) {
		// filter out bins with a value of 1
		renderBins = bins.filter((bin) => bin !== 1);
		renderLabels = labels.filter(
			(_, index) => bins[index] !== 1,
		) as typeof labels;
	}

	return (
		<>
			<ScaledSVG
				height={finalHeight}
				width={width}
				fontFamily={fontFamily}
				fontSize={fontSize}
			>
				<GraphTitle
					titleSize={titleSize}
					titleText={title}
					xOffset={width / 2}
					yOffset={titleOffset}
				/>
				<HorizontalBars
					bins={renderBins}
					xScale={xScale}
					x0={marginLeft}
					y0={marginTop}
					y1={finalHeight - marginBottom}
					binSpacing={binSpacing}
					barColor={barColor}
					showCounts={showCounts}
					color={color}
				/>
				<HorizontalGraphAxis
					x1={marginLeft}
					x2={width - marginRight}
					y={finalHeight - marginBottom}
				/>
				<HorizontalTicks
					ticks={xLabels}
					tickSize={5}
					labelSize={fontSize}
					labelOrientation={0}
					x1={marginLeft}
					x2={width - marginRight}
					y={finalHeight - marginBottom}
				/>
				{xAxisTitle && (
					<HorizontalLabel
						fontSize={fontSize}
						text={xAxisTitle}
						x={(width + marginLeft - marginRight) / 2}
						y={finalHeight - marginBottom + xLabelOffset}
					/>
				)}

				<VerticalGraphAxis
					x={marginLeft}
					y1={marginTop}
					y2={finalHeight - marginBottom}
				/>
				<VerticalBins
					ticks={renderLabels}
					tickSize={0}
					labelSize={fontSize}
					labelOrientation={0}
					x={marginLeft}
					y1={marginTop}
					y2={finalHeight - marginBottom}
					binSpacing={binSpacing}
					maxWidth={maxLabelWidth}
				/>
				{yAxisTitle && (
					<VerticalLabel
						fontSize={fontSize}
						text={yAxisTitle}
						x={marginLeft - yLabelOffset}
						y={finalHeight / 2}
					/>
				)}
			</ScaledSVG>
			{showOnesToggle && (
				<div
					style={{
						display: "flex",
						justifyContent: "center",
					}}
				>
					<input
						key={`show-ones-${labels[0]}`}
						type="checkbox"
						id={`show-ones-${labels[0]}`}
						className={styles.checkbox}
						checked={showOnes}
						style={{ marginRight: 10 }}
						onChange={(e) => setShowOnes(e.target.checked)}
					/>
					<label
						htmlFor={`show-ones-${labels[0]}`}
						style={{ fontWeight: "bold" }}
					>
						<Emoji>👈</Emoji>
						{showOnes ? " Uncheck to Hide" : " Check to Show "} Single Responses
					</label>
				</div>
			)}
		</>
	);
}

export function VerticalBarGraph(props: BarGraphProps) {
	const {
		bins,
		labels,
		fontFamily = "inherit",
		titleSize = 24,
		fontSize = 9.5,
		width,
		height,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,
		titleOffset,
		xLabelOffset = 30,
		yLabelOffset = 40,
		title = "",
		xAxisTitle = "",
		yAxisTitle = "",
		barColor,
		binSpacing,
		showCounts = true,
		color = "currentColor",

		fillInNumericGaps = false,

		multiLineLabels,
	} = props;

	const [, maxY] = [0, max(bins) ?? 0];
	const numTicks = maxY <= 20 ? maxY : 10;

	const [minTickY, maxTickY] = nice(0, max(bins) ?? 0, numTicks);

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

	let renderBins = bins;
	let renderLabels = labels;

	if (fillInNumericGaps) {
		const maxXLabel = Math.max(...(labels as number[]));
		const filledRenderBins = new Array(maxXLabel + 1).fill(0);
		renderLabels = new Array(maxXLabel + 1).fill(0).map((_, i) => i);
		let labelIndex = 0;
		for (let i = 0; i <= maxXLabel; ++i) {
			if (labelIndex < labels.length && labels[labelIndex] == i) {
				filledRenderBins[i] = bins[labelIndex];
				++labelIndex;
			}
		}
		renderBins = filledRenderBins;
	}

	return (
		<ScaledSVG
			height={height}
			width={width}
			fontFamily={fontFamily}
			fontSize={fontSize}
		>
			<GraphTitle
				titleSize={titleSize}
				titleText={title}
				xOffset={width / 2}
				yOffset={titleOffset}
			/>
			<VerticalBars
				bins={renderBins}
				yScale={yScale}
				x0={marginLeft}
				x1={width - marginRight}
				y={height - marginBottom}
				binSpacing={binSpacing}
				barColor={barColor}
				showCounts={showCounts}
				color={color}
			/>

			<HorizontalGraphAxis
				x1={marginLeft}
				x2={width - marginRight}
				y={height - marginBottom}
			/>
			<HorizontalBins
				ticks={renderLabels}
				tickSize={0}
				labelSize={fontSize}
				labelOrientation={0}
				x1={marginLeft}
				x2={width - marginRight}
				y={height - marginBottom}
				binSpacing={binSpacing}
			/>

			{/* this is highkey scuffed sorry :sob: idk how we were planning to do multiline labels */}
			{multiLineLabels
				? multiLineLabels.map((labels, index) => {
						return (
							<HorizontalBins
								key={index}
								ticks={labels}
								tickSize={0}
								labelSize={fontSize}
								labelOrientation={0}
								x1={marginLeft}
								x2={width - marginRight}
								y={height - marginBottom + 10 * (index + 1)}
								binSpacing={binSpacing}
							/>
						);
					})
				: undefined}

			{xAxisTitle && (
				<HorizontalLabel
					fontSize={fontSize}
					text={xAxisTitle}
					x={(width + marginLeft - marginRight) / 2}
					y={height - marginBottom + xLabelOffset}
				/>
			)}
			<VerticalTicks
				ticks={yLabels}
				tickSize={5}
				labelSize={fontSize}
				labelOrientation={0}
				x={marginLeft}
				y1={height - marginBottom}
				y2={marginTop}
			/>
			<VerticalGraphAxis
				x={marginLeft}
				y1={marginTop}
				y2={height - marginBottom}
			/>
			{yAxisTitle && (
				<VerticalLabel
					fontSize={fontSize}
					text={yAxisTitle}
					x={marginLeft - yLabelOffset}
					y={height / 2}
				/>
			)}
		</ScaledSVG>
	);
}

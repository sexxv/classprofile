"use client";
import { nice, scaleLinear, scaleQuantile, ticks } from "d3";
import {
	calculateBoxPlotStats,
	makeCalcBoxplotTable,
	roundAndFormatNumber,
} from "../common/boxPlotStatCalc";
import { GraphBounds } from "./GraphBase";
import {
	HorizontalGraphAxis,
	VerticalGraphAxis,
	VerticalTicks,
} from "./parts/Axis";
import { HorizontalLabel, VerticalLabel } from "./parts/AxisLabel";
import ScaledSVG from "./parts/ScaledSVG";

export const FWBoxPlotSettings = {
	statFontSize: 4,
	medianOffset: 4,
	graphStatFontSize: 4.5,
	graphStatRectangleHeightScaler: 7,
	graphNPos: 5.5,
	graphAvgPos: 11,
	statsRadius: 2,
};

type BoxPlotProps = GraphBounds & {
	data: number[][];
	boxPlotLabels: string[];

	boxWidth: number;

	tickSize?: number;
	labelSize?: number;
	labelOffset?: number;

	graphMarginLeft?: number;
	graphMarginRight?: number;

	xAxisTitle: string;
	yAxisTitle: string;

	manualMinY?: number;
	manualMaxY?: number;

	fill?: string;
	boxColors?: string[];
	outlierSize?: number;

	graphN?: number[];
	graphAvg?: number[] | string[];
	statFontSize?: number;
	medianOffset?: number;
	graphStatFontSize?: number;
	graphStatRectangleHeightScaler?: number;
	graphNPos?: number;
	graphAvgPos?: number;
	statsRadius?: number;
	isFinance?: boolean;

	tooltipY?: number;
	tooltipLabelY?: number;
	tooltipIdSuffix?: string;
	tooltipHeightOverride?: number;

	offsetYTitle?: number;
};

export function VerticalBoxPlot(props: BoxPlotProps) {
	const {
		width,
		height,
		marginLeft,
		marginRight,
		marginTop,
		marginBottom,

		data,
		boxPlotLabels,
		boxWidth,
		tickSize = 5,
		labelSize = 10,
		labelOffset = labelSize,
		statFontSize = 8,

		graphMarginLeft = marginLeft,
		graphMarginRight = marginRight,
		xAxisTitle,
		yAxisTitle,

		manualMinY,
		manualMaxY,

		fill = "pink",
		boxColors,
		outlierSize = 1,

		graphN = [],
		graphAvg = [],
		graphStatFontSize = 10,
		graphStatRectangleHeightScaler = 18,
		graphNPos = 10,
		graphAvgPos = 11,

		medianOffset = 14,
		statsRadius = 4,

		tooltipY = 24,
		tooltipLabelY = 14,
		tooltipIdSuffix,
		isFinance = false,

		offsetYTitle = 0,
		// tooltipHeightOverride,
	} = props;

	const minVal =
		manualMinY ??
		data.reduce((prev, curr) => Math.min(prev, Math.min(...curr)), Infinity);
	const maxVal =
		manualMaxY ??
		data.reduce((prev, curr) => Math.max(prev, Math.max(...curr)), -Infinity);

	const numTicks = maxVal <= 20 ? maxVal : 10;
	const [minTickY, maxTickY] = nice(minVal, maxVal, numTicks);

	const yLabels =
		maxVal <= 20
			? Array(maxVal + 1)
					.fill(0)
					.map((_, index) => index)
			: ticks(minTickY, maxTickY, numTicks);

	const yScale = scaleLinear(
		[minTickY, maxTickY],
		[height - marginBottom, marginTop],
	);

	const xScale = scaleLinear(
		[0, data.length - 1],
		[
			marginLeft + graphMarginLeft + boxWidth / 2,
			width - marginRight - graphMarginRight - boxWidth / 2,
		],
	);

	const halfXIndex = (data.length - 1) / 2;

	const nAndAverageHeight =
		(Number(Boolean(graphAvg.length)) + Number(Boolean(graphN.length))) *
		graphStatRectangleHeightScaler;

	// trust meeee bro
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
		<div
			style={{
				display: "flex",
				width: "100%",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<div
				id={`boxplot-tooltip`}
				style={{
					position: "absolute",
					opacity: 0,
					transition: "opacity 0.2s ease",
					pointerEvents: "none",
					fontSize: "14px",
					fontFamily: "var(--font-athiti)",
					border: "2px solid white",
					color: "white",
					borderRadius: "5px",
					padding: "10px",
					width: "max(120px, fit-content)",
					zIndex: "1",
				}}
			/>

			<ScaledSVG height={height} width={width} fontFamily="inherit">
				<HorizontalGraphAxis
					x1={marginLeft}
					x2={width - marginRight}
					y={height - marginBottom}
				/>
				<VerticalGraphAxis
					x={marginLeft}
					y1={marginTop}
					y2={height - marginBottom}
				/>
				<VerticalTicks
					ticks={updatedYLabels as string[]}
					tickSize={tickSize}
					labelSize={labelSize}
					x={marginLeft}
					y1={height - marginBottom}
					y2={marginTop}
				/>
				{data.map((boxplot, index) => (
					<g key={index}>
						<rect
							x={xScale(index) - (boxWidth + 17) / 2}
							y="0"
							rx={statsRadius}
							ry={statsRadius}
							width={boxWidth + 17}
							height={nAndAverageHeight}
							fill={boxColors ? boxColors[index] : fill}
						/>

						<VerticalBoxAndWhisker
							data={boxplot}
							boxCenter={xScale(index)}
							boxWidth={boxWidth}
							scale={yScale}
							fill={boxColors ? boxColors[index] : fill}
							outlierSize={outlierSize}
							statFontSize={statFontSize}
							medianOffset={medianOffset}
							tooltipIdSuffix={tooltipIdSuffix}
							isFinance={isFinance}
						/>
					</g>
				))}
				{boxPlotLabels.map((label, index) => (
					<g key={label}>
						{graphN[index] && (
							<text
								x={xScale(index)}
								y={graphNPos}
								textAnchor="middle"
								fill="currentColor"
								fontSize={graphStatFontSize}
								fontFamily="var(--font-jersey-10)"
							>
								{graphN[index]} Respondents
							</text>
						)}
						{graphAvg[index] && (
							<text
								x={xScale(index)}
								// rice purity graph is an opp
								y={graphAvgPos}
								textAnchor="middle"
								fill="currentColor"
								fontSize={graphStatFontSize}
								fontFamily="var(--font-jersey-10)"
							>
								Mean: {graphAvg[index]}
							</text>
						)}
						<text
							x={xScale(index)}
							y={height - marginBottom + labelOffset}
							alignmentBaseline="middle"
							textAnchor="middle"
							fontSize={labelSize}
							fill="currentColor"
							strokeWidth={0}
						>
							{label}
						</text>
					</g>
				))}

				<HorizontalLabel
					fontSize={labelSize}
					text={xAxisTitle}
					x={width / 2}
					y={height - labelSize}
				/>
				<VerticalLabel
					fontSize={labelSize}
					text={yAxisTitle}
					x={marginLeft - labelSize - 25 - offsetYTitle}
					y={height / 2}
				/>

				<text
					x={xScale(halfXIndex)}
					y={height - marginBottom + tooltipY + tooltipLabelY}
					textAnchor="middle"
					fill="currentColor"
					fontSize={graphStatFontSize + 1}
					fontFamily="var(--font-athiti)"
					fontWeight={"bold"}
				>
					Hover box plot for more stats 👆
				</text>
			</ScaledSVG>
		</div>
	);
}

type BoxAndWhiskerProps = {
	data: number[];
	boxCenter: number;
	boxWidth: number;
	scale: (z: number) => number;
	outlierSize: number;
	stroke?: string;
	fill?: string;
	statFontSize?: number;
	isFinance?: boolean;

	medianOffset?: number;
	tooltipIdSuffix?: string;

	showTooltip?: (event: React.MouseEvent<SVGRectElement>) => void;
	hideTooltip?: () => void;
};

export function VerticalBoxAndWhisker(props: BoxAndWhiskerProps) {
	const {
		data,
		boxCenter,
		scale,
		stroke = "currentColor",
		fill = "currentColor",
		boxWidth,
		outlierSize,
		statFontSize = 4,
		medianOffset = 10,
		isFinance = false,
	} = props;

	const quantileScale = scaleQuantile(data, [0.25, 0.5, 0.75, 1]);
	const [q1, q2, q3] = quantileScale.quantiles();
	const iqr = q3 - q1;
	const lowOutlierMax = q1 - 1.5 * iqr;
	const highOutlierMax = q3 + 1.5 * iqr;
	const lowLine = Math.max(lowOutlierMax, Math.min(...data));
	const highLine = Math.min(highOutlierMax, Math.max(...data));

	const lowOutliers = data.filter((p) => p < lowOutlierMax);
	const highOutliers = data.filter((p) => p > highOutlierMax);

	const q2LabelLength = q2.toFixed(2).length * 2;

	const showOutlierTooltip = (
		event: React.MouseEvent<SVGCircleElement>,
		outlier: number,
		fill: string,
	) => {
		const tooltip = document.getElementById("boxplot-tooltip");
		if (!tooltip) return;
		tooltip.style.opacity = "1";
		tooltip.style.left = `${event.pageX + 10}px`;
		tooltip.style.top = `${event.pageY + 10}px`;
		tooltip.innerHTML = `<div><span style="font-weight: bold">Outlier: </span> ${outlier}</div>`;
		tooltip.style.backgroundColor = fill;
	};

	const showStatsTooltip = (
		event: React.MouseEvent<SVGGElement>,
		counts: number[],
		fill: string,
	) => {
		const tooltip = document.getElementById("boxplot-tooltip");
		if (!tooltip) return;

		tooltip.style.opacity = "1";

		tooltip.style.left = `${event.pageX + 10}px`;
		tooltip.style.top = `${event.pageY + 10}px`;
		tooltip.innerHTML = makeCalcBoxplotTable(calculateBoxPlotStats(counts));
		tooltip.style.backgroundColor = fill;
	};

	const hideTooltip = () => {
		const tooltip = document.getElementById("boxplot-tooltip");
		if (tooltip) tooltip.style.opacity = "0";
	};

	return (
		<>
			<g stroke={stroke} fill={fill} cursor={"pointer"}>
				<g
					onMouseOver={(e) => showStatsTooltip(e, data, fill)}
					onMouseMove={(e) => showStatsTooltip(e, data, fill)}
					onMouseOut={hideTooltip}
				>
					{
						// Quartile 1
						lowLine !== q1 && (
							<>
								<line
									x1={boxCenter - boxWidth / 2}
									x2={boxCenter + boxWidth / 2}
									y1={scale(lowLine)}
									y2={scale(lowLine)}
								/>
								<line
									x1={boxCenter}
									x2={boxCenter}
									y1={scale(lowLine)}
									y2={scale(q1)}
								/>
							</>
						)
					}
					{
						// Quartile 2
						q1 !== q2 ? (
							<>
								<rect
									x={boxCenter - boxWidth / 2}
									y={scale(q2)}
									width={boxWidth}
									height={scale(q1) - scale(q2)}
								/>
								<text
									x={
										boxCenter +
										boxWidth / 2 +
										medianOffset +
										q2LabelLength * 0.3
									}
									y={scale(q2)}
									alignmentBaseline="middle"
									textAnchor="middle"
									fontSize={statFontSize}
									fill="currentColor"
									strokeWidth={0}
								>
									{roundAndFormatNumber(q2, isFinance)}
								</text>
							</>
						) : (
							<>
								<line
									x1={boxCenter - boxWidth / 2}
									x2={boxCenter + boxWidth / 2}
									y1={scale(q1)}
									y2={scale(q1)}
								/>
							</>
						)
					}
					{
						// Quartile 3
						q2 !== q3 ? (
							<>
								<rect
									x={boxCenter - boxWidth / 2}
									y={scale(q3)}
									width={boxWidth}
									height={scale(q2) - scale(q3)}
								/>
							</>
						) : (
							<line
								x1={boxCenter - boxWidth / 2}
								x2={boxCenter + boxWidth / 2}
								y1={scale(q3)}
								y2={scale(q3)}
							/>
						)
					}
					{
						// Quartile 4
						highLine !== q3 && (
							<>
								<line
									x1={boxCenter - boxWidth / 2}
									x2={boxCenter + boxWidth / 2}
									y1={scale(highLine)}
									y2={scale(highLine)}
								/>
								<line
									x1={boxCenter}
									x2={boxCenter}
									y1={scale(highLine)}
									y2={scale(q3)}
								/>
							</>
						)
					}
				</g>
				{
					// Low Outliers
					lowOutliers.map((p, i) => (
						<circle
							key={i}
							cx={boxCenter}
							cy={scale(p)}
							r={outlierSize}
							onMouseOver={(e) => showOutlierTooltip(e, p, fill)}
							onMouseMove={(e) => showOutlierTooltip(e, p, fill)}
							onMouseOut={hideTooltip}
						/>
					))
				}
				{
					// High Outliers
					highOutliers.map((p, i) => (
						<circle
							key={i}
							cx={boxCenter}
							cy={scale(p)}
							r={outlierSize}
							onMouseOver={(e) => showOutlierTooltip(e, p, fill)}
							onMouseMove={(e) => showOutlierTooltip(e, p, fill)}
							onMouseOut={hideTooltip}
						/>
					))
				}
			</g>
		</>
	);
}

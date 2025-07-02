"use client";
import { scaleLinear, nice, ticks } from "d3";
import { GraphBounds, LabelFormat, TextStyle } from "./GraphBase";
import ScaledSVG from "./parts/ScaledSVG";
import { HorizontalLabel, VerticalLabel } from "./parts/AxisLabel";
import {
	HorizontalGraphAxis,
	HorizontalTicks,
	VerticalGraphAxis,
	VerticalTicks,
} from "./parts/Axis";
import Legend from "./parts/Legend";
import { roundAndFormatNumber } from "../common/boxPlotStatCalc";

type ScatterPlotData = {
	xData: number;
	yData: number;
};

type ScatterplotProps = GraphBounds &
	LabelFormat &
	TextStyle & {
		data: ScatterPlotData[];
		lobf: boolean;
		correlationCoeff: boolean;
		xMax: number;
		yMax: number;
		xMin: number;
		yMin: number;
		pointColor: string;
	};

// Note: for this component I'm not giving the option to display the title, rather, I'm just using it as a unique identifier
// If we need this component for something later, use GraphTitle in ./parts
export function Scatterplot(props: ScatterplotProps) {
	const {
		data,
		width,
		height,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,

		fontSize = 10,
		xLabelOffset = 0,
		title = "",
		xAxisTitle = "",
		yAxisTitle = "",
		fontFamily,

		xMax,
		xMin,
		yMax,
		yMin,
		lobf = false,
		correlationCoeff = false,
		pointColor = "#69b3a2",
	} = props;

	const numTicksX = xMax <= 20 ? xMax : 10;
	const [minTickX, maxTickX] = nice(xMin, xMax, numTicksX);
	const xLabels =
		xMax <= 20
			? Array(xMax + 1)
					.fill(0)
					.map((_, index) => index)
			: ticks(minTickX, maxTickX, numTicksX);
	const xScale = scaleLinear(
		[minTickX, maxTickX],
		[marginLeft, width - marginRight - 10],
	);

	// Add Y axis
	const numTicksY = yMax <= 20 ? yMax : 10;
	const [minTickY, maxTickY] = nice(yMin, yMax, numTicksY);
	const yLabels =
		yMax <= 20
			? Array(yMax + 1)
					.fill(0)
					.map((_, index) => index)
			: ticks(minTickY, maxTickY, numTicksY);
	const yScale = scaleLinear(
		[minTickY, maxTickY],
		[height - marginBottom, marginTop],
	);
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

	const yNumberWidth = yMax <= 1000 ? 0 : 10;

	type LOBFData = {
		equation: string;
		points: ScatterPlotData[];
	};
	// Line of Best Fit Calculation (Least Squares)
	function calculateLOBF(data: ScatterPlotData[]): LOBFData {
		const sumX = data.reduce((acc, dataPoint) => acc + dataPoint.xData, 0);
		const sumY = data.reduce((acc, dataPoint) => acc + dataPoint.yData, 0);
		const sumXY = data.reduce(
			(acc, dataPoint) => acc + dataPoint.xData * dataPoint.yData,
			0,
		);
		const sumX2 = data.reduce(
			(acc, dataPoint) => acc + dataPoint.xData * dataPoint.xData,
			0,
		);
		const N = data.length;

		const m = (N * sumXY - sumX * sumY) / (N * sumX2 - sumX ** 2);
		const b = (sumY - m * sumX) / N;

		return {
			equation:
				`y = ${roundAndFormatNumber(m)}x` +
				(b === 0
					? ""
					: (b > 0 ? " + " : " - ") + `${roundAndFormatNumber(Math.abs(b))}`),
			points: [
				{
					xData: xMin,
					yData: m * xMin + b,
				},
				{
					xData: xMax,
					yData: m * xMax + b,
				},
			],
		};
	}

	const lobfData = calculateLOBF(data);

	// Correlation Coefficient (Pearson) Calculation
	function pearsonCC(data: ScatterPlotData[]) {
		const sumX = data.reduce((acc, dataPoint) => acc + dataPoint.xData, 0);
		const sumY = data.reduce((acc, dataPoint) => acc + dataPoint.yData, 0);
		const sumXY = data.reduce(
			(acc, dataPoint) => acc + dataPoint.xData * dataPoint.yData,
			0,
		);
		const sumX2 = data.reduce(
			(acc, dataPoint) => acc + dataPoint.xData * dataPoint.xData,
			0,
		);
		const sumY2 = data.reduce(
			(acc, dataPoint) => acc + dataPoint.yData * dataPoint.yData,
			0,
		);
		const N = data.length;

		return (
			(N * sumXY - sumX * sumY) /
			Math.sqrt((N * sumX2 - sumX ** 2) * (N * sumY2) - sumY ** 2)
		);
	}

	// Tooltips
	const showLOBFTooltip = (
		event: React.MouseEvent<SVGPolylineElement>,
		equation: string,
		fill: string,
	) => {
		const tooltip = document.getElementById("scatterplot-tooltip-" + title);
		if (!tooltip) return;
		tooltip.style.opacity = "1";
		tooltip.style.left = `${event.pageX + 10}px`;
		tooltip.style.top = `${event.pageY + 10}px`;
		tooltip.innerHTML = `<div><span style="font-weight: bold">Line of Best Fit: </span> ${equation}</div>`;
		tooltip.style.backgroundColor = fill;
	};
	const showDataPointTooltip = (
		event: React.MouseEvent<SVGCircleElement>,
		dataPoint: ScatterPlotData,
		fill: string,
	) => {
		const tooltip = document.getElementById("scatterplot-tooltip-" + title);
		if (!tooltip) return;
		tooltip.style.opacity = "1";
		tooltip.style.left = `${event.pageX + 10}px`;
		tooltip.style.top = `${event.pageY + 10}px`;
		tooltip.innerHTML = `
			<div>
				<p style="font-weight: bold">x: ${dataPoint.xData}</p> 
				<p style="font-weight: bold">y: ${dataPoint.yData}</p> 
			</div>`;
		tooltip.style.backgroundColor = fill;
	};

	const hideTooltip = () => {
		const tooltip = document.getElementById("scatterplot-tooltip-" + title);
		if (tooltip) tooltip.style.opacity = "0";
	};

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
				id={"scatterplot-tooltip-" + title}
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

			<ScaledSVG width={width} height={height} fontFamily={fontFamily}>
				<VerticalLabel
					x={marginLeft - 20 - yNumberWidth}
					y={height / 2}
					fontSize={fontSize}
					text={yAxisTitle}
				/>
				<HorizontalLabel
					x={width / 2}
					y={height - marginBottom + xLabelOffset}
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
					x1={xScale(xMin)}
					x2={xScale(xMax)}
					y={height - marginBottom}
				/>

				{lobf && (
					<g strokeWidth={2}>
						<polyline
							stroke={pointColor}
							key={"lobf"}
							fill="none"
							strokeOpacity={0.3}
							points={lobfData.points
								.map(
									(point) => `${xScale(point.xData)}, ${yScale(point.yData)}`,
								)
								.join(" ")}
							onMouseOver={(e) =>
								showLOBFTooltip(e, lobfData.equation, pointColor)
							}
							onMouseMove={(e) =>
								showLOBFTooltip(e, lobfData.equation, pointColor)
							}
							onMouseOut={hideTooltip}
						/>
					</g>
				)}

				{data &&
					data.map((dataPoint, index) => {
						return (
							<g key={title + "-" + index + "-scatterplot"} r="5">
								<circle
									cx={xScale(dataPoint.xData)}
									cy={yScale(dataPoint.yData)}
									r={2}
									fill={pointColor}
									onMouseOver={(e) =>
										showDataPointTooltip(e, dataPoint, pointColor)
									}
									onMouseMove={(e) =>
										showDataPointTooltip(e, dataPoint, pointColor)
									}
									onMouseOut={hideTooltip}
								/>
							</g>
						);
					})}
				{correlationCoeff && (
					<Legend
						x={width - marginRight}
						y={10}
						alignTo={"right"}
						direction={"desc"}
						colorIndicatorSize={6}
						textOffset={3}
						textSize={fontSize}
						indicatorGap={2}
						legendItems={[
							{
								color: pointColor,
								label: `Pearson Correlation = ${roundAndFormatNumber(pearsonCC(data))}`,
							},
						]}
					/>
				)}
			</ScaledSVG>
		</div>
	);
}

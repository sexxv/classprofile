import { defaultGraphBounds } from "@/components/AllGraphs";
import { roundAndFormatNumber } from "@/components/common/boxPlotStatCalc";
import { TasteDaRainbow } from "@/components/common/color";
import correlations from "@/data/cleaned/correlations.json";
import { GraphBounds } from "../GraphBase";
import LineGraph from "../LineGraph";
import Legend from "../parts/Legend";

type FTvsFamilyIncomeProps = GraphBounds & { overrides?: object };

export function FTvsFamilyIncomeGraph(props: FTvsFamilyIncomeProps) {
	const { overrides } = props;

	// a: get data
	const a = correlations["Full-Time Salary vs. Family Income"].data;

	// b: get labels
	const b: string[] = correlations["Full-Time Salary vs. Family Income"].labels;
	// c: initialize bucketing
	const c: {
		[k: string]: {
			avg: number;
			data: number[];
		};
	} = Object.fromEntries(b.map((elem) => [elem, { avg: 0, data: [] }]));
	// d: fill in data
	a.forEach((elem) => {
		if (c[elem["Family Income"]]) {
			c[elem["Family Income"]].data.push(parseFloat(elem["Full-Time Salary"]));
		}
	});
	// e: calculate averages and make into number array
	// line is simply the average, right now
	const lines: number[][] = [[], []];
	b.forEach((label) => {
		// labels being in order should keep this in order. Unless i am sorely mistaken
		if (c[label] && c[label].data.length > 0) {
			const average =
				c[label].data.reduce((acc, elem) => acc + elem, 0) /
				c[label].data.length;
			lines[0].push(average);

			const sortedData = c[label].data.sort(function (a, b) {
				return +a - +b;
			});
			const middle: number = (sortedData.length - 1) / 2.0;
			const median =
				(sortedData[Math.floor(middle)] + sortedData[Math.ceil(middle)]) / 2;
			lines[1].push(median);
		}
	});

	const corrBounds = {
		...defaultGraphBounds,
		...overrides,
	};

	const meanMedianColors = [TasteDaRainbow.pink, TasteDaRainbow.teal];

	return (
		<>
			<LineGraph
				{...defaultGraphBounds}
				lines={lines}
				xLabels={b}
				lineColors={meanMedianColors}
				titleSize={24}
				titleOffset={40}
				yAxisTitle="Full-time Total Compensation (CAD)"
				height={200}
				fontSize={4}
				marginLeft={40}
				points={[
					(x, y, index) => (
						<g key={index + "ft-vs-family-income"}>
							<circle cx={x} cy={y} r={2} fill={meanMedianColors[0]} />
							<text x={x - 6} y={y + 7} fontSize={4} fill={"white"}>
								{roundAndFormatNumber(lines[0][index], true)}
							</text>
						</g>
					),
					(x, y, index) => (
						<g key={index + "ft-vs-family-income"}>
							<circle cx={x} cy={y} r={2} fill={meanMedianColors[1]} />
							<text x={x - 6} y={y + 7} fontSize={4} fill={"white"}>
								{roundAndFormatNumber(lines[1][index], true)}
							</text>
						</g>
					),
				]}
			>
				<Legend
					x={corrBounds.width - corrBounds.marginRight}
					y={10}
					alignTo={"right"}
					direction={"desc"}
					colorIndicatorSize={6}
					textOffset={3}
					textSize={4}
					indicatorGap={2}
					legendItems={[
						{ label: "Mean", color: meanMedianColors[0] },
						{ label: "Median", color: meanMedianColors[1] },
					]}
				/>
			</LineGraph>
		</>
	);
}

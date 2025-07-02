import { dataSetToNumberList } from "@/components/AllGraphs";
import {
	BoxPlotStats,
	calculateBoxPlotStats,
} from "@/components/common/boxPlotStatCalc";
import { termColors } from "@/components/common/color";
import coopData from "@/data/coop.json";
import { VerticalBoxPlot } from "../BoxPlot";
import { GraphBounds } from "../GraphBase";

const salaryData = coopData["What was your hourly co-op salary?"];

const DATA = Object.values(salaryData).map(dataSetToNumberList);

export function SalaryBoxplot(props: GraphBounds) {
	const boxPlotStats: BoxPlotStats[] = DATA.map((dataSet) =>
		calculateBoxPlotStats(dataSet, true),
	);

	const boxPlotLabels = [
		"Co-op 1",
		"Co-op 2",
		"Co-op 3",
		"Co-op 4",
		"Co-op 5",
		"Co-op 6",
	];

	return (
		<>
			<div style={{ height: 20 }} />
			<VerticalBoxPlot
				{...props}
				graphMarginLeft={20}
				graphMarginRight={20}
				data={DATA}
				boxPlotLabels={boxPlotLabels}
				boxWidth={50}
				boxColors={termColors}
				xAxisTitle={""}
				yAxisTitle={"Hourly Salary (CAD)"}
				labelSize={8}
				width={800}
				height={400}
				marginTop={40}
				marginBottom={100}
				marginLeft={80}
				marginRight={80}
				graphN={Object.values(salaryData).map((dataSet) => dataSet.n)}
				graphAvg={boxPlotStats.map((stats) =>
					parseFloat(stats.mean.toString()),
				)}
				tooltipLabelY={6}
				statFontSize={8}
				medianOffset={8}
				graphStatFontSize={9}
				graphStatRectangleHeightScaler={14}
				graphNPos={11}
				graphAvgPos={22}
				statsRadius={4}
				outlierSize={1}
				isFinance={true}
			/>
		</>
	);
}

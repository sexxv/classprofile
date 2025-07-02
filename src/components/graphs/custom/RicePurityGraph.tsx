import { TasteDaRainbow } from "@/components/common/color";
import { VerticalBoxPlot } from "../BoxPlot";
import { GraphBounds } from "../GraphBase";

import { dataSetToNumberList } from "@/components/AllGraphs";
import {
	BoxPlotStats,
	calculateBoxPlotStats,
} from "@/components/common/boxPlotStatCalc";
import surveyData3 from "@/data/cleaned/survey3.json";

type RicePurityGraphProps = GraphBounds & {};

export function RicePurityGraph(props: RicePurityGraphProps) {
	const { width, height, marginTop, marginLeft, marginRight } = props;

	const DATA = [
		dataSetToNumberList(
			surveyData3["What was your rice purity test before university?"],
		),
		dataSetToNumberList(surveyData3["Rice purity test score?"]),
	];

	const nValues = [
		surveyData3["What was your rice purity test before university?"].n,
		surveyData3["Rice purity test score?"].n,
	];

	const boxPlotStats: BoxPlotStats[] = DATA.map((dataSet) =>
		calculateBoxPlotStats(dataSet),
	);

	const boxPlotLabels = ["Before University", "Current"];

	return (
		<>
			<VerticalBoxPlot
				width={width}
				height={height}
				marginTop={marginTop}
				marginRight={marginRight}
				marginBottom={50}
				marginLeft={marginLeft}
				data={DATA}
				boxPlotLabels={boxPlotLabels}
				boxWidth={75}
				graphMarginLeft={25}
				graphMarginRight={25}
				xAxisTitle={""}
				yAxisTitle={"Rice Purity Score"}
				boxColors={[TasteDaRainbow.gradOrange, TasteDaRainbow.gradRed]}
				manualMinY={0}
				manualMaxY={100}
				graphAvg={boxPlotStats.map((stat) => parseFloat(stat.mean.toString()))}
				graphN={nValues}
				graphStatRectangleHeightScaler={13}
				graphAvgPos={19}
				graphNPos={10}
				tooltipY={22}
				tooltipLabelY={13}
				tooltipHeightOverride={19}
			/>
		</>
	);
}

import { dataSetToNumberList } from "@/components/AllGraphs";
import {
	BoxPlotStats,
	calculateBoxPlotStats,
} from "@/components/common/boxPlotStatCalc";
import { TasteDaRainbow } from "@/components/common/color";
import survey3Data from "@/data/cleaned/survey3.json";
import { VerticalBoxPlot } from "../BoxPlot";
import { GraphBounds } from "../GraphBase";

const EASY_RESULT =
	survey3Data["How many Leetcode Easy problems have you solved?"];
const MED_RESULT =
	survey3Data["How many Leetcode Medium problems have you solved?"];
const HARD_RESULT =
	survey3Data["How many Leetcode Hard problems have you solved?"];

const DATA = [
	dataSetToNumberList(EASY_RESULT),
	dataSetToNumberList(MED_RESULT),
	dataSetToNumberList(HARD_RESULT),
];

export function LeetcodeBoxplot(props: GraphBounds) {
	const boxPlotLabels = ["Easy", "Medium", "Hard"];

	const boxPlotStats: BoxPlotStats[] = DATA.map((dataSet) =>
		calculateBoxPlotStats(dataSet),
	);

	const leetcodeColors = [
		TasteDaRainbow.teal,
		TasteDaRainbow.gradOrange,
		TasteDaRainbow.gradRed,
	];

	return (
		<>
			<VerticalBoxPlot
				{...props}
				graphMarginLeft={20}
				graphMarginRight={20}
				data={DATA}
				boxPlotLabels={boxPlotLabels}
				boxColors={leetcodeColors}
				boxWidth={50}
				xAxisTitle={""}
				yAxisTitle={"Number of Problems Solved"}
				graphAvg={boxPlotStats.map((stat) => parseFloat(stat.mean.toString()))}
				marginBottom={50}
				tooltipY={28}
				tooltipLabelY={14}
			/>
		</>
	);
}

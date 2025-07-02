import {
	dataSetToNumberList,
	defaultGraphBounds,
} from "@/components/AllGraphs";
import {
	calculateBoxPlotStats,
	removeOutliers,
} from "@/components/common/boxPlotStatCalc";
import { chooseColors } from "@/components/common/color";
import survey2Data from "@/data/cleaned/survey2.json";
import { VerticalBoxPlot } from "../BoxPlot";
import { GraphBounds } from "../GraphBase";
import SwitchToggleGraph from "../SwitchToggleGraph";

const DATA = [
	survey2Data["What is your annual base salary?"],
	survey2Data["What is your one-time sign-on bonus?"],
	survey2Data["What is the value of your first-year stock grant?"],
	survey2Data["What is your total stock grant value?"],
	survey2Data["What is your end-of-year/recurring annual compensation?"],
].map(dataSetToNumberList);

// This is what y'all were looking for, isn't it
// Unused since stock numbers completely destroy any sense of scale
export function CompensationBoxplot(props: GraphBounds) {
	return (
		<VerticalBoxPlot
			{...props}
			graphMarginLeft={20}
			graphMarginRight={20}
			data={DATA}
			boxPlotLabels={[
				"Annual Base Salary",
				"Sign-on Bonus",
				"First-Year Stock Grant",
				"Total Stock Grant",
			]}
			manualMaxY={1_000_000}
			boxColors={chooseColors(4)}
			boxWidth={50}
			xAxisTitle={""}
			yAxisTitle={""}
		/>
	);
}

export function CompensationBoxplotWithOutlierToggle(props: {
	title: string;
	dataset: {
		labels: string[] | number[];
		counts: number[];
		n: number;
	};
}) {
	const { dataset, title } = props;
	const oneThirdBPWGraphWidth = defaultGraphBounds.width / 3;

	const numberList = dataSetToNumberList(dataset);

	const boxPlotStats = calculateBoxPlotStats(numberList);

	const [numberListWithoutOutliers, boxPlotStatsWithoutOutliers] =
		removeOutliers(numberList, true);

	return (
		<SwitchToggleGraph
			initial={
				<VerticalBoxPlot
					{...defaultGraphBounds}
					data={[numberListWithoutOutliers]}
					boxPlotLabels={[""]}
					boxWidth={50}
					graphMarginLeft={oneThirdBPWGraphWidth}
					graphMarginRight={oneThirdBPWGraphWidth}
					boxColors={chooseColors(1)}
					xAxisTitle={""}
					yAxisTitle={""}
					marginBottom={50}
					graphAvg={[boxPlotStatsWithoutOutliers.mean]}
					graphN={[numberListWithoutOutliers.length]}
					graphStatRectangleHeightScaler={14}
					graphAvgPos={21}
					graphNPos={11}
					tooltipLabelY={12}
					tooltipIdSuffix={`${title}-a`}
					manualMinY={0}
					isFinance
				/>
			}
			alternate={
				<VerticalBoxPlot
					{...defaultGraphBounds}
					data={[numberList]}
					boxPlotLabels={[""]}
					boxWidth={50}
					graphMarginLeft={oneThirdBPWGraphWidth}
					graphMarginRight={oneThirdBPWGraphWidth}
					boxColors={chooseColors(1)}
					xAxisTitle={""}
					yAxisTitle={""}
					marginBottom={50}
					graphAvg={[boxPlotStats.mean]}
					graphN={[numberList.length]}
					graphStatRectangleHeightScaler={14}
					graphAvgPos={21}
					graphNPos={11}
					tooltipLabelY={12}
					tooltipIdSuffix={`${title}-b`}
					manualMinY={0}
					isFinance
				/>
			}
			initialLabel={"Exclude Outliers"}
			alternateLabel={"Include Outliers"}
		/>
	);
}

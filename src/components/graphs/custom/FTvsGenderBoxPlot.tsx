import { TasteDaRainbow } from "@/components/common/color";
import { VerticalBoxPlot } from "../BoxPlot";
import { GraphBounds } from "../GraphBase";

import {
	BoxPlotStats,
	calculateBoxPlotStats,
	removeOutliers,
} from "@/components/common/boxPlotStatCalc";
import correlationData from "@/data/cleaned/correlations.json";
import SwitchToggleGraph from "../SwitchToggleGraph";

type FTvsGenderProps = GraphBounds & {};
type FTDataObject = { Men: number[]; Women: number[] };

export function FTvsGender(props: FTvsGenderProps) {
	const { width, height, marginTop, marginLeft, marginRight } = props;

	const DATA: FTDataObject = {
		Men: correlationData["Full-Time Salary vs. Gender"]
			.filter((rawItem) => rawItem.Gender === "Man")
			.map((filteredItem) => parseFloat(filteredItem["Full-Time Salary"])),
		Women: correlationData["Full-Time Salary vs. Gender"]
			.filter((rawItem) => rawItem.Gender === "Woman")
			.map((filteredItem) => parseFloat(filteredItem["Full-Time Salary"])),
	};

	const nValues = [DATA.Men.length, DATA.Women.length];

	const boxPlotStats: BoxPlotStats[] = [
		calculateBoxPlotStats(DATA.Men),
		calculateBoxPlotStats(DATA.Women),
	];

	const boxPlotLabels = ["Men", "Women"];

	const [dataMenWithoutOutliers, boxPlotStatsMenWithoutOutliers] =
		removeOutliers(DATA.Men, true);
	const [dataWomenWithoutOutliers, boxPlotStatsWomenWithoutOutliers] =
		removeOutliers(DATA.Women, true);

	// organizing the information to make sense
	const [dataWithoutOutliers, boxPlotStatsWithoutOutliers] = [
		[dataMenWithoutOutliers, dataWomenWithoutOutliers],
		[boxPlotStatsMenWithoutOutliers, boxPlotStatsWomenWithoutOutliers],
	];
	const nValuesWithoutOutliers = [
		dataMenWithoutOutliers.length,
		dataWomenWithoutOutliers.length,
	];

	const boxColors = [TasteDaRainbow.purple, TasteDaRainbow.gradOrange];

	return (
		<>
			<SwitchToggleGraph
				initial={
					<VerticalBoxPlot
						width={width}
						height={height}
						marginTop={marginTop}
						marginRight={marginRight}
						marginBottom={50}
						marginLeft={marginLeft}
						data={[dataWithoutOutliers[0], dataWithoutOutliers[1]]}
						boxPlotLabels={boxPlotLabels}
						boxWidth={75}
						graphMarginLeft={25}
						graphMarginRight={25}
						xAxisTitle={""}
						yAxisTitle={"Full-time Total Compensation (CAD)"}
						boxColors={boxColors}
						graphN={nValuesWithoutOutliers}
						graphAvg={boxPlotStatsWithoutOutliers.map((stat) => stat.mean)}
						graphStatRectangleHeightScaler={13}
						graphAvgPos={19}
						graphNPos={10}
						tooltipY={22}
						tooltipLabelY={13}
						offsetYTitle={10}
						tooltipHeightOverride={19}
						isFinance
					/>
				}
				alternate={
					<VerticalBoxPlot
						width={width}
						height={height}
						marginTop={marginTop}
						marginRight={marginRight}
						marginBottom={50}
						marginLeft={marginLeft}
						data={[DATA.Men, DATA.Women]}
						boxPlotLabels={boxPlotLabels}
						boxWidth={75}
						graphMarginLeft={25}
						graphMarginRight={25}
						xAxisTitle={""}
						yAxisTitle={"Full-time Total Compensation (CAD)"}
						boxColors={boxColors}
						graphN={nValues}
						graphAvg={boxPlotStats.map((stat) => stat.mean)}
						graphStatRectangleHeightScaler={13}
						graphAvgPos={19}
						graphNPos={10}
						tooltipY={22}
						tooltipLabelY={13}
						tooltipHeightOverride={19}
						offsetYTitle={10}
						isFinance
					/>
				}
				initialLabel={"Exclude Outliers"}
				alternateLabel={"Include Outliers"}
			/>
		</>
	);
}

import { dataSetToNumberList } from "@/components/AllGraphs";
import { chooseColors } from "@/components/common/color";
import survey2Data from "@/data/cleaned/survey2.json";
import { VerticalBoxPlot } from "../BoxPlot";
import { GraphBounds } from "../GraphBase";
import { calculateBoxPlotStats } from "@/components/common/boxPlotStatCalc";

const COOK_SCHOOL =
	survey2Data[
		"How many meals do you cook per week on average during school terms?"
	];
const COOK_COOP =
	survey2Data[
		"How many meals do you cook per week on average during co-op terms?"
	];
const GO_OUT_SCHOOL =
	survey2Data[
		"How many times do you go out to eat per week on average during school terms?"
	];
const GO_OUT_COOP =
	survey2Data[
		"How many times do you go out to eat per week on average during co-op terms?"
	];

const DURING_SCHOOL = [
	dataSetToNumberList(COOK_SCHOOL),
	dataSetToNumberList(GO_OUT_SCHOOL),
];

const DURING_COOP = [
	dataSetToNumberList(COOK_COOP),
	dataSetToNumberList(GO_OUT_COOP),
];

const SCHOOL_AVERAGES = DURING_SCHOOL.map((stats) =>
	parseFloat(calculateBoxPlotStats(stats).mean),
);
const COOP_AVERAGES = DURING_COOP.map((stats) =>
	parseFloat(calculateBoxPlotStats(stats).mean),
);

export function FoodBoxplotSchool(props: GraphBounds) {
	return (
		<VerticalBoxPlot
			{...props}
			graphMarginLeft={50}
			graphMarginRight={50}
			data={DURING_SCHOOL}
			marginBottom={50}
			boxPlotLabels={["Cook", "Go out"]}
			boxColors={chooseColors(4, true)}
			boxWidth={50}
			xAxisTitle={""}
			yAxisTitle={"Number of Times"}
			graphAvg={SCHOOL_AVERAGES}
			graphN={[COOK_SCHOOL.n, GO_OUT_SCHOOL.n]}
			graphStatFontSize={9}
			graphNPos={11}
			graphAvgPos={22}
			graphStatRectangleHeightScaler={14}
		/>
	);
}

export function FoodBoxplotCoop(props: GraphBounds) {
	return (
		<VerticalBoxPlot
			{...props}
			graphMarginLeft={50}
			graphMarginRight={50}
			data={DURING_COOP}
			marginBottom={50}
			boxPlotLabels={["Cook", "Go out"]}
			boxColors={chooseColors(4, true)}
			boxWidth={50}
			xAxisTitle={""}
			yAxisTitle={"Number of Times"}
			graphStatFontSize={9}
			graphAvg={COOP_AVERAGES}
			graphN={[COOK_COOP.n, GO_OUT_COOP.n]}
			graphNPos={11}
			graphAvgPos={22}
			graphStatRectangleHeightScaler={14}
		/>
	);
}

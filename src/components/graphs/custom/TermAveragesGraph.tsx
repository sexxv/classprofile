import { dataSetToNumberList } from "@/components/AllGraphs";
import {
	BoxPlotStats,
	calculateBoxPlotStats,
} from "@/components/common/boxPlotStatCalc";
import { termColors } from "@/components/common/color";
import { SurveyResult } from "@/components/common/surveyData";
import survey2Data from "@/data/cleaned/survey2.json";
import { VerticalBoxPlot } from "../BoxPlot";
import { GraphBounds } from "../GraphBase";

type TermAveragesGraphProps = GraphBounds & {};

const TERMS = ["1A", "1B", "2A", "2B", "3A", "3B", "4A" /*"4B"*/];
const TERM_AVERAGE_QUESTIONS = TERMS.map(
	(term) => `What was your term average in ${term}?`,
);

export function TermAveragesGraph(props: TermAveragesGraphProps) {
	const { marginRight } = props;

	const DATA = TERM_AVERAGE_QUESTIONS.map((question) =>
		dataSetToNumberList(
			(survey2Data as Record<string, SurveyResult>)[question],
		),
	);

	const nValues = TERM_AVERAGE_QUESTIONS.map(
		(question) => (survey2Data as Record<string, SurveyResult>)[question].n,
	);

	const boxPlotStats: BoxPlotStats[] = DATA.map((dataSet) =>
		calculateBoxPlotStats(dataSet),
	);

	return (
		<>
			<VerticalBoxPlot
				width={800}
				height={400}
				marginRight={marginRight}
				graphMarginLeft={20}
				graphMarginRight={20}
				data={DATA}
				boxPlotLabels={TERMS}
				boxWidth={50}
				xAxisTitle={""}
				yAxisTitle={""}
				boxColors={termColors}
				labelSize={8}
				marginTop={40}
				marginBottom={100}
				marginLeft={40}
				graphAvg={boxPlotStats.map((stats) => parseFloat(stats.mean))}
				graphN={nValues}
				tooltipLabelY={6}
				statFontSize={8}
				medianOffset={8}
				graphStatFontSize={9}
				graphStatRectangleHeightScaler={14}
				graphNPos={11}
				graphAvgPos={22}
				statsRadius={4}
				outlierSize={1}
			/>
		</>
	);
}

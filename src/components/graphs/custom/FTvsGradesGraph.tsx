import { defaultBarColor } from "@/components/common/color";
import { InteractivePill } from "@/components/layout/SurveyComponents";
import correlations from "@/data/cleaned/correlations.json";
import { GraphBounds } from "../GraphBase";
import { Scatterplot } from "../Scatterplot";
import SwitchToggleGraph from "../SwitchToggleGraph";

type FTvsGradesProps = GraphBounds;

export function FTvsGradesGraph(props: FTvsGradesProps) {
	const { width, height, marginTop, marginBottom, marginLeft, marginRight } =
		props;

	// decided I'd rather hardcode xMin and xMax to make it a perfect multiple of 5
	const xMin = 65;
	const xMax = 100;
	const fycGradeData = correlations["Full-Time Salary vs. GPA"];
	const dataWithOutliers = fycGradeData.map((item) => {
		return {
			xData: parseFloat(item.GPA),
			yData: parseFloat(item["Full-Time Salary"]),
		};
	});
	// ok I could do some math to calculate outliers but tbh i don't want to
	const data = dataWithOutliers.filter(
		(dataPoint) => dataPoint.yData < 1000000,
	);
	return (
		<>
			<SwitchToggleGraph
				initial={
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Scatterplot
							width={width}
							height={height}
							marginTop={marginTop}
							marginBottom={marginBottom}
							marginLeft={marginLeft}
							marginRight={marginRight}
							xMin={xMin}
							xMax={xMax}
							yMin={data.reduce(
								(acc, dataPoint) => Math.min(acc, dataPoint.yData),
								Infinity,
							)}
							yMax={data.reduce(
								(acc, dataPoint) => Math.max(acc, dataPoint.yData),
								-Infinity,
							)}
							title="no_outliers"
							lobf={true}
							data={data}
							xAxisTitle="Cumulative Grade (out of 100)"
							xLabelOffset={20}
							yAxisTitle="Full-time Total Compensation (CAD)"
							fontSize={5}
							pointColor={defaultBarColor}
							correlationCoeff={true}
						/>
						<InteractivePill type={"hover_for_counts"} />
					</div>
				}
				alternate={
					<div
						style={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							alignItems: "center",
						}}
					>
						<Scatterplot
							width={width}
							height={height}
							marginTop={marginTop}
							marginBottom={marginBottom}
							marginLeft={marginLeft}
							marginRight={marginRight}
							xMin={xMin}
							xMax={xMax}
							yMin={dataWithOutliers.reduce(
								(acc, dataPoint) => Math.min(acc, dataPoint.yData),
								Infinity,
							)}
							yMax={dataWithOutliers.reduce(
								(acc, dataPoint) => Math.max(acc, dataPoint.yData),
								-Infinity,
							)}
							title="with_outliers"
							lobf={true}
							data={dataWithOutliers}
							xAxisTitle="Cumulative Grade (out of 100)"
							xLabelOffset={20}
							yAxisTitle="Full-time Total Compensation (CAD)"
							fontSize={5}
							pointColor={defaultBarColor}
							correlationCoeff={true}
						/>
						<InteractivePill type={"hover_for_counts"} />
					</div>
				}
				initialLabel={"Exclude Outliers"}
				alternateLabel={"Include Outliers"}
			/>
		</>
	);
}

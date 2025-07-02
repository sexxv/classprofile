// Trying to make this into a vertical bar graph bcuz ppl said it was confusing in the feedback

import survey2Data from "@/data/cleaned/survey2.json";

import { chooseColors } from "@/components/common/color";
import { SurveyResult } from "@/components/common/surveyData";
import { NPart } from "@/components/layout/SurveyComponents";
import { ComponentProps, useState } from "react";
import pageStyles from "../../page.module.css";
import { AnimatedVerticalBarGraph } from "../AnimatedBarGraph";
import { IndividualGraphData } from "../ButtonToggleGraph";
import styles from "../ButtonToggleGraph.module.css";
import { GraphBounds } from "../GraphBase";
import Legend from "../parts/Legend";

const CLOSE_FRIEND_PREFIX =
	"How many close friends do you have that you first met";

const CLOSE_FRIEND_SUFFIXES = [
	"in high school?",
	"through being part of the SE25 cohort (i.e. by taking the same core courses or attending cohort events)?",
	"through being part of SE (other cohorts)?",
	"on campus residence?",
	"in extracurriculars (e.g. clubs, sports)?",
	"through co-op?",
	"through other means (e.g. parties, Aphrodite project, mutual friends)",
];

const QUESTIONS = CLOSE_FRIEND_SUFFIXES.map(
	(source) => `${CLOSE_FRIEND_PREFIX} ${source}`,
);

// I love long question names
// I don't love long labels, though
const CATEGORIES = [
	"High school",
	"SE25 cohort",
	"SE (other cohorts)",
	"Campus residence",
	"Extracurriculars",
	"Co-op",
	"Other",
];
const BUCKETS = [
	"0",
	"1",
	"2",
	"3",
	"4",
	"5",
	"6",
	"7",
	"8",
	"9",
	"10 or more",
];
const TITLES = CATEGORIES.map(
	(source) => `Close friends met through: ${source}`,
);

type FriendshipSurveyResult = IndividualGraphData & { formattedAvg: string };
type FriendType = Record<string, FriendshipSurveyResult>;

const DATA: FriendType = {};
QUESTIONS.forEach((question, idx) => {
	const result = (survey2Data as Record<string, SurveyResult>)[question];
	const lockedLabels = JSON.parse(JSON.stringify(result.labels));

	// average
	const average =
		result.counts.reduce((acc, num, idx) => {
			const labelNum = parseInt(lockedLabels[idx].toString());
			return acc + num * labelNum;
		}, 0) / result.n;

	// "row"
	const row: number[] = new Array(11).fill(0);
	result.labels.forEach((label, index) => {
		const labelNum = parseInt(label.toString());
		if (labelNum <= 10) {
			row[labelNum] = result.counts[index];
		} else {
			row[row.length - 1] = row[row.length - 1] + result.counts[index];
		}
	});
	result.counts = row;
	result.labels = BUCKETS;
	DATA[CATEGORIES[idx]] = {
		...result,
		formattedAvg: average.toFixed(2),
		title: TITLES[idx],
	};
});

type FriendshipGraphProps = GraphBounds & {
	legend?: Partial<ComponentProps<typeof Legend>>;
};

export function FriendshipGraph(props: FriendshipGraphProps) {
	const { width, height, marginTop, marginBottom, marginLeft, marginRight } =
		props;

	const barColours = chooseColors(7);

	const [currentLabel, setCurrentLabel] = useState<string>(CATEGORIES[0]);
	const currentIndex = CATEGORIES.indexOf(currentLabel); // general index variable

	return (
		<div>
			<div className={styles.flexContainer}>
				<div style={{ flex: 1 }}>
					<h2>{DATA[CATEGORIES[currentIndex]].title ?? ""}</h2>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: 0,
							marginBottom: 0,
							fontSize: 20,
							fontFamily: "var(--font-jersey-10)",
						}}
					>
						<NPart backgroundColour={barColours[currentIndex]}>
							{DATA[CATEGORIES[currentIndex]].n} Average:{" "}
							{DATA[CATEGORIES[currentIndex]].formattedAvg}
						</NPart>
					</div>
					<AnimatedVerticalBarGraph
						width={width}
						height={height}
						marginTop={marginTop / 2}
						marginRight={marginRight}
						marginBottom={marginBottom}
						marginLeft={marginLeft}
						data={DATA[CATEGORIES[currentIndex]].counts}
						title={DATA[CATEGORIES[currentIndex]].title ?? ""}
						labels={BUCKETS}
						tickSize={5}
						xTickLabelSize={12}
						yTickLabelSize={12}
						binSpacing={5}
						xAxisTitle={"Number of Friends"}
						yAxisTitle={"Number of Respondents"}
						axisLabelSize={15}
						titleSize={0}
						textColor={"white"}
						barColor={barColours[currentIndex]}
					/>
				</div>
			</div>
			<div className={styles.toggleButtonContainer}>
				{CATEGORIES.map((label, index) => (
					<button
						onClick={() => {
							setCurrentLabel(label);
						}}
						key={label}
						style={{ backgroundColor: barColours[index] }}
						className={currentLabel === label ? styles.active : ""}
					>
						{label}
					</button>
				))}
			</div>
			<div className={pageStyles.actionTextClickUp} />
		</div>
	);
}

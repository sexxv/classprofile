import { defaultBarColor } from "@/components/common/color";
import { SurveyResult } from "@/components/common/surveyData";
import survey3Data from "@/data/cleaned/survey3.json";
import { HorizontalBarGraph } from "../BarGraph";
import { GraphBounds } from "../GraphBase";

const MENTAL_HEALTH_QUESTION_PREFIX =
	"What mental health issues have you faced?";

const MENTAL_HEALTH_ISSUES = [
	"Anxiety",
	"Body Dysmorphia",
	"Burnout",
	"Depression",
	"Eating Disorders",
	"Grief",
	"OCD",
	"Neurodivergence (ADHD, Autism, etc.)",
	"Post-traumatic Stress Disorder (PTSD) / Complex post-traumatic Stress Disorder (CPTSD)",
	"Social Anxiety Disorder",
	"PMDD",
	"Body-Focused Repetitive Behaviour",
	"None",
];

// I really don't want to have to deal with multiline text today
const LABELS = [
	"Anxiety",
	"Body Dysmorphia",
	"Burnout",
	"Depression",
	"Eating Disorders",
	"Grief",
	"OCD",
	"Neurodivergence (ADHD, Autism, etc.)",
	"PTSD/CPTSD",
	"Social Anxiety Disorder",
	"PMDD",
	"Body-Focused Repetitive Behaviour",
	"None",
];

const MENTAL_HEALTH_QUESTIONS = MENTAL_HEALTH_ISSUES.map(
	(term) => `${MENTAL_HEALTH_QUESTION_PREFIX} [${term}]`,
);

const MENTAL_HEALTH_DATA = MENTAL_HEALTH_QUESTIONS.map(
	(question) => (survey3Data as Record<string, SurveyResult>)[question],
);

const COUNTS = MENTAL_HEALTH_DATA.map((result) => {
	const oneLabelIndex = (result.labels as string[]).indexOf("1");
	return result.counts[oneLabelIndex];
});

type MentalHealthGraphProps = GraphBounds & {};

/**
 * Using the power of [just looking at the survey JSON],
 * we know that the `n` value for all questions is the same,
 * so we'll just make this a normal bar graph.
 */
export function MentalHealthGraph(props: MentalHealthGraphProps) {
	const { width, height, marginTop, marginBottom, marginLeft, marginRight } =
		props;

	const combinedData = LABELS.map((label, index) => ({
		label,
		count: COUNTS[index],
	}));
	combinedData.sort((a, b) =>
		a.label === "None" ? 1 : b.label === "None" ? -1 : b.count - a.count,
	);
	const sortedLabels = combinedData.map((data) => data.label);
	const sortedCounts = combinedData.map((data) => data.count);

	return (
		<HorizontalBarGraph
			width={width}
			height={height}
			marginTop={marginTop}
			marginRight={marginRight}
			marginBottom={marginBottom}
			marginLeft={marginLeft}
			bins={sortedCounts}
			labels={sortedLabels}
			barColor={defaultBarColor}
			binSpacing={5}
			fontSize={9.5}
			maxLabelWidth={125}
		/>
	);
}

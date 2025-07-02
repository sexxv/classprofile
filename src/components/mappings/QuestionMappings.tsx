import { ComponentProps } from "react";
import CourseWithReviewsDisplay from "../CourseWithReviews";
import TextDisplay from "../TextDisplay";
import { TasteDaRainbow } from "../common/color";
import { HorizontalBarGraph, VerticalBarGraph } from "../graphs/BarGraph";
import {
	HorizontalBarGroupGraph,
	VerticalBarGroupGraph,
} from "../graphs/BarGroupGraph";
import { VerticalBoxPlot } from "../graphs/BoxPlot";
import { BubbleMap } from "../graphs/BubbleMap";
import { ButtonToggleGraph } from "../graphs/ButtonToggleGraph";
import LineGraph from "../graphs/LineGraph";
import PieGraph from "../graphs/PieGraph";
import { Scatterplot } from "../graphs/Scatterplot";
import { ToggleWordCloud } from "../graphs/ToggleWordCloud";
import { WordCloud } from "../graphs/WordCloud";
import ColourDisplay from "../graphs/custom/ColourDisplay";
import EmojiDisplay from "../graphs/custom/EmojiDisplay";
import Legend from "../graphs/parts/Legend";
import { SURVEY_QUESTION } from "./QuestionsList";
import { GraphType, SURVEY_GRAPH_MAPPINGS } from "./QuestionsToGraphs";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type OverridesOf<T extends (props: any) => React.ReactNode> = Partial<
	ComponentProps<T>
>;

type GraphOf<T extends SURVEY_QUESTION> = (typeof SURVEY_GRAPH_MAPPINGS)[T];

type PropsForGraphOf<T extends keyof typeof SURVEY_GRAPH_MAPPINGS> =
	GraphOf<T> extends GraphType.VBG
		? OverridesOf<typeof VerticalBarGraph>
		: GraphOf<T> extends GraphType.HBG
			? OverridesOf<typeof HorizontalBarGraph>
			: GraphOf<T> extends GraphType.PG
				? OverridesOf<typeof PieGraph>
				: GraphOf<T> extends GraphType.MAP
					? OverridesOf<typeof BubbleMap>
					: GraphOf<T> extends GraphType.WORD_CLOUD
						? OverridesOf<typeof WordCloud>
						: GraphOf<T> extends GraphType.TOGGLED_HBG
							? OverridesOf<typeof ButtonToggleGraph>
							: GraphOf<T> extends GraphType.LINE
								? OverridesOf<typeof LineGraph>
								: GraphOf<T> extends GraphType.BOX_PLOT
									? OverridesOf<typeof VerticalBoxPlot>
									: GraphOf<T> extends GraphType.TOGGLED_WORD_CLOUD
										? OverridesOf<typeof ToggleWordCloud>
										: GraphOf<T> extends GraphType.COURSES_WITH_REVIEWS
											? OverridesOf<typeof CourseWithReviewsDisplay>
											: GraphOf<T> extends GraphType.COLOUR_DISPLAY
												? OverridesOf<typeof ColourDisplay>
												: GraphOf<T> extends GraphType.EMOJI_DISPLAY
													? OverridesOf<typeof EmojiDisplay>
													: GraphOf<T> extends GraphType.SCATTER_PLOT
														? OverridesOf<typeof Scatterplot>
														: GraphOf<T> extends GraphType.TEXT_DISPLAY
															? OverridesOf<typeof TextDisplay>
															: GraphOf<T> extends GraphType.GROUPED_HBG
																? OverridesOf<
																		typeof HorizontalBarGroupGraph
																	> & {
																		legend?: OverridesOf<typeof Legend>;
																	}
																: GraphOf<T> extends GraphType.GROUPED_VBG
																	? OverridesOf<
																			typeof VerticalBarGroupGraph
																		> & {
																			legend?: OverridesOf<typeof Legend>;
																		}
																	: object;

/**
 * Mapping of questions to objects contianing fields to override in their corresponding graphs
 */
export const SURVEY_OVERRIDES: {
	[key in SURVEY_QUESTION]?: PropsForGraphOf<key>;
} = {
	"What other universities did you apply to?": {
		height: 400,
		marginLeft: 160,
		maxLabelWidth: 190,
		showOnesToggle: true,
	},
	"Which extracurriculars were you part of in high school?": {
		showOnesToggle: true,
		marginLeft: 175,
	},
	"How many years of programming experience did you have prior to starting 1A?":
		{
			labelMargin: 12,
		},
	"Are you returning to a previous co-op?": {
		labelMargin: 12,
	},
	"What video games did you frequently play during your degree?": {
		showOnesToggle: true,
		maxLabelWidth: 150,
	},

	"What non-technical extracurriculars did you actively participate in?": {
		height: 500,
		marginLeft: 180,
		maxLabelWidth: 250,
	},
	"What technical extracurriculars did you actively participate in?": {
		height: 400,
		maxLabelWidth: 250,
		marginLeft: 195,
	},
	"How many roommates did you have in each school term?": {
		width: 1000,
		height: 400,
		labelSize: 12,
		legend: {
			colorIndicatorSize: 14,
			textSize: 12,

			backingWidth: 75,
			backingFill: TasteDaRainbow.reallyDarkBlue,
		},
	},
	"How many hackathons did you attend in university?": {
		width: 1000,
		height: 400,
		labelSize: 12,
		legend: {
			colorIndicatorSize: 14,
			textSize: 12,

			backingWidth: 70,
			backingFill: TasteDaRainbow.reallyDarkBlue,
		},
	},
	"Which drugs have you used?": {
		maxLabelWidth: 110,
		legend: {
			x: 390,
			y: 30,

			backingWidth: 120,
			backingFill: TasteDaRainbow.reallyDarkBlue,
		},
	},
	"How often did you exercise during your undergrad?": {
		maxLabelWidth: 125,
	},
	"What types of exercise did you do during your undergrad?": {
		height: 400,
	},
	"What percentage of your net worth is invested?": {
		angleOffset: -Math.PI / 2,
	},
	"Which industry was your co-op employer in?": {
		height: 280,
	},
	"How many close friends do you have that you first met in high school?": {
		width: 1000,
		height: 400,
		labelSize: 12,
		legend: {
			colorIndicatorSize: 14,
			textSize: 12,

			backingPadding: 5,
			backingWidth: 240,
			backingStroke: "#818d97",
			backingFill: TasteDaRainbow.reallyDarkBlue,
		},
	},

	"What terms did you commit SEcest with another SE25?": {
		marginBottom: 50,
		marginLeft: 50,
		marginRight: 50,
		width: 800,
	},

	"Which relationship/intimacy actions have you performed?": {
		width: 420,
		height: 400,
		marginLeft: 150,
		marginRight: 6,
		maxLabelWidth: 150,

		legend: {
			backingWidth: 85,
			backingFill: TasteDaRainbow.reallyDarkBlue,
		},
	},

	"What were the 3 most important motivators in your full-time decision?": {
		width: 800,
		height: 400,
		labelOrientation: 45,
		labelSize: 10,
		marginLeft: 40,
		marginRight: 40,
		marginBottom: 120,

		legend: {
			backingWidth: 70,
			backingFill: TasteDaRainbow.reallyDarkPurple,
		},
	},

	"What grocery store did you most frequently shop at?": {
		height: 400,
	},

	"Favourite restaurant in Waterloo?": {
		height: 400,
	},

	"Are you the eldest, youngest, or in the middle?": {
		marginLeft: 60,
	},
	"What counselling resources did you use during your undergrad?": {
		maxLabelWidth: 125,
	},
	"What mental health issues have you faced?": {
		height: 400,
	},

	"How many technical side projects did you complete during university?": {
		fillInNumericGaps: true,
	},
	"How many midterms did you fail?": {
		fillInNumericGaps: true,
	},
	"Which school term did you spend the most time working on your FYDP?": {
		angleOffset: -Math.PI / 2,
	},
	"Easiest study term?": {
		angleOffset: -Math.PI / 2,
	},
	"Hardest study term?": {
		angleOffset: -Math.PI / 2,
	},

	"How many school terms were you affected by struggles associated with mental health?":
		{
			fillInNumericGaps: true,
		},
	"How many times did you ask for a deadline extension due to illness/injury?":
		{
			fillInNumericGaps: true,
		},
	"How many sexual partners did you have during your degree?": {
		fillInNumericGaps: true,
	},

	"How many full-time offers have you received so far?": {
		fillInNumericGaps: true,
	},

	"How many hackathons did you attend in high school?": {
		fillInNumericGaps: true,
	},
	"What is your annual base salary?": {
		/* Uncomment if using multiple boxplots in one graph
		width: 800,
		height: 400,
		labelOrientation: 45,
		labelSize: 10,
		marginLeft: 100,
		marginRight: 100,
		marginBottom: 120,
		*/
	},
	"Which OS do you use for schoolwork?": {
		maxLabelWidth: 125,
	},
	"Rice purity test score?": {
		height: 350,
	},
	"Drank alcohol, taken an edible, or done another drug in class?": {
		marginLeft: 90,
	},
	"Written a final drunk, hungover, high or on another drug?": {
		marginLeft: 110,
	},
	"What is your research topic or program?": {
		useSqrtWithMinAndMaxSizes: [30, 30],
	},
	"How many grad school offers have you received so far?": {
		fillInNumericGaps: true,
	},
	"How did you find your co-op?": {
		sortedLabelsArr: [
			"WaterlooWorks (First Round)",
			"WaterlooWorks (Second Round)",
			"WaterlooWorks (Continuous)",
			"External Application",
			"Hackathon Interview Offer",
			"Personal Connection",
			"Recruiting Event",
			"Returned to Previous Company",
			"Did Not Find a Co-op",
		],
		maxLabelWidth: 110,
	},
	"How many employees worked at your company?": {
		sortedLabelsArr: [
			"2-10",
			"11-50",
			"51-200",
			"201-500",
			"501-1k",
			"1k-5k",
			"5k-10k",
			"10k+",
		],
	},
	"Where was your co-op?": {
		height: 420,
		fontSize: 9,
	},
	"What was your co-op role?": {
		// tbh wonder if this would be a better toggle word cloud...
		height: 450,
		fontSize: 10,
		// I hate long labels
		marginLeft: 125,
		maxLabelWidth: 150,
	},
	"What are your post graduation plans?": {
		maxLabelWidth: 150,
	},
	"Which industry is the company that extended your full-time offer in?": {
		maxLabelWidth: 150,
	},
	"What programming languages did you use at your co-op?": {
		height: 420,
	},
	"Where did you live during your school terms?": {
		sortedLabelsArr: [
			"At home",
			"UWP",
			"CMH",
			"MKV",
			"ICON",
			"Society 145",
			"Rez-One",
			"WCRI",
			"Accommod8u",
			"Other off-campus housing in K-W area",
			"Other on-campus housing",
			"On exchange",
		],
		marginLeft: 115,
	},
};

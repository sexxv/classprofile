import electives from "@/data/electives.json";
import notUsefulCore from "@/data/not-useful-core.json";
import usefulCore from "@/data/useful-core.json";

import {
	HorizontalBarGraph,
	VerticalBarGraph,
} from "@/components/graphs/BarGraph";
import PieGraph from "@/components/graphs/PieGraph";
// todo sort all these imports lol
import ColourDisplay, {
	ColourProps,
} from "@/components/graphs/custom/ColourDisplay";
import { SurveyPart, SurveyPartFWGraph } from "@/components/layout/SurveyPart";

import { ButtonToggleGraph } from "@/components/graphs/ButtonToggleGraph";
import { Choropleth } from "@/components/graphs/Choropleth";
import ateData from "@/data/ate-opinions.json";

import colourData from "@/data/colours.json";
import coopData from "@/data/coop.json";
import emojiData from "@/data/emojis.json";
import housingData from "@/data/housing.json";
import petsData from "@/data/pets.json";

import CustomRenderer from "./CustomRenderer";
import { SURVEY_OVERRIDES } from "./mappings/QuestionMappings";

import { Scatterplot } from "@/components/graphs/Scatterplot";
import { BoxPlotStats, calculateBoxPlotStats } from "./common/boxPlotStatCalc";
import {
	buildTermColors,
	chooseColors,
	defaultBarColor,
	lightModeDarkModeColors,
	TasteDaRainbow,
	termColors,
	yesNoColors,
} from "./common/color";
import {
	allSurveyData,
	SurveyResult,
	surveysBySection,
	SurveySubgraphResult,
} from "./common/surveyData";
import CourseWithReviewsDisplay from "./CourseWithReviews";
import {
	HorizontalBarGroupGraph,
	makeDatasetRectangular,
	VerticalBarGroupGraph,
} from "./graphs/BarGroupGraph";
import { VerticalBoxPlot } from "./graphs/BoxPlot";
import CourseEasyUsefulGraph from "./graphs/custom/CourseEasyUseful";
import LineGraph from "./graphs/LineGraph";
import Legend from "./graphs/parts/Legend";
import { WordCloud } from "./graphs/WordCloud";
import { convertToLinkFormat } from "./layout/SurveyComponents";
import { SURVEY_DESCRIPTIONS, TERMS } from "./mappings/QuestionDescriptions";
import { SURVEY_QUESTION } from "./mappings/QuestionsList";
import { GraphType, SURVEY_GRAPH_MAPPINGS } from "./mappings/QuestionsToGraphs";
import {
	isSubSection,
	QUESTIONS_TO_SECTIONS,
	SURVEY_SECTIONS,
} from "./mappings/QuestionsToSections";
import {
	DisplayWidth,
	HALF_WIDTH_PAIRS,
	HALF_WIDTH_TITLES,
	WIDTH_OVERRIDES,
} from "./mappings/QuestionWidthOverride";
import styles from "./page.module.css";

import { PDFMode } from "@/components/Contexts";
import { useContext, useEffect, useState } from "react";
import { Element } from "react-scroll";
import EmojiDisplay, { EmojiProps } from "./graphs/custom/EmojiDisplay";
import PetsDisplay, { PetsProps } from "./graphs/custom/PetsDisplay";
import { histoBreakpoints, HorizontalHistogram } from "./graphs/Histogram";
import { ToggleWordCloud } from "./graphs/ToggleWordCloud";
import { AXIS_TITLES } from "./mappings/QuestionAxisTitles";
import TextDisplay from "./TextDisplay";

const otherToggleData = {
	...housingData,
	...coopData,
};

export const defaultGraphBounds = {
	width: 400,
	height: 320,
	marginTop: 40,
	marginBottom: 40,
	marginLeft: 100,
	marginRight: 40,
};

export const defaultVBGraphBounds = {
	width: 500,
	height: 320,
	marginTop: 40,
	marginBottom: 40,
	marginLeft: 100,
	marginRight: 20,
};

export const defaultHBGraphBounds = {
	width: 400,
	height: 320,
	marginTop: 40,
	marginBottom: 40,
	marginLeft: 150,
	marginRight: 20,
	maxLabelWidth: 200,
};

export const defaultToggleHBGraphBounds = {
	width: 400,
	height: 320,
	marginTop: 40,
	marginBottom: 40,
	marginLeft: 100,
	marginRight: 40,
	maxLabelWidth: 120,
};

export const defultToggleWordcloudBounds = {
	width: 1000,
	height: 400,
	marginTop: 40,
	marginBottom: 40,
	marginLeft: 100,
	marginRight: 40,
	maxLabelWidth: 120,
};

export const defaultMapBounds = {
	width: 640,
	height: 400,
	marginTop: 40,
	marginBottom: 40,
	marginLeft: 100,
	marginRight: 40,
};

/**
 * Surely there's a better way,
 * that I will not implement today,
 * to make a median feeder,
 * is an exercise to the reader,
 * as for performance I can hope only to pray.
 *
 * Actual explanation: this converts an individual survey result (with separate counts and labels lists),
 * and assumes the labels are all numbers.
 *
 * For each label `labels[i]`, the output array will contain `counts[i]` occurrences of `labels[i]`.
 * The occurrences of labels in the output array is the same as their order in `labels`, so
 * the output will be ordered if the input `labels` are ordered.
 */
export function dataSetToNumberList(dataset: {
	labels: string[] | number[];
	counts: number[];
	n: number;
}): number[] {
	const output: number[] = [];
	const { labels, counts } = dataset;
	for (let i = 0; i < labels.length; ++i) {
		const labelNumber = parseFloat(labels[i].toString());
		if (!isNaN(labelNumber)) {
			for (let j = 0; j < counts[i]; ++j) {
				output.push(labelNumber);
			}
		}
	}
	return output;
}

/**
 * Returns a graph element based on the supplied `graphType`.
 *
 * @param overrides an object with fields to pass into the graph element,
 * which will override any defaults.
 */
function graphFromType(
	graphType: GraphType,
	labels: unknown[],
	counts: number[],
	title: string,
	isPDFMode: boolean,
	overrides?: object & {
		legend?: object;
	},
) {
	switch (graphType) {
		case GraphType.VBG:
			return (
				<VerticalBarGraph
					{...defaultVBGraphBounds}
					bins={counts}
					labels={labels as number[]}
					barColor={defaultBarColor}
					binSpacing={5}
					{...overrides}
				/>
			);
		case GraphType.HBG:
			if (
				title === "Which extracurriculars were you part of in high school?" ||
				title === "What other universities did you apply to?" ||
				title === "What types of exercise did you do during your undergrad?" ||
				title ===
					"What technical extracurriculars did you actively participate in?" ||
				title ===
					"What non-technical extracurriculars did you actively participate in?" ||
				title === "Favourite text editor or IDE?" ||
				title === "Which OS do you use for schoolwork?" ||
				title === "What social media/messaging apps do you use?" ||
				title ===
					"What video games did you frequently play during your degree?" ||
				title ===
					"What counselling resources did you use during your undergrad?"
			) {
				// if you want to sort by count
				const combinedData = labels.map((label, index) => ({
					label,
					count: counts[index],
				}));
				combinedData.sort((a, b) => b.count - a.count);
				const sortedLabels = combinedData.map((data) => data.label);
				const sortedCounts = combinedData.map((data) => data.count);

				return (
					<HorizontalBarGraph
						{...defaultHBGraphBounds}
						{...overrides}
						bins={sortedCounts}
						labels={sortedLabels as number[]}
						barColor={defaultBarColor}
						binSpacing={5}
					/>
				);
			}

			return (
				<HorizontalBarGraph
					{...defaultHBGraphBounds}
					bins={counts}
					labels={labels as number[]}
					barColor={defaultBarColor}
					binSpacing={5}
					{...overrides}
				/>
			);
		case GraphType.PG:
			const isYesNo = labels.every((label) => {
				return (
					typeof label === "string" &&
					(label.includes("Yes") ||
						label === "No" ||
						label === "Prefer not to answer" ||
						label === "Unsure" ||
						label === "Maybe")
				);
			});

			const isLightModeDarkMode = labels.every((label) => {
				return (
					typeof label === "string" &&
					(label === "Light Mode" ||
						label === "Dark Mode" ||
						label === "Depends on how I feel")
				);
			});

			const isTermQuestion = labels.every((label) => {
				return TERMS.includes(label as string);
			});

			return (
				<PieGraph
					{...defaultGraphBounds}
					slices={counts}
					colors={
						isYesNo
							? yesNoColors
							: isLightModeDarkMode
								? lightModeDarkModeColors
								: isTermQuestion
									? buildTermColors(labels as string[])
									: chooseColors(labels.length, true)
					}
					radius={100}
					labels={labels as string[]}
					labelSize={10}
					labelMargin={8}
					{...overrides}
				/>
			);
		case GraphType.LINE:
			return (
				<LineGraph
					lines={[counts]}
					xLabels={labels as string[]}
					lineColors={chooseColors(1)}
					titleSize={24}
					titleOffset={40}
					xLabelOffset={30}
					yLabelOffset={50}
					fontSize={8}
					points={[
						(x, y, index) => (
							<circle
								key={index}
								cx={x}
								cy={y}
								r={4}
								fill={chooseColors(1)[0]}
							/>
						),
					]}
					{...defaultGraphBounds}
					{...overrides}
				/>
			);
		case GraphType.BOX_PLOT:
			const pseudoBPBound = {
				...defaultGraphBounds,
				...overrides,
			};
			const oneThirdBPWGraphWidth =
				(pseudoBPBound.width -
					pseudoBPBound.marginLeft -
					pseudoBPBound.marginRight) /
				3;

			const DATA = [
				dataSetToNumberList({
					labels: labels as string[] | number[],
					counts,
					n: 0, // dummy value (why did I do this to myself)
				}),
			];

			const boxPlotStats: BoxPlotStats[] = DATA.map((dataSet) =>
				calculateBoxPlotStats(dataSet),
			);

			if (
				QUESTIONS_TO_SECTIONS[title as keyof typeof QUESTIONS_TO_SECTIONS]
					?.subSection === "Future: Employment"
			) {
				return (
					<VerticalBoxPlot
						{...defaultGraphBounds}
						data={DATA}
						boxPlotLabels={[""]}
						boxWidth={50}
						graphMarginLeft={oneThirdBPWGraphWidth}
						graphMarginRight={oneThirdBPWGraphWidth}
						boxColors={chooseColors(1)}
						xAxisTitle={""}
						yAxisTitle={""}
						marginBottom={50}
						graphAvg={[parseFloat(boxPlotStats[0].mean)]}
						graphN={[counts.map((c) => c || 0).reduce((a, b) => a + b, 0)]}
						graphStatRectangleHeightScaler={14}
						graphAvgPos={21}
						graphNPos={11}
						tooltipLabelY={12}
						{...overrides}
					/>
				);
			}

			return (
				<VerticalBoxPlot
					{...defaultGraphBounds}
					data={DATA}
					boxPlotLabels={[""]}
					boxWidth={50}
					graphMarginLeft={oneThirdBPWGraphWidth}
					graphMarginRight={oneThirdBPWGraphWidth}
					boxColors={chooseColors(1)}
					xAxisTitle={""}
					yAxisTitle={""}
					marginBottom={50}
					graphAvg={[parseFloat(boxPlotStats[0].mean)]}
					{...overrides}
				/>
			);
		case GraphType.HHIST:
			return (
				<HorizontalHistogram
					{...defaultVBGraphBounds}
					counts={counts}
					labels={labels as string[]}
					binBreakpoints={
						(histoBreakpoints as Record<string, number[]>)[title] ?? [0, 100]
					}
					barColor={defaultBarColor}
					binSpacing={5}
					{...overrides}
				/>
			);
		case GraphType.MAP:
			return (
				<Choropleth
					height={defaultMapBounds.height}
					width={defaultMapBounds.width}
					data={(() => {
						const map = new Map<string, number>();

						const m = counts.length;
						for (let i = 0; i < m; ++i) {
							map.set(labels[i] as string, counts[i]);
						}

						return map;
					})()}
				/>
			);
		case GraphType.TEXT_DISPLAY:
			return (
				<TextDisplay
					title={title}
					labels={labels as string[]}
					counts={counts}
				/>
			);
		case GraphType.COURSES_WITH_REVIEWS:
			switch (title) {
				case "Favourite elective course (no ATEs), and why?":
					return (
						<CourseWithReviewsDisplay
							coursesToShow={electives}
							icon={"/pixel_heart.png"}
						/>
					);
				case "Most useful core course?":
					return (
						<CourseWithReviewsDisplay
							coursesToShow={usefulCore}
							// early feedback said that people didnt understand the pokemon references
							// icon={"/gyrados.png"}
							pillColor={TasteDaRainbow.blue}
							bins={counts}
							labels={labels as number[]}
						/>
					);
				case "Least useful core course?":
					return (
						<CourseWithReviewsDisplay
							coursesToShow={notUsefulCore}
							// early feedback said that people didnt understand the pokemon references
							// icon={"/magikarp.png"}
							pillColor={TasteDaRainbow.orange}
							bins={counts}
							labels={labels as number[]}
						/>
					);
				default:
					return null;
			}
		case GraphType.WORD_CLOUD:
			return (
				<WordCloud
					data={labels.map((label, index) => ({
						text: String(label),
						count: counts[index],
					}))}
					title={title}
					{...overrides}
				/>
			);
		case GraphType.SCATTER_PLOT:
			//UNUSED
			return (
				<Scatterplot
					correlationCoeff={false}
					lobf={false}
					xMax={0}
					yMax={0}
					xMin={0}
					yMin={0}
					pointColor={""}
					data={(() => {
						const dataList = [];
						const m = counts.length;
						for (let i = 0; i < m; ++i) {
							dataList.push({
								xData: counts[i] as number,
								yData: labels[i] as number,
							});
						}
						return dataList;
					})()}
					{...defaultGraphBounds}
					{...overrides}
				/>
			);
		case GraphType.GROUPED_HBG:
			// Just say the first group thing owns the grouped graph
			let prefixHBG = "";
			let questionsHBG: string[] = [];
			let groupedLabelsHBG: string[] | number[] = [];
			switch (title) {
				case "Which drugs have you used?":
					prefixHBG = "Which drugs have you used?";
					groupedLabelsHBG = [
						"Alcohol",
						"Caffeine",
						"Nicotine and Tobacco",
						"Weed (THC)",
						"Adderall/Ritalin (unprescribed)",
						"Mushrooms",
						"LSD",
						"Cocaine",
					];
					questionsHBG = groupedLabelsHBG.map(
						(drug) => `${prefixHBG} [${drug}]`,
					);
					break;
				case "Which relationship/intimacy actions have you performed?":
					prefixHBG = "Which relationship/intimacy actions have you performed?";
					groupedLabelsHBG = [
						"Held hands romantically",
						"Been on a date",
						"Kissed someone romantically",
						"Been in a committed relationship",
						"Been in a long-distance relationship",
						"Been in a situationship",
						"Sent/received nudes",
						"Engaged in sexual intercourse",
						"Hooked up with someone",
						"Had a threesome",
					];
					questionsHBG = groupedLabelsHBG.map((act) => `${prefixHBG} [${act}]`);
					break;
				default:
					console.warn("No grouped HBG renderer found for question: ", title);
					return null;
			}
			const modifiedHBGGResults = makeDatasetRectangular(
				questionsHBG.map(
					(question) =>
						(allSurveyData as Record<string, SurveyResult>)[question],
				),
			);

			const pseudoHBGBounds = {
				...defaultGraphBounds,
				...overrides,
			};

			return (
				<HorizontalBarGroupGraph
					data={modifiedHBGGResults.data}
					groupLabels={groupedLabelsHBG}
					groupGap={10}
					barGap={2}
					barColors={chooseColors(modifiedHBGGResults.sortedLabels.length)}
					labelSize={10}
					tickSize={5}
					xAxisTitle={"Number of Respondents"}
					yAxisTitle={""}
					{...defaultGraphBounds}
					{...overrides}
				>
					<Legend
						x={pseudoHBGBounds.width - pseudoHBGBounds.marginRight}
						y={pseudoHBGBounds.marginTop}
						alignTo={"right"}
						direction={"desc"}
						colorIndicatorSize={10}
						textOffset={3}
						textSize={8}
						indicatorGap={3}
						backingPadding={5}
						backingStroke="#818d97"
						legendItems={modifiedHBGGResults.sortedLabels.map(
							(label, index) => ({
								label,
								color: chooseColors(modifiedHBGGResults.sortedLabels.length)[
									index
								],
							}),
						)}
						{...overrides?.["legend"]}
					/>
				</HorizontalBarGroupGraph>
			);
		case GraphType.GROUPED_VBG:
			let prefixVBG = "";
			let questionsVBG: SURVEY_QUESTION[] = [];
			let groupedLabelsVBG: string[] | number[] = [];
			switch (title) {
				case "How many hackathons did you attend in university?":
					prefixVBG = "How many hackathons did you attend in university? [";
					groupedLabelsVBG = TERMS;
					questionsVBG = groupedLabelsVBG.map(
						(term) => `${prefixVBG}${term}]`,
					) as SURVEY_QUESTION[];
					break;
				case "What were the 3 most important motivators in your full-time decision?":
					prefixVBG =
						"What were the 3 most important motivators in your full-time decision?";
					groupedLabelsVBG = [
						"Compensation",
						"Proximity to Friends",
						"Proximity to Family",
						"Proximity to Significant Other",
						"City choice",
						"Cost of Living",
						"Interest in Work",
						"Interest in Team",
						"Interest in Product",
						"Company Fit (WLB, Culture)",
						"Remote Work",
						"In-Person Work",
						"Vibes",
					];
					questionsVBG = groupedLabelsVBG.map(
						// Two spaces !!
						(reason) => `${prefixVBG}  [${reason}]`,
					) as SURVEY_QUESTION[];
					break;
				case "How many roommates did you have in each school term?":
					prefixVBG = "How many roommates did you have in each school term? [";
					groupedLabelsVBG = TERMS;
					questionsVBG = groupedLabelsVBG.map(
						(term) => `${prefixVBG}${term}]`,
					) as SURVEY_QUESTION[];
					break;
				default:
					console.warn("No grouped VBG renderer found for question: ", title);
					return null;
			}
			const modifiedVBGGResults = makeDatasetRectangular(
				questionsVBG.map((question) => allSurveyData[question]!),
			);

			const pseudoVBGBounds = {
				...defaultGraphBounds,
				...overrides,
			};

			const colorGradient = chooseColors(
				modifiedVBGGResults.sortedLabels.length,
				true,
			);

			return (
				<VerticalBarGroupGraph
					data={modifiedVBGGResults.data}
					groupLabels={groupedLabelsVBG}
					groupGap={12}
					barGap={2}
					barColors={colorGradient}
					labelSize={8}
					tickSize={5}
					xAxisTitle={""}
					yAxisTitle={"Number of Respondents"}
					{...defaultGraphBounds}
					{...overrides}
				>
					<Legend
						x={pseudoVBGBounds.width - pseudoVBGBounds.marginRight}
						y={pseudoVBGBounds.marginTop}
						alignTo={"right"}
						direction={"desc"}
						colorIndicatorSize={10}
						textOffset={3}
						textSize={8}
						indicatorGap={3}
						backingPadding={5}
						backingStroke="#818d97"
						legendItems={modifiedVBGGResults.sortedLabels.map(
							(label, index) => ({
								label,
								color: colorGradient[index],
							}),
						)}
						{...overrides?.["legend"]}
					/>
				</VerticalBarGroupGraph>
			);
		case GraphType.COLOUR_DISPLAY:
			return (
				<ColourDisplay
					favouriteColours={
						colourData as unknown as { [key: string]: ColourProps }[]
					}
					{...defaultGraphBounds}
					{...overrides}
				/>
			);
		case GraphType.EMOJI_DISPLAY:
			return (
				<EmojiDisplay
					favouriteEmojis={
						emojiData as unknown as { [key: string]: EmojiProps }[]
					}
					{...defaultGraphBounds}
					{...overrides}
				/>
			);
		case GraphType.PETS_DISPLAY:
			return (
				<PetsDisplay
					petsCount={petsData as unknown as { [key: string]: PetsProps }[]}
					{...defaultGraphBounds}
					{...overrides}
				/>
			);
		case GraphType.CUSTOM:
		default:
			// Really, we shouldn't even get here for custom plots but whatever
			return null;
	}
}

export function SurveySection(props: {
	title: SURVEY_QUESTION;
	displayGraphBelow?: boolean;
}) {
	const pdfMode = useContext(PDFMode);

	const { title } = props;
	// Get the value from the data JSON
	let dataEntry: SurveyResult = (
		allSurveyData as unknown as { [key: string]: SurveyResult }
	)[title];
	// Get get graph type for this question
	const graphType = SURVEY_GRAPH_MAPPINGS[title];
	// Get rendering overrides or description, if exist
	const overrides = SURVEY_OVERRIDES[title];
	const description = SURVEY_DESCRIPTIONS[title];

	const axisTitles = AXIS_TITLES[title];

	const [client, setClient] = useState(false);
	useEffect(() => setClient(true), []);

	if (!client) return null;

	// If we couldn't find a graph type or data entry, give up
	if (graphType === undefined || dataEntry === undefined) {
		// Unless it's some stupid grouped thingy
		// (We're trusting some other mechanism will gather the data for us)
		if (graphType === GraphType.CUSTOM) {
			dataEntry = {
				labels: [],
				counts: [],
				n: NaN,
			};
		} else if (
			graphType === GraphType.GROUPED_HBG ||
			graphType === GraphType.GROUPED_VBG
		) {
			function groupedQuestionToN(): number | undefined {
				switch (title) {
					case "How many roommates did you have in each school term?":
						return allSurveyData[
							"How many roommates did you have in each school term? [1A]"
						]?.n;
					case "How many Leetcode problems have you solved?":
						return allSurveyData[
							"How many Leetcode Easy problems have you solved?"
						]?.n;
					case "Which drugs have you used?":
						return allSurveyData["Which drugs have you used? [Alcohol]"]?.n;
					case "Which relationship/intimacy actions have you performed?":
						return allSurveyData[
							"Which relationship/intimacy actions have you performed? [Held hands romantically]"
						]?.n;
					case "How many hackathons did you attend in university?":
						return allSurveyData[
							"How many hackathons did you attend in university? [1A]"
						]?.n;
					case "What were the 3 most important motivators in your full-time decision?":
						return allSurveyData[
							"What were the 3 most important motivators in your full-time decision?  [Compensation]"
						]?.n;
				}
			}
			dataEntry = {
				labels: [],
				counts: [],
				n: groupedQuestionToN() ?? 0,
			};
		} else {
			console.warn(`<SurveySection/> giving up for question: ${title}`);
			return null;
		}
	}

	// At this point it should be safe to extract labels, counts, and the n-value
	const { labels, counts, n } = dataEntry;

	// Handle custom graphs separately
	if (graphType === GraphType.CUSTOM) {
		return (
			<CustomRenderer
				title={title}
				labels={labels}
				counts={counts}
				description={description}
				dataObject={dataEntry}
				overrides={overrides}
			/>
		);
	}

	if (
		graphType === GraphType.TEXT_DISPLAY ||
		graphType === GraphType.COURSES_WITH_REVIEWS
	) {
		return (
			<SurveyPartFWGraph
				title={title}
				description={description}
				graph={graphFromType(
					graphType,
					labels,
					counts,
					title,
					pdfMode,
					overrides,
				)}
			/>
		);
	}

	if (graphType === GraphType.TOGGLED_HBG) {
		if (
			title === "Opinions on List 1 ATEs" ||
			title === "Opinions on List 2 ATEs" ||
			title === "Opinions on List 3 ATEs"
		) {
			const ateOpinions: { [key: string]: SurveySubgraphResult[] } = (
				ateData as unknown as {
					[key: string]: { [key: string]: SurveySubgraphResult[] };
				}
			)[title];

			const numATEOpinions = Object.keys(ateOpinions).length;

			return (
				<SurveyPartFWGraph
					title={title}
					graph={
						<CourseEasyUsefulGraph
							{...defaultGraphBounds}
							opinions={ateOpinions}
							buttonColours={chooseColors(numATEOpinions, true)}
							barColours={chooseColors(numATEOpinions, true)}
							{...overrides}
						/>
					}
				/>
			);
		}

		const toggleData: { [key: string]: SurveySubgraphResult } = (
			otherToggleData as unknown as {
				[key: string]: { [key: string]: SurveySubgraphResult };
			}
		)[title];

		if (pdfMode) {
			return (
				<SurveyPartFWGraph
					title={title}
					description={description}
					n={0}
					graph={
						<ButtonToggleGraph
							{...defaultToggleHBGraphBounds}
							title={title}
							optionsToDataMap={toggleData}
							buttonColours={termColors}
							barColours={termColors}
							group={
								title === "Where was your co-op?" ? "coop_area" : undefined
							}
							{...overrides}
						/>
					}
				/>
			);
		} else {
			return (
				<SurveyPart
					title={title}
					description={description}
					n={0}
					graph={
						<ButtonToggleGraph
							{...defaultToggleHBGraphBounds}
							title={title}
							optionsToDataMap={toggleData}
							buttonColours={termColors}
							barColours={termColors}
							group={
								title === "Where was your co-op?" ? "coop_area" : undefined
							}
							{...overrides}
							{...axisTitles}
						/>
					}
				/>
			);
		}
	}

	if (graphType === GraphType.TOGGLED_WORD_CLOUD) {
		const toggleData: { [key: string]: SurveySubgraphResult } = (
			otherToggleData as unknown as {
				[key: string]: { [key: string]: SurveySubgraphResult };
			}
		)[title];

		return (
			<SurveyPartFWGraph
				title={title}
				description={description}
				n={0}
				graph={
					<ToggleWordCloud
						{...defultToggleWordcloudBounds}
						title={title}
						optionsToDataMap={toggleData}
						buttonColours={termColors}
						barColours={termColors}
						{...overrides}
					/>
				}
			/>
		);
	}

	if (title in WIDTH_OVERRIDES) {
		switch (WIDTH_OVERRIDES[title]) {
			case DisplayWidth.FULL_WIDTH:
				return (
					<SurveyPartFWGraph
						title={title}
						n={n}
						description={description}
						graph={graphFromType(
							graphType,
							labels,
							counts,
							title,
							pdfMode,
							overrides,
						)}
					/>
				);
			case DisplayWidth.HALF_WIDTH:
				return (
					<SurveyPart
						title={title}
						n={n}
						description={description}
						graph={graphFromType(graphType, labels, counts, title, pdfMode, {
							...overrides,
							...axisTitles,
						})}
						displayGraphBelow={true}
					/>
				);
		}
	}

	// SurveyPart renders the text and graph in separate columns (for wide screens).
	// graphFromType does all of the heavy lifting to render the graph.
	return (
		<SurveyPart
			title={title}
			n={n}
			description={description}
			graph={graphFromType(graphType, labels, counts, title, pdfMode, {
				...overrides,
				...axisTitles,
			})}
		/>
	);
}

export default function AllGraphs() {
	return (
		<div>
			{SURVEY_SECTIONS.map((section, ind) => (
				<Element
					key={section}
					style={{
						backgroundColor:
							ind % 2 === 0
								? TasteDaRainbow.reallyDarkPurple
								: TasteDaRainbow.reallyDarkBlue,
					}}
					className={styles.surveySectionPadding}
					name={section}
				>
					<span
						className={styles.title}
						// href={`#${convertToLinkFormat(section)}`}
						id={convertToLinkFormat(section)}
					>
						{section}
					</span>
					{surveysBySection[section].map((title) => {
						if (isSubSection(title)) {
							return (
								<div key={`subsection-${title}`} className={styles.subsection}>
									<h2 className={styles.subtitle} style={{ paddingTop: 0 }}>
										{title}
									</h2>
									<span
										style={{
											fontFamily: "var(--font-athiti)",
											fontSize: "18px",
										}}
									>
										{SURVEY_DESCRIPTIONS[title]}
									</span>
								</div>
							);
						} else if (Object.values(HALF_WIDTH_PAIRS).includes(title)) {
							// If the title is a right half of a pair, skip it since it's already rendered
							// on the left half
							return null;
						} else if (title in HALF_WIDTH_PAIRS) {
							const rightHalfTitle = HALF_WIDTH_PAIRS[title] as SURVEY_QUESTION;
							return (
								<div key={title + " " + rightHalfTitle}>
									{HALF_WIDTH_TITLES[title] && (
										<h2 className={styles.subtitle}>
											{HALF_WIDTH_TITLES[title]}
										</h2>
									)}
									<div className={styles.halfWidthContainer}>
										<SurveySection title={title} />
										<SurveySection title={rightHalfTitle} />
									</div>
								</div>
							);
						} else {
							return (
								// Safe cast, since title could not be type SUB_SECTION
								<SurveySection key={title} title={title} />
							);
						}
					})}
				</Element>
			))}
		</div>
	);
}

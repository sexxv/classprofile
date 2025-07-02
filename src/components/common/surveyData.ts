import {
	COMPLETE_SECTION_LOOKUP,
	SUB_SECTIONS,
	SUB_SECTIONS_TO_SECTION,
	SURVEY_SECTIONS,
} from "../mappings/QuestionsToSections";

import surveyData1 from "@/data/cleaned/survey1.json";
import surveyData2 from "@/data/cleaned/survey2.json";
import surveyData3 from "@/data/cleaned/survey3.json";
import switchOutData from "@/data/cleaned/switch_out.json";
import seCestData from "@/data/secest.json";
import { GROUPED_QUESTIONS, SURVEY_QUESTION } from "../mappings/QuestionsList";
import { SURVEY_GRAPH_MAPPINGS } from "../mappings/QuestionsToGraphs";

export type SurveyResult = {
	labels: number[] | string[];
	counts: number[];
	n: number;
};

export type SurveySubgraphResult = SurveyResult & { title?: string };

/**
 * Literally just all survey data collected into one place
 */
export const allSurveyData: {
	[key in SURVEY_QUESTION]?: SurveyResult;
} & {
	[key in SUB_SECTIONS]?: {
		readonly order: number;
		readonly section: SURVEY_SECTIONS;
	};
} = {
	...surveyData1,
	...surveyData2,
	...surveyData3,
	...seCestData,
	...switchOutData,
	...SUB_SECTIONS_TO_SECTION,
};

/**
 * A mapping of sections to their questions, in order.
 */
export const surveysBySection: {
	[key in SURVEY_SECTIONS]: (SURVEY_QUESTION | SUB_SECTIONS)[];
} = {} as { [key in SURVEY_SECTIONS]: (SURVEY_QUESTION | SUB_SECTIONS)[] };

// This is all just to fill surveysBySection
for (const section of SURVEY_SECTIONS) {
	surveysBySection[section] = [];
}

function isQuestionSectioned(
	question: string,
): question is keyof typeof COMPLETE_SECTION_LOOKUP {
	return question in COMPLETE_SECTION_LOOKUP;
}

const PLAUSIBLY_USABLE_TITLES = Object.keys(allSurveyData);
PLAUSIBLY_USABLE_TITLES.push(...GROUPED_QUESTIONS);

const unmappedQuestions = [];
for (const question of PLAUSIBLY_USABLE_TITLES) {
	if (!isQuestionSectioned(question)) {
		// Skip questions that don't have a section mapping
		//TODO: fix this :thumbs-up:
		unmappedQuestions.push(question);
		continue;
	}

	const curSection = COMPLETE_SECTION_LOOKUP[question]!.section;

	if (curSection !== "SKIP") {
		surveysBySection[curSection].push(question);
	}
}
// Your one of many local console logs to remind you about what's unmapped
console.log("Questions without assigned sections (ignored skipped questions):");
console.table(unmappedQuestions);

const questionsWithoutGraphs = [];
for (const question of PLAUSIBLY_USABLE_TITLES) {
	if (!(question in SURVEY_GRAPH_MAPPINGS)) {
		// TypeScript should really know that keys will be ok but I give up, I'm casting
		if (
			COMPLETE_SECTION_LOOKUP[question as SURVEY_QUESTION | SUB_SECTIONS]
				?.section === "SKIP" ||
			question in SUB_SECTIONS_TO_SECTION
		) {
			continue;
		}
		questionsWithoutGraphs.push(question);
	}
}
console.log(
	"Questions without assigned graphs (ignoring skipped questions and subsections):",
);
console.table(questionsWithoutGraphs);

for (const section of SURVEY_SECTIONS) {
	surveysBySection[section].sort((a, b) => {
		const aSubSection = COMPLETE_SECTION_LOOKUP[a]?.subSection
			? (COMPLETE_SECTION_LOOKUP[COMPLETE_SECTION_LOOKUP[a].subSection]
					?.order ?? 0)
			: 0;
		const bSubSection = COMPLETE_SECTION_LOOKUP[b]?.subSection
			? (COMPLETE_SECTION_LOOKUP[COMPLETE_SECTION_LOOKUP[b].subSection]
					?.order ?? 0)
			: 0;

		const aIndex =
			(COMPLETE_SECTION_LOOKUP[a]?.order ?? Infinity) + aSubSection;
		const bIndex =
			(COMPLETE_SECTION_LOOKUP[b]?.order ?? Infinity) + bSubSection;

		return aIndex - bIndex;
	});
}

export function formatCourseCode(courseCode: string): string {
	const spaceBeforeFirstNumber = courseCode.replace(/(\d)/, " $1");

	if (spaceBeforeFirstNumber === courseCode) {
		console.warn(
			"something went wrong with course code formatting",
			courseCode,
		);
	}

	return spaceBeforeFirstNumber;
}

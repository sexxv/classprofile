import React from "react";
import { AllmanExample, KAndRExample } from "../BracketExamples";
import { Emoji } from "../Emoji";
import tableStyles from "../Tables.module.css";
import { formatCourseCode } from "../common/surveyData";
import { Footnotes } from "../layout/Footnotes";
import { InlineOL, InlineUL } from "../layout/InlineList";
import surveyComponentStyles from "../layout/SurveyComponents.module.css";
import { COURSES_TO_NAMES } from "./CoursesMappings";
import styles from "./QuestionDescriptions.module.css";
import { SURVEY_QUESTION } from "./QuestionsList";
import { SUB_SECTIONS } from "./QuestionsToSections";

enum Sequence {
	STREAM_8 = "Stream 8",
	STREAM_8X = "Stream 8X",
	STREAM_8Y = "Stream 8Y",
}

function fourthYearSequence(stream: Sequence) {
	switch (stream) {
		case Sequence.STREAM_8:
			return (
				<>
					<th>Co-op</th>
					<th>4A</th>
					<th>Co-op</th>
				</>
			);
		case Sequence.STREAM_8X:
			return (
				<>
					<th>Co-op</th>
					<th>Co-op</th>
					<th>4A</th>
				</>
			);
		case Sequence.STREAM_8Y:
			return (
				<>
					<th>4A</th>
					<th>Co-op</th>
					<th>Co-op</th>
				</>
			);
	}
}

export const TERMS: string[] = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B"];

const coopFees = {
	"1A": 734,
	"1B": 734,
	"2A": 739,
	"2B": 745,
	"3A": 745,
	"3B": 756,
	"4A": 786,
	"4B": 786,
};

function courseInfoForFootnotes(courseCode: string): React.ReactNode {
	return (
		<>
			{formatCourseCode(courseCode)}:{" "}
			{linkWrapper(
				COURSES_TO_NAMES[courseCode],
				"https://uwflow.com/course/" + courseCode.toLowerCase(),
				"View course on UW Flow",
			)}
		</>
	);
}

function courseInfoForFootnotesList(courseCodes: string[]): React.ReactNode {
	return (
		<>
			About the courses mentioned above:
			<br />
			<span style={{ paddingLeft: "14px", display: "inline-block" }}>
				{courseCodes.map((courseCode, index) => (
					<span key={courseCode + "-" + index}>
						{courseInfoForFootnotes(courseCode)}
						<br />
					</span>
				))}
			</span>
		</>
	);
}

export function linkWrapper(
	text: string,
	href: string,
	title?: string,
): React.ReactNode {
	return (
		<a
			href={href}
			rel="noreferrer"
			className={surveyComponentStyles.hoverLink}
			target="_blank"
			title={title}
		>
			{text}
		</a>
	);
}

export function percentageHelper(val: number, total: number): string {
	return `${((val / total) * 100).toFixed(0)}%`;
}

/**
 * Mapping of questions to descriptions
 */
export const SURVEY_DESCRIPTIONS: Partial<
	Record<SURVEY_QUESTION | SUB_SECTIONS, React.ReactNode>
> = {
	"What year were you born?": (
		<>{percentageHelper(68, 75)} of respondents were born in 2002.</>
	),
	"What racial or ethnic groups describe you?": (
		<>Most respondents are asian.</>
	),
	"Are you an out-of-province student?": <></>,
	"Are you an international student?": <></>,
	"Are you multilingual?": (
		<>{percentageHelper(65, 78)} of respondents speak multiple languages!</>
	),
	"What languages do you speak?": (
		<>
			Most respondents speak Chinese. Notably French is the second co-official
			language of Canada, along with English.
			<br />
			<br />
			<em>Respondents were asked not to include English in their answers.</em>
		</>
	),
	"What languages do you speak at home?": (
		<>
			Most respondents speak English at home. The second most common response
			was Chinese.
		</>
	),
	"Where is your family's home located?": (
		<>
			13 respondents were from Toronto! In fact, 33 are from the GTA area,
			making up {percentageHelper(33, 74)} of respondents.
			<br />
			<br />
			Calgary was the next most common city, with 7 respondents.
		</>
	),
	"How many siblings do you have?": (
		<>{percentageHelper(51, 78)} of respondents had 1 sibling.</>
	),
	"Are you the eldest, youngest, or in the middle?": <></>,
	"Have any of them also studied at Waterloo?": <></>,
	"What is the highest level of education of your parents?": (
		<>
			All respondents reported that their parents had completed high school,
			with most parents finishing a Masters degree.
		</>
	),
	"How many hackathons did you attend in high school?": (
		<>
			A hackathon is a problem-solving event (most commonly run for 24-48 hours)
			where teams come together to build a new project, usually involving
			software development <s>and pulling all-nighters</s>.
			<br />
			<br />
			{percentageHelper(45, 78)} of respondents have never attended a hackathon
			in high school.
		</>
	),
	"First programming language?": (
		<>{percentageHelper(37, 79)} respondents learned Java first ☕. </>
	),
	"Did you attend CEGEP?": (
		<>
			One respondent reported attending CEGEP for Computer Science.
			<br />
			<br />
			More information on CEGEP credit transfers can be found{" "}
			{linkWrapper(
				"here",
				"https://uwaterloo.ca/future-students/transfer-students/cegep-transfer-credits",
			)}
			.
		</>
	),
	"Did you have any job experience relevant to SE prior to starting 1A?": (
		<>
			Only {percentageHelper(19, 79)} of respondents had SE-related job
			experience prior to the start of university.
		</>
	),
	"What other job experience did you have prior to starting 1A?": (
		<>
			The most common job respondents had before university that wasn&apos;t
			SE-related was being a cashier. Tutoring/teaching was also common.
		</>
	),
	"What other universities did you apply to?": (
		<>
			The University of Toronto was the most popular university that SE25
			respondents applied to (other than Waterloo). Out of the top 6 most common
			universities on this list, 5 are located in Ontario, with UBC being in
			British Columbia.
			<br />
			<br />
			Many SE25 respondents had also applied to American universities, such as
			MIT, Stanford, UC Berkeley and Harvard.
		</>
	),
	"Out of all of the university programs you applied to, how would you rank Waterloo SE?":
		(
			<>
				Waterloo SE was the first program choice of {percentageHelper(57, 78)}{" "}
				of respondents!
			</>
		),
	"Which extracurriculars were you part of in high school?": (
		<>
			{linkWrapper("DECA", "https://www.deca.org/")}
			, primarily known running an annual business case competition, was the
			most common extracurricular.
			<br />
			<br />
			{linkWrapper("SHAD", "https://www.shad.ca/")}
			, an annual summer program with a focus on STEM was also common.
			<br />
			<br />
			Unsurprisingly, highschool robotics via{" "}
			{linkWrapper(
				"FIRST",
				"https://www.firstinspires.org/robotics/frc",
			)} and {linkWrapper("VEX", "https://www.vexrobotics.com/")} were also
			common for Software Engineering students in highschool.
		</>
	),
	"How many years of programming experience did you have prior to starting 1A?":
		(
			<>
				Programming experience is a mandatory requirement to be admitted to SE (
				{linkWrapper(
					"source",
					"https://uwaterloo.ca/engineering/future-students/applying/admission-requirements#programming",
				)}
				).
				<br />
				<br />
				{percentageHelper(45, 78)} of respondents had over 2 years of
				programming experience prior to SE.
			</>
		),
	"Did you participate in any high school enrichment programs?": (
		<>
			The most popular high school enrichment program was AP. Not shown are 21
			survey respondents who did not indicate an enrichment program.
		</>
	),
	"How many people did you know from high school that also went to Waterloo?": (
		<></>
	),
	"Did you take a gap year between high school and university?": <></>,
	"If you took a gap year, why did you choose to take one?": null,
	"What was your high school adjustment factor?": (
		<>
			<em>
				UW engineering programs subtract the adjustment factor from a
				student&apos;s high school average when considering admission.
				Respondents were asked to reference{" "}
				{linkWrapper(
					"this Waterloo Adjustment Factors PDF",
					"https://github.com/jdabtieu/Waterloo-Adjustment-Factors/blob/main/AdjFactors2023.pdf",
				)}{" "}
				from 2023.{" "}
			</em>
			<br />
			<br />
			The most common adjustment factor was 15.9, which was the default for
			Ontario secondary schools in 2020 admissions.
		</>
	),
	"What was your high school admissions average?": (
		<>
			Unsurprisingly, most SE25 reported high school admission averages in the
			high 90s, aligning with the{" "}
			{linkWrapper(
				"Road to Engineering report from 2020",
				"https://theroadtoengineering.com/2020/09/30/chances-of-admission-for-fall-2021/",
			)}
			.<br />
			<br />
			The average high school admission average of respondents was 97.05.
		</>
	),
	"Did you play any sports in high school?": (
		<>
			Badminton was the most common sport respondents played in high school{" "}
			<Emoji>🏸</Emoji>.
		</>
	),
	"Have you ever considered dropping out?": (
		<>
			{percentageHelper(9, 79)} of respondents have considered dropping out of
			university.
		</>
	),
	"Have you ever considered switching out of SE? If so, to which program/school?":
		(
			<>
				{percentageHelper(45, 47)} of respondents who considered switching out
				of SE would have switched to CS. Two respondents considered switching to
				programs at different universities.{" "}
			</>
		),
	"If you had to start again, what school/program would you enrol in?": (
		<>
			Pretend like it&apos;s the first time... <Emoji>⏱️</Emoji>
			<br />
			<br />
			Most students would run it back, and choose Waterloo SE as their undergrad
			degree.
		</>
	),
	"Did you do any options as part of your degree?": (
		<>
			Options are intended to provide a path to expand your degree and are a
			specified combination of courses that provide a secondary emphasis in
			another subject or a career-oriented area.
			<br />
			<br />
			The options list for engineering can be found{" "}
			{linkWrapper(
				"here",
				"https://uwaterloo.ca/engineering/undergraduate-students/degree-enhancement/options",
			)}
			{". "} Only one respondent reported doing an option, which was AI.
		</>
	),
	"Did you do any specializations as part of your degree?": (
		<>
			Specializations are intended to formally recognize a focused selection of
			elective courses within Software Engineering.
			<br />
			<br />
			Out of the 11 respondents that chose to do a specialization, 9 (
			{percentageHelper(9, 11)}
			) chose the Human Computer Interaction (HCI) specialization.
			<br />
			<br />
			There are four possible specializations for SE -{" "}
			{linkWrapper(
				"Artificial Intelligence (AI)",
				"https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/view/67a21e551d8a39b379beac1e",
			)}
			,{" "}
			{linkWrapper(
				"Business",
				"https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/view/66e869e8fbd7ee664e8e145c",
			)}
			,{" "}
			{linkWrapper(
				"Computational Fine Art",
				"https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/view/6781738b452276fb6c2df9d5",
			)}
			, and{" "}
			{linkWrapper(
				"Human Computer-Interaction (HCI)",
				"https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/view/67817485452276fb6c2dfe0a",
			)}
			.
		</>
	),
	"Did you minor in anything as part of your degree?": (
		<>
			Minors are similar to options, but tend to require more courses (usually
			8-10).
			<br />
			<br />
			The most common minor for survey respondents was Combinatorics and
			Optimization. The complete list of minors at Waterloo can be found{" "}
			{linkWrapper(
				"here",
				"https://uwaterloo.ca/future-students/programs/minors",
			)}
			.
		</>
	),
	"Did you train in a sport competitively during your undergrad?": (
		<>2 respondents reported training competitively in badminton 🏸.</>
	),
	"On average, when do you go to sleep?": (
		<>
			2AM, here we are... <br />
			<br />
			SE25 reported going to sleep, on average, in between 10PM and 5AM, with
			2AM being the most common response.
		</>
	),
	"Did you go on exchange?": (
		<>
			{percentageHelper(23, 79)} of respondents reported going on exchange!
			<br />
			<br />
			<em>
				The rest of this survey section was only shown to respondents who went
				on exchange.
			</em>
		</>
	),
	"Which term did you go on exchange?": (
		<>3B was the most popular term for exchange! One must wonder why...</>
	),
	"Which university did you go to on exchange?": (
		<>
			The most popular country for exchange among respondents was Denmark (at
			DTU) 🇩🇰, followed by Singapore (at NUS/SUTD) 🇸🇬, with Spain (UC3M) 🇪🇸 and
			the UK (UCL/University of Liverpool) 🇬🇧 being tied for 3rd.
			<br />
			<br />
			Difficult to see on the map, but there were two respondents who went on
			exchange in Hong Kong - one at HKU and one at HKUST.
		</>
	),
	"How high was your workload during exchange?": (
		<>
			{percentageHelper(19, 23)} of respondents reported having a significantly
			lower courseload on exchange compared to when at Waterloo.
		</>
	),
	"How stressed were you during exchange?": (
		<>
			{percentageHelper(19, 23)} of respondents reported to being significantly
			less stressed on exchange compared to when at Waterloo.
		</>
	),
	"Favourite part of going on exchange?": null,
	"Hardest thing about going on exchange?": null,
	"Most valuable thing you took away from exchange?": null,
	"Stream 8 vs 8x vs 8y": (
		<>
			{linkWrapper(
				"Streams",
				"https://uwaterloo.ca/engineering/undergraduate-students/co-op-experience/co-op-study-sequences",
			)}{" "}
			refer to study/work sequences that UW Engineering students follow for
			their degree. Software Engineering is a Stream 8 program, and Stream 8 was
			formerly the primary stream, with 8x being introduced for SE24. <br />
			<table className={tableStyles.termTable}>
				<tbody>
					<tr>
						<th>Sequence</th>
						<th>Fall</th>
						<th>Winter</th>
						<th>Spring</th>
						<th>Fall</th>
						<th>Winter</th>
						<th>Spring</th>
						<th>Fall</th>
						<th>Winter</th>
						<th>Spring</th>
						<th>Fall</th>
						<th>Winter</th>
						<th>Spring</th>
						<th>Fall</th>
						<th>Winter</th>
					</tr>
					<tr>
						<th>Year of term for SE25</th>
						<td>2020</td>
						<td>2021</td>
						<td>2021</td>
						<td>2021</td>
						<td>2022</td>
						<td>2022</td>
						<td>2022</td>
						<td>2023</td>
						<td>2023</td>
						<td>2023</td>
						<td>2024</td>
						<td>2024</td>
						<td>2024</td>
						<td>2025</td>
					</tr>
					<tr>
						<th>Stream 8 (discontinued)</th>
						<td>1A</td>
						<td>1B</td>
						<td>Co-op</td>
						<td>2A</td>
						<td>Co-op</td>
						<td>2B</td>
						<td>Co-op</td>
						<td>3A</td>
						<td>Co-op</td>
						<td>3B</td>
						{fourthYearSequence(Sequence.STREAM_8)}
						<td>4B</td>
					</tr>
					<tr>
						<th>Stream 8x</th>
						<td>1A</td>
						<td>1B</td>
						<td>Co-op</td>
						<td>2A</td>
						<td>Co-op</td>
						<td>2B</td>
						<td>Co-op</td>
						<td>3A</td>
						<td>Co-op</td>
						<td>3B</td>
						{fourthYearSequence(Sequence.STREAM_8X)}
						<td>4B</td>
					</tr>
					<tr>
						<th>Stream 8y</th>
						<td>1A</td>
						<td>1B</td>
						<td>Co-op</td>
						<td>2A</td>
						<td>Co-op</td>
						<td>2B</td>
						<td>Co-op</td>
						<td>3A</td>
						<td>Co-op</td>
						<td>3B</td>
						{fourthYearSequence(Sequence.STREAM_8Y)}
						<td>4B</td>
					</tr>
				</tbody>
			</table>
			Winter terms are from January to April, Spring terms are from May to
			August, Fall terms are from September to December.{" "}
			{linkWrapper(
				"Source",
				"https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/H1zle10Cs3?q=software&&limit=20&skip=0",
			)}
			<br /> <br />
			Most of SE25 elected to take Stream 8x over Stream 8, likely to benefit
			from the fact that there are more co-op openings as American universities
			have the summer off. Stream 8y was not an official option, and could only
			done if the students specifically reached out to SE department.
			<br />
			<br />
			Stream 8x has now become the primary stream for SE, with 8y being an
			official secondary option and 8 being discontinued.
		</>
	),
	"What language do you use for programming interviews?": (
		<>
			Mostly Pythons <Emoji>🐍</Emoji>
		</>
	),
	"Have you ever been late to a co-op interview?": <>Better late than...</>,
	"Have you ever missed a co-op interview?": <>...never?</>,
	"Any fun interview stories?": null,
	"How did you find your co-op?": (
		<>
			WaterlooWorks is a job board exclusively for students at the University of
			Waterloo. It was frequently used by SE25 students to find co-ops,
			especially in earlier co-op terms.
			<br />
			<br />
			In later terms, more respondents tended to find co-ops using external
			applications. Some resources for finding internships are the{" "}
			{linkWrapper(
				"Summer Tech Internships by Pitt CSC & Simplify Github list",
				"https://github.com/SimplifyJobs/Summer2025-Internships",
			)}{" "}
			and{" "}
			{linkWrapper(
				"levels.fyi/internships",
				"https://www.levels.fyi/internships/",
			)}
			. This class profile is not affiliated with either of these resources.
		</>
	),
	"What was your co-op role?": (
		<>
			Respondents had a wide-variety of co-op roles!
			<br />
			<br />
			Full-stack development was the most common role overall! It was the most
			common each co-op term except for the last, where back-end development
			overtook it.
		</>
	),
	"What company did you work at?": (
		<>
			At least 197 companies hired an SE25 student! Cohere and PlayStation were
			the only two companies with at least one SE25 respondent in all 6 co-ops.{" "}
			<br />
			<br />
			The largest concentration of SE25 students working at one company was X
			(Twitter), which was where 9 respondents spent their 6th co-op. This also
			meant X (Twitter) had the most overall SE25 co-op students at 16, followed
			by Databricks and Faire at 9 each.
		</>
	),
	"How many employees worked at your company?": (
		<>
			<em>
				This data was manually scraped to the best of our abilities based on the
				companies submitted.
			</em>{" "}
			Startup <em>and</em> Stealth Startup{" "}
			<em>were intentionally excluded from this graph.</em>
			<br />
			<br />
			Respondents worked at companies of all sizes. In earlier terms many worked
			at smaller companies, and in later terms larger companies were more
			common.
		</>
	),
	"Which industry was your co-op employer in?": (
		<>
			<em>
				This data was manually scraped to the best of our abilities based on the
				companies submitted.
			</em>
			<br />
			<br />
			Most respondents worked at SaaS (Software as a Service) companies. The
			second most common company industry was Financial Services.
		</>
	),
	"What was your hourly co-op salary?": (
		<>
			The USD to CAD conversion rate is favourable and internship salaries in
			the USA generally pay more than the ones in Canada (accounting for a
			higher cost of living). SE students most commonly interned in the USA in
			later co-ops. Note that unemployment was not included in this graph.{" "}
			<br />
			<br />
			Additionally, there are many public resources for internship/co-op
			salaries using crowd-sourced data, such as the{" "}
			{linkWrapper(
				"Waterloo Co-op Salaries Spreadsheet",
				"https://docs.google.com/spreadsheets/d/1OEDRTAalRsyD1iAO5fkp_8HUJUxbYTavotHhwX0AwBU/edit?gid=0#gid=0",
			)}{" "}
			from the r/uwaterloo subreddit, and{" "}
			{linkWrapper(
				"levels.fyi/internships",
				"https://www.levels.fyi/internships/",
			)}
			. This class profile is not affiliated with either of these resources.
		</>
	),
	"What programming languages did you use at your co-op?": (
		<>
			JavaScript was the most common programming language used in first co-op,
			being overtaken by Python from second co-op onward.
		</>
	),
	"Where was your co-op?": (
		<>
			By city, remote co-ops were most common until Co-op 6, when San Francisco
			became the most common co-op city.
			<br />
			<br />
			Fourth co-op was the first to have an equal number of respondents working
			in Canada and the USA. From there, the USA became the most common co-op
			country.
		</>
	),
	"What would you rate your co-op experience?": (
		<>
			<em>1 is lowest, 10 is highest.</em>
			<br />
			<br />
			Respondents generally enjoyed later co-op terms more than earlier terms.
			<br />
			<br />
			There could be many reasons for this - some could be that earlier co-op
			terms were likely remote due to COVID, compensation was higher in later
			co-ops, or respondents were experimental during earlier co-ops and found
			what they enjoyed later on.
		</>
	),
	"Favourite overall co-op city?": (
		<>
			Toronto was the winning favourite co-op city with{" "}
			{percentageHelper(16, 58)} of respondents, with New York as the runner-up
			at {percentageHelper(15, 58)}.
			<br />
			<br />
			By country, USA was the most popular ({percentageHelper(33, 58)}),
			followed by Canada ({percentageHelper(22, 58)}).
		</>
	),
	"Anything else co-op related you'd like to add?": null,
	"Favourite colour (as a hex code)?": (
		<>
			If you average out the colours by taking the weighted average of the R, G,
			and B hex values, you get a{" "}
			<p
				style={{
					backgroundColor: "#90828f",
					fontWeight: "bold",
					display: "inline",
					padding: "0px 3px",
				}}
			>
				dusty mauve {"(#90828f)"}.
			</p>
		</>
	),
	"What social media/messaging apps do you use?": (
		<>
			Discord was the most common app used. Fun fact, the SE25 Discord server
			currently has over 600+ members!
			<br />
			<small>
				<small style={{ color: "lightgray" }}>
					Wait how many SE25&apos;s were there again?
				</small>
			</small>
		</>
	),
	"Favourite Emoji?": (
		<>
			There was a 4-way tie between <Emoji>😎</Emoji>, <Emoji>💀</Emoji>,{" "}
			<Emoji>🫠</Emoji> and <Emoji>😭</Emoji>!
		</>
	),
	"What pets do you have?": (
		<>SE25 have pets! Cats were the most common pet, followed by dogs.</>
	),
	"Which OS do you use for schoolwork?": (
		<>
			<em>
				This question had 2 pre-filled options (Windows and MacOS) and one open
				option. We included a note in the description &quot;If you use Linux and
				want to specify your distro, please write it in the Other: option.&quot;
			</em>
			<br />
			<br />
			MacOS was the most common OS used for schoolwork! This may have been
			different in earlier terms.
		</>
	),
	"What is your daily browser?": (
		<>
			{percentageHelper(50, 77)} of respondents were Google Chrome enjoyers.
			Notably there were also quite a few adopters of{" "}
			{linkWrapper("Arc", "https://arc.net/")}, a relatively new browser
			released in 2023 (that has since stopped being actively developed).
		</>
	),

	"How many volunteer hours did you complete in high school?": (
		<>
			Notably, high schools in Ontario have a mandatory 40 volunteering hours in
			order for students to receive their diplomas (
			{linkWrapper(
				"source",
				"https://www.ontario.ca/page/get-your-high-school-volunteer-hours",
			)}
			). Due to COVID-19, this requirement was reduced to 20 for the 2020 high
			school graduating class, but many students likely completed their hours
			before this was in effect.
		</>
	),
	"Why did you choose Waterloo SE?": null,
	"What is your gender?": (
		<>
			{percentageHelper(19, 79)} of respondents identify as women. <br />
			<br />
			There are many on-campus communities that support the success of women in
			computer science and engineering at UW, such as{" "}
			{linkWrapper(
				"GeMS (Gender Minorities in Software Engineering)",
				"https://www.instagram.com/uwaterloogems/",
			)}
			,{" "}
			{linkWrapper(
				"WiCS (Women in CS)",
				"https://www.instagram.com/uwaterloowics/",
			)}
			, and{" "}
			{linkWrapper(
				"WiE (Women in Engineering)",
				"https://www.instagram.com/uwaterloowie/",
			)}
			.
			<br />
			<br />
			Some additional commentary on women in UW Software Engineering based on
			public data: 28 women were enrolled in the SE25 cohort in first-year,
			making up 19.2% of the cohort based on engineering faculty statistics -{" "}
			{linkWrapper(
				"source",
				"https://uwaterloo.ca/engineering/faculty-engineering-statistics-2020",
			)}
			. In 2023 (the most recent report), the first-year SE cohort had 46 women,
			making up 38.9% of the SE28 cohort -{" "}
			{linkWrapper(
				"source",
				"https://uwaterloo.ca/engineering/faculty-engineering-statistics-2023",
			)}
			. Note these statistics are from first-year and do not account for those
			who switched in or out of the cohort. <br />
			<br />
		</>
	),
	"What was your parents' total income at the time that you were admitted into university?":
		(
			<>
				The majority of respondents ({percentageHelper(36, 58)}) reported their
				parents&apos; total income to be at or above $100k in 2020. No
				respondent reported their parents making 350k+ per year.
				<br />
				<br />
				For reference, the median Canadian couple family income in 2020 was
				$104,350 (
				{linkWrapper(
					"source",
					"https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=1110001201",
				)}
				).
			</>
		),
	"How many roommates did you have in each school term? [1A]": <></>,
	"How many roommates did you have in each school term? [1B]": <></>,
	"How many roommates did you have in each school term? [2A]": <></>,
	"How many roommates did you have in each school term? [2B]": <></>,
	"How many roommates did you have in each school term? [3A]": <></>,
	"How many roommates did you have in each school term? [3B]": <></>,
	"How many roommates did you have in each school term? [4A]": <></>,
	"How many roommates did you have in each school term? [4B]": <></>,
	"Where did you live during your school terms?": (
		<>
			<p>
				Another graph that gets skewed by the COVID pandemic! What&apos;s more
				surprising is the fact that a few students were on campus during first
				year, even though courses wouldn&apos;t have in-person components until
				2A.
			</p>
			<br />
			<p>
				There are not many housing changes between 4A and 4B - this is likely
				because most of the SE program opted for Stream 8x, where 4A and 4B are
				back-to-back Fall 2024 and Winter 2025, so respondents likely signed
				year-long leases and did not move.
			</p>

			<br />
			<br />
			<Footnotes>
				<p>1. Society 145 only opens from 3A onward.</p>
			</Footnotes>
		</>
	),
	"If you have taken an academic course during a co-op term, when?": (
		<>
			{/* idk if there's a rule against core courses on co-op 
				or if the DRNA thing is important, 
				or if we should mention that it costs more money*/}
		</>
	),
	"If you have taken an academic course during a co-op term, why?": null,
	"If you have overloaded a term, when?": (
		<>
			Overloading refers to taking more than a full course load during an
			academic term. The typical UW SE term has 5-6 courses, so overloading
			means going beyond that.
			<br />
			<br />
			Most respondents that chose to overload did so in 3A, followed by 4A.{" "}
			<br />
			<br />
			2B was the least common term that respondents overloaded. 2B was also the
			term most respondents found hardest.
		</>
	),
	"If you have overloaded, which course(s) did you overload, and did you complete the course(s)?":
		<></>,
	"What device do you most frequently use to take notes?": (
		<>
			Tablet devices were overall more popular for note-taking compared to
			laptops.{" "}
		</>
	),
	"What note-taking software do you use?": (
		<>
			{linkWrapper("Notion", "https://www.notion.com/")} was the most commonly
			used note-taking software, followed by{" "}
			{linkWrapper("Goodnotes", "https://www.goodnotes.com/")}.
		</>
	),
	"Which List 1 ATE did you take?": (
		<>
			<p>List 1 ATEs are courses from the Computer Science (CS) department.</p>
			<br />
			<p>
				The most common List 1 ATEs were CS 451, followed by CS 370. Notably CS
				370 satisfies the prerequisite requirement for some other List 1 ATEs
				such as CS 484, CS 488 and CS 479.
			</p>
			<br />
			<Footnotes>
				<p>
					1.{" "}
					{courseInfoForFootnotesList([
						"CS451",
						"CS370",
						"CS484",
						"CS488",
						"CS479",
					])}
				</p>
			</Footnotes>
		</>
	),
	"Opinions on List 1 ATEs": <></>,
	"Which List 2 ATE did you take?": (
		<>
			<p>
				List 2 ATEs are courses from the Electrical and Computer Engineering
				(ECE) department. The most common List 2 ATE by far was ECE 459.
			</p>
			<Footnotes>
				<p>1. {courseInfoForFootnotesList(["ECE459"])}</p>
			</Footnotes>
		</>
	),
	"Opinions on List 2 ATEs": <></>,
	"Which List 3 ATE did you take?": (
		<>
			List 3 contains a selection of non-CS/ECE courses that satisfy the ATE
			requirement. Most students opted to take another ATE from List 1 for their
			third ATE though.
			<br />
			<br />
			CO 487 was the most popular ATE taken from List 3.
			<br />
			<br />
			In W25, SYDE 548 was an acceptable substitute for CS 449 for the HCI
			Specialization because CS 449 was not offered that term. This was a
			one-time substitute and lower-year SEs will not have this option. <br />
			<br />
			<Footnotes>
				<p>1. {courseInfoForFootnotesList(["CO487", "SYDE548", "CS449"])}</p>
			</Footnotes>
		</>
	),
	"Favourite core course?": (
		<>
			Two-way tie between CS 343 and SE 350, followed by CS 247! All three of
			this courses were taught in-person, and all the professors who taught
			these courses appear on our favourite professors graph.
			<br />
			<br />
			Interestingly, though only 1 respondent ranked MATH 119 as their favourite
			core course, 7 respondents put Zack Cramer as their favourite professor!
			<br />
			<br />
			{/* <div style={{ overflowX: "auto" }}>
				<details className={styles.descriptionDetails}>
					<summary>
						<span>Course Details</span>
					</summary>
				</details>
				<div className={styles.descriptionDetailsContent}>
					<SortableTable
						keys={["Course", "Name", "Term taken by SE25"]}
						data={[
							...Object.keys(FAVE_CORE_COURSES_TO_NAMES).map((course) => ({
								Course: formatCourseCode(course),
								Name: FAVE_CORE_COURSES_TO_NAMES[course],
								"Term taken by SE25": Object.entries(TERMS_TO_CORE_COURSES)
									.filter(([, courses]) => courses.includes(course))
									.map(([term]) => term)
									.join(", "),
							})),
						]}
					/>
				</div>
			</div> */}
		</>
	),
	"Opinions on List 3 ATEs": <></>,
	"Least favourite core course?": (
		<>
			{/* This is a placeholder comment so we don't forget */}
			The class profile team would like to call out that much of the
			cohort&apos;s dislike of ECE 222 was due to the general disorganization of
			the course during our offering. The course has significantly improved
			since we took it in 2021 - we encourage readers to view more recent ECE
			222 reviews on UWFlow{" "}
			{linkWrapper("here", "http://uwflow.com/course/ece222")}
			. <br />
			<br />
			This applies to all university courses - many are very professor-dependent
			and thus their quality may change drastically by term.
			{/*<br />
			<br />
			<details className={styles.descriptionDetails}>
				<summary>
					<span>
						<p>
							Course Details<sup>[1]</sup>
						</p>
					</span>
				</summary>
			</details>
			 <div
				className={styles.descriptionDetailsContent}
				style={{ overflowX: "auto" }}
			>
				<SortableTable
					keys={["Course", "Name", "Term taken by SE25"]}
					data={[
						...Object.keys(UNFAVE_CORE_COURSES_TO_NAMES).map((course) => ({
							Course: formatCourseCode(course),
							Name: UNFAVE_CORE_COURSES_TO_NAMES[course],
							"Term taken by SE25": Object.entries(TERMS_TO_CORE_COURSES)
								.filter(([, courses]) => courses.includes(course))
								.map(([term]) => term)
								.join(", "),
						})),
					]}
				/>
			</div> */}
			<br />
			<br />
			<Footnotes>
				<p>1. Some of the courses here are no longer mandatory! For example:</p>
				<InlineUL indent={48}>
					<li>Starting with SE28, ECE 106 is no longer mandatory.</li>
					<li>
						Starting with SE29, ECE 105 is no longer mandatory, but a classical
						mechanics course is still required.
					</li>
				</InlineUL>
			</Footnotes>
		</>
	),
	"Most useful core course?": <></>,
	"Least useful core course?": <></>,
	"Favourite core course professor?": (
		<>
			Rob Hackman, who taught our class CS 247 (Software Engineering
			Principles), was the core course professor most respondents voted as their
			favourite. This class was also taught during our first in-person term!
		</>
	),
	"Favourite elective course (no ATEs), and why?": null,
	"Easiest study term?": (
		<>
			{percentageHelper(43, 58)} respondents found that either 4A or 4B was the
			easiest term. 2B is notably absent from this chart.
			<br />
			<br />
			For SE25, the only SE courses mandatory for 4A were SE 463 and SE 490, and
			the only one mandatory for 4B was SE 491 (not including elective
			requirements). <br />
			<br />
			Additionally, there is no co-op search during 4B (or 4A, if you&apos;re in
			Stream 8x), though students may be actively interviewing for full-time
			positions.
			<br />
			<br />
			<Footnotes>
				<p>1. {courseInfoForFootnotesList(["SE463", "SE490", "SE491"])}</p>
			</Footnotes>
		</>
	),
	"Hardest study term?": (
		<>
			Nearly 50% of respondents found that 2B was the hardest term. 4B is
			notably absent from this chart.
			<br />
			<br />
			For SE25, the mandatory courses<sup>[1]</sup> for 2B were CS 240, CS 247,
			CS 348, ECE 192 and MATH 239.
			<br />
			<br />
			<Footnotes>
				<p>
					1. The mandatory courses in each term are subject to change. For
					example, for the SE29s, ECE 192 is now taken in 1B. Additionally,
					certain courses (such as CS 348) can be deferred to later terms.
				</p>
				<p>
					2.{" "}
					{courseInfoForFootnotesList([
						"CS240",
						"CS247",
						"CS348",
						"ECE192",
						"MATH239",
					])}
				</p>
				<p>
					3. To the current (or future) SE students looking at this graph, you
					probably don&apos;t need to be too worried if your next term happens
					to be 2B. What makes a term difficult often goes beyond just what
					courses are being taken, and even if it turns out to be your hardest
					term, you can rest easy knowing that you&apos;re not the only one!
				</p>
			</Footnotes>
		</>
	),
	"Co-op Regions - Flow over Terms": (
		<>
			<em>
				If a respondent included their location for one co-op but did not
				include an inbound/outbound city, they are accounted in the term total
				but do not have a link. Percentages have been rounded.
			</em>
			<br />
			<br />
			There&apos;s a lot of data here, and we invite you to explore it! For
			example,
			<br />
			<InlineUL indent={48}>
				<li>
					Only two respondents did co-ops that were not in Canada, the USA or
					remote. One student interned in Europe and Japan, and another in
					Singapore!
				</li>
				<li>
					The highest inbound percentage for remote co-ops was always remote
					co-ops.
				</li>
				<li>
					The outbound percentage for USA to USA co-ops is very high (67%, 92%,
					80%, 89%) in Co-op 2, 3, 4 and 5 respectively.
				</li>
			</InlineUL>
		</>
	),
	"Do you plan on getting your P. Eng?": (
		<>
			Only 1 respondent is certainly working towards their professional engineer
			(P. Eng) designation.
		</>
	),
	"Which school term did you spend the most time working on your FYDP?": (
		<>
			SE25 students worked on their FYDP&apos;s in 3B (SE 390), 4A (SE 490) and
			4B (SE 491). <br />
			<br />
			Interdisciplinary capstone courses are also an option, with 4A (GENE 403)
			and 4B (GENE 404).
			<br />
			<br />
			<Footnotes>
				<p>
					1.{" "}
					{courseInfoForFootnotesList([
						"SE390",
						"SE490",
						"SE491",
						"GENE403",
						"GENE404",
					])}
				</p>
			</Footnotes>
		</>
	),
	"Will you continue working on your FYDP after symposium?": (
		<>
			SE25 presented their capstone projects during the{" "}
			{linkWrapper(
				"Software Engineering Symposium",
				"https://uwaterloo.ca/capstone-design/events/software-engineering-symposium-0",
			)}{" "}
			on March 25th, 2025. {percentageHelper(41, 59)} of respondents do not plan
			on continuing their FYDP after this.
		</>
	),
	"How much did you enjoy working on your FYDP?": (
		<>
			There was a mix of responses for FYDP enjoyment. Only one respondent said
			they enjoyed their project a lot.
		</>
	),
	"What category is your FYDP?": (
		<>
			Most respondents did their FYDP in the New Product category. <br />
			<br />
			<details className={styles.descriptionDetails}>
				<summary>
					<span>About the FYDP categories...</span>
				</summary>
			</details>
			<div className={styles.descriptionDetailsContent}>
				<small>
					Previously, Software Engineering FYDPs had to fall under one of five
					categories, as defined by the{" "}
					{linkWrapper(
						"SE Capstone Handbook",
						"https://ece.uwaterloo.ca/~se_capstone/se-capstone-handbook.pdf",
					)}{" "}
					(page 33).
					<p>These were:</p>
					<InlineUL indent={48}>
						<li>
							Open Source: contribution to an existing open-source software
							project.
						</li>
						<li>
							Research: collaboration with a professor on a research topic.
						</li>
						<li>
							Consulting: writing software for an external partner (i.e.
							company, start-up).
						</li>
						<li>
							New Product: make a new software product (i.e. an app, a website -
							probably what you first thought of).
						</li>
						<li>
							Advanced Technology: anything where the main interest is solving a
							technical problem or applying technical knowledge.
						</li>
					</InlineUL>
					<br />
					While fitting under a category was a requirement for SE 390, these
					categories were not enforced for the W25 SE Capstone, and this is
					likely to be true for the near future.
				</small>
			</div>
		</>
	),
	"Did you transfer into SE from another program?": (
		<>
			One respondent reported transferring into SE25 during 3A - a program was
			not specified.
		</>
	),
	"What was your term average?": (
		<>
			<p>
				Unsurprisingly, first year averages are high, likely due to courses
				running online due to the COVID-19 pandemic. Even less surprising are
				the low grades in 2B, which is considered by many to have been the
				hardest term.
			</p>
			<br />
			<p>
				4B averages aren&apos;t included yet, since the initial surveys were
				done during 4B. Stay tuned for more!
			</p>
		</>
	),
	"What is your cumulative average?": (
		<>
			<em>This does not include 4B.</em>
		</>
	),
	"Anything else you'd like to add about academics? (courses, FYDP, etc.)":
		null,
	"What technical extracurriculars did you actively participate in?": (
		<>
			{linkWrapper("Socratica", "https://www.socratica.info/")} was the most
			popular SE-related extracurricular. Respondents actively participated in
			17 unique technical extracurriculars!
			<br />
			<br />
			WUSA maintains{" "}
			{linkWrapper("an active list", "https://clubs.wusa.ca/club_listings")} of
			university clubs per term. A list of design teams can also be found at the
			Sedra Student Design Centre directory{" "}
			{linkWrapper(
				"here",
				"https://uwaterloo.ca/sedra-student-design-centre/directory-teams",
			)}
			.
		</>
	),
	"What non-technical extracurriculars did you actively participate in?": (
		<>
			<em>Note: We specified not to include intramurals in this question.</em>
			<br />
			<br />
			{linkWrapper("UW CSA", "https://www.instagram.com/uwcsa/")} was the most
			popular non-technical extracurricular, followed by{" "}
			{linkWrapper("Poker Club", "https://www.instagram.com/uwpokerclub/")} and{" "}
			{linkWrapper("UW A Capella", "https://www.instagram.com/uwacc/")} .
			Respondents participated in a wide variety of extracurriculars during
			their degree - there are 25 listed here!
			<br />
			<br />
			WUSA maintains{" "}
			{linkWrapper("an active list", "https://clubs.wusa.ca/club_listings")} of
			university clubs per term.
		</>
	),
	"Are there any extracurriculars you regret not joining? Why?": null,
	"Which intramurals did you participate in?": (
		<>
			Volleyball <Emoji>🏐</Emoji> and Ultimate Frisbee <Emoji>🥏</Emoji> were
			the most popular intramurals for survey respondents. <br />
			<br />A complete list of intramurals can be found{" "}
			{linkWrapper(
				"here",
				"https://athletics.uwaterloo.ca/sports/2022/4/27/intramurals.aspx",
			)}
			.
		</>
	),
	"Which terms did you participate in intramurals?": (
		<>
			4B was the most common term respondents participated in intramurals,
			followed by 4A.
		</>
	),
	"How many technical side projects did you complete during university?": (
		<>
			<em>
				For this survey, we&apos;ve defined a technical side project as anything
				respondents would feel comfortable putting on their resume. The only
				exceptions to this were projects completed as part of an academic course
				(e.g. FYDP, SE 101, CS 247) which were <b>not</b> counted.
			</em>
			<br />
			<br />
		</>
	),
	"How many hackathons did you attend in university?": (
		<>
			Respondents attended hackathons most frequently in earlier terms, with 3B,
			4A and 4B only having one hackathon attendance each.
			<br />
			<br />
			This is could be for several reasons, for one, hackathons are often used
			on resumes early on to make up for lack of professional work experience.
			As students do more co-op terms and gain this experience, hackathon
			projects are no longer needed to pad resumes. Another possible reason is
			that students generally have more motivation and are more excited to
			attend build things when they are younger.
		</>
	),
	"How many hackathons did you attend in university? [1B]": <></>,
	"How many hackathons did you attend in university? [2A]": <></>,
	"How many hackathons did you attend in university? [2B]": <></>,
	"How many hackathons did you attend in university? [3A]": <></>,
	"How many hackathons did you attend in university? [3B]": <></>,
	"How many hackathons did you attend in university? [4A]": <></>,
	"How many hackathons did you attend in university? [4B]": <></>,
	"How often do you go out/party on average?": (
		<>
			Contrary to popular belief, most SE students still go out and have fun!
			<br />
			<br />
			Sometimes.
		</>
	),
	"How many hours of sleep do you get on average?": (
		<>
			It&apos;s generally recommended that adults our age get 7 or more hours of
			sleep. {percentageHelper(49, 57)} of respondents reported getting that on
			average.
			<br />
			<br />
			This question was asked in Winter 2025, thus it&apos;s possible
			respondents slept less in earlier terms.
		</>
	),
	"During school terms?": (
		<>
			Respondents tended to cook more on school-terms rather than go out to eat.
		</>
	),
	"During co-op terms?": (
		<>
			Both statistics are lower on co-op terms, possibly due to company-provided
			meals in office or home-cooked meals while working from home.
		</>
	),
	"Have you ever had a co-op term without a placement?": (
		<>
			Note Software Engineering students only need five credited work terms (out
			of the six worked into the degree program).
		</>
	),
	"How many co-op offers did you have rescinded?": (
		<>
			A co-op offer is considered rescinded if it is cancelled by the company
			after you have signed the offer letter.
		</>
	),
	"Have you ever been banned from WaterlooWorks for reneging an offer/match?": (
		<>
			Reneging refers to accepting a job offer, and then later going back on it.
		</>
	),
	"Have you ever gotten COVID?": (
		<>
			<Emoji>😭</Emoji> We started university during the pandemic.
		</>
	),
	"How many times have you gotten COVID?": <></>,
	"Have you ever experienced long COVID symptoms?": <></>,
	"How often did you exercise during your undergrad?": (
		<>
			This includes participating in a sport, going to the gym, and/or anything
			else that was intentional.
		</>
	),
	"What types of exercise did you do during your undergrad?": (
		<>
			Weighlifting/strength training and cardio were the most popular type of
			exercise among respondents. Waterloo has two on-campus fitness centers,
			PAC and CIF. popular place for this. A breakdown for intramurals is
			included earlier in this survey!
			<br />
			<br />
			Waterloo has a rock climbing wall on campus with both bouldering and top
			rope.{" "}
			{linkWrapper(
				"Grand River Rocks Waterloo",
				"https://grandriverrocks.com/waterloo/",
			)}{" "}
			is also a popular option nearby for bouldering, and{" "}
			{linkWrapper(
				"has a second location in Kitchener",
				"https://grandriverrocks.com/kitchener/",
			)}{" "}
			with top rope/lead, and more bouldering.
		</>
	),
	"If you experienced burnout during SE, what factors contributed?": (
		<>
			Most respondents experienced burnout of some sort - the main causes were
			Academics and Job Search, which are notoriously stressful parts of the
			Waterloo co-op program.
		</>
	),
	"How is your self-esteem now compared to before starting university?": (
		<>
			{percentageHelper(36, 58)} of respondents reported that their self-esteem
			had improved during university!
		</>
	),
	"In first year?": (
		<>
			Impostor syndrome refers to an individual&apos;s internal experience of
			believing that they are not as competent as others perceive them to be.
		</>
	),
	"In 4B?": (
		<>By 4B, no respondents reported always feeling imposter syndrome! </>
	),
	"How many times did you ask for a deadline extension due to illness/injury?":
		(
			<>
				<em>
					We specified in the question description that this includes
					&quot;Short-Term Absences (grace period), VIF, and prof emails.
					Course-integrated slip days that are automatically applied if you
					submit an assignment past the due date do not count.&quot;
				</em>
				<br />
				<br />
				{percentageHelper(28, 54)} of respondents reported for at least one
				deadline extension due to illness/injury during their degree.
			</>
		),
	"How many times did you need to visit the ER during your undergrad?": (
		<>
			Almost a quarter of respondents reported going to the ER (emergency room)
			at least once during their undergrad.
		</>
	),
	"How often do you keep in touch with high school friends?": (
		<>
			Most respondents stayed in touch with their highschool friends throughout
			university!
		</>
	),
	"How many people in SE25 have you ever met and spoken to in-person?": <></>,
	"How many close friends do you have that you first met in high school?": (
		<>
			<em>
				Respondents were asked to count close friends they{" "}
				<strong>first</strong> met through one of the methods below. For
				example, if they had met a close friend through co-op and happened to be
				the same cohort, they would count this person in co-op and not cohort.
			</em>
			<br />
			<br /> Unsurprisingly not many SE25s made close friends on campus
			residence... because very few SE25s ever stayed on campus residence. On
			average, respondents had <strong>0.43</strong> close friends they first
			met on campus residence.
			<br />
			<br />
			Respondents made most of their close friends via the SE25 cohort, with an
			average of <strong>4.77</strong> close friends. Taking the same core
			courses <s>and suffering together</s>, and attending the same cohort
			events did bring us closer! Many respondents also had close highschool
			friends, with an average of <strong>4.15</strong> close friends. This also
			tracks with how often SE25 keeps in contact with their highschool friends.
			<br />
			<br />
			For the remaining categories, on average, respondents had{" "}
			<strong>1.44</strong> close friends first made through co-op,{" "}
			<strong>1.02</strong> through other cohorts, <strong>1.78</strong> through
			extracurriculars and clubs, and <strong>2.73</strong> through other means
			(e.g. mutuals, parties).
			{/* on average:
			4.15 highschool
			1.44 co-op
			0.43 campus residence
			4.77 se25 cohort
			1.02 other cohorts
			1.78 extra curriculars and clubs
			2.73 other
			*/}
		</>
	),
	"How many close friends do you have that you first met through co-op?": <></>,
	"How many close friends do you have that you first met on campus residence?":
		<></>,
	"How many close friends do you have that you first met through being part of the SE25 cohort (i.e. by taking the same core courses or attending cohort events)?":
		<></>,
	"How many close friends do you have that you first met through being part of SE (other cohorts)?":
		<></>,
	"How many close friends do you have that you first met in extracurriculars (e.g. clubs, sports)?":
		<></>,
	"How many close friends do you have that you first met through other means (e.g. parties, Aphrodite project, mutual friends)":
		<></>,
	"Have you been contacted by the CRA for tax-related reasons?": (
		<>
			<em>
				The CRA is the Canada Revenue Agency. We specified this was for things
				related to tax returns or repayments; the CRA contacting you about the
				carbon tax rebate does not count.
			</em>
		</>
	),
	"Have you ever intentionally committed tax fraud?": <>ඞ...</>,
	"Have you ever unintentionally committed tax fraud?": (
		<>
			<em>
				We specified in the survey that &quot;unintentionally&quot; committing
				tax fraud means that you did your taxes to the best of your ability
				without the intention of committing tax fraud, and then you later
				learned that you did them incorrectly (say, by being contacted by the
				CRA or IRS).
			</em>
			<br />
			<br />
			<p>Well, at least it wasn&quot;t intentional.</p>
		</>
	),

	"What is your current net worth?": (
		<>Most respondents end their degree with a positive net worth!</>
	),
	"What percentage of your net worth is invested?": <></>,
	"How much did you borrow in student loans throughout university?": <></>,
	"How satisfied are you about your current financial situation?": (
		<>
			<em>1 is least satisfied, 10 is most satsified.</em>
			<br />
			<br />
			Most respondents are very satisified with their financial situation!
		</>
	),
	"What are your post graduation plans?": (
		<>All respondents were either planning on employment or grad school.</>
	),
	"How many grad school offers have you received so far?": (
		<>
			Both respondents who planned on going to grad school had received at least
			one offer at the time of completing this survey!
		</>
	),
	"Which school?": <></>,
	"What is your research topic or program?": <></>,
	"Why did you choose to pursue grad school over full-time employment?": null,
	"How many full-time offers have you received so far?": (
		<>
			Most respondents who received a full-time offer were deciding between
			multiple offers.
		</>
	),
	"If you have accepted an offer, which company?": (
		<>
			X (Twitter) and Databricks were the two most common full-time companies -
			they were also where many SE25 students spent their later co-op terms, so
			we can possibly infer many got return offers.
			<br />
			<br />
			Two additional respondents specified that they had accepted a full-time
			offer, but did not specify a company.
		</>
	),
	"How large is the company that extended your full-time offer (number of employees)?":
		(
			<>
				<em>
					This data was manually scraped to the best of our abilities based on
					the companies submitted.
				</em>
				<br />
				<br />
				All respondents who submitted full-time companies are working at
				companies with over 500 employees.
			</>
		),
	"Which industry is the company that extended your full-time offer in?": (
		<>
			<em>
				This data was manually scraped to the best of our abilities based on the
				companies submitted.
			</em>
			<br />
			<br />
			The most common industries for full-time employers are SaaS (Software as a
			Service) followed by Financial Services, the same as it was for co-op
			employer industries.
		</>
	),
	"When are you starting full-time work?": (
		<>
			<p>
				This question was asked during 4B, so someone actually managed to do a
				full-time job in addition to school!
				{/* I really wanted to say concurrently but it doesn't sound as good*/}
			</p>
			<br />
			<p>
				Most respondents ({percentageHelper(35, 44)}) start from July onward
				though, likely due to the fact that convocation happens in June.
			</p>
		</>
	),
	"How many days per week do you plan to work remotely?": (
		<>
			{percentageHelper(20, 43)} of respondents do not plan to work remotely.
			<br />
			<br />
			Two years of remote university was probably enough for a while...
		</>
	),
	"Are you returning to a previous co-op?": (
		<>
			Most respondents were returning to companies they had previously interned
			at!
			<br />
			<br />
			This is convenient for interns as they usually do not have to re-interview
			when they have a full-time return offer, and are already familiar with
			company work and culture from their internships.
		</>
	),
	"If you are returning to a previous co-op, when did you work for that company?":
		(
			<>
				Respondents returning to previous co-op companies most commonly worked
				at their company during their last co-op term. <br />
				<br /> Some companies will only provide full-time return offers for
				students who can start within the next year (due to head count
				restrictions), and will provide internship return offers otherwise.{" "}
				<br />
				<br />
				It is also not uncommon for companies to only hire interns who are
				graduating soon.
			</>
		),
	"What is your total first-year compensation?": <></>,
	"What is your annual base salary?": <></>,
	"What is your one-time sign-on bonus?": <></>,
	"What is the value of your first-year stock grant?": <></>,
	"What is your total stock grant value?": <></>,
	"What is your end-of-year/recurring annual compensation?": <></>,
	"How content are you with your post-grad plans?": (
		<>
			Most respondents (with full-time employment) are content with their
			post-grad plans!
		</>
	),
	"What city will you be living in full-time after graduation?": (
		<>
			New York is the most common city respondents are living in full-time at 13
			respondents. San Francisco is the second most common at 10.
			<br />
			<br />
			17 respondents are living in the San Francisco Bay Area, which is{" "}
			{percentageHelper(17, 44)} of respondents.
		</>
	),
	"What were the 3 most important motivators in your full-time decision?  [Compensation]":
		<></>,
	"What were the 3 most important motivators in your full-time decision?  [Proximity to Friends]":
		<></>,
	"What were the 3 most important motivators in your full-time decision?  [Proximity to Family]":
		<></>,
	"What were the 3 most important motivators in your full-time decision?  [Proximity to Significant Other]":
		<></>,
	"What were the 3 most important motivators in your full-time decision?  [City choice]":
		<></>,
	"What were the 3 most important motivators in your full-time decision?  [Cost of Living]":
		<></>,
	"What were the 3 most important motivators in your full-time decision?  [Interest in Work]":
		<></>,
	"What were the 3 most important motivators in your full-time decision?  [Interest in Team]":
		<></>,
	"What were the 3 most important motivators in your full-time decision?  [Interest in Product]":
		<></>,
	"What were the 3 most important motivators in your full-time decision?  [Company Fit (WLB, Culture)]":
		<></>,
	"What were the 3 most important motivators in your full-time decision?  [Remote Work]":
		<></>,
	"What were the 3 most important motivators in your full-time decision?  [In-Person Work]":
		<></>,
	"What were the 3 most important motivators in your full-time decision?  [Vibes]":
		<></>,
	"What were the 3 most important motivators in your full-time decision?": (
		<>
			<em>
				Respondents were asked to choose one motivator to rank 1, 2 and 3
				respectively.
			</em>
			<br />
			<br />
			Compensation was the most common motivator, with{" "}
			{percentageHelper(31, 42)} of respondents ranking it as one of their top
			three motivators. Many were also interested in their full-time work, as
			well as the specific company they were joining.
		</>
	),
	"Are you left-handed, right-handed, or ambidextrous?": <></>,
	"Favourite SE25-related memory?": null,
	"What countries did you travel to during your degree?": (
		<>
			<em>
				Respondents were asked to include co-op and school terms. Canada is not
				included for... obvious reasons.
			</em>
			<br />
			<br />
			The United States <Emoji>🇺🇸</Emoji> was the most common country visited
			(likely due to co-ops being there). The United Kingdom <Emoji>🇬🇧</Emoji>{" "}
			was the second most common country visited, followed by Italy{" "}
			<Emoji>🇮🇹</Emoji>!
			<br />
			<br />
			Also shoutout to the person who visited Antarctica <Emoji>🇦🇶</Emoji>.
		</>
	),
	"Favourite study spot?": (
		<>
			There&apos;s no place like 127.0.0.1!
			<br />
			<br />
			SE has three dedicated lounges: two in DC (DC 2577 and DC 2567), as well
			as one in EIT (EIT 3146).{" "}
		</>
	),
	"What grocery store did you most frequently shop at?": (
		<>
			The most popular grocery store was T&T, a Canadian Asian supermarket
			chain.
		</>
	),
	"What is your religious and/or spiritual affiliation?": <></>,
	"What is your sexual orientation?": (
		<>
			There are many on-campus groups supporting LGBTQ+ communities and allies,
			such as {linkWrapper("UW Glow", "https://www.instagram.com/uwglow/")} and
			specifically in engineering,{" "}
			{linkWrapper("UW Engiqueers", "https://www.instagram.com/uwengiqueers/")}.
		</>
	),
	"How many classes did you fail?": (
		<>10% of respondents failed at least one class.</>
	),
	"If you failed a class, which class did you fail?": (
		<>
			The most common class failed was MATH 115.
			<br />
			<br /> MATH 115 and CS 137 were taken in 1A, and MATH 117 and CS 138 were
			taken during 1B, which were both completely remote terms due to COVID.
			<br />
			<br />
			<Footnotes>
				<p>
					1.{" "}
					{courseInfoForFootnotesList(["MATH115", "CS137", "MATH117", "CS138"])}
				</p>
			</Footnotes>
		</>
	),
	"How many midterms did you fail?": (
		<>
			Failing a midterm does not necessarily mean that the course was also
			failed. {percentageHelper(31, 57)} of respondents reported failing at
			least one midterm during their degree.
		</>
	),
	"How many finals did you fail?": (
		<>
			Failing a final also does not necessarily mean that the course was also
			failed, though many SE/CS/ECE courses have a requirement to obtain a
			minimal grade on a final to pass the course.
		</>
	),
	"Have you ever been arrested?": <>Phew!</>,
	"What counselling resources did you use during your undergrad?": (
		<>
			<p>
				The{" "}
				{linkWrapper(
					"Engineering First Year Office",
					"https://www.engsoc.uwaterloo.ca/resources/first-year-office/",
				)}{" "}
				provides a variety of assistance for first-year students, including
				counselling.
			</p>
			<br />
			{linkWrapper(
				"UW Campus Wellness",
				"https://uwaterloo.ca/students/health-and-well-being/counselling-appointments",
			)}{" "}
			also provides a variety of counselling services to students for free.
		</>
	),
	"Have you ever been to therapy?": (
		<>{percentageHelper(18, 58)} of respondents reported going to therapy.</>
	),
	"How many school terms were you affected by struggles associated with mental health?":
		<></>,
	"What mental health issues have you faced? [Anxiety]": <></>,
	"What mental health issues have you faced? [Body Dysmorphia]": <></>,
	"What mental health issues have you faced? [Burnout]": <></>,
	"What mental health issues have you faced? [Depression]": <></>,
	"What mental health issues have you faced? [Eating Disorders]": <></>,
	"What mental health issues have you faced? [Grief]": <></>,
	"What mental health issues have you faced? [OCD]": <></>,
	"What mental health issues have you faced? [Neurodivergence (ADHD, Autism, etc.)]":
		<></>,
	"What mental health issues have you faced? [Post-traumatic Stress Disorder (PTSD) / Complex post-traumatic Stress Disorder (CPTSD)]":
		<></>,
	"What mental health issues have you faced? [Social Anxiety Disorder]": <></>,
	"What mental health issues have you faced? [None]": <></>,
	"What mental health issues have you faced? [PMDD]": <></>,
	"What mental health issues have you faced? [Body-Focused Repetitive Behaviour]":
		<></>,
	"What mental health issues have you faced?": (
		<>
			Most respondents experienced some kind of mental health issue, with the
			most common being burnout.
			<br />
			<br />
			If you are struggling, remember you aren&apos;t alone. It&apos;s important
			to look out for yourself and one another.
		</>
	),
	"Which drugs have you used?": (
		<>
			Caffeine was the most common drug respondents tried before university
			(likely in coffee form), and weed was the most common drug respondents
			first tried during university.
			<br />
			<br />
			Adderall/Ritalin (unprescribed), mushrooms and LSD were the three drugs
			respondents either first-tried during university (the minority) or never
			tried (the majority).
			<br />
			<br />
			None of the respondents have ever done cocaine.
		</>
	),
	"Which drugs have you used? [Caffeine]": <></>,
	"Which drugs have you used? [Nicotine and Tobacco]": <></>,
	"Which drugs have you used? [Weed (THC)]": <></>,
	"Which drugs have you used? [Adderall/Ritalin (unprescribed)]": <></>,
	"Which drugs have you used? [Mushrooms]": <></>,
	"Which drugs have you used? [LSD]": <></>,
	"Which drugs have you used? [Cocaine]": <></>,
	"Drank alcohol, taken an edible, or done another drug in class?": (
		<>
			<em>Caffeine was excluded as a drug.</em>
		</>
	),
	"Written a final drunk, hungover, high or on another drug?": (
		<>
			<em>Caffeine was still excluded as a drug.</em>
		</>
	),
	"How many romantic relationships have you been in during your degree?": (
		<>
			<em>
				For the class profile, we defined a romantic relationship as one where
				all parties have agreed/acknowledged they are partners.
			</em>
			<br />
			<br />
			Most respondents ({percentageHelper(43, 56)}) have been in at least one
			relationship during their degree.
		</>
	),
	"How many months of your degree have you spent in a romantic relationship?": (
		<>
			On average, respondents spent over a year of their degree in a
			relationship!
		</>
	),
	"What dating apps did you use while in university?": (
		<>Hinge was the most popular dating app used.</>
	),
	"Did you ever participate in the Aphrodite project?": (
		<>
			Paraphrased from their site, the{" "}
			{linkWrapper("Aphrodite project", "https://aphrodite.global/")} is &quot;a
			one-off, student-run digital event that’s designed for meaningful
			compatibility to help university students meet their ideal date from your
			school&quot;
			<br />
			<br />
			<em>
				Note: This class profile is not affiliated with the Aphrodite project.
			</em>
		</>
	),
	"Which relationship/intimacy actions have you performed?": (
		<>
			Besides classes and co-ops, SEs have really been up to some stuff, huh?
			Hope they had fun.
		</>
	),
	"Which relationship/intimacy actions have you performed? [Held hands romantically]":
		<></>,
	"Which relationship/intimacy actions have you performed? [Been on a date]": (
		<></>
	),
	"Which relationship/intimacy actions have you performed? [Kissed someone romantically]":
		<></>,
	"Which relationship/intimacy actions have you performed? [Been in a committed relationship]":
		<></>,
	"Which relationship/intimacy actions have you performed? [Been in a long-distance relationship]":
		<></>,
	"Which relationship/intimacy actions have you performed? [Been in a situationship]":
		<></>,
	"Which relationship/intimacy actions have you performed? [Sent/received nudes]":
		<></>,
	"Which relationship/intimacy actions have you performed? [Engaged in sexual intercourse]":
		<></>,
	"Which relationship/intimacy actions have you performed? [Hooked up with someone]":
		<></>,
	"Which relationship/intimacy actions have you performed? [Had a threesome]": (
		<></>
	),
	"Have you been involved in romantic cheating during your degree?": (
		<>Spilling the infideli-tea...</>
	),
	"How many sexual partners did you have during your degree?": (
		<>There were two respondents in the double-digits!</>
	),
	"Have you ever done a naughty act in the SE Lounge/Labs?": (
		<>
			The SE Lounges include two lounges in DC, DC 2577 and DC 2567, as well as
			one in EIT, EIT 3146. We did not ask respondents to specify which of the
			three lounges the naughty act was performed in.
			<br />
			<br />
			Surely it&apos;s not the one you use.
		</>
	),
	"Rice purity test score?": (
		<>
			<p>
				If you don&apos;t know what this is, we&apos;re not going to explain it.
				<br />
				<br />
				<i>
					For the uninitiated, you can try the test{" "}
					{linkWrapper("here", "https://ricepuritytest.com")}.
				</i>
			</p>
		</>
	),
	"What was your rice purity test before university?": <></>,
	"What is your iron ring size?": (
		<>
			The Iron Ring is worn by engineering graduates from Canadian universities
			on their pinkie, as a symbol and reminder of the obligations and ethics
			associated with their profession. Graduates are presented their ring in a
			private cerenomy known as the &apos;Calling of an Engineer&apos; - for the
			University of Waterloo, this is administered by Camp 15.
			<br />
			<br />
			2025 was the 100th year of the Iron Ring Ceremony!
			<br />
		</>
	),
	"If you received an iron ring, have you lost your iron ring as of doing this survey?":
		(
			<>
				<Emoji>👏👏👏</Emoji>
			</>
		),
	"Have you ever physically fought someone outside of controlled martial arts environments (with intent to cause physical harm)?":
		(
			<>
				(ง •̀_•́)ง ୧(•̀_•́ ୧) <Emoji>⁉️</Emoji>
			</>
		),
	"Do you use tabs or spaces when indenting your code?": <></>,
	"Where do you put your function brackets?": (
		<>
			<p>Here&apos;s how these bracket styles look:</p>
			<br />
			<div
				style={{
					display: "flex",
					flexWrap: "wrap",
					gap: "16px",
				}}
			>
				<div>
					<p>Same line</p>
					<KAndRExample />
				</div>
				<div>
					<p>Next line</p>
					<AllmanExample />
				</div>
			</div>
		</>
	),
	"Favourite programming language?": (
		<>
			Python was the most popular programming language. μC++ is a language
			developed by Peter Buhr and taught in the CS 343 course.
		</>
	),
	"Favourite text editor or IDE?": (
		<>
			The most popular text editor was reported to be VSCode. <br />
			<br />
			Notably, {linkWrapper("Cursor", "https://www.cursor.com/en")} and{" "}
			{linkWrapper("Windsurf", "https://windsurf.com/")} are two AI-powered
			IDEs.
		</>
	),
	"Do you capitalize letters while typing with Caps Lock or Shift?": <></>,
	"Do you use your chosen IDE in light or dark mode?": (
		<>Most respondents code in dark mode 🕶️ </>
	),
	"Which phone OS do you use?": (
		<>
			Lots of Apples <Emoji>🍎</Emoji>
		</>
	),
	"How many Leetcode problems have you solved?": (
		<>
			<em>
				We asked respondents to search up this stat on their Leetcode profiles.
				This does not include repeat-submissions.
			</em>
			<br />
			<br />
			Cumulatively, the 50 respondents to this question have solved 3519 easy
			problems, 5321 medium problems, and 751 hard problems, for a total of 9591
			Leetcode problems!
		</>
	),
	"How many Leetcode Medium problems have you solved?": <></>,
	"How many Leetcode Hard problems have you solved?": <></>,
	"What video games did you frequently play during your degree?": (
		<>
			<em>Frequently was defined as 7 hours or more per week.</em>
			<br />
			<br />
			League of Legends and VALORANT were tied for the most popular games SE25
			respondents frequently played - these are both PC games developed by Riot
			Games!
		</>
	),
	"How many hours did you play video games per week during your degree?": <></>,
	"How many hours did you spend on social media platforms per week during your degree?":
		<></>,
	"Favourite boba shop around UW?": (
		<>
			NowTea was the favourite boba shop of {percentageHelper(28, 46)} of
			respondents <Emoji>🧋</Emoji>
		</>
	),
	"Favourite restaurant in Waterloo?": (
		<>
			The top 3 most popular restaurants (Yunshang, Shinwa and Gol&apos;s) are
			all Chinese restaurants.
			<br />
			<br />
			Pho Anh Vu and Fuwa Fuwa opened in August 2024, MyungGA opened in
			September 2023. Waterloo Star has since shut down.
		</>
	),
	"Favourite shawarma restaurant around UW?": (
		<>
			Shawerma Plus was the favourite shawarma restaurant of{" "}
			{percentageHelper(29, 51)} of respondents.
			<br />
			<br />
			Tahini&apos;s opened October 2023.
			<br />
			<br />
			One person typed Shinwa, which we&apos;ve included on the graph. To our
			knowledge, Shinwa does not have shawarma.
		</>
	),
	"Favourite inspirational quote/words to live by?": null,
	"Best life hack/tip?": null,
	"Advice you'd give your first-year self?": null,
	"Anything else you'd like to add?": null,
	"Did you ever commit SEcest with another SE25?": (
		<>
			<em>
				For this class profile, we&apos;re defining <b>SEcest</b> as a defined
				relationship between SE25s (where all parties have agreed/acknowledged
				they are partners and were in the SE25 cohort at the time).
			</em>
			<br />
			<br />
			<p>
				Thank (or blame) the{" "}
				{linkWrapper(
					"SE2020 class profile",
					"https://uw-se-2020-class-profile.github.io/profile.pdf#page=76",
				)}{" "}
				for coining the term.
			</p>
		</>
	),
	"Did you at any point want to commit SEcest with an SE25?": (
		<>
			<em>
				Only respondents who answered &quot;No&quot; on the previous question
				would answer this section.
			</em>
		</>
	),
	"What terms did you commit SEcest with another SE25?": (
		<>
			The following graph was inspired by the SYDE25 grad prank, which included
			a SYDEcest Over the Years graph. <br />
			<br />
			<em>
				Only respondents who answered Yes to &quot;Did you ever commit SEcest
				with another SE25?&quot; would have the option to answer this section.
				We&apos;ve hidden the n value for added anonymity.
			</em>
			<br />
			<br />
			<em>
				From our survey description: &apos;The length of time you committed
				SEcest during a given term does not matter - just that it happened (e.g.
				if you were only in a relationship for 1 week this counts as a yes, if
				you were in a relationship for the whole term, this also counts as a
				yes). If you committed SEcest with two different people in the same
				term, this will still count as only one yes.&apos;
			</em>
		</>
	),
	"Which term did you switch out of SE25?": (
		<>
			The majority of respondents switched out of SE between 2B and 3B. No
			respondents switched out beyond 3B.
		</>
	),
	"Why did you choose to switch out of SE25?": null,
	"Which program did you switch to?": (
		<>
			All respondents that switched out of SE and stayed in university switched
			to Computer Science. <br />
			<br />
			One student elected to take the{" "}
			{linkWrapper(
				"Regular Computer Science program",
				"https://cs.uwaterloo.ca/future-undergraduate-students/co-op-and-regular",
			)}
			, which does not have dedicated co-op terms.
			<br />
			<br />
		</>
	),
	"Is there anything else you'd like to add?": null,
	"SE25 Switch Out Survey": (
		<>
			The following results are from surveying 8 students who started university
			in SE25 before switching out.
			<br />
			<br />
			Fun fact, SE25 started with 147 students, and ended with 117. It&apos;s
			also worth noting for this stat that not only did students switch out of
			SE25, but some students also transferred into the cohort.
		</>
	),
	"About FYDP": (
		<>
			Capstone Design<sup>1</sup> provides Waterloo Engineering students with
			the unique opportunity to conceptualize and design a project related to
			their chosen discipline. As part of Waterloo&apos;s Engineering Faculty,
			this project is a degree requirement for Software Engineering students -
			we begin working on this project in third-year.
			<br />
			<br /> The complete list of Software Engineering Capstone Designs
			<sup>2</sup> (FYDP - Fourth-Year Design Projects) can be found{" "}
			{linkWrapper(
				"here",
				"https://uwaterloo.ca/capstone-design/project-abstracts/2025-capstone-design-projects/2025-software-engineering-capstone-designs",
			)}
			!
			<br />
			<br />
			Computer Science students can also optionally partake in a FYDP by taking
			CS 493 and CS 494<sup>3</sup>.
			<br />
			<br />
			<Footnotes>
				<InlineOL indent={16}>
					<li>
						{linkWrapper(
							"https://uwaterloo.ca/capstone-design/",
							"https://uwaterloo.ca/capstone-design/",
						)}
					</li>
					<li>
						Students (including those in non-engineering programs) may instead
						participate in the Interdisciplinary Capstone Design Symposium for
						their FYDP - their projects can be found{" "}
						{linkWrapper(
							"here",
							"https://uwaterloo.ca/capstone-design/project-abstracts/2025-capstone-design-projects/2025-i-capstone-designs",
						)}
						!{" "}
					</li>

					<li>{courseInfoForFootnotesList(["CS493", "CS494"])}</li>
				</InlineOL>
			</Footnotes>
		</>
	),
	"Future: Employment": (
		<>
			Only respondents who selected they had received or accepted employment
			were shown the rest of the survey questions under this section.
		</>
	),
	"Future: Grad School": (
		<>
			Only respondents who selected that they were planning on grad school were
			shown this part of the survey.
		</>
	),

	"Average Hourly Co-op Salary vs Gender": (
		<>
			Based on{" "}
			<a href="https://www.levels.fyi/2020/gender-pay-gap/">
				a 2020 industry survey
			</a>
			, the gender pay gap in tech is nonexistent for entry-level positions, but
			gets wider the more senior the job role is. Is the trend the same for
			Waterloo SE students?
			<br />
			<br />
			We found that respondents who identified as women always had a slightly
			higher average hourly co-op salary than those that identified as men. We
			have a small sample size (50 responses from men; 17 from women), so our
			measurements are more susceptible to variance and outliers compared to
			industry averages. So is this a sign of equality and progress, and does
			this trend hold up for full-time offers?
		</>
	),
	"Full-time Total Compensation vs Gender": (
		<>
			Based on our surveys, in contrast to the trend in co-op salaries, women
			had a lower average total compensation than men.
			<br />
			<br />
			However, we had a very small sample (n=37) susceptible to variance,
			outliers, and individual behaviour. After adjusting for outliers, the
			averages are much closer. And again, industry research suggests that
			differences in pay get wider in senior positions, but we don&apos;t have
			data for that.
			<br />
			<br />
			So does the gender pay gap exist, or is it gone? Whatever you conclude, we
			advise you to{" "}
			<a href="https://journals.plos.org/plosone/article?id=10.1371/journal.pone.0293300">
				seek out
			</a>{" "}
			<a href="https://arxiv.org/abs/2206.06113">different</a>{" "}
			<a href="https://www.hubequalrep.org/wp-content/uploads/2021/11/Roussille_askgap.pdf">
				sources
			</a>{" "}
			and not to decide your worldview based on a class profile.
		</>
	),
	"Full-time Total Compensation vs Grades": (
		<>
			How much do grades matter for getting a good full-time job? Based on
			research, we&apos;d expect that{" "}
			<a href="https://opus.uleth.ca/server/api/core/bitstreams/1f6aedc6-98d3-4588-a9c8-e0ed5b37d47c/content">
				the effect grades have on earnings in the tech industry
			</a>{" "}
			is higher than the overall average, but{" "}
			<a href="https://journals.sagepub.com/doi/abs/10.1177/009102608901800102?casa_token=_9_i7xY5WacAAAAA:4GllEsVqhi40zoozM2xsE_mgYyMXYJCZik5s_0algh-Pw1fgPLpwChHttLhk24pfirQayektX50">
				other studies attribute differences to other majors
			</a>
			, such as business and teaching.
			<br />
			<br />
			There is a slight positive correlation in SE 25 between grades and
			first-year compensation, meaning grades may have a slight positive effect
			on landing a well-paying first job.
			<br />
			<br />
			Does this mean you should panic? Not necessarily. Again, our dataset is
			small and subject to variance and non-response bias (higher earners and
			higher GPAs are more likely to respond). Industry statistics tend to
			suggest the relationship is inconclusive, and there may be hidden
			variables involved. Our advice? Focus on honing your skills (those will
			get you farther) and don&apos;t forget to enjoy your university
			experience.
		</>
	),
	"Full-time Total Compensation vs Family Income": (
		<>
			Do the rich get richer, and the poor get poorer? Studies show that{" "}
			parental income is positively correlated with{" "}
			<a href="https://files.eric.ed.gov/fulltext/EJ1343324.pdf">
				child achievement in school
			</a>{" "}
			and their{" "}
			<a href="https://cew.georgetown.edu/cew-reports/schooled2lose/">
				future socioeconomic status
			</a>
			, but how much does Waterloo&apos;s co-op program help bridge the divide?
			<br />
			<br />
			Turns out, SE 25s from lower-income backgrounds did not necessarily face
			lower first-year compensation overall. This is consistent with the idea
			that Waterloo&apos;s co-op program helps by giving students the
			opportunity to fund their own education. However, as always, take it with
			a grain of salt and do your own research - our data is highly susceptible
			to variance, outliers, and non-response bias. In particular, the highest
			family income bracket had a very low number of responses (there are only
			35 data points represented in this graph), so we&apos;re not sure how
			useful our data is in drawing conclusions there. As always, check out more
			sources!
		</>
	),
	"A Note on Full-Time Compensation": (
		<>
			For full-time compensation, respondents gave the currency they would be
			paid in, and we used the same conversion factor for all values (unlike
			co-op compensation, where respondents converted to CAD by themselves). At
			the time of converting, the average USD to CAD rate was 1.43, and the
			average GBP to CAD rate was 1.85
			<br />
			<br />
			<strong>These numbers should be taken with a grain of salt</strong> -
			firstly, respondents who had more well-compensated jobs were more likely
			to respond, and secondly this sample size is quite small with only around
			40 responses per question.
			<br />
			<br /> Data displayed on the box plot hover has been rounded to the
			nearest thousand for better readability. The Include/Exclude Outliers
			toggle is relative to the original data.
			<br />
			<br />
			There is a lot of crowdsourced public data on full-time salaries
			available, such as{" "}
			{linkWrapper("on levels.fyi", "https://www.levels.fyi/")} and we invite
			you to look at those, and to contribute when the time comes (this class
			profile is not affiliated with levels.fyi specifically).
		</>
	),
	"About SE Cost": (
		<div style={{ display: "flex" }} className={styles.seCostContainer}>
			<div style={{ flex: 2.5 }}>
				An SE25 who is an Ontario resident paid tuition, a co-op fee and (not
				included on the table to the right) approximately $625 of miscellaneous
				fees, some of which can be opted-out from. Thus, the full degree for an
				SE25 Ontario resident made up of 8 terms of tuition and 6 co-op terms
				(including the $625 misc fees per term) costs{" "}
				<strong>
					$
					{(6985 + 625) * 8 +
						Object.values(coopFees).reduce((a, b) => a + b, 0)}
					.
				</strong>{" "}
				This does not include cost of living or school materials.
				<br />
				<br />
				The average yearly tuition for Canadian undergraduates studying in
				Ontario during 2024/2025 was $12491 for engineering, and $8661 for
				mathematics, computer and information sciences (
				{linkWrapper(
					"source",
					"https://www150.statcan.gc.ca/t1/tbl1/en/tv.action?pid=3710000301&pickMembers%5B0%5D=1.7&cubeTimeFrame.startYear=2020+%2F+2021&cubeTimeFrame.endYear=2024+%2F+2025&referencePeriods=20200101%2C20240101",
				)}
				). It was about $16792 for SE25 in 2024/2025.
				<br />
				<br />
				Note this cost is higher for SE students who are Canadian citizens but
				not Ontario residents, and generally much higher for international
				students.
				<br />
				<br />
				UW Software Engineering has a dedicated scholarships and awards page{" "}
				{linkWrapper(
					"here",
					"https://uwaterloo.ca/software-engineering/undergraduate-students/scholarships-and-awards",
				)}
				.
			</div>
			<div style={{ flex: 1 }} className={styles.seCostTableContainer}>
				<table className={tableStyles.baseTable}>
					{/* This does not include ~$600 of misc fees per term, a small portion which can be opted out. i don't have the brainpower to go through each list and calculate */}
					{/* 1A/1B: 6,985.00, co-op: 734.00 */}
					{/* 2A: 6,985.00, co-op 739.00 */}
					{/* 2B/3A: 6,985.00, co-op 745.00 */}
					{/* 3B: 6,985.00, co-op 756.00 */}
					{/* 4A: 6,985.00, co-op 786.00 */}
					{/* 4B: 6,985.00, co-op 786.00  */}
					<thead>
						<tr>
							<th colSpan={3} className={tableStyles.boxPlotTableTitle}>
								SE Cost for Ontario Resident
							</th>
						</tr>
						<tr>
							<th>Term</th>
							<th>Tuition</th>
							<th>Co-op Fee</th>
						</tr>
					</thead>
					<tbody>
						{TERMS.map((term) => (
							<tr key={term}>
								<td>{term}</td>
								<td>6985</td>
								<td>{coopFees[term as keyof typeof coopFees]}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	),
	"Advanced Technical Electives (ATEs)": (
		<>
			Taking advanced technical electives is a degree requirement for SE! SE25
			only needed three to graduate (one from List 1, List 2 and optionally
			another from List 1, List 2 or from List 3). Future SE may need more - the
			current listed requirements is four. All current degree requirements can
			be found{" "}
			{linkWrapper(
				"here",
				"https://uwaterloo.ca/academic-calendar/undergraduate-studies/catalog#/programs/H1zle10Cs3",
			)}
			.
		</>
	),
};

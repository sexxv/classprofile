"use client";
import Clock, { parseStringTimes } from "@/components/graphs/Clock";
import { SurveyPart, SurveyPartFWGraph } from "@/components/layout/SurveyPart";
import { useState } from "react";
import { defaultHBGraphBounds, defaultMapBounds } from "./AllGraphs";
import { chooseColors, defaultBarColor } from "./common/color";
import { allSurveyData } from "./common/surveyData";
import { VerticalBarGraph } from "./graphs/BarGraph";
import { CompensationBoxplotWithOutlierToggle } from "./graphs/custom/CompensationBoxplot";
import { ExchangeUniversityGraph } from "./graphs/custom/ExchangeUniversityGraph";
import { FamilyHomeGraph } from "./graphs/custom/FamilyHomeGraph";
import {
	FoodBoxplotCoop,
	FoodBoxplotSchool,
} from "./graphs/custom/FoodBoxplot";
import { FriendshipGraph } from "./graphs/custom/FriendshipGraph";
import { FTCityGraph } from "./graphs/custom/FTCityGraph";
import { IronRingGraph } from "./graphs/custom/IronRingGraph";
import { LeetcodeBoxplot } from "./graphs/custom/LeetcodeBoxplot";
import { MentalHealthGraph } from "./graphs/custom/MentalHealthGraph";
import { ProfGraph } from "./graphs/custom/ProfGraph";
import { RicePurityGraph } from "./graphs/custom/RicePurityGraph";
import { SalaryBoxplot } from "./graphs/custom/SalaryBoxplot";
import { TermAveragesGraph } from "./graphs/custom/TermAveragesGraph";
import LineGraph from "./graphs/LineGraph";

import genderVsCoopDataRaw from "@/data/cleaned/coop_salary_vs_gender.json";
import correlations from "@/data/cleaned/correlations.json";
import { Emoji } from "./Emoji";
import CoopFlow from "./graphs/custom/CoopFlow";
import { FTvsFamilyIncomeGraph } from "./graphs/custom/FTvsFamilyIncomeGraph";
import { FTvsGender } from "./graphs/custom/FTvsGenderBoxPlot";
import { FTvsGradesGraph } from "./graphs/custom/FTvsGradesGraph";
import { GradProgramDisplay } from "./graphs/custom/GradProgramDisplay";
import { GradSchoolDisplay } from "./graphs/custom/GradSchoolDisplay";
import { OverloadAnswers } from "./graphs/custom/OverloadAnswers";
import { StreamComparison } from "./graphs/custom/StreamComparison";
import Legend from "./graphs/parts/Legend";

type CustomRendererProps = {
	title: string;
	labels: string[] | number[];
	counts: number[];
	description?: React.ReactNode;
	dataObject: {
		labels: number[] | string[];
		counts: number[];
		n: number;
	};
	overrides?: object;
};

const defaultGraphBounds = {
	width: 400,
	height: 300,
	marginTop: 40,
	marginBottom: 40,
	marginLeft: 100,
	marginRight: 40,
};

const defaultGraphBoundsBoxPlot = {
	width: 400,
	height: 350,
	marginTop: 40,
	marginBottom: 40,
	marginLeft: 100,
	marginRight: 40,
};

export default function CustomRenderer(props: CustomRendererProps) {
	const { title, description, dataObject, overrides } = props;

	const [useClockDisplay, setUseClockDisplay] = useState(false);

	switch (title) {
		case "On average, when do you go to sleep?":
			const reducedTimes = parseStringTimes(
				dataObject.labels.map((t) => `${t}`),
			).reduce(
				(prev, curr, index) => {
					if (prev[curr.hour]) {
						prev[curr.hour] += dataObject.counts[index];
					} else {
						prev[curr.hour] = dataObject.counts[index];
					}
					return prev;
				},
				{} as { [key: number]: number },
			);

			// Through the power of just looking at the data
			// we know that the last two entries are actually PM
			const hours = Object.keys(reducedTimes);
			const counts = Object.values(reducedTimes);
			const shiftedHours = [
				...hours.slice(hours.length - 2),
				...hours.slice(0, hours.length - 2),
			].map((hour) => {
				if (parseInt(hour) > 12) {
					return `${parseInt(hour) - 12} PM`;
				} else if (parseInt(hour) > 0) {
					return `${hour} AM`;
				} else {
					return "12 AM";
				}
			});
			const shiftedCounts = [
				...counts.slice(counts.length - 2),
				...counts.slice(0, counts.length - 2),
			];

			return (
				<SurveyPart
					title={title}
					n={dataObject.n}
					graph={
						<>
							{useClockDisplay ? (
								<Clock
									times={Object.keys(reducedTimes).map((t) => ({
										hour: parseInt(t),
										minute: 0,
									}))}
									counts={Object.values(reducedTimes)}
									clockColor="white"
									{...defaultGraphBounds}
									{...overrides}
								/>
							) : (
								<VerticalBarGraph
									{...defaultGraphBounds}
									bins={shiftedCounts}
									labels={shiftedHours}
									barColor={defaultBarColor}
									binSpacing={5}
								/>
							)}
							<div
								style={{
									display: "flex",
									justifyContent: "center",
								}}
							>
								<input
									type="checkbox"
									id={`use-clock-${title}`}
									checked={useClockDisplay}
									style={{ marginRight: 10, cursor: "pointer" }}
									onChange={(e) => setUseClockDisplay(e.target.checked)}
								/>
								<label htmlFor={`use-clock-${title}`}>
									<Emoji>⏰ ⁉️</Emoji>
								</label>
							</div>
						</>
					}
					description={description}
				/>
			);
		case "Rice purity test score?":
			return (
				<SurveyPart
					title={title}
					n={0}
					graph={
						<RicePurityGraph {...defaultGraphBoundsBoxPlot} {...overrides} />
					}
					description={description}
				/>
			);
		case "What was your term average?":
			return (
				<SurveyPartFWGraph
					title={title}
					n={0}
					graph={
						<TermAveragesGraph {...defaultGraphBoundsBoxPlot} {...overrides} />
					}
					description={description}
				/>
			);
		case "What mental health issues have you faced?":
			return (
				<SurveyPart
					title={title}
					n={
						allSurveyData["What mental health issues have you faced? [Anxiety]"]
							?.n
					}
					graph={<MentalHealthGraph {...defaultHBGraphBounds} {...overrides} />}
					description={description}
				/>
			);
		case "How many close friends do you have that you first met in high school?":
			return (
				<SurveyPartFWGraph
					title="How did you meet your close friends?"
					n={dataObject.n}
					graph={<FriendshipGraph {...defaultGraphBounds} {...overrides} />}
					description={description}
				/>
			);
		case "How many Leetcode problems have you solved?":
			return (
				<SurveyPart
					title={title}
					n={
						allSurveyData["How many Leetcode Easy problems have you solved?"]?.n
					}
					graph={
						<LeetcodeBoxplot {...defaultGraphBoundsBoxPlot} {...overrides} />
					}
					description={description}
				/>
			);
		case "What was your hourly co-op salary?":
			return (
				<SurveyPartFWGraph
					title={title}
					n={0}
					graph={
						<SalaryBoxplot {...defaultGraphBoundsBoxPlot} {...overrides} />
					}
					description={description}
				/>
			);
		case "What is your iron ring size?":
			return (
				<SurveyPartFWGraph
					title={title}
					n={dataObject.n}
					graph={
						<IronRingGraph
							{...defaultGraphBounds}
							marginLeft={50}
							marginTop={25}
							// Just trust me bro
							height={172}
						/>
					}
					description={description}
				/>
			);
		/* removed since there's no way to make this look nice since different parts of 
		   TC are scaled differently
		case "What is your annual base salary?":
			return (
				<SurveyPartFWGraph
					title={title}
					n={dataObject.n}
					graph={
						<CompensationBoxplot
							{...defaultGraphBoundsBoxPlot}
							{...overrides}
						/>
					}
					description={description}
				/>
			);
			*/
		case "Where is your family's home located?":
			return (
				<SurveyPart
					title={title}
					n={dataObject.n}
					graph={<FamilyHomeGraph {...defaultMapBounds} />}
					description={description}
				/>
			);
		case "Which university did you go to on exchange?":
			return (
				<SurveyPart
					title={title}
					n={dataObject.n}
					graph={<ExchangeUniversityGraph {...defaultMapBounds} />}
					description={description}
				/>
			);
		case "What city will you be living in full-time after graduation?":
			return (
				<SurveyPart
					title={title}
					n={dataObject.n}
					graph={<FTCityGraph {...defaultMapBounds} />}
					description={description}
				/>
			);
		// "How many times do you cook/go out to eat per week..."
		case "During school terms?":
			return (
				<SurveyPartFWGraph
					title={title}
					n={Math.max(
						allSurveyData[
							"How many meals do you cook per week on average during school terms?"
						]?.n ?? 0,
						allSurveyData[
							"How many times do you go out to eat per week on average during school terms?"
						]?.n ?? 0,
					)}
					graph={<FoodBoxplotSchool {...defaultGraphBoundsBoxPlot} />}
					description={description}
				/>
			);
		case "During co-op terms?":
			return (
				<SurveyPartFWGraph
					title={title}
					n={Math.max(
						allSurveyData[
							"How many meals do you cook per week on average during co-op terms?"
						]?.n ?? 0,
						allSurveyData[
							"How many times do you go out to eat per week on average during co-op terms?"
						]?.n ?? 0,
					)}
					graph={<FoodBoxplotCoop {...defaultGraphBounds} />}
					description={description}
				/>
			);
		case "Favourite core course professor?":
			return (
				<SurveyPartFWGraph
					title={title}
					n={dataObject.n}
					graph={<ProfGraph {...defaultGraphBounds} />}
					description={description}
				/>
			);
		case "Average Hourly Co-op Salary vs Gender":
			// men at index 0, women at index 1
			// const nCounts = [genderVsCoopDataRaw["Men"]["N"], genderVsCoopDataRaw["Women"]["N"]];
			const genderVsCoopData: number[][] = [
				genderVsCoopDataRaw["Men"]["Values"],
				genderVsCoopDataRaw["Women"]["Values"],
			];

			const bounds = {
				...defaultGraphBounds,
				...overrides,
			};

			return (
				<SurveyPartFWGraph
					title={title}
					n={dataObject.n}
					graph={
						<LineGraph
							{...defaultGraphBounds}
							lines={genderVsCoopData}
							xLabels={[
								"Coop 1",
								"Coop 2",
								"Coop 3",
								"Coop 4",
								"Coop 5",
								"Coop 6",
							]}
							lineColors={chooseColors(2)}
							titleSize={24}
							titleOffset={40}
							yAxisTitle="Average Hourly Salary (CAD)"
							height={200}
							fontSize={4}
							marginLeft={40}
							points={[
								(x, y, index) => (
									<g key={index + "man-salary"}>
										<circle cx={x} cy={y} r={2} fill={chooseColors(2)[0]} />
										<text x={x - 6} y={y + 7} fontSize={4} fill={"white"}>
											{genderVsCoopData[0][index]}
										</text>
									</g>
								),
								(x, y, index) => (
									<g key={index + "woman-salary"}>
										<circle cx={x} cy={y} r={2} fill={chooseColors(2)[1]} />
										<text x={x - 6} y={y - 6} fontSize={4} fill={"white"}>
											{genderVsCoopData[1][index]}
										</text>
									</g>
								),
							]}
						>
							<Legend
								x={bounds.width - bounds.marginRight}
								y={10}
								alignTo={"right"}
								direction={"desc"}
								colorIndicatorSize={6}
								textOffset={3}
								textSize={4}
								indicatorGap={2}
								legendItems={[
									{ label: "Women", color: chooseColors(2)[1] },
									{ label: "Men", color: chooseColors(2)[0] },
								]}
							/>
						</LineGraph>
					}
					description={description}
				/>
			);
		case "Full-time Total Compensation vs Gender":
			return (
				<SurveyPart
					title={title}
					n={0}
					graph={<FTvsGender {...defaultGraphBoundsBoxPlot} {...overrides} />}
					description={description}
				/>
			);
		case "Full-time Total Compensation vs Grades":
			return (
				<SurveyPartFWGraph
					title={title}
					n={correlations["Full-Time Salary vs. GPA"].length}
					graph={
						<FTvsGradesGraph
							{...defaultGraphBounds}
							height={200}
							marginLeft={40}
							marginTop={20}
						/>
					}
					description={description}
				/>
			);
		case "Full-time Total Compensation vs Family Income":
			const corrBounds = {
				...defaultGraphBounds,
				...overrides,
			};

			return (
				<SurveyPartFWGraph
					title={title}
					n={correlations["Full-Time Salary vs. Family Income"].data.length}
					graph={<FTvsFamilyIncomeGraph {...corrBounds} />}
					description={description}
				/>
			);
		case "Co-op Regions - Flow over Terms":
			return (
				<SurveyPartFWGraph
					title={title}
					n={dataObject.n}
					graph={<CoopFlow />}
					description={description}
				/>
			);
		case "Which school?":
			return (
				<SurveyPartFWGraph
					title={title}
					n={dataObject.n}
					graph={<GradSchoolDisplay />}
					description={description}
				/>
			);
		case "What is your research topic or program?":
			return (
				<SurveyPartFWGraph
					title={title}
					n={dataObject.n}
					graph={<GradProgramDisplay />}
					description={description}
				/>
			);
		case "If you have overloaded, which course(s) did you overload, and did you complete the course(s)?":
			return (
				<SurveyPartFWGraph
					title={title}
					n={dataObject.n}
					graph={<OverloadAnswers />}
					description={description}
				/>
			);
		case "Stream 8 vs 8x vs 8y":
			return (
				<StreamComparison
					counts={dataObject.counts}
					labels={dataObject.labels.map((label) => label.toString())}
					n={dataObject.n}
					description={description}
					overrides={overrides}
					title={title}
				/>
			);
		case "What is your total first-year compensation?":
		case "What is your annual base salary?":
		case "What is your one-time sign-on bonus?":
		case "What is the value of your first-year stock grant?":
		case "What is your total stock grant value?":
			// This case doesn't actually have any outliers
			// case "What is your end-of-year/recurring annual compensation?":
			return (
				<SurveyPart
					title={title}
					n={dataObject.n}
					graph={
						<CompensationBoxplotWithOutlierToggle
							dataset={dataObject}
							title={title.replaceAll(" ", "")}
						/>
					}
					description={description}
				/>
			);
		default:
			console.warn("No custom renderer found for question: ", title);
			return (
				<SurveyPart
					title={title}
					n={dataObject.n}
					graph={"CUSTOM GRAPH OR THINGY"}
					description={description}
				/>
			);
	}
}

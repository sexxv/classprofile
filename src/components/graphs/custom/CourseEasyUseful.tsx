"use client";

import { AnimatedHorizontalBarGraph } from "@/components/graphs/AnimatedBarGraph";
import { IndividualGraphData } from "@/components/graphs/ButtonToggleGraph";
import { GraphBounds } from "@/components/graphs/GraphBase";
import { NPart } from "@/components/layout/SurveyComponents";
import { useState } from "react";

import { formatCourseCode } from "@/components/common/surveyData";
import pageStyles from "../../page.module.css";
import styles from "../ButtonToggleGraph.module.css";

type CourseEasyUsefulGraphProps = GraphBounds & {
	opinions: Record<string, IndividualGraphData[]>;
	buttonColours: string[];
	barColours: string[];
};

export default function CourseEasyUsefulGraph(
	props: CourseEasyUsefulGraphProps,
) {
	const {
		height,
		width,
		marginBottom,
		marginLeft,
		marginRight,
		marginTop,
		opinions,
		buttonColours,
		barColours,
	} = props;
	const courses = Object.keys(opinions);
	const [currentCourse, setCurrentCourse] = useState<string>(courses[0]);

	const currentCourseIndex = courses.indexOf(currentCourse);

	const customLabels = [
		["Very easy | 5", 4, 3, 2, "Very difficult | 1"],
		["Very useful | 5", 4, 3, 2, "Not useful | 1"],
	];

	return (
		<div className={styles.reverseMobileFlexContainer}>
			<div className={styles.flexContainer}>
				{opinions[currentCourse].map((courseData, index) => {
					const calcWeightedSum = courseData.counts.reduce(
						(acc, count, i) => acc + count * (5 - i),
						0,
					);

					return (
						<div key={index} style={{ flex: 1 }}>
							<div
								style={{
									display: "flex",
									justifyContent: "center",
									marginBottom: 0,
									fontSize: 20,
									fontFamily: "var(--font-jersey-10)",
								}}
							>
								<NPart backgroundColour={barColours[currentCourseIndex]}>
									{courseData.n} Average:{" "}
									{(calcWeightedSum / courseData.n).toFixed(2)}
								</NPart>
							</div>
							<AnimatedHorizontalBarGraph
								key={index}
								width={width}
								height={height}
								marginTop={marginTop}
								marginRight={marginRight}
								marginBottom={marginBottom}
								marginLeft={marginLeft}
								data={courseData.counts} // to make the ordering work
								title={courseData.title ?? ""}
								labels={customLabels[index] as string[]}
								tickSize={5}
								xTickLabelSize={10}
								yTickLabelSize={10}
								binSpacing={5}
								xAxisTitle={"Number of Respondents"}
								yAxisTitle={""}
								axisLabelSize={10}
								titleSize={18}
								textColor={"white"}
								barColor={barColours[currentCourseIndex]}
							/>
						</div>
					);
				})}
			</div>
			<div className={styles.toggleButtonContainer}>
				{courses.map((course, index) => (
					<button
						onClick={() => {
							setCurrentCourse(course);
						}}
						key={course}
						style={{ backgroundColor: buttonColours[index] }}
						className={currentCourse === course ? styles.active : ""}
					>
						{formatCourseCode(course)}
					</button>
				))}
			</div>
			<div className={pageStyles.actionTextClickUpDownOnMobile} />
		</div>
	);
}

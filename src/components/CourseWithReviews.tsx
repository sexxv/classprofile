import Image from "next/image";
import styles from "../components/layout/SurveyComponents.module.css";
import { defaultGraphBounds } from "./AllGraphs";
import { TasteDaRainbow } from "./common/color";
import { formatCourseCode } from "./common/surveyData";
import { VerticalBarGraph } from "./graphs/BarGraph";
import { COURSES_TO_NAMES } from "./mappings/CoursesMappings";
import { BASE_PATH } from "@/basepath";

type CourseWithReviews = {
	name: string;
	description: string;
	andWhy: string[];
	alsoShowGraph?: boolean;
};

function isNoReviewCourse(elective: {
	name: string;
	description: string;
	andWhy: string[];
}): boolean {
	return elective.andWhy.length === 1 && elective.andWhy[0] === "";
}

function Course({
	elective,
	icon,
	pillColor,
}: {
	elective: CourseWithReviews;
	icon: string;
	pillColor: string;
}) {
	const { name, description, andWhy } = elective;
	const heartCount = elective.andWhy.length;

	return (
		<div
			style={{
				marginBottom: 20,
				marginTop: 10,
				lineHeight: 1.5,
			}}
		>
			<div
				style={{
					alignItems: "center",
					display: "flex",
					justifyContent: "space-between",
					marginBottom: 4,
				}}
			>
				<div>
					<span
						style={{ fontFamily: "var(--font-jersey-10)", fontSize: "28px" }}
					>
						{formatCourseCode(name)}
					</span>
				</div>
				<div
					style={{
						display: "flex",
						gap: "10px",
						height: "30px",
						justifyContent: "center",
						alignItems: "center",
						backgroundColor: pillColor,
						padding: "16px 8px",
						paddingTop: 20,
						borderRadius: "10px",
					}}
				>
					{icon && (
						<div>
							<Image
								src={BASE_PATH + icon}
								alt={icon.split(".")[0]}
								height={22}
								width={22}
							/>
						</div>
					)}
					<div
						style={{
							display: "flex",
							alignItems: "center",
							marginBottom: "2px",
						}}
					>
						<span style={{ fontFamily: "var(--font-jersey-10)" }}>
							{heartCount} {!icon && ` vote${heartCount > 1 ? "s" : ""}`}
						</span>
					</div>
				</div>
			</div>
			<div style={{ marginTop: description ? -12 : 0 }}>
				<a
					style={{
						fontFamily: "var(--font-jersey-10)",
						fontSize: 20,
						textDecoration: "underline",
						lineHeight: 1.1,
					}}
					className={styles.hoverLink}
					href={"https://uwflow.com/course/" + name.toLowerCase()}
					rel="noreferrer"
					target="_blank"
					title="View course on UW Flow"
				>
					{description}
				</a>
				{!isNoReviewCourse(elective) &&
					andWhy.map(
						(reason, index) =>
							reason && (
								<div key={index} style={{ margin: "6px 0px", fontSize: 18 }}>
									<span>&apos;{reason}&apos;</span>
								</div>
							),
					)}
			</div>
		</div>
	);
}

export default function CourseWithReviewsDisplay({
	coursesToShow,
	icon,
	pillColor = TasteDaRainbow.red,
	bins = undefined,
	labels = undefined,
}: {
	coursesToShow: object;
	icon?: string;
	pillColor?: string;
	bins?: number[];
	labels?: number[];
}) {
	const ELECTIVES = Object.entries(coursesToShow)
		.map(([key, value]) => ({
			name: key,
			description: COURSES_TO_NAMES[key],
			andWhy: value,
		}))
		.sort((a, b) => {
			// sort by number of reviews, then secondarily sort by review length
			const aLength = a.andWhy.length;
			const bLength = b.andWhy.length;
			if (aLength === bLength) {
				const numEmptyReviewsA = a.andWhy.filter(
					(x: string) => x === "",
				).length;
				const numEmptyReviewsB = b.andWhy.filter(
					(x: string) => x === "",
				).length;
				if (numEmptyReviewsA === numEmptyReviewsB) {
					return a.name.localeCompare(b.name);
				}
				return numEmptyReviewsA - numEmptyReviewsB;
			}
			return bLength - aLength;
		});

	const numCharsPerLine = 60;
	const numLinesPerTitle = 6;

	const getElectiveLineCount = (elective: CourseWithReviews) => {
		const reviewLines = elective.andWhy.reduce(
			(acc: number, x: string) =>
				x !== "" ? acc + Math.ceil(x.length / numCharsPerLine) : acc,
			0,
		);
		return reviewLines + numLinesPerTitle;
	};

	const totalLines = ELECTIVES.reduce(
		(acc, e) => acc + getElectiveLineCount(e),
		0,
	);
	const linesPerColumn = Math.ceil(totalLines / 3);

	const columns: CourseWithReviews[][] = [[], [], []];
	let currentColumn = 0;
	let currentLines = 0;

	for (let i = 0; i < ELECTIVES.length; i++) {
		const e = ELECTIVES[i];
		const lineCount = getElectiveLineCount(e);

		if (currentLines + lineCount > linesPerColumn && currentColumn < 2) {
			currentColumn++;
			currentLines = 0;
		}

		columns[currentColumn].push(e);
		currentLines += lineCount;
	}

	return (
		<>
			<div style={{ width: "100%" }}>
				{bins && labels && (
					<VerticalBarGraph
						{...defaultGraphBounds}
						bins={bins}
						labels={labels}
						barColor={pillColor}
						binSpacing={5}
						fontSize={12}
						width={1000}
					/>
				)}
			</div>
			<div className={styles.courseWithReviewsContainer}>
				{columns.map((column, index) => (
					<div key={index} style={{ flex: 1 }}>
						{column.map((elective: CourseWithReviews) => (
							<Course
								key={elective.name}
								elective={elective}
								icon={icon ?? ""}
								pillColor={pillColor}
							/>
						))}
					</div>
				))}
			</div>
		</>
	);
}

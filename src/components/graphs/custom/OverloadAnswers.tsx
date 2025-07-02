import {
	allSurveyData,
	formatCourseCode,
} from "@/components/common/surveyData";
import { Emoji } from "@/components/Emoji";
import { COURSES_TO_NAMES } from "@/components/mappings/CoursesMappings";
import styles from "../../page.module.css";
import componentStyles from "./OverloadAnswers.module.css";

const rawData =
	allSurveyData[
		"If you have overloaded, which course(s) did you overload, and did you complete the course(s)?"
	]!;

const NUM_CHARS_PER_LINE = 90;
const HEADING_LINE_COUNT = 6;

// Join responses with counts
const joinedData: {
	label: string;
	count: number;
}[] = [];
for (let i = 0; i < rawData.counts.length; ++i) {
	joinedData.push({
		label: rawData.labels[i].toString(),
		count: rawData.counts[i],
	});
}

// Object that will eventually hold mappings of sections to
// the responses for what courses were overridden
const sections: {
	[key: string]: {
		[key: string]: {
			[key: string]: number;
		};
	};
} = {
	Misc: {},
};

// Man I really wish I had Spark right now
joinedData.forEach(({ label, count }) => {
	// Terms are split by lines
	const lines = label.split("\r\n");

	lines.forEach((line) => {
		const colonIndex = line.indexOf(":");

		// If there's no colon, it's going into the "Misc" category
		if (colonIndex < 0) {
			// screw you earth 122
			if (COURSES_TO_NAMES[line]) {
				// No duplicate protection but that shouldn't matter for individual anecdotes, right?
				sections["Misc"][line] = {
					"not specified": count,
				};
			} else {
				sections["Misc"][line] = {};
			}

			return;
		}

		// Assume normal responses are formatted as:
		// <term>: <course name> (<course completion status>)
		// possibly with multiple comma separated courses and completion statuses
		const term = line.slice(0, colonIndex);

		// Filter out courses over co-op since that's not *really* overloading imo
		if (term.indexOf("Coop") === 0) {
			return;
		}

		// Multiple overloads(!) in a term are split by comma
		const courses = line
			.slice(colonIndex + 1)
			.trim()
			.split(",");
		if (!sections[term]) {
			sections[term] = {};
		}

		// Add counts for each course mentioned in the line
		courses.forEach((course) => {
			const cleanCourse = course.trim();

			let courseCode = cleanCourse;
			if (cleanCourse.indexOf(" ") > -1) {
				courseCode = cleanCourse.substring(0, cleanCourse.indexOf(" "));
			}
			let completionStatus = "not specified";
			// Assume that completion status is in parentheses, so
			// manually add an "(unknown)" status if this is missing
			if (cleanCourse.indexOf("(") >= 0) {
				completionStatus = cleanCourse.substring(
					cleanCourse.indexOf("(") + 1,
					cleanCourse.indexOf(")"),
				);
			}

			if (!sections[term][courseCode]) {
				sections[term][courseCode] = {};
			}

			if (sections[term][courseCode][completionStatus]) {
				sections[term][courseCode][completionStatus] += count;
			} else {
				sections[term][courseCode][completionStatus] = count;
			}
		});
	});
});

// Hardcoded list of terms for the sake of having a sorting order
const HARDCODED_STREAM_8_SEQ = [
	"1A",
	"1B",
	"Coop 1",
	"2A",
	"Coop 2",
	"2B",
	"Coop 3",
	"3A",
	"Coop 4",
	"3B",
	"Coop 5",
	"4A",
	"Coop 6",
	"4B",
];

// We're just going to do all of the processing outside of the component.
// This really shouldn't matter since build is static but just to make it clear that this
// doesn't need render logic...

const entries: [
	string,
	[
		string,
		{
			[key: string]: number;
		},
	][],
][] = Object.entries(sections).map(([key, value]) => [
	key,
	Object.entries(value),
]);

entries.sort((a, b) => {
	let aIndex = HARDCODED_STREAM_8_SEQ.indexOf(a[0]);
	let bIndex = HARDCODED_STREAM_8_SEQ.indexOf(b[0]);

	if (aIndex < 0) {
		aIndex += 100;
	}
	if (bIndex < 0) {
		bIndex += 100;
	}

	return aIndex - bIndex;
});

// Everything from this point onward is stolen from TextDisplay for the most part
// (thank you hannah!)
let mid = 0;
const totalLineCount = entries.reduce((acc, [, cLabels]) => {
	const labelLines = cLabels.reduce(
		(sum, d) =>
			sum +
			Math.ceil(d[0].length / NUM_CHARS_PER_LINE) +
			Object.keys(d[1]).length,
		0,
	);
	return acc + HEADING_LINE_COUNT + labelLines;
}, 0);

const linesPerColumn = Math.ceil(totalLineCount / 2);
let currentLines = 0;
for (let i = 0; i < entries.length; i++) {
	const currentLineCount =
		HEADING_LINE_COUNT +
		entries[i][1].reduce(
			(sum, d) =>
				sum +
				Math.ceil(d[0].length / NUM_CHARS_PER_LINE) +
				Object.keys(d[1]).length,
			0,
		);

	if (currentLines + currentLineCount - 2 > linesPerColumn) break;
	currentLines += currentLineCount;
	mid++;
}

const firstColumn = entries.slice(0, mid);
const secondColumn = entries.slice(mid);

export function OverloadAnswers() {
	return (
		<div className={styles.textDisplayContainer}>
			<div style={{ flex: 1 }}>
				{firstColumn.map(([category, labels]) =>
					renderCategoryBlock(category, labels),
				)}
			</div>
			<div style={{ flex: 1 }}>
				{secondColumn.map(([category, labels]) =>
					renderCategoryBlock(category, labels),
				)}
			</div>
		</div>
	);
}

const renderCategoryBlock = (
	category: string,
	entries: [string, { [key: string]: number }][],
) => (
	<div key={category} style={{ marginBottom: 40 }}>
		<h3 className={styles.subsubtitle}>{category}</h3>
		{entries.map(([label, statuses]) => {
			return (
				<div key={label} style={{ marginTop: 10, marginBottom: 10 }}>
					{COURSES_TO_NAMES[label] ? (
						<>
							{formatCourseCode(label)}:{" "}
							<a
								className={componentStyles.hoverLink}
								href={"https://uwflow.com/course/" + label.toLowerCase()}
								rel="noreferrer"
								target="_blank"
								title="View course on UW Flow"
							>
								{COURSES_TO_NAMES[label] ?? ""}
							</a>
						</>
					) : (
						<>&quot;{label}&quot;</>
					)}
					{Object.entries(statuses).map(([status, count]) => {
						let statusIcon: React.ReactNode = "";
						switch (status) {
							case "completed":
								statusIcon = <Emoji>✔️</Emoji>;
								break;
							case "did not complete":
								statusIcon = <Emoji>❌</Emoji>;
								break;
							case "not specified":
								statusIcon = <Emoji>❔</Emoji>;
								break;
							default:
								statusIcon = "";
								break;
						}

						return (
							<div style={{ paddingLeft: "24px" }} key={`${label}-${status}`}>
								<span
									style={{
										width: "36px",
										display: "inline-block",
										textAlign: "center",
									}}
								>
									{statusIcon}
								</span>
								{status.substring(0, 1).toUpperCase()}
								{status.substring(1)}
								{
									<span style={{ fontWeight: 600 }}>
										{" "}
										({count} respondent{count > 1 ? "s" : ""})
									</span>
								}
							</div>
						);
					})}
				</div>
			);
		})}
	</div>
);

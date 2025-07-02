import { defaultBarColor } from "../common/color";
// import { QUESTIONS_TO_SECTIONS } from "../mappings/QuestionsToSections";
import pageStyles from "../page.module.css";
import styles from "./SurveyComponents.module.css";
import partStyles from "./SurveyPart.module.css";

export function convertToLinkFormat(question: string) {
	return question
		.replaceAll(" ", "-")
		.toLowerCase()
		.replace(/[.,\/#!$%\^&\*;:{}=?'\-_`~()]/g, "");
}

export function getQuestionSectionLink(section: string, question: string) {
	return `${convertToLinkFormat(section)}_${convertToLinkFormat(question)}`;
}

export function TitlePart({
	children,
}: {
	children: React.ReactNode;
}): React.ReactNode {
	/*
	const id = getQuestionSectionLink(
		// JANK
		QUESTIONS_TO_SECTIONS[children as keyof typeof QUESTIONS_TO_SECTIONS]
			?.section ?? "",
		children as string,
	);
	*/

	switch (typeof children) {
		case "string":
			return (
				<h2 className={`${pageStyles.subtitle} ${styles.title}`}>
					{children}
					{/* <a href={`#${id}`} style={{ fontSize: 20, marginLeft: 10 }}>
						🔗
					</a> */}
				</h2>
			);
		case "number":
		case "bigint":
		case "boolean":
		case "symbol":
		case "undefined":
		case "object":
		case "function":
			return <>{children}</>;
	}
}

export function DescriptionPart({ children }: { children: React.ReactNode }) {
	switch (typeof children) {
		case "string":
		case "number":
		case "bigint":
		case "boolean":
		case "symbol":
		case "undefined":
			return <p className={styles.description}>{children}</p>;
		case "object":
		case "function":
		default:
			return <span className={styles.description}>{children}</span>;
	}
}

export function NPart({
	children,
	backgroundColour,
	isCompanyN,
}: {
	children: React.ReactNode;
	backgroundColour?: string;
	isCompanyN?: boolean;
}) {
	// NOTE I HAVE HACKED THIS TO NOT DISPLAY IF N IS 0.
	// SO YOU CAN MODIFY THE SURVEY JSON FILES TO NOT DISPLAY THIS BY SETTING THE N TO 0.
	// YOU SHOULD ONLY DO THIS WHEN THE SUM OF COUNTS IS EQUAL TO N (I.E. NOT MULTI-SELECT)

	switch (typeof children) {
		case "string":
		case "number":
		case "bigint":
		case "boolean":
		case "symbol":
		case "undefined":
		case "object":
		case "function":
			return (
				<div
					className={partStyles.nPill}
					style={{
						backgroundColor: backgroundColour ?? defaultBarColor,
					}}
				>
					{isCompanyN ? "Companies with Data" : "Number of Respondents"} (n):{" "}
					{children}
				</div>
			);
		default:
			return <>{children}</>;
	}
}

type InteractiveType =
	| "hover_for_counts"
	| "hover_bp_for_stats"
	| "toggle"
	| "hover_bubble_map";

// map from InteractiveType to a string message
// that will be displayed in the pill

// const interactiveTypeMessages: Record<InteractiveType, string> = {
// 	hover_for_counts: "Hover for counts 👆",
// 	hover_bp_for_stats: "Hover box plot for more stats 👆",
// 	toggle: "Click to toggle",
// };

export function InteractivePill({
	type,
}: {
	type: InteractiveType;
}): React.ReactElement {
	return (
		<div
			className={`${partStyles.interactivePill} ${type === "hover_for_counts" ? pageStyles.actionTextHoverForCounts : type === "hover_bubble_map" ? pageStyles.actionTextBubbleMap : pageStyles.actionTextHoverForBoxPlotCounts}`}
		/>
	);
}

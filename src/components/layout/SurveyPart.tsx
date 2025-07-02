import { SURVEY_QUESTION } from "../mappings/QuestionsList";
import { QUESTIONS_TO_SECTIONS } from "../mappings/QuestionsToSections";
import {
	APPLY_BIG_MOBILE_REVERSE_PADDING_TO_THESE_QUESTIONS,
	APPLY_MOBILE_REVERSE_PADDING_TO_THESE_QUESTIONS,
} from "../mappings/QuestionWidthOverride";
import {
	DescriptionPart,
	getQuestionSectionLink,
	NPart,
	TitlePart,
} from "./SurveyComponents";
import styles from "./SurveyPart.module.css";

type SurveyPartProps = {
	title: React.ReactNode;
	n?: number;
	description?: React.ReactNode;
	graph: React.ReactNode;
	displayGraphBelow?: boolean;
};

export function SurveyPart(props: SurveyPartProps) {
	const { title, n, description, graph, displayGraphBelow } = props;

	const id = getQuestionSectionLink(
		QUESTIONS_TO_SECTIONS[title as keyof typeof QUESTIONS_TO_SECTIONS]
			?.section ?? "",
		title as string,
	);

	return (
		<section
			className={`${styles.sectionWrapper} + ${displayGraphBelow ? `${styles.halfWidth}` : ""}`}
			id={id}
		>
			<div className={styles.textWrapper}>
				<TitlePart>{title}</TitlePart>
				{n ? <NPart isCompanyN={false}>{n}</NPart> : undefined}
				{description ? (
					<>
						<div className={styles.verticalSpace} />
						<DescriptionPart>{description}</DescriptionPart>
					</>
				) : undefined}
			</div>
			<div
				className={`${styles.graph} ${APPLY_MOBILE_REVERSE_PADDING_TO_THESE_QUESTIONS.includes(title as SURVEY_QUESTION) ? styles.mobileReverseMarginGraph : APPLY_BIG_MOBILE_REVERSE_PADDING_TO_THESE_QUESTIONS.includes(title as SURVEY_QUESTION) ? styles.mobileBigReverseMarginGraph : ""}`}
			>
				{graph}
			</div>
		</section>
	);
}

export function SurveyPartFWGraph(props: SurveyPartProps) {
	const { title, n, description, graph } = props;

	return (
		<section className={styles.sectionWrapperFW}>
			<div className={styles.textWrapper}>
				<TitlePart>{title}</TitlePart>
				{n ? <NPart>{n}</NPart> : undefined}
				{description ? (
					<>
						<div className={styles.verticalSpace} />
						<DescriptionPart>{description}</DescriptionPart>
						<div className={styles.verticalSpace} />
					</>
				) : undefined}
			</div>
			<div className={styles.verticalSpace} />
			<div className={styles.graph}>{graph}</div>
		</section>
	);
}

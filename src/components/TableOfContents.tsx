import { Link } from "react-scroll";
import { SURVEY_SECTIONS } from "./mappings/QuestionsToSections";

import { sendGAEvent } from "@next/third-parties/google";
import styles from "./page.module.css";
import componentStyles from "./TableOfContents.module.css";

export function TableOfContents() {
	// two columns

	// the + 1 is because we always have (length + 1 acknowledgement) sections
	// and we want the extra section on the left
	const leftSurveySections = SURVEY_SECTIONS.slice(
		0,
		Math.ceil((SURVEY_SECTIONS.length + 1) / 2),
	);
	const rightSurveySections = SURVEY_SECTIONS.slice(
		Math.ceil((SURVEY_SECTIONS.length + 1) / 2),
	);

	return (
		<div className={componentStyles.wrapper}>
			<h2 className={styles.title} style={{ paddingTop: 0 }}>
				Table of Contents
			</h2>
			<div className={componentStyles.tableOfContentsSection}>
				<div>
					{leftSurveySections.map((section, idx) => {
						// const sectionLinkFormat = convertToLinkFormat(section);
						return (
							<div
								key={`section-${section}`}
								className={componentStyles.sectionEntry}
							>
								<span
									className={`${styles.subsubtitle} ${componentStyles.number}`}
								>
									{idx + 1}.{" "}
								</span>
								<Link
									to={section}
									spy={true}
									className={styles.subsubtitle}
									style={{ cursor: "pointer" }}
									onClick={() => {
										sendGAEvent("event", "tocSectionClicked", {
											value: section,
										});
									}}
								>
									{section}
								</Link>
								<p className={styles.desc}>{SectionSubtitles[section]}</p>
							</div>
						);
					})}
				</div>
				<div>
					{rightSurveySections.map((section, idx) => {
						// const sectionLinkFormat = convertToLinkFormat(section);
						return (
							<div
								key={`section-${section}`}
								className={componentStyles.sectionEntry}
							>
								<span
									className={`${styles.subsubtitle} ${componentStyles.number}`}
								>
									{Math.ceil(SURVEY_SECTIONS.length / 2) + idx + 2}.{" "}
								</span>
								<Link
									to={section}
									spy={true}
									className={styles.subsubtitle}
									style={{ cursor: "pointer" }}
									onClick={() => {
										sendGAEvent("event", "tocSectionClicked", {
											value: section,
										});
									}}
								>
									{section}
								</Link>
								<p className={styles.desc}>{SectionSubtitles[section]}</p>
							</div>
						);
					})}

					<div
						key={`section-acknowledgements`}
						className={componentStyles.sectionEntry}
					>
						<span className={`${styles.subsubtitle} ${componentStyles.number}`}>
							15.
						</span>
						<Link
							to="Acknowledgements"
							spy={true}
							className={styles.subsubtitle}
							style={{ cursor: "pointer" }}
							onClick={() => {
								sendGAEvent("event", "tocSectionClicked", {
									value: "acknowledgements",
								});
							}}
						>
							Acknowledgements
						</Link>
						<p className={styles.desc}>So long, and thanks for all the fish!</p>
					</div>
				</div>
			</div>
		</div>
	);
}

const SectionSubtitles = {
	Demographics: "Gender, ethnicity, family",
	"Pre-University": "Admissions, early experience, university applications",
	"University Academics": "Degree planning, course opinions, grades, FYDP",
	"University Life": "Campus life, extracurriculars, food, and sleep",
	Health: "COVID, exercise, mental health",
	"Friends, Relationships & Drugs": "In order of descending wholesomeness :P",
	Exchange: "Decision-making, comparisons, anecdotes",
	Finance: "Loans, investments, taxes",
	"Co-op": "Interviews, job search, companies, salary, locations",
	"On Switching Out of UW SE": "What, where, when, and why",
	Future: (
		<>
			Post-graduation plans; graduate school, full-time employment (this is
			where the TC stats are)
		</>
	),
	Correlations: (
		<>
			Getting paid more is always great, so here&apos;s all you&apos;ll need to
			know about what affects co-op and full-time compensation
		</>
	),
	Misc: "Fun tidbits!",
	"From: SE25": "Memories, quotes, advice",
} satisfies Record<SURVEY_SECTIONS, React.ReactNode>;

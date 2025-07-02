/* eslint react/no-unescaped-entities: 0 */
/* eslint @next/next/no-html-link-for-pages: 0 */

import { SurveySection } from "@/components/AllGraphs";
import { SURVEY_QUESTION } from "@/components/mappings/QuestionsList";
import { useRouter } from "next/router";

import styles from "@/app/page.module.css";
import "@/app/globals.css";
import { SURVEY_DESCRIPTIONS } from "@/components/mappings/QuestionDescriptions";
import {
	isSubSection,
	QUESTIONS_TO_SECTIONS,
} from "@/components/mappings/QuestionsToSections";
import { GetStaticPaths, GetStaticProps } from "next";

/**
 * Set of dev pages that renders a single graph.
 * So fixing a single graph doesn't require you load AllGraphs
 */
export default function Page() {
	const router = useRouter();
	const title = router.query.question as SURVEY_QUESTION;

	if (QUESTIONS_TO_SECTIONS[title] === undefined) {
		return (
			<main
				className={`${styles.main} ${jersey10.variable} ${geistSans.variable} ${geistMono.variable} ${Athihi.variable} ${AthihiBold.variable}`}
			>
				<div
					style={{
						backgroundColor: 0 % 2 === 0 ? "#021A2F" : "#170636",
						padding: "80px",
					}}
				>
					<p>
						Question "{title}" doesn't have a mapped section! Skipping render.
					</p>
					<p>
						You may want to check if you typed the question out correctly
						including the question mark, and in URI encoding. Alternatively, go
						to <a href="/dev/question">the index</a> for links to the right
						pages for each (known) question.
					</p>
				</div>
			</main>
		);
	} else if (QUESTIONS_TO_SECTIONS[title]?.section === "SKIP") {
		return (
			<main
				className={`${styles.main} ${jersey10.variable} ${geistSans.variable} ${geistMono.variable} ${Athihi.variable} ${AthihiBold.variable}`}
			>
				<div
					style={{
						backgroundColor: 0 % 2 === 0 ? "#021A2F" : "#170636",
						padding: "80px",
					}}
				>
					<p>
						Question "{title}" declared as "SKIP" (so I'm not rendering anything
						here).
					</p>
				</div>
			</main>
		);
	}

	return (
		<main
			className={`${styles.main} ${jersey10.variable} ${geistSans.variable} ${geistMono.variable} ${Athihi.variable} ${AthihiBold.variable}`}
		>
			<div
				style={{
					backgroundColor: 0 % 2 === 0 ? "#021A2F" : "#170636",
					padding: "80px",
				}}
			>
				{isSubSection(title) ? (
					<div style={{ margin: "50px 0px", backgroundColor: "inherit" }}>
						<hr style={{ width: "50%", margin: "50px 0" }} />
						<h2 className={styles.subtitle}>{title}</h2>
						<span
							style={{
								fontFamily: "var(--font-athiti)",
								fontSize: "18px",
							}}
						>
							{SURVEY_DESCRIPTIONS[title]}
						</span>
						<hr style={{ width: "50%", margin: "50px 0" }} />
					</div>
				) : (
					// Safe cast, since title could not be type SUB_SECTION
					<SurveySection title={title} />
				)}
			</div>
		</main>
	);
}

// This should only be a real thing in dev, so there are no static paths in build
export const getStaticPaths = (async () => {
	return {
		paths: [],
		fallback: false,
	};
}) satisfies GetStaticPaths;

export const getStaticProps = (async () => {
	return { props: {} };
}) satisfies GetStaticProps<object>;

// I hate next
import { Athiti, Geist, Geist_Mono, Jersey_10 } from "next/font/google";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

const jersey10 = Jersey_10({
	variable: "--font-jersey-10",
	subsets: ["latin"],
	weight: "400",
	display: "swap",
});

const Athihi = Athiti({
	variable: "--font-athiti",
	subsets: ["latin"],
	weight: "400",
	display: "swap",
});

const AthihiBold = Athiti({
	variable: "--font-athiti-bold",
	subsets: ["latin"],
	weight: "600",
	display: "swap",
});

/*
// If you want convenient links to these pages, paste this into a different page file

const ALL_QUESTIONS = [
	...SURVEY_ONE_QUESTIONS,
	...SURVEY_TWO_QUESTIONS,
	...SURVEY_THREE_QUESTIONS,
	...SECEST_QUESTIONS,
	...SWITCH_OUT_QUESTIONS,
	...IDK_ABOUT_THESE_ONES_CHIEF,
	...GROUPED_QUESTIONS,
];
export default function Page() {
	return (
		<div>
			<ol>
				{ALL_QUESTIONS.map((q) => (
					<li key={q}>
						<a href={`/dev/question/${encodeURIComponent(q)}`}>{q}</a>
					</li>
				))}
			</ol>
		</div>
	);
}
*/

import styles from "./page.module.css";

//categories to keywords
const getCategory = (title: string): Record<string, string[]> => {
	if (title == "Favourite part of going on exchange?") {
		return {
			Travel: ["travel", "explor"],
			Experience: ["experienc"],
			"New Friends": ["friend"],
			"Not Waterloo": ["waterloo"],
			"Grades don't matter": ["grade"],
			"Reduced Stress": ["stress"],
		};
	} else if (title == "Hardest thing about going on exchange?") {
		return {
			"Loneliness, Homesickness, Different Timezones": [
				"alone",
				"loneliness",
				"not knowing",
				"home sickness",
				"zone",
				"being away",
			],
			Visa: ["visa"],
			"New Country, Transit Issues": ["new country", "german", "transit"],
			Logistics: ["logistic", "course"],
			"Co-op Search": ["co-op"],
			Exams: ["exam"],
		};
	} else if (title == "Most valuable thing you took away from exchange?") {
		return {
			"Freedom, Independence, Perspective": [
				"freedom",
				"independ",
				"perspect",
				"rat",
			],
			"Experience the World": ["world", "school matters"],
			"On European Lifestyle": ["european"],
			Fun: ["fun", "memories", "life is short"],
			Bikes: ["bike"],
			"Making Travel Plans": ["travel"],
			"CS 343": ["cs343"],
		};
	} else if (title == "Advice you'd give your first-year self?") {
		return {
			"On Life": ["life", "have fun", "opportunity"],
			"On People, Friends & Relationships": [
				"people",
				"friend",
				"relationships",
				"identity",
			],
			"On You": ["think", "worry", "trust", "afraid", "playground", "journal"],
			"With Respect to Time": ["time", "shall pass", "alright"],
			"On Co-op": ["leetcode", "co-op", "resume"],
			"On School": ["school", "lecture"],
			"On Trying & Doing Things": [
				"try",
				"lock",
				"keep it pushing",
				"chill",
				"do what works",
				"fight",
				"persevere",
				"relax",
				"proactive",
			],
			"On Reading": ["read"],
			"On Travel": ["travel"],
		};
	} else if (
		title ===
		"Anything else you'd like to add about academics? (courses, FYDP, etc.)"
	) {
		return {
			"On FYDP": ["fydp", "capstone"],
			"During Exchange": ["exchange"],
			"On Profs": ["profs"],
			"On CS 241e": ["cs241e"],
			"On Least Useful Courses": ["least useful"],
			"On Courses": ["courses"],
			"On Dropping Into CS": ["drop into cs"],
		};
	} else if (
		title === "Are there any extracurriculars you regret not joining? Why?"
	) {
		return {
			"Hack the North": ["hack the north"],
			"Muay Thai": ["muay thai"],
			Blueprint: ["blueprint"],
			"Design Teams": ["design", "watanomous"],
			"Art & Music": ["art", "music"],
			"Cheese Club": ["cheese club"],
			Poker: ["poker"],
			Fencing: ["fencing"],
			"Other Comments": [""],
		};
	} else if (title === "Favourite SE25-related memory?") {
		return {
			Classes: ["ece105", "passing 2b", "discord"],
			"IRS (Presumably the Iron Ring Shindig and not the Internal Revenue Service)":
				["irs"],
			"SE Events (Bonfires, Potluck, Coffeehouse, Semi)": [
				"potluck",
				"bonfire",
				"campfire",
				"dance party",
				"coffee",
				"going to events",
				"semi",
			],
			"Grad Prank": ["prank"],
			"In EIT": ["eit"],
		};
	} else if (title === "Best life hack/tip?") {
		return {
			"Calendar-Related": ["calendar", "schedule"],
			"Food-Related": ["eggs", "bread", "cupcake", "cook", "food"],
			"Spending-Related": ["spend", "expensive"],
			"People-Related": ["people"],
		};
	} else if (
		title === "If you have taken an academic course during a co-op term, why?"
	) {
		return {
			"For a Lighter/More Flexible Courseload Later": [
				"my load",
				"reduce",
				"4b",
				"workload",
				"flex",
				"school term",
				"bird",
			],
			"To Get a Grad Requirement Out of the Way": [
				"grad",
				"out of the way",
				"online",
			],
			"For a Minor": ["minor", "music"],
			"For Exchange": ["exchange"],
			"For a Specialization": ["specialization"],
			"To Clear a Fail": ["cs348"],
			"For English": ["english"],
			"During Unemployment": ["unemploy"],
		};
	} else if (title === "Anything else co-op related you'd like to add?") {
		return {
			"On Applying": ["appl", "leetcod", "recoverable", "ballsy"],
			"On Friends": ["friends"],
			"On Remote Co-op": ["remote"],
			"On Work": ["work"],
			"On Ambition & Trying Things": ["ambiti", "things"],
			"On California": ["sf", "cali"],
			"On EU/Japan Co-op": ["eu"],
		};
	} else if (title === "Why did you choose to switch out of SE25?") {
		return {
			"Switching to CS": ["cs", "eng", "workload", "flexibility", "fresh"],
			"Dropping Out": ["business", "job"],
		};
	}
	return {} as Record<string, string[]>;
};

export default function TextDisplay({
	title,
	labels,
	counts,
}: {
	title: string;
	labels: string[];
	counts: number[];
}) {
	const textGroupings: Record<string, string[]> = {};

	const categories = getCategory(title);

	if (Object.keys(categories).length === 0) {
		textGroupings["Misc"] = labels;
	} else {
		for (const category of Object.keys(categories)) {
			textGroupings[category] = [];
		}

		for (let i = 0; i < labels.length; ++i) {
			const label = labels[i] as string;
			const lowerLabel = label.toLocaleLowerCase();

			for (const [category, keywords] of Object.entries(categories)) {
				if (keywords.some((keyword: string) => lowerLabel.includes(keyword))) {
					textGroupings[category].push(label);
					break; // Stop checking once we find a match
				}
			}

			// This is mainly for dev - we should eventually have all text responses in one category
			if (
				!Object.values(categories).some((keywords) =>
					keywords.some((keyword: string) => lowerLabel.includes(keyword)),
				)
			) {
				if (!textGroupings["Misc"]) {
					textGroupings["Misc"] = [];
				}
				textGroupings["Misc"].push(label);
			}
		}
	}

	const renderCategoryBlock = (category: string, cLabels: string[]) => (
		<div key={category} style={{ marginBottom: 40 }}>
			<h3 className={styles.subsubtitle}>{category}</h3>
			{cLabels.map((label) => (
				<div key={label} style={{ marginTop: 10, marginBottom: 10 }}>
					&quot;{label}&quot;
					{counts[labels.indexOf(label)] > 1 && (
						<span style={{ fontWeight: 600 }}>
							{" "}
							({counts[labels.indexOf(label)]} respondents said this)
						</span>
					)}
					<br />
				</div>
			))}
		</div>
	);

	const renderRegularBlock = (labels: string[]) => (
		<div className={styles.textDisplayMarginBlock}>
			{labels.map((label, ind) => (
				<div key={label} className={styles.textDisplayMarginBlockColumn}>
					&quot;{label}&quot;
					{counts[ind] > 1 && (
						<span style={{ fontWeight: 600 }}>
							{" "}
							({counts[ind]} respondents said this)
						</span>
					)}
					<br />
				</div>
			))}
		</div>
	);

	const NUM_CHARS_PER_LINE = 90;
	const HEADING_LINE_COUNT = 6;
	const SPACINGLINE_COUNT = 1;

	const entries = Object.entries(textGroupings);
	const twoColumnNoHeadingQuestions = [
		"Favourite inspirational quote/words to live by?",
		"Any fun interview stories?",
		"Why did you choose to pursue grad school over full-time employment?",
		"Anything else you'd like to add?",
		"If you took a gap year, why did you choose to take one?",
		"Is there anything else you'd like to add?",
	];
	if (twoColumnNoHeadingQuestions.includes(title)) {
		const totalLineCount = labels.reduce(
			(acc, label) =>
				acc + Math.ceil(label.length / NUM_CHARS_PER_LINE) + SPACINGLINE_COUNT,
			0,
		);

		const linesPerColumn = Math.ceil(totalLineCount / 2);

		const columns: string[][] = [[], []];
		let currentColumn = 0,
			currentLines = 0;

		for (let i = 0; i < labels.length; i++) {
			const e = labels[i];
			const currentLineCount =
				Math.ceil(e.length / NUM_CHARS_PER_LINE) + SPACINGLINE_COUNT;

			if (
				currentLines + currentLineCount > linesPerColumn &&
				currentColumn < 1
			) {
				currentColumn++;
				currentLines = 0;
			}

			columns[currentColumn].push(e);
			currentLines += currentLineCount;
		}

		const firstColumn = columns[0];
		const secondColumn = columns[1];

		return (
			<div
				className={styles.textDisplayContainer}
				style={{
					marginTop: -20,
				}}
			>
				<div style={{ flex: 1 }}>{renderRegularBlock(firstColumn)}</div>
				<div style={{ flex: 1 }}>{renderRegularBlock(secondColumn)}</div>
			</div>
		);
	} else {
		let mid = 0;
		if (entries.length === 2) {
			mid = 1;
		} else {
			const totalLineCount = entries.reduce((acc, [, cLabels]) => {
				const labelLines = cLabels.reduce(
					(sum, label) => sum + Math.ceil(label.length / NUM_CHARS_PER_LINE),
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
						(sum, label) => sum + Math.ceil(label.length / NUM_CHARS_PER_LINE),
						0,
					);

				if (currentLines + currentLineCount - 2 > linesPerColumn) break;
				currentLines += currentLineCount;
				mid++;
			}
		}

		const firstColumn = entries.slice(0, mid);
		const secondColumn = entries.slice(mid);

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
}

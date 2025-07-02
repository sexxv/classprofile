import styles from "./Timeline.module.css";
import pageStyles from "./page.module.css";

type TimelineEvents = {
	time: string;
	season: Season;
	events: string[];
}[];

enum Season {
	WINTER = "winter",
	SPRING = "spring",
	FALL = "fall",
}

// NOTE: I am not keeping exact dates for anything due to some
// timeline events not having an exact date and I think it
// looks better if we keep consistency.
// I have left dates as comments; Feel free to change it back
const TIMELINE: TimelineEvents = [
	{
		time: "WINTER 2020 (Pre-SE25)",
		season: Season.WINTER,
		events: [
			"COVID-19 declared a pandemic by WHO", // March 11, 2020
			"Lockdown begins in Ontario", // March 17, 2020
			"Early acceptances to SE25 are released", // N/A
		],
	},
	{
		time: "FALL 2020 - 1A",
		season: Season.FALL,
		events: [
			"Waterloo's first remote orientation week", // September 1st, 2020
			"SE25's first (1A) school term begins; fully remote", // September 8, 2020
			"59th US Presidential Election", // November 3, 2020
		],
	},
	{
		time: "WINTER 2021 - 1B",
		season: Season.WINTER,
		events: [
			"January 20, 2021: Joe Biden becomes 46th President of the United States", // January 20, 2021
			"Waterloo drops 'Beyond Ideas' slogan", // N/A but announced on January 22, 2021
		],
	},
	{
		time: "SPRING 2021 - Co-op 1",
		season: Season.SPRING,
		events: [
			"Vivek Goel succeeds Feridun Hamdullahpur as president and vice-chancellor of the University of Waterloo", // July 1, 2021
		],
	},
	{
		time: "FALL 2021 - 2A",
		season: Season.FALL,
		events: [
			"First hybrid school term; first in-person tutorials for select classes (2A)", // September 8, 2021
		],
	},
	{
		time: "WINTER 2022 - Co-op 2",
		season: Season.WINTER,
		events: [
			"Waterloo rolls out operation of new bus station at University of Waterloo (E7)", // January 3, 2022
			"Russia invades Ukraine", // February 24, 2022
		],
	},
	{
		time: "SPRING 2022 - 2B",
		season: Season.SPRING,
		events: [
			"First in-person school term (2B)", // May 2, 2022
		],
	},
	{
		time: "FALL 2022 - Co-op 3",
		season: Season.FALL,
		events: [
			"Queen Elizabeth passes away", // September 8, 2022
			"Elon Musk acquires Twitter (X)", // October 28, 2022
			"ChatGPT released for public use", // November 30, 2022
		],
	},
	{
		time: "WINTER 2023 - 3A",
		season: Season.WINTER,
		events: [],
	},
	{
		time: "SPRING 2023 - Co-op 4",
		season: Season.SPRING,
		events: [
			"Victoria Sakhnini succeeds Derek Rayside as SE Program Director, Paul Ward becomes SE Associate Director", // May 2023
		],
	},
	{
		time: "FALL 2023 - 3B",
		season: Season.FALL,
		events: [
			"SE first offered the choice to switch between streams 8 and 8x", // September-October 2023
		],
	},
	{
		time: "WINTER 2024 - Co-op 5",
		season: Season.WINTER,
		events: [],
	},
	{
		time: "SPRING 2024 - 4A/Co-op 6",
		season: Season.SPRING,
		events: ["Stream 8 is in school, Stream 8x is on co-op"],
	},
	{
		time: "FALL 2024 - Co-op 6/4A",
		season: Season.FALL,
		events: [
			"Stream 8 is on co-op, Stream 8 is in school",
			"DC-MC bridge closes", // October 25, 2024
			"60th US Presidential Election", // November 5, 2024
		],
	},
	{
		time: "WINTER 2025 - 4B",
		season: Season.WINTER,
		events: [
			"Justin Trudeau resigns", // January 6, 2025
			"UWP Boilergate Incident (boilers in residences break down)", // January 17, 2025
			"Donald Trump becomes 47th President of the United States", // January 20, 2025
			"100th year of the Iron Ring Ceremony", // 2025
			"SE25 graduates!", // April-May 2025
		],
	},
	{
		time: "SPRING 2025 (Post-SE25)",
		season: Season.SPRING,
		events: [
			"SE25 convocation", // June 11, 2025
		],
	},
];

export function Timeline() {
	return (
		<div className={styles.section}>
			<h2 className={pageStyles.title} style={{ paddingTop: 0 }}>
				Timeline
			</h2>
			<div className={styles.timeline}>
				{TIMELINE.map((timelineEvent) => {
					const { time, season, events } = timelineEvent;
					return (
						<div
							key={time}
							className={`${styles.timelineEvent} ${styles[season]}`}
						>
							<h3>{time}</h3>
							<ol>
								{events.map((event, index) => (
									<li key={index}>{event}</li>
								))}
							</ol>
						</div>
					);
				})}
			</div>
		</div>
	);
}

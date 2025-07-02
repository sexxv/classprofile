import Image from "next/image";
import styles from "./About.module.css";
import { TasteDaRainbow, yesNoColors } from "./common/color";
import { Emoji } from "./Emoji";
import PieGraph from "./graphs/PieGraph";
import { percentageHelper } from "./mappings/QuestionDescriptions";
import pageStyles from "./page.module.css";
import { BASE_PATH } from "@/basepath";

export default function AboutPage() {
	return (
		<div
			id="about"
			className={styles.about}
			style={{ backgroundColor: TasteDaRainbow.reallyDarkPurple }}
		>
			<section className={styles.aboutSection}>
				<div className={styles.section}>
					<h2 className={pageStyles.title} style={{ paddingTop: 0 }}>
						About the program
					</h2>
					<p>
						Software Engineering (SE) at the University of Waterloo is an
						interdisciplinary program supported by both the Faculty of
						Mathematics and the Faculty of Engineering. SE follows the UW
						engineering cohort system, meaning students spend 8 semesters in
						school with similar academic schedules and (generally) have the same
						co-op sequence, consisting of 6 co-op terms where they can gain
						experience.
					</p>
					<p>
						At the of their 4 ⅔-year journey, SE undergraduates are awarded a
						Bachelor of Software Engineering degree <Emoji>🎉</Emoji>
					</p>
					<p>
						<em>
							This project is not affiliated with the SE program or the
							University of Waterloo in any way.
						</em>
					</p>

					<h2
						className={`${pageStyles.title} ${styles.aboutTitleWithBreakpoint}`}
					>
						About this profile
					</h2>
					<p>
						The purpose of this class profile is to provide an insight into the
						SE program. It showcases who SE graduating class of 2025 (SE25 for
						short) students are and what their journey through university was
						like. Whether you&apos;re a prospective student, a current student,
						or just curious about this program, we hope you find what
						you&apos;re looking for here!
					</p>
					<p>
						The data in this profile was collected across five surveys. All
						surveys were conducted during the Winter 2025 term beginning
						February 1st, and closing on March 16th 2025. Four of these surveys
						were sent to SE25 students, and a fifth was spread to those who
						switched out of SE25.
					</p>
					<p>
						The graduating class of SE25 is 117 students. In total, 79 out of
						the 117 ({percentageHelper(79, 117)}) graduating students responded.
						All data presented in this profile has been self-reported by survey
						respondents.
					</p>
					<p>
						All survey questions were optional. The response N for each question
						is labelled in the profile. Currency-related questions were asked to
						specify in CAD unless otherwise stated.
					</p>
					<p>Now with that all out of the way...</p>
				</div>
				<div
					className={styles.section}
					style={{
						display: "flex",
						flexDirection: "column",
						alignItems: "center",
					}}
				>
					<Image
						className={`${styles.se25image} ${styles.se25TopImage}`}
						src={BASE_PATH + "/se25_summer.jpg"}
						alt="SE25 Summer"
						height={268}
						width={400}
					/>
					<Image
						className={styles.se25image}
						src={BASE_PATH + "/se25_winter.JPG"}
						alt="SE25 Winter"
						height={268}
						width={400}
					/>
					<div className={styles.nGraph}>
						<PieGraph
							width={350}
							height={300}
							marginTop={50}
							marginRight={10}
							marginBottom={50}
							marginLeft={10}
							slices={[117 - 79, 79]}
							colors={yesNoColors}
							radius={100}
							color="white"
							labelSize={10}
							labelMargin={10}
							labels={["Did Not Respond", "Responded"]}
							angleOffset={Math.PI / 6}
							title={"How many SE25's responded to surveys?"}
							titleSize={16}
						/>
					</div>
				</div>
			</section>
		</div>
	);
}

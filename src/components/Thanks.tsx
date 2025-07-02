import { BASE_PATH } from "@/basepath";
import Image from "next/image";
import { AnimatedOnFirstView } from "./AnimateOnFirstView";
import { linkWrapper } from "./mappings/QuestionDescriptions";
import styles from "./page.module.css";

export function Thanks() {
	return (
		<div className={styles.thanksCredits}>
			This class profile would not have been possible without the help of many
			people.
			<h3 className={styles.subsubtitle}>Class Profile Team</h3>
			<div className={styles.classProfileTeamMember}>
				<Image
					src={BASE_PATH + "/dev-photos/hannah.png"}
					alt="Hannah"
					width={100}
					height={100}
				/>
				<div>
					<strong>Hannah Guo</strong>
					<p>Project Lead, Dev, Data, Survey Creation</p>
				</div>
			</div>
			<div className={styles.classProfileTeamMember}>
				<Image
					src={BASE_PATH + "/dev-photos/allen.png"}
					alt="Allen"
					width={100}
					height={100}
				/>
				<div>
					<strong>Allen Liu</strong>
					<p>Dev Lead, Outreach</p>
				</div>
			</div>
			<div className={styles.classProfileTeamMember}>
				<Image
					src={BASE_PATH + "/dev-photos/janet.png"}
					alt="Janet"
					width={100}
					height={100}
				/>
				<div>
					<strong>Janet Chen</strong>
					<p>Dev, Data, Survey Creation</p>
				</div>
			</div>
			<div className={styles.classProfileTeamMember}>
				<Image
					src={BASE_PATH + "/dev-photos/dhan.png"}
					alt="Dhan"
					width={100}
					height={100}
				/>

				<div>
					<strong>Dhan Patki</strong>
					<p>Dev, Data, Outreach</p>
				</div>
			</div>
			<div className={styles.classProfileTeamMember}>
				<Image
					src={BASE_PATH + "/dev-photos/carol.png"}
					alt="Carol"
					width={100}
					height={100}
				/>
				<div>
					<strong>Carol Xu</strong>
					<p>Dev, Data, Survey Creation, Outreach, Pixel Art</p>
				</div>
			</div>
			<div className={styles.classProfileTeamMember}>
				<Image
					src={BASE_PATH + "/dev-photos/osman.png"}
					alt="Osman"
					width={100}
					height={100}
				/>
				<div>
					<strong>Osman Wong</strong>
					<p>Survey Testing</p>
				</div>
			</div>
			<div className={styles.classProfileTeamMember}>
				<Image
					src={BASE_PATH + "/dev-photos/simran.png"}
					alt="Simran"
					width={100}
					height={100}
				/>
				<div>
					<strong>Simran Thind</strong>
					<p>Survey Testing</p>
				</div>
			</div>
			<h3 className={styles.subsubtitle}>Special Thanks</h3>
			<div>
				<strong>The SE25 Cohort (current and former)</strong>
				<p>Who filled out the surveys that gave us data to display</p>
			</div>
			<div>
				<strong>Early feedback givers (you know who you are)</strong>
				<p>Who helped remind us why we were making this</p>
			</div>
			<div>
				<strong>Eric</strong>
				<p>
					For making the original SE25 Discord server logo featured in this
					profile
				</p>
			</div>
			<h3 className={styles.subsubtitle}>Other Class Profiles</h3>
			<p>
				Below is a list of other Waterloo class profiles - we referenced many of
				them while making this one!
			</p>
			<div>
				<strong>
					{linkWrapper(
						"SE22 Class Profile",
						"https://sexxii.github.io/classprofile/",
					)}
				</strong>
			</div>
			<div>
				<strong>
					{linkWrapper(
						"SE21 Class Profile",
						"https://sexxis.github.io/classprofile/",
					)}
				</strong>
			</div>
			<div>
				<strong>
					{linkWrapper(
						"SE20 Class Profile",
						"https://uw-se-2020-class-profile.github.io/profile.pdf",
					)}
				</strong>
			</div>
			<div>
				<strong>
					{linkWrapper(
						"SE18 Class Profile",
						"https://classprofile.andyzhang.net/",
					)}
				</strong>
			</div>
			<div>
				<strong>
					{linkWrapper(
						"Tron 2020 Class Profile",
						"https://tron2020classprofile.github.io/",
					)}
				</strong>
			</div>
			<div>
				<strong>
					{linkWrapper(
						"CS24 Class Profile",
						"https://csclub.uwaterloo.ca/classprofile/",
					)}
				</strong>
			</div>
			<div>
				<strong>
					{linkWrapper(
						"CS23 Class Profile",
						"https://csclub.uwaterloo.ca/classprofile/2023/",
					)}
				</strong>
			</div>
			<div style={{ marginTop: 50 }}>
				This project is {linkWrapper("open source", "https://github.com/sexxv")}
				!<br />
				Last updated: June 2025
			</div>
		</div>
	);
}

export function FadeInThanks() {
	return (
		<AnimatedOnFirstView
			keyframes={[
				{
					opacity: "0%",
					transform: "translateY(200px)",
				},
				{
					opacity: "100%",
					transform: "translateY(0px)",
				},
			]}
			options={{
				duration: 1000,
				fill: "forwards",
				easing: "ease-in-out",
			}}
			viewThreshold={[0.05]}
			initialStyle={{
				opacity: "0%",
			}}
			wrapperStyle={{
				overflow: "hidden",
			}}
		>
			<Thanks />
		</AnimatedOnFirstView>
	);
}

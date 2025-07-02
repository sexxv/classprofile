"use client";
import AboutPage from "@/components/About";
import AllGraphs from "@/components/AllGraphs";

import { AnimatedPostcard } from "@/components/AnimatedPostcard";
import { PDFMode } from "@/components/Contexts";
import ProfGallery from "@/components/ProfGallery";
import { Sidebar } from "@/components/Sidebar";
import { TableOfContents } from "@/components/TableOfContents";
import { FadeInThanks } from "@/components/Thanks";
import { Timeline } from "@/components/Timeline";
import { sendGAEvent } from "@next/third-parties/google";
import { Element, Link } from "react-scroll";
import styles from "./page.module.css";

export default function Home() {
	return (
		// turning this value to true will render certain displays in a PDF-friendly way
		// you should search for pdfMode in the codebase to see where this is used
		// access this value using:
		// const pdfMode = useContext(PDFMode);

		<PDFMode.Provider value={false}>
			<div
				style={{
					display: "flex",
					flexDirection: "row",
					width: "100%",
					position: "relative",
				}}
			>
				<main className={styles.main}>
					<div
						className={styles.titlePage}
						style={{ backgroundColor: "black" }}
					>
						<div className={styles.content}>
							<div className={styles.title}>
								<h1>Waterloo Software Engineering 2025 Class Profile</h1>
							</div>
						</div>
						<div className={styles.icon}>
							{/* <Image
								src="/animation-flat-transparent.gif"
								unoptimized={true}
								width={1024}
								height={1024}
								alt="Waterloo Software Engineering 2025 Class Profile"
								style={{
									position: "absolute",
									top: 0,
									right: 0,
									height: "100vh",
									width: "auto",
									opacity: 0.5,
								}}
							/> */}
							<video
								autoPlay={true}
								loop={true}
								muted={true}
								playsInline={true}
								width={1024}
								height={1024}
								style={{
									position: "absolute",
									top: 0,
									right: 20,
									height: "100vh",
									width: "auto",
									opacity: 0.5,
									backgroundColor: "black",
								}}
							>
								<source src="loopingse25.mp4" type="video/mp4" />
							</video>
						</div>
						<div className={styles.nextWrapper}>
							<Link
								href="#about"
								smooth={true}
								className={styles.next}
								to={"Introduction"}
								onClick={() =>
									sendGAEvent("event", "buttonClicked", {
										value: "home_arrow",
									})
								}
							>
								<div className={styles.bouncing}>
									<svg width="32" height="20">
										<polygon fill="var(--font-color)" points="0,0 32,0 16,20" />
									</svg>
								</div>
								{/* <div>{"Enter"}</div>
								<div className={styles.bouncing}>
									<svg width="32" height="20">
										<polygon fill="var(--font-color)" points="0,0 32,0 16,20" />
									</svg>
								</div> */}
							</Link>
						</div>
					</div>
					<Element name="Introduction">
						<AboutPage />
						<TableOfContents />
						<Timeline />
						<ProfGallery />
					</Element>
					<AllGraphs />
					<Element name="Acknowledgements">
						<AnimatedPostcard />
						<FadeInThanks />
					</Element>
				</main>
				<Sidebar />
			</div>
		</PDFMode.Provider>
	);
}

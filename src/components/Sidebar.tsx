"use client";

import { useContext, useEffect, useState } from "react";

import { convertToLinkFormat } from "@/components/layout/SurveyComponents";
import { PAGE_SECTIONS } from "@/components/mappings/QuestionsToSections";

import { PDFMode } from "@/components/Contexts";
import { sendGAEvent } from "@next/third-parties/google";
import { Events, Link, scrollSpy } from "react-scroll";
import styles from "./Sidebar.module.css";

export function Sidebar() {
	const [collapseSidebar, setCollapseSidebar] = useState(true);

	const pdfMode = useContext(PDFMode);

	useEffect(() => {
		if (!collapseSidebar) {
			Events.scrollEvent.remove("begin");
			Events.scrollEvent.remove("end");
			return;
		}

		Events.scrollEvent.register("begin", function () {});
		Events.scrollEvent.register("end", function () {});
		scrollSpy.update();

		return () => {
			Events.scrollEvent.remove("begin");
			Events.scrollEvent.remove("end");
		};
	}, [collapseSidebar]);

	const [hasDefaultExpandedOnce, setHasDefaultExpandedOnce] = useState(false);

	const isMobileSizeWindow = () => {
		return typeof window !== "undefined" && window.innerWidth <= 800;
	};

	const handleSetActive = () => {
		if (!hasDefaultExpandedOnce) {
			setHasDefaultExpandedOnce(true);
			if (!isMobileSizeWindow()) {
				setCollapseSidebar(false);
			}
		}
	};

	if (pdfMode) {
		return null;
	}

	return (
		<>
			<div
				className={`${styles.sidebarToggle} ${!hasDefaultExpandedOnce ? styles.sidebarToggleTotallyGone : collapseSidebar ? "" : styles.sidebarToggleOpen}`}
				onClick={() => {
					setCollapseSidebar(!collapseSidebar);
					sendGAEvent("event", "buttonClicked", {
						value: `sidebar_toggle_${collapseSidebar ? "open" : "close"}`,
					});
				}}
			>
				<div
					className={`${styles.sidebarToggleText} ${collapseSidebar ? "" : styles.sidebarToggleTextOpen}`}
				>
					<div>◀</div>
					{/*The Unicode triangle is slightly off-center, so screw it, I'll do it myself.
<svg viewBox="0 0 100 100">
						<polygon fill="white" points={`100, 0  100, 100 13.4, 50`} />
					</svg>
					*/}
				</div>
			</div>
			<div
				className={`${styles.sidebar} ${
					collapseSidebar ? styles.sidebarClosed : styles.sidebarOpen
				}`}
			>
				<div className={styles.sidebarFixedPart}>
					{PAGE_SECTIONS.map((section) => {
						const sectionLinkFormat = convertToLinkFormat(section);
						return (
							<Link
								to={section}
								spy={true}
								activeClass={styles.activeSidebarSection}
								href={`#${sectionLinkFormat}`}
								key={`section-${section}`}
								onSetActive={handleSetActive}
								className={styles.sidebarSurveySection}
								onClick={() => {
									sendGAEvent("event", "sidebarSectionClicked", {
										value: section,
									});
								}}
							>
								<div>{section}</div>
							</Link>
						);
					})}
				</div>
			</div>
			{/*
			<div
				style={{
					position: "fixed",
					top: 0,
					right: 0,
					border: "1px solid white",
					padding: "1rem",
					fontWeight: "bold",
					backgroundColor: "rgba(0, 0, 0, 0.7)",
					overflowY: "scroll",
					maxHeight: "50vh",
					width: 400,
					color: "white",
				}}
			>
				<label>
					<input
						type="checkbox"
						style={{
							backgroundColor: "transparent",
							border: "none",
							color: "white",
							cursor: "pointer",
							marginRight: "10px",
						}}
						checked={!collapseSidebar}
						onChange={() => setCollapseSidebar(!collapseSidebar)}
					/>
					Show Sidebar
				</label>
			</div>
			*/}
		</>
	);
}

"use client";
import {
	GraphBounds,
	LabelFormat,
	TextStyle,
} from "@/components/graphs/GraphBase";
import { useMemo, useState } from "react";

import { defaultBarColor } from "../common/color";
import { NPart } from "../layout/SurveyComponents";
import pageStyles from "../page.module.css";
import styles from "./ButtonToggleGraph.module.css";
import { WordCloud } from "./WordCloud";
export type IndividualGraphData = {
	title?: string;
	labels: string[] | number[];
	counts: number[];
	n: number;
};

type ButtonToggleGraphProps = LabelFormat &
	TextStyle &
	GraphBounds & {
		title: string;
		optionsToDataMap: Record<string, IndividualGraphData>;
		buttonColours: string[];
		barColours: string[];
		showCounts?: boolean;
		maxLabelWidth?: number;
	};

export function ToggleWordCloud(props: ButtonToggleGraphProps) {
	const {
		optionsToDataMap,
		buttonColours,
		title,
		width = 1000,
		height = 400,
	} = props;

	// Add 'show_all' as a toggle option
	const toggleOptions = useMemo(
		() => [...Object.keys(optionsToDataMap), "show_all"],
		[optionsToDataMap],
	);
	const [selectedOption, setSelectedOption] = useState(toggleOptions[0]);

	const largestCount = useMemo(() => {
		if (selectedOption === "show_all") {
			return Object.values(optionsToDataMap).reduce(
				(max, data) => Math.max(max, ...data.counts),
				0,
			);
		} else {
			return Math.max(...optionsToDataMap[selectedOption].counts);
		}
	}, [selectedOption, optionsToDataMap]);

	const wordCloudData = useMemo(() => {
		if (selectedOption === "show_all") {
			const labelCountMap: Record<string, number> = {};

			Object.values(optionsToDataMap).forEach((data) => {
				data.labels.forEach((label, index) => {
					const key = String(label);
					const count = data.counts[index];
					labelCountMap[key] = (labelCountMap[key] || 0) + count;
				});
			});

			return Object.entries(labelCountMap).map(([text, count]) => ({
				text,
				count,
			}));
		} else {
			const selectedData = optionsToDataMap[selectedOption];
			return selectedData.labels.map((label, index) => ({
				text: String(label),
				count: selectedData.counts[index],
			}));
		}
	}, [selectedOption, optionsToDataMap]);

	const useSqrtWithMinAndMaxSizesByCoop = useMemo(() => {
		if (selectedOption === "show_all") {
			return [8, 40];
		}

		if (title === "Which industry was your co-op employer in?") {
			return [8, 20 + largestCount * 2];
		}

		return undefined;
	}, [largestCount, selectedOption, title]);

	return (
		<>
			<div
				style={{
					display: "flex",
					justifyContent: "center",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<NPart
					backgroundColour={
						selectedOption === "show_all"
							? defaultBarColor
							: buttonColours[toggleOptions.indexOf(selectedOption)]
					}
					isCompanyN={title === "Which industry was your co-op employer in?"}
				>
					{selectedOption === "show_all"
						? Object.values(optionsToDataMap).reduce(
								(acc, data) => acc + data.n,
								0,
							)
						: optionsToDataMap[selectedOption].n}
				</NPart>
				<WordCloud
					data={wordCloudData}
					title={title}
					width={width}
					height={height}
					useSqrtWithMinAndMaxSizes={useSqrtWithMinAndMaxSizesByCoop}
				/>
			</div>

			<div className={styles.toggleButtonContainer}>
				<div className={pageStyles.actionTextClick} />

				{toggleOptions.map((option, index) => (
					<button
						key={option}
						onClick={() => setSelectedOption(option)}
						style={{
							backgroundColor:
								option === "show_all" ? defaultBarColor : buttonColours[index],
						}}
						className={selectedOption === option ? styles.active : ""}
					>
						{option === "show_all" ? "Show All" : option}
					</button>
				))}
			</div>
		</>
	);
}

"use client";
import { AnimatedHorizontalBarGraph } from "@/components/graphs/AnimatedBarGraph";
import {
	GraphBounds,
	LabelFormat,
	TextStyle,
} from "@/components/graphs/GraphBase";
import { NPart } from "@/components/layout/SurveyComponents";
import { useContext, useMemo, useState } from "react";

import { PDFMode } from "@/components/Contexts";
import pageStyles from "../page.module.css";
import styles from "./ButtonToggleGraph.module.css";

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
		group?: string | undefined;

		includeAllOptions?: boolean;
		sortedLabelsArr?: string[];
	};

type GROUPING_KEYS = "bay_area" | "by_country" | "by_state_or_province";

type GROUPING_TYPES = GROUPING_KEYS | undefined;

const SF_BAY_AREA = [
	"San Francisco",
	"Oakland",
	"San Jose",
	"Mountain View",
	"Palo Alto",
	"San Mateo",
	"Sunnyvale",
	"Cupertino",
];

const CALIFORNIA = [...SF_BAY_AREA, "Los Angeles"];
const NEW_YORK = ["New York"];
const FLORIDA = ["Miami"];
const TEXAS = ["Austin"];
const WASHINGTON = ["Seattle"];

const ONTARIO = [
	"Toronto",
	"Waterloo",
	"Mississauga",
	"Milton",
	"Markham",
	"Ottawa",
];
const QUEBEC = ["Montreal", "Quebec City"];
const ALBERTA = ["Calgary"];
const BRITISH_COLUMBIA = ["Vancouver"];
const MASSACHUSETTS = ["Boston", "Cambridge, MA", "Lexington, MA"];

const COOP_AREA_GROUPS: Record<GROUPING_KEYS, Record<string, string[]>> = {
	bay_area: {
		"SF Bay Area": SF_BAY_AREA,
	},
	by_country: {
		"USA 🇺🇸": [
			...CALIFORNIA,
			...NEW_YORK,
			...MASSACHUSETTS,
			...TEXAS,
			...FLORIDA,
			...WASHINGTON,
		],
		"Canada 🇨🇦": [...BRITISH_COLUMBIA, ...ONTARIO, ...QUEBEC, ...ALBERTA],
		"Germany 🇩🇪": ["Cologne", "Hamburg"],
		"Japan 🇯🇵": ["Tokyo"],
		"Singapore 🇸🇬": ["Singapore"],
		"Remote 🌐": ["Remote"],
	},
	by_state_or_province: {
		California: CALIFORNIA,
		"New York": NEW_YORK,
		Texas: TEXAS,
		Massachusetts: MASSACHUSETTS,
		"British Columbia": BRITISH_COLUMBIA,
		Florida: FLORIDA,
		Ontario: ONTARIO,
		Québec: QUEBEC,
		Washington: WASHINGTON,
		Alberta: ALBERTA,
	},
};

export function ButtonToggleGraph(props: ButtonToggleGraphProps) {
	const {
		height,
		width,
		marginBottom,
		marginLeft,
		marginRight,
		titleSize = 24,
		fontSize = 10,
		optionsToDataMap,
		buttonColours,
		barColours,
		maxLabelWidth,
		group = undefined,
		includeAllOptions = true,

		xAxisTitle = "",
		yAxisTitle = "",

		sortedLabelsArr,
	} = props;
	const toggleOptions = Object.keys(optionsToDataMap);
	const [selectedOption, setSelectedOption] = useState(toggleOptions[0]);

	const [groupOn, setGroupOn] = useState<GROUPING_TYPES>(undefined);

	const pdfMode = useContext(PDFMode);

	const processGroupedData = useMemo(() => {
		if (!groupOn || props.group === undefined) {
			return optionsToDataMap;
		}

		const currentGroupType = groupOn as GROUPING_KEYS;
		const groupedResult: Record<string, IndividualGraphData> = {};

		for (const option of toggleOptions) {
			const data = optionsToDataMap[option];
			const groupedCounts: Record<string, number> = {};
			const groupedLabels: string[] = [];

			const curGroupDict = COOP_AREA_GROUPS[currentGroupType];

			for (let i = 0; i < data.labels.length; i++) {
				const label = data.labels[i].toString();
				const count = data.counts[i];
				const groupKey =
					Object.keys(curGroupDict).find((key) =>
						curGroupDict[key].includes(label),
					) || label;

				if (!groupedCounts[groupKey]) {
					groupedCounts[groupKey] = 0;
					groupedLabels.push(groupKey);
				}
				groupedCounts[groupKey] += count;
			}

			groupedResult[option] = {
				// remote always on bottom, otherwise alphabetical order
				labels: groupedLabels.sort((a, b) => {
					if (a.includes("Remote")) return 1;
					if (b.includes("Remote")) return -1;
					return a.localeCompare(b);
				}),
				counts: groupedLabels.map((label) => groupedCounts[label]),
				n: data.n,
				title: data.title,
			};
		}

		return groupedResult;
	}, [groupOn, optionsToDataMap, props.group, toggleOptions]);

	const onlyNumericValues = Object.values(
		processGroupedData[selectedOption].labels,
	).every((value) => !isNaN(value));

	const calcWeightedSum = !onlyNumericValues
		? 0
		: processGroupedData[selectedOption].counts.reduce(
				(acc, count, i) =>
					acc +
					count *
						(parseInt(
							processGroupedData[selectedOption].labels[i].toString(),
						) || 0),
				0,
			);

	const curColor = barColours[toggleOptions.indexOf(selectedOption)];

	// construct a dictionary of all labels across all options
	const allLabels = new Set<string>();
	toggleOptions.forEach((option) => {
		processGroupedData[option].labels.forEach((label) => {
			allLabels.add(label.toString());
		});
	});

	const stringLabels = (option: string) =>
		processGroupedData[option].labels.map((x) => x.toString());

	const sortedLabels = Array.from(allLabels).sort((a, b) => {
		if (sortedLabelsArr) {
			if (!sortedLabelsArr.includes(a)) {
				console.warn(`we fucked up "${a}" missing in sortedLabelsArr. `);
			}

			if (!sortedLabelsArr.includes(b)) {
				console.warn(`we fucked up "${b}" missing in sortedLabelsArr. `);
			}

			return sortedLabelsArr.indexOf(a) - sortedLabelsArr.indexOf(b);
		}

		return a.localeCompare(b);
	});

	const labelToIndex = (option: string) => {
		const foo: Record<string, number> = {};

		sortedLabels.forEach((label) => {
			if (stringLabels(option).includes(label)) {
				foo[label] =
					processGroupedData[option].counts[
						stringLabels(option).indexOf(label)
					];
			} else {
				foo[label] = 0;
			}
		});
		return foo;
	};

	// sorry sorry sorry
	const isCompanyN = allLabels.has("2-10");

	return (
		<>
			{pdfMode ? (
				<div
					style={{
						display: "grid",
						gridTemplateColumns: "1fr 1fr",
						gap: "20px",
					}}
				>
					{toggleOptions.map((option, index) => {
						return (
							<div key={option + index + "-pdfmode"}>
								<div
									style={{
										display: "flex",
										justifyContent: "center",
										flexDirection: "column",
										alignItems: "center",
										marginTop: 60,
										marginBottom: 10,
										fontSize: 20,
										fontFamily: "var(--font-jersey-10)",
										textAlign: "center",
									}}
								>
									<div>
										<h2>{option}</h2>
									</div>
									<div>
										<NPart
											backgroundColour={barColours[index]}
											isCompanyN={isCompanyN}
										>
											{processGroupedData[option].n}
											{onlyNumericValues ? (
												<>
													{" "}
													Average:{" "}
													{(
														calcWeightedSum / processGroupedData[option].n
													).toFixed(2)}
												</>
											) : null}
										</NPart>
									</div>
								</div>
								<AnimatedHorizontalBarGraph
									width={width}
									height={height}
									marginTop={0}
									marginRight={marginRight}
									marginBottom={marginBottom}
									marginLeft={marginLeft}
									data={
										includeAllOptions
											? Object.values(labelToIndex(option))
											: processGroupedData[option].counts
									}
									title={""}
									labels={
										includeAllOptions
											? Object.keys(labelToIndex(option))
											: processGroupedData[option].labels.map((x) =>
													x.toString(),
												)
									}
									tickSize={5}
									xTickLabelSize={fontSize}
									yTickLabelSize={fontSize}
									binSpacing={5}
									xAxisTitle={xAxisTitle}
									yAxisTitle={yAxisTitle}
									axisLabelSize={fontSize}
									titleSize={titleSize}
									textColor={"white"}
									barColor={barColours[index]}
									maxLabelWidth={maxLabelWidth}
								/>
							</div>
						);
					})}
				</div>
			) : (
				<>
					<div
						style={{
							display: "flex",
							justifyContent: "center",
							marginTop: 60,
							marginBottom: 10,
							fontSize: 20,
							fontFamily: "var(--font-jersey-10)",
						}}
					>
						<NPart backgroundColour={curColor} isCompanyN={isCompanyN}>
							{processGroupedData[selectedOption].n}
							{onlyNumericValues ? (
								<>
									{" "}
									Average:{" "}
									{(
										calcWeightedSum / processGroupedData[selectedOption].n
									).toFixed(2)}
								</>
							) : null}
						</NPart>
					</div>
					<AnimatedHorizontalBarGraph
						width={width}
						height={height}
						marginTop={0}
						marginRight={marginRight}
						marginBottom={marginBottom}
						marginLeft={marginLeft}
						data={
							includeAllOptions
								? Object.values(labelToIndex(selectedOption))
								: processGroupedData[selectedOption].counts
						}
						title={""}
						labels={
							includeAllOptions
								? Object.keys(labelToIndex(selectedOption))
								: processGroupedData[selectedOption].labels.map((x) =>
										x.toString(),
									)
						}
						tickSize={5}
						xTickLabelSize={fontSize}
						yTickLabelSize={fontSize}
						binSpacing={5}
						xAxisTitle={xAxisTitle}
						yAxisTitle={yAxisTitle}
						axisLabelSize={fontSize}
						titleSize={titleSize}
						textColor={"white"}
						barColor={curColor}
						maxLabelWidth={maxLabelWidth}
					/>
					<div
						style={{
							display: "flex",
							flexDirection: "column",
						}}
					>
						<div className={styles.toggleButtonContainer}>
							{toggleOptions.map((option, index) => (
								<button
									onClick={() => {
										setSelectedOption(option);
									}}
									key={option}
									style={{ backgroundColor: buttonColours[index] }}
									className={selectedOption === option ? styles.active : ""}
								>
									{option}
								</button>
							))}
						</div>
						<div className={pageStyles.actionTextClickUp} />
					</div>
					{group ? (
						<div
							style={{
								display: "flex",
								justifyContent: "center",
								marginTop: 20,
							}}
						>
							<select
								value={groupOn || ""}
								onChange={(e) => {
									const value = e.target.value as GROUPING_TYPES;
									setGroupOn(value);
								}}
								style={{
									padding: "5px 10px",
									borderRadius: "10px",
									border: "none",
									fontFamily: "var(--font-geist-mono)",
									fontSize: "14px",
									fontWeight: "bold",
									width: "80%",
									backgroundColor: curColor,
									color: "white",
								}}
							>
								<option value="">Default View</option>
								<option value="bay_area">Group SF Bay Area</option>
								<option value="by_country">Group by Country</option>
								<option value="by_state_or_province">
									Group North American States and Provinces
								</option>
							</select>
						</div>
					) : null}
				</>
			)}
		</>
	);
}

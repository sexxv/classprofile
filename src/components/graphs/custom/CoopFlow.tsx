import { useState } from "react";
import { SankeyDiagram } from "../SankeyDiagram";

import { defaultBarColor } from "@/components/common/color";
import citiesByCountry from "@/data/cleaned/coop_cities_by_country.json";
import citiesByProvince from "@/data/cleaned/coop_cities_by_state_or_province.json";
import pageStyles from "../../page.module.css";
import styles from "../ButtonToggleGraph.module.css";

type toggleOptionsType = "state_or_province" | "by_country";
export default function Page() {
	const toggleOptions: toggleOptionsType[] = [
		"state_or_province",
		"by_country",
	];

	const toggleOptionOptionNames: Record<toggleOptionsType, string> = {
		state_or_province: "Group North American Provinces/States",
		by_country: "Group by Country",
	};

	const [mode, setMode] = useState<toggleOptionsType>("state_or_province");

	const currentData =
		mode === "state_or_province" ? citiesByProvince : citiesByCountry;

	return (
		<div
			style={{
				width: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				margin: "50px 0px",
			}}
		>
			<SankeyDiagram data={currentData} />
			<div
				style={{
					display: "flex",
					height: "100%",
					justifyContent: "center",
					marginTop: 30,
					fontWeight: "bold",
				}}
				className={pageStyles.actionTextHover}
			/>

			<div className={styles.toggleButtonContainer}>
				<div className={pageStyles.actionTextClick} />
				{toggleOptions.map((option) => (
					<button
						onClick={() => {
							setMode(option);
						}}
						key={option}
						style={{ backgroundColor: defaultBarColor }}
						className={mode === option ? styles.active : ""}
					>
						{toggleOptionOptionNames[option]}
					</button>
				))}
			</div>
		</div>
	);
}

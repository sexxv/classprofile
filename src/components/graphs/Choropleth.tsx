"use client";
import { geoMercator, geoPath, scaleThreshold, schemeBlues, select } from "d3";
import { useEffect, useRef, useState } from "react";
import pageStyles from "../page.module.css";
import styles from "./ButtonToggleGraph.module.css";

// Template From:
// https://d3-graph-gallery.com/graph/bubblemap_template.html

// the world is always the same...
import worldMap from "@/data/world.json";
import { TasteDaRainbow } from "../common/color";

const countryToCodeLUT: [string, string][] = [
	["ATA", "Antarctica"],
	["", "Antigua and Barbuda"],
	["ARG", "Argentina"],
	["AUT", "Austria"],
	// ["", "Barbados"],
	["BEL", "Belgium"],
	["BRA", "Brazil"],
	["KHM", "Cambodia"],
	["CAN", "Canada"],
	["CHL", "Chile"],
	["CHN", "China"],
	["CUB", "Cuba"],
	["CZE", "Czechia"],
	["DNK", "Denmark"],
	["EGY", "Egypt"],
	// ["GBR","England"],
	["FRA", "France"],
	["DEU", "Germany"],
	["GRC", "Greece"],
	["HKG", "Hong Kong"], // Not included in world file!
	["HUN", "Hungary"],
	["ISL", "Iceland"],
	["IND", "India"],
	["IDN", "Indonesia"],
	["IRL", "Ireland"],
	["IRS", "Israel"],
	["ITA", "Italy"],
	["JPN", "Japan"],
	["LVA", "Latvia"],
	// [ " ","Liechtenstein"],
	["LUX", "Luxembourg"],
	// ["Macau", " "],
	["MYS", "Malaysia"],
	// ["Malta", " "],
	["MEX", "Mexico"],
	// ["Monaco", " "],
	["NOR", "Norway"],
	["PAK", "Pakistan"],
	["PER", "Peru"],
	["PHL", "Philippines"],
	["POL", "Poland"],
	["PRT", "Portugal"],
	["QAT", "Qatar"],
	["SGP", "Singapore"], // Not included in world file!
	["SVK", "Slovakia"],
	["KOR", "South Korea"],
	["ESP", "Spain"],
	// ["St. Lucia", ""],
	["SWE", "Sweden"],
	["CHE", "Switzerland"],
	["TWN", "Taiwan"],
	["THA", "Thailand"],
	["NLD", "The Netherlands"],
	["TUR", "Turkey"],
	["GBR", "UK"],
	["USA", "USA"],
	["UKR", "Ukraine"],
	["URY", "Uruguay"],
	// ["Vatican City", " "],
	["VNM", "Vietnam"],
	// ["Wales", "GBR"],
];

type WorldMapData = {
	type: string;
	properties: {
		name: string;
	};
	geometry: {
		type: string;
		coordinates: number[][][] | number[][][][];
	};
	id: string;
};

const codeLUT: Map<string, string> = new Map(countryToCodeLUT);

type ChoroplethProps = {
	data: Map<string, number>;
	justNorthAmerica?: boolean;
	width: number;
	height: number;
};

export function Choropleth(props: ChoroplethProps) {
	const { data, justNorthAmerica, width, height } = props;
	const svgRef = useRef(null);

	// const width = 640;
	// const height = 400;
	// const marginTop = 20;
	// const marginRight = 20;
	// const marginBottom = 30;
	// const marginLeft = 40;
	const toggleOptions = [
		"Global",
		"South America",
		"North America",
		"Europe",
		"Asia",
	];
	const [selectedOption, setSelectedOption] = useState(toggleOptions[0]);

	const curMap = justNorthAmerica
		? worldMap.features.filter((d) => {
				return (
					d.properties.name === "USA" ||
					d.properties.name === "Canada" ||
					d.properties.name === "Mexico"
				);
			})
		: worldMap.features;

	useEffect(() => {
		if (!svgRef.current) {
			return;
		}

		let mapCenter = [0, 20];
		let scale = 99;

		if (selectedOption === "Global") {
			scale = 99;
			mapCenter = [0, 20];
		} else if (selectedOption === "South America") {
			scale = 300;
			mapCenter = [-55.49, -18.78];
		} else if (selectedOption === "North America") {
			scale = 300;
			mapCenter = [-98.35, 39.5];
		} else if (selectedOption === "Europe") {
			scale = 375;
			mapCenter = [15.25, 54.53];
		} else if (selectedOption === "Asia") {
			scale = 400;
			mapCenter = [115.53, 22.79];
		}

		const svg = select(svgRef.current);
		svg.selectAll("*").remove();
		// Create the SVG container.
		// svg
		// 	.attr("width", width)
		// 	.attr("height", height)
		// 	.attr("viewBox", [0, 0, width, height])
		// 	.attr("style", "max-width: 100%; height: auto;");

		const projection = geoMercator()
			.center([mapCenter[0], mapCenter[1]]) // GPS of location to zoom on
			.scale(scale) // This is like the zoom
			.translate([width / 2, height / 2]);

		// const data = new Map()
		const colorScale = scaleThreshold<number, string>()
			.domain([1, 4, 7, 10, 13, 16]) //TODO: make the range more intelligent... (like min/max/median of data)
			.range(schemeBlues[7]);

		const Tooltip = select("body")
			.append("div")
			.attr("class", "tooltip")
			.style("position", "absolute")
			.style("opacity", 0)
			.style("background-color", "black")
			.style("border", "solid")
			.style("border-width", "2px")
			.style("border-radius", "5px")
			.style("padding", "5px")
			.style("pointer-events", "none");

		const mousemove = (event: MouseEvent, d: WorldMapData) => {
			const nValue = data.get(codeLUT.get(d.id) || "") || 0;

			Tooltip.html(
				`${codeLUT.get(d.id)}<br>n: ${data.get(codeLUT.get(d.id) || "") || 0}`,
			)
				.style("left", event.pageX + 10 + "px")
				.style("top", event.pageY + "px");

			if (nValue) {
				Tooltip.style("opacity", 1);
			} else {
				Tooltip.style("opacity", 0);
			}
		};

		const mouseOver = function () {
			Tooltip.style("opacity", 1);
		};

		const mouseLeave = function () {
			Tooltip.style("opacity", 0);
		};

		// Draw the map
		svg
			.append("g")
			.selectAll("path")
			.data(curMap)
			.join("path")
			// draw each country
			.attr(
				"d",
				//@ts-expect-error TS is angry about this but i'm not sure why...
				geoPath().projection(projection),
			)
			// set the color of each country
			.attr("fill", function (d) {
				// d.total = data.get(d.id) || 0;
				return colorScale(data.get(codeLUT.get(d.id) || "") || 0);
			})
			.attr("stroke", function (d) {
				return (data.get(codeLUT.get(d.id) || "") || 0) > 0
					? "black"
					: "transparent";
			})
			.on("mouseover", mouseOver)
			.on("mousemove", mousemove)
			.on("mouseleave", mouseLeave);

		// Delete children on rerender
		// svg.selectAll("*").remove();
	}, [svgRef, data, curMap, selectedOption, width, height]);

	return (
		<div>
			<svg
				ref={svgRef}
				viewBox={`0 0 ${width} ${height}`}
				style={{
					width: "100%",
					aspectRatio: width / height,
					height: "auto",
				}}
			/>
			<div className={styles.toggleButtonContainer}>
				<div className={pageStyles.actionTextClick} />
				{toggleOptions.map((option) => (
					<button
						onClick={() => {
							setSelectedOption(option);
						}}
						key={option}
						style={{ backgroundColor: TasteDaRainbow.blue }}
						className={selectedOption === option ? styles.active : ""}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
}

"use client";
import {
	extent,
	geoMercator,
	geoPath,
	// scaleOrdinal,
	scaleSqrt,
	// schemePaired,
	select,
} from "d3";
import { useEffect, useRef, useState } from "react";
import pageStyles from "../page.module.css";
import styles from "./ButtonToggleGraph.module.css";

// Template From:
// https://d3-graph-gallery.com/graph/bubblemap_template.html

// the world is always the same...
import canada from "@/data/ca.json";
import california from "@/data/california.json";
import greatLakes from "@/data/greatLakes.json";
import provincesStates from "@/data/provincesStates.json";
import worldMap from "@/data/world.json";
import { defaultBarColor } from "../common/color";
import { InteractivePill } from "../layout/SurveyComponents";

export type CoordinateData = {
	name: string;
	latitude: number;
	longitude: number;
	n: number;
};

type BubbleMapProps = {
	data: CoordinateData[];
	excludeCalifornia?: boolean;
	excludeOntario?: boolean;
	excludeNorthAmerica?: boolean;
	excludeAsia?: boolean;
	excludeEurope?: boolean;
	width: number;
	height: number;
};

export function BubbleMap(props: BubbleMapProps) {
	const {
		data,
		excludeCalifornia,
		excludeOntario,
		excludeNorthAmerica,
		excludeAsia,
		excludeEurope,
		width,
		height,
	} = props;
	const svgRef = useRef(null);

	// const width = 640;
	// const height = 400;
	// const marginTop = 20;
	// const marginRight = 20;
	// const marginBottom = 30;
	// const marginLeft = 40;
	const toggleOptions = [
		"Global",
		"California",
		"North America",
		"Ontario",
		"Europe",
		"Asia",
	];

	// please do not use the following code ever again.
	if (excludeCalifornia) {
		const index = toggleOptions.indexOf("California");
		toggleOptions.splice(index, 1);
	}

	if (excludeOntario) {
		const index = toggleOptions.indexOf("Ontario");
		toggleOptions.splice(index, 1);
	}

	if (excludeNorthAmerica) {
		const index = toggleOptions.indexOf("North America");
		toggleOptions.splice(index, 1);
	}

	if (excludeAsia) {
		const index = toggleOptions.indexOf("Asia");
		toggleOptions.splice(index, 1);
	}

	if (excludeEurope) {
		const index = toggleOptions.indexOf("Europe");
		toggleOptions.splice(index, 1);
	}

	const [selectedOption, setSelectedOption] = useState(toggleOptions[0]);

	useEffect(() => {
		if (!svgRef.current) {
			return;
		}

		let mapCenter = [0, 20];
		let scale = 99;

		if (selectedOption === "Global") {
			scale = 99;
			mapCenter = [0, 20];
		} else if (selectedOption === "California") {
			scale = 10000;
			mapCenter = [-122.291, 37.827];
		} else if (selectedOption === "North America") {
			scale = 500;
			mapCenter = [-98.35, 45.0];
		} else if (selectedOption === "Europe") {
			scale = 400;
			mapCenter = [15.25, 54.53];
		} else if (selectedOption === "Asia") {
			scale = 200;
			mapCenter = [115.53, 22.79];
		} else if (selectedOption === "Ontario") {
			scale = 5000;
			mapCenter = [-79.8, 43.6];
		}

		// Create the SVG container.
		const svg = select(svgRef.current);
		svg.selectAll("*").remove();

		// svg
		// 	.attr("width", width)
		// 	.attr("height", height)
		// 	.attr("viewBox", [0, 0, width, height])
		// 	.attr("style", "max-width: 100%; height: auto;");

		// Map and projection
		const projection = geoMercator()
			.center([mapCenter[0], mapCenter[1]]) // GPS of location to zoom on
			.scale(scale) // This is like the zoom
			.translate([width / 2, height / 2]);

		// NA Coords
		// .center([-98.35, 39.50]) // GPS of location to zoom on
		// .scale(500) // This is like the zoom

		// California coords
		// .center([-122.291, 37.827]) // GPS of location to zoom on
		// .scale(10000) // This is like the zoom

		//EU Coords
		// .center([15.25, 54.53]) // GPS of location to zoom on
		// .scale(400) // This is like the zoom

		//Asia Coords
		// .center([115.53, 22.79]) // GPS of location to zoom on
		// .scale(400) // This is like the zoom

		// Create a color scale
		/* COMMENTING OUT FOR LINT REASONS :)
		const color = scaleOrdinal<number, string>()
			.domain([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
			.range(schemePaired);
		*/
		// Add a scale for bubble size
		const valueExtent = extent(data, (d) => +d.n);
		const size = scaleSqrt()
			.domain([0, valueExtent[1]] as [number, number]) // What's in the data
			.range([1, 20]); // Size in pixel

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

		const mouseover = () => Tooltip.style("opacity", 1);

		const mousemove = (event: MouseEvent, d: CoordinateData) => {
			Tooltip.html(`${d.name}<br>n: ${d.n}`)
				.style("left", event.pageX + 10 + "px")
				.style("top", event.pageY + "px");
		};

		const mouseleave = () => Tooltip.style("opacity", 0);

		if (selectedOption === "California") {
			svg
				.append("g")
				.selectAll("path")
				.data(california.features)
				.join("path")
				.attr("fill", "#b8b8b8")
				.attr(
					"d",
					//@ts-expect-error typescript is just mad about this for no reason
					geoPath().projection(projection),
				)
				.style("stroke", "none")
				.style("opacity", 0.8);
		} else if (selectedOption === "North America") {
			svg
				.append("g")
				.selectAll("path")
				.data(provincesStates.features)
				.join("path")
				.attr("fill", "#b8b8b8")
				.attr(
					"d",
					//@ts-expect-error typescript is just mad about this for no reason
					geoPath().projection(projection),
				)
				.style("stroke", "none")
				.style("opacity", 0.8);

			svg
				.append("g")
				.selectAll("path")
				.data(canada.features)
				.join("path")
				.attr("fill", "#b8b8b8")
				.attr(
					"d",
					//@ts-expect-error typescript is just mad about this for no reason
					geoPath().projection(projection),
				)
				.style("stroke", "none")
				.style("opacity", 0.8);

			svg
				.append("g")
				.selectAll("path")
				.data(greatLakes.features)
				.join("path")
				.attr("fill", "#180636")
				.attr(
					"d",
					//@ts-expect-error typescript is just mad about this for no reason
					geoPath().projection(projection),
				)
				.style("stroke", "none")
				.style("opacity", 1);
		} else {
			// Draw the map
			svg
				.append("g")
				.selectAll("path")
				.data(worldMap.features)
				.join("path")
				.attr("fill", "#b8b8b8")
				.attr(
					"d",
					//@ts-expect-error typescript is just mad about this for no reason
					geoPath().projection(projection),
				)
				.style("stroke", "none")
				.style("opacity", 0.8);

			svg
				.append("g")
				.selectAll("path")
				.data(greatLakes.features)
				.join("path")
				.attr("fill", "#180636")
				.attr(
					"d",
					//@ts-expect-error typescript is just mad about this for no reason
					geoPath().projection(projection),
				)
				.style("stroke", "none")
				.style("opacity", 1);
		}

		// Add circles:
		svg
			.selectAll("myCircles")
			.data(
				data.sort((a, b) => +b.n - +a.n),
				// .filter((d,i) => i<1000)
			)
			.join("circle")
			.attr("cx", (d) => (projection([+d.longitude, +d.latitude]) ?? [0, 0])[0])
			.attr("cy", (d) => (projection([+d.longitude, +d.latitude]) ?? [0, 0])[1])
			.attr("r", (d) => size(+d.n))
			// .style("fill", (d) => color(d.n % 12))
			.style("fill", "#9562D8")
			.style("stroke", "darkblue")
			.attr("stroke", "none")
			.attr("fill-opacity", 0.4)
			.on("mouseover", mouseover)
			.on("mousemove", mousemove)
			.on("mouseleave", mouseleave);

		// --------------- //
		// ADD LEGEND //
		// --------------- //

		// Add legend: circles
		const valuesToShow = [1, 20];
		const xCircle = 40;
		const xAxisTitle = 90;
		svg
			.selectAll("legend")
			.data(valuesToShow)
			.join("circle")
			.attr("cx", xCircle)
			.attr("cy", (d) => height - size(d))
			.attr("r", (d) => size(d))
			.style("fill", "none")
			.attr("stroke", "white");

		// Add legend: segments
		svg
			.selectAll("legend")
			.data(valuesToShow)
			.join("line")
			.attr("x1", (d) => xCircle + size(d))
			.attr("x2", xAxisTitle)
			.attr("y1", (d) => height - size(d))
			.attr("y2", (d) => height - size(d))
			.attr("stroke", "white")
			.style("stroke-dasharray", "2,2");

		// Add legend: labels
		svg
			.selectAll("legend")
			.data(valuesToShow)
			.join("text")
			.attr("x", xAxisTitle)
			.attr("y", (d) => height - size(d))
			.text((d) => d)
			.style("font-size", 10)
			.attr("alignment-baseline", "middle")
			.attr("stroke", "white");

		// // Delete children on rerender
		// svg.selectAll("*").remove();
	}, [svgRef, data, selectedOption, width, height]);

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
			<div
				style={{
					textAlign: "center",
					display: "flex",
					justifyContent: "center",
					marginTop: "10px",
				}}
			>
				<InteractivePill type="hover_bubble_map" />
			</div>
			<div className={styles.toggleButtonContainer}>
				<div className={pageStyles.actionTextClick} />

				{toggleOptions.map((option) => (
					<button
						onClick={() => {
							setSelectedOption(option);
						}}
						key={option}
						style={{ backgroundColor: defaultBarColor }}
						className={selectedOption === option ? styles.active : ""}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
}

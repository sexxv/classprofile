// I give up
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
"use client";
import { extent, interpolateRgbBasis, scaleSqrt, select } from "d3";

import { sendGAEvent } from "@next/third-parties/google";
import cloud from "d3-cloud";
import { useEffect, useRef, useState } from "react";
import { HoverCountTooltip } from "../common/HoverCountTooltip";
import {
	convertToLinkFormat,
	InteractivePill,
} from "../layout/SurveyComponents";

const interpolater = interpolateRgbBasis(["#ad99d9", "#5b32b3"]);

type WordData = {
	text: string;
	count: number;
};

type WordCloudProps = {
	data: WordData[];
	title: string;

	useSqrtWithMinAndMaxSizes?: number[]; // [min, max] for sqrt scaling
	width?: number;
	height?: number;
};

export function WordCloud(props: WordCloudProps) {
	// Twitter is at 16 for all co-ops
	const {
		data,
		title,
		width = 640,
		height = 400,
		useSqrtWithMinAndMaxSizes,
	} = props;
	const svgRef = useRef(null);
	const isTransitioning = useRef(false);

	const [isMissingWords, setIsMissingWords] = useState(false);

	// const marginTop = 20;
	// const marginRight = 20;
	// const marginBottom = 30;
	// const marginLeft = 40;

	useEffect(() => {
		if (!svgRef.current) {
			return;
		}

		// Create the SVG container.
		const svg = select(svgRef.current);

		// Get the min and max counts from your data
		const countExtent = extent(data, (d) => d.count); // [min, max]
		const counts = data.map((d) => d.count);
		const maxCount = Math.max(...counts);

		const fontScaleShowAll = useSqrtWithMinAndMaxSizes
			? scaleSqrt()
					.domain(countExtent as [number, number])
					.range(useSqrtWithMinAndMaxSizes)
			: null;

		const fontScalar = 12;

		const words = data.map((d) => ({
			text: d.text,
			size:
				fontScaleShowAll !== null
					? fontScaleShowAll(d.count)
					: d.count * fontScalar,
			count: d.count,
		}));

		const layout = cloud()
			.size([width, height])
			.words(words)
			// https://stackoverflow.com/questions/42941368/keep-d3-cloud-consistent-between-refreshes-with-a-seed-value
			.random(() => 0.5)
			// dw ab it
			.padding(
				maxCount == 1 ? 10 : maxCount == 16 ? 5 : maxCount >= 6 ? 9.5 : 8,
			) //space between words
			.fontSize(function (d) {
				return d.size ?? 0;
			}) // font size of each word
			.rotate(() => 0)
			.on("end", draw);
		layout.start();

		function draw(words: cloud.Word[]) {
			const group = svg.select("g");
			const groupStartedEmpty = group.empty();

			const wordSelection = (
				group.empty() // only  create a new group if it doesn't already exist
					? svg
							.append("g")
							.attr("transform", `translate(${width / 2}, ${height / 2})`)
					: group
			)
				.selectAll("text")
				.data(words, (d: unknown) => d.text); // use word content as key

			// i love d3???
			// https://www.d3indepth.com/enterexit/
			// typescript hates this tho sorry
			wordSelection
				.join(
					(enter) => {
						const enterSelection = enter
							.append("text")
							.text((d) => d.text)
							.attr("text-anchor", "middle")
							.style("font-family", "var(--font-athiti)")
							.style("font-weight", "bold")
							.style("fill", (d) => interpolater((d.size ?? 0) / 100))
							.style("font-size", (d) => `${d.size}px`)
							.attr("transform", (d) => `translate(${d.x}, ${d.y})`)
							// dont set opacity 1 on first render because it doesnt finish
							.style("opacity", groupStartedEmpty ? 1 : 0);

						enterSelection
							.transition()
							.duration(1000)
							.style("opacity", 1)
							.on("start", () => {
								isTransitioning.current = true;
							})
							.on("end", () => {
								isTransitioning.current = false;
							})
							.on("interrupt", () => {
								isTransitioning.current = false;
							});

						return enterSelection;
					},

					(update) =>
						update
							.transition()
							.duration(1000)
							.attr("transform", (d) => `translate(${d.x}, ${d.y})`)
							.style("fill", (d) => interpolater((d.size ?? 0) / 100))
							.style("font-size", (d) => `${d.size}px`)
							.style("opacity", 1)
							.on("start", () => {
								isTransitioning.current = true;
							})
							.on("end", () => {
								isTransitioning.current = false;
							})
							.on("interrupt", (event, d) => {
								isTransitioning.current = false;

								select(event.currentTarget).attr(
									"transform",
									`translate(${d.x}, ${d.y})`,
								);
							}),

					(exit) => exit.remove(),
				)
				.attr("id", (d) => `${convertToLinkFormat(title)}-${d.text}`)
				.on("mouseover", function () {
					if (isTransitioning.current) return;
					const hoveredWord = select(this);
					hoveredWord
						.transition()
						.duration(200)
						.style("fill", "#dbbef7")
						.style("cursor", "pointer");
				})
				.on("mouseout", function (event, d) {
					if (isTransitioning.current) return;
					const hoveredWord = select(this);
					hoveredWord
						.transition()
						.duration(200)
						.style("fill", () => {
							const opacity = (d.size ?? 0) / 100;
							return interpolater(opacity);
						})
						.style("cursor", "default");

					const tooltip = select(`#${convertToLinkFormat(title)}-tooltip`);
					tooltip.style("opacity", 0);
				})
				.on("mousemove", function (event, d) {
					if (isTransitioning.current) return;
					const tooltip = select(`#${convertToLinkFormat(title)}-tooltip`);
					tooltip
						.style("opacity", 1)
						.style("left", `${event.pageX + 10}px`)
						.style("top", `${event.pageY + 10}px`)
						.html(`<div>${d.count ?? 0}</div>`);
				})
				.text(function (d) {
					return d.text ?? "";
				});
		}

		// so d3 wordcloud has this great feature where if the settings arent right, itll clip
		// the words and they will just be GONE. that sucks.
		// so here's a quick check to ensure that all words are actually visible.
		// the good news is that because we are using a seed of 0.5 instead of rng, once you fix this
		// it will stay fixed.
		setTimeout(() => {
			const renderedWords = svg.selectAll("text").nodes();
			let visibleCount = 0;

			const visibleWords = new Set<string>();

			renderedWords.forEach((node) => {
				const box = node.getBBox();

				// Check if word is within SVG bounds
				const withinX =
					box.x + box.width / 2 >= -width / 2 &&
					box.x - box.width / 2 <= width / 2;
				const withinY =
					box.y + box.height / 2 >= -height / 2 &&
					box.y - box.height / 2 <= height / 2;

				if (withinX && withinY) {
					visibleCount++;
					visibleWords.add((node as unknown as Element)?.textContent ?? "");
				}
			});

			console.log(`Visible words: ${visibleCount}/${data.length}`);
			if (visibleCount < data.length) {
				console.warn(
					`Some word in the word cloud have been clipped. Adjust settings. Yes this is sad.`,
				);
				console.warn(
					"FYI, the missing words are: ",
					new Set<string>(data.map((d) => d.text)).difference(visibleWords),
				);

				setIsMissingWords(true);

				sendGAEvent({
					category: "wordCloudFailedRender",
					value: new Set<string>(data.map((d) => d.text)).difference(
						visibleWords,
					),
				});
			}
		}, 200);
	}, [
		svgRef,
		data,
		title,
		width,
		height,
		useSqrtWithMinAndMaxSizes,
		isMissingWords,
	]);

	return (
		<>
			{isMissingWords && (
				<div
					style={{
						color: "red",
						fontSize: "12px",
						marginBottom: 12,
						textAlign: "center",
					}}
				>
					Some words in the word cloud have been clipped... Sad.
				</div>
			)}
			<svg
				ref={svgRef}
				key={"word-cloud-svg"}
				viewBox={`0 0 ${width} ${height}`}
				style={{
					width: "100%",
					aspectRatio: width / height,
					height: "auto",
				}}
			/>
			<div
				style={{
					width: "100%",
					display: "flex",
					justifyContent: "center",
					marginTop: 12,
				}}
			>
				<InteractivePill type={"hover_for_counts"} />
			</div>
			<HoverCountTooltip id={`${convertToLinkFormat(title)}-tooltip`} />
		</>
	);
}

"use client";
import * as d3 from "d3";
import {
	sankey,
	SankeyGraph,
	SankeyLink,
	sankeyLinkHorizontal,
	SankeyNode,
} from "d3-sankey";
import { useEffect, useRef } from "react";

import fixed_coop_counts from "@/data/cleaned/coop_cities_fixed_counts.json";
import { select } from "d3";
import { title } from "process";
import { TasteDaRainbow } from "../common/color";
import { HoverCountTooltip } from "../common/HoverCountTooltip";
import { convertToLinkFormat } from "../layout/SurveyComponents";
import styles from "../page.module.css";

const removeLastChar = (str: string) => (str.length ? str.slice(0, -1) : str);

function makeTooltipHTML(
	d: SankeyNode<SankeyDataInternalNode, SankeyDataInternalLink>,
) {
	return `
		<div style="text-align: left; background-color: ${d3.rgb(d.color).darker(0.5)};">
			<h3 style="margin: 0 0 10px 0;">
				${removeLastChar(d.name)} (Total: ${d.fixedValue})
			</h3>

			${
				d.targetLinks && d.targetLinks.length > 0
					? `
			<table style="width: 100%; border-collapse: collapse; margin-bottom: 6px;">
				<thead style="border-bottom: 1px solid white;">
					<tr>
						<th style="text-align: left; padding: 4px;">Inbound 🛬</th>
						<th style="text-align: right; padding: 4px;">Count</th>
																		<th style="text-align: right; padding: 4px;"/>
					</tr>
				</thead>
				<tbody>
					${d.targetLinks
						.map(
							(
								link: SankeyLink<
									SankeyDataInternalNode,
									SankeyDataInternalLink
								>,
							) => `
								<tr>
									<td style="text-align: left; padding: 4px;">${removeLastChar(link.source.name)}</td>
									<td style="text-align: center; padding: 4px;">${link.value}</td>
									<td style="text-align: right; padding: 4px;">${(
										(link.value / d.fixedValue) *
										100
									).toFixed(0)}%</td>
								</tr>
							`,
						)
						.join("")}
				</tbody>
			</table>
			`
					: ""
			}

			${
				d.sourceLinks && d.sourceLinks.length > 0
					? `
			<table style="width: 100%; border-collapse: collapse; margin-top: 6px;">
				<thead style="border-bottom: 1px solid white;">
					<tr>
						<th style="text-align: left; padding: 4px;">Outbound 🛫</th>
						<th style="text-align: right; padding: 4px;">Count</th>
												<th style="text-align: right; padding: 4px;"/>
					</tr>
				</thead>
				<tbody>
					${d.sourceLinks
						.map(
							(link: SankeyDataInternalLink) => `
								<tr>
									<td style="text-align: left; padding: 4px;">${removeLastChar(link.target.name)}</td>
									<td style="text-align: center; padding: 4px;">${link.value}</td>
									<td style="text-align: right; padding: 4px;">${(
										(link.value / d.fixedValue) *
										100
									).toFixed(0)}%</td>
								</tr>
							`,
						)
						.join("")}
				</tbody>
			</table>
			`
					: ""
			}
		</div>
	`;
}

type SankeyDataInputNode = {
	node: number;
	name: string;
	color?: string;
};

type SankeyDataInputLink = {
	source: number;
	target: number;
	value: number;
};

type SankeyInputData = {
	nodes: SankeyDataInputNode[];
	links: SankeyDataInputLink[];
};

type SankeyDataInternalNode = SankeyDataInputNode & {
	fixedValue: number;
	color: string;
};

type SankeyDataInternalLink = {
	value: number;
	source: SankeyNode<SankeyDataInternalNode, SankeyDataInternalLink>;
	target: SankeyNode<SankeyDataInternalNode, SankeyDataInternalLink>;
};

export const SankeyDiagram = ({ data }: { data: SankeyInputData }) => {
	const ref = useRef(null);
	const isTransitioning = useRef(false);

	const calculateFixedValue = (coopKey: string) =>
		fixed_coop_counts[coopKey as keyof typeof fixed_coop_counts] || 1000;

	useEffect(() => {
		if (!ref.current) return;

		const margin = { top: 10, right: 70, bottom: 10, left: 70 };
		const width = 1380 - margin.left - margin.right;
		const height = 480 - margin.top - margin.bottom;

		const svg = d3
			.select(ref.current)
			.selectAll("svg")
			.data([null])
			.join("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom);

		const group = svg.select("g");
		const groupStartedEmpty = group.empty();

		const g = svg
			.selectAll("g.main")
			.data([null])
			.join("g")
			.attr("class", "main")
			.attr("transform", `translate(${margin.left},${margin.top})`);

		const sankeyGen = sankey<SankeyDataInternalNode, SankeyDataInputLink>()
			.nodeWidth(36)
			.nodePadding(15)
			.size([width, height])
			.nodeSort((a, b) => d3.ascending(a.name, b.name));

		const fixedColors = {
			Remote: TasteDaRainbow.blue,
			Canada: TasteDaRainbow.gradRed,
			USA: TasteDaRainbow.green,
			Singapore: TasteDaRainbow.gray,
			Germany: TasteDaRainbow.gradOrange,
			Japan: TasteDaRainbow.brown,

			Cologne: TasteDaRainbow.yellow,
			Tokyo: TasteDaRainbow.brown,
			Alberta: TasteDaRainbow.darkBlue,
			Washington: TasteDaRainbow.darkGreen,
			Texas: TasteDaRainbow.darkPurple,
			Florida: TasteDaRainbow.pink,
		};

		function getNodeColor(d: SankeyDataInputNode): string {
			const identifier = removeLastChar(d.name).split(" ")[0];

			if (identifier in fixedColors) {
				d.color = fixedColors[identifier as keyof typeof fixedColors];
			} else {
				d.color = color(removeLastChar(d.name).replace(/ .*/, ""));
			}

			return d.color;
		}

		const color = d3.scaleOrdinal(d3.schemeObservable10);

		const sankeyData = sankeyGen({
			nodes: data.nodes.map((d) => ({
				...d,
				fixedValue: calculateFixedValue(d.name),
				color: getNodeColor(d),
			})),
			links: data.links.map((d) => ({ ...d })),
			// I give up
		}) as unknown as SankeyGraph<
			SankeyDataInternalNode,
			SankeyDataInternalLink
		>;

		const link = g
			.selectAll<SVGGElement, SankeyDataInternalLink>(".link")
			.data(
				sankeyData.links,
				(d: SankeyDataInternalLink) => `${d.source.name}->${d.target.name}`,
			);

		const nodeAnimationDelayConstant = 30;

		const l = link
			.join("path")
			.attr("class", "link")
			.attr("fill", "none")
			.attr("stroke", "#fff")
			.attr("stroke-opacity", 0.3)
			.attr("d", sankeyLinkHorizontal())
			.each(function () {
				const pathLength = (this as SVGPathElement).getTotalLength();
				d3.select(this)
					.attr("stroke-dasharray", pathLength)
					.attr("stroke-dashoffset", pathLength);
			});

		if (!groupStartedEmpty) {
			l.transition()
				.duration(1000)
				.delay(
					() => sankeyData.nodes.length * (nodeAnimationDelayConstant + 10),
				)
				.attr("stroke-width", (d) => Math.max(1, d.width ?? 1))
				.attr("stroke-dashoffset", 0)
				.on("start", () => {
					isTransitioning.current = true;
				})
				.on("end", () => {
					isTransitioning.current = false;
				})
				.on("interrupt", () => {
					isTransitioning.current = false;
				});
		} else {
			l.attr("stroke-width", (d) => Math.max(1, d.width ?? 1)).attr(
				"stroke-dashoffset",
				0,
			);
		}

		link.exit().remove();

		const node = g
			.selectAll<SVGGElement, SankeyDataInternalNode>(".node")
			.data(sankeyData.nodes, (d: SankeyDataInternalNode) => d.name);

		const nodeEnter = node.enter().append("g").attr("class", "node");

		nodeEnter
			.append("rect")
			.attr("width", sankeyGen.nodeWidth())
			.style("fill", (d) => d.color)
			.style("stroke", (d) => d3.rgb(d.color).darker(1).toString())
			.style("stroke-width", 1);

		nodeEnter
			.append("text")
			.attr("x", sankeyGen.nodeWidth() / 2)
			.attr("dy", "0.35em")
			.style("fill", "#fff")
			.style("text-anchor", "middle");

		const allNodes = nodeEnter.merge(node);

		// start all nodes at the top at the correct x position
		allNodes.attr("transform", (d) => `translate(${d.x0},${d.y0})`);

		if (!groupStartedEmpty) {
			allNodes
				.select("rect")
				.transition()
				.on("start", () => {
					isTransitioning.current = true;
				})
				.on("end", () => {
					isTransitioning.current = false;
				})
				.on("interrupt", () => {
					isTransitioning.current = false;
				})
				.delay((d, i) => i * nodeAnimationDelayConstant)
				.duration(800)
				.attr("height", (d) => (d.y1 ?? 0) - (d.y0 ?? 0));

			allNodes
				.select("text")
				.transition()
				.on("start", () => {
					isTransitioning.current = true;
				})
				.on("end", () => {
					isTransitioning.current = false;
				})
				.on("interrupt", () => {
					isTransitioning.current = false;
				})
				.duration(800)
				.attr("y", (d) => ((d.y1 ?? 0) - (d.y0 ?? 0)) / 2 - 4)
				.text((d) => `${removeLastChar(d.name)}`);
		} else {
			allNodes.select("rect").attr("height", (d) => (d.y1 ?? 0) - (d.y0 ?? 0));
			allNodes
				.select("text")
				.attr("y", (d) => ((d.y1 ?? 0) - (d.y0 ?? 0)) / 2 - 4)
				.text((d) => `${removeLastChar(d.name)}`);
		}

		allNodes
			.select("text")
			.style("cursor", "default")
			.on("mouseover", function () {
				if (isTransitioning.current) return;
				const hoveredNode = select(this);
				hoveredNode.transition().style("cursor", "pointer");
			})
			.on("mouseout", function () {
				if (isTransitioning.current) return;
				const tooltip = select(`#${convertToLinkFormat(title)}-tooltip`);
				tooltip.style("opacity", 0);
			})
			.on("mousemove", function (event, d) {
				if (isTransitioning.current) return;
				const tooltip = select(`#${convertToLinkFormat(title)}-tooltip`);
				tooltip
					.style("font-size", "12px")
					.style("opacity", 1)
					.style("border", `1px solid ${d3.rgb(d.color).darker(1)}`)
					.style("background-color", d3.rgb(d.color).darker(0.5).toString())
					.style("color", "#fff")
					.style("left", `${event.pageX + 10}px`)
					.style("top", `${event.pageY + 10}px`)
					.html(makeTooltipHTML(d));
			});

		allNodes
			.select("rect")
			.on("mouseover", function () {
				if (isTransitioning.current) return;
				const hoveredNode = select(this);
				hoveredNode.transition().style("cursor", "pointer");
			})
			.on("mouseout", function () {
				if (isTransitioning.current) return;
				const tooltip = select(`#${convertToLinkFormat(title)}-tooltip`);
				tooltip.style("opacity", 0);
			})
			.on("mousemove", function (event, d) {
				if (isTransitioning.current) return;
				const tooltip = select(`#${convertToLinkFormat(title)}-tooltip`);
				tooltip
					.style("font-size", "12px")
					.style("opacity", 1)
					.style("background-color", d3.rgb(d.color).darker(0.5).toString())
					.style("border", `1px solid ${d3.rgb(d.color).darker(1)}`)
					.style("color", "#fff")
					.style("left", `${event.pageX + 10}px`)
					.style("top", `${event.pageY + 10}px`)
					.html(makeTooltipHTML(d));
			});

		node.exit().remove();
	}, [data]);

	return (
		<>
			<div ref={ref} className={styles.sankeyOverflowOnMobile} />
			<HoverCountTooltip id={`${convertToLinkFormat(title)}-tooltip`} />
		</>
	);
};

import { SVGTextElementAttributes } from "react";

type MultilineLabelProps = SVGTextElementAttributes<SVGTextElement> & {
	/**
	 * Text to display over multiple lines.
	 * Use "\n" as the separator for lines of text.
	 */
	text: string;

	lineHeight?: number;
	x: number;
	y: number;
};

export function MultilineLabel(props: MultilineLabelProps) {
	const { text, x, y, lineHeight = 0, alignmentBaseline, ...rest } = props;
	const textLines = text.split("\n");

	const yOffset = offsets(
		alignmentBaseline ?? "middle",
		textLines.length,
		lineHeight,
	);

	return (
		<>
			{textLines.map((line, idx) => (
				<text key={idx} {...rest} x={x} y={y + yOffset + lineHeight * idx}>
					{line}
				</text>
			))}
		</>
	);
}

function offsets(
	alignmentBaseline: string,
	numLines: number,
	lineHeight: number,
): number {
	const estimatedHeight = lineHeight * numLines;

	if (alignmentBaseline === "middle") {
		return -estimatedHeight / 2 + lineHeight / 2;
	} else if (alignmentBaseline === "top") {
		return 0;
	} else if (alignmentBaseline === "bottom") {
		return -estimatedHeight;
	}

	return 0;
}

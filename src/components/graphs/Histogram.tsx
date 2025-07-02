import { SURVEY_QUESTION } from "../mappings/QuestionsList";
import { HorizontalBarGraph, VerticalBarGraph } from "./BarGraph";
import { GraphBounds } from "./GraphBase";

type HistogramProps = {
	counts: number[];
	labels: string[];

	/**
	 * List of points at which one bin ends and the next begins.
	 *
	 * Each bin is inclusive of its lower bound and exclusive of its upper bound (except for the last), so
	 * `[0, 10, 20, 30]` creates the bins `[0, 10), [10, 20), [20, 30]`.
	 */
	binBreakpoints: number[];

	barColor: string;
	binSpacing: number;
} & GraphBounds;

export function HorizontalHistogram(props: HistogramProps) {
	const {
		width,
		height,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		counts,
		labels,
		binBreakpoints,
		barColor,
		binSpacing,
	} = props;

	const { bins, binLabels } = generateBins(counts, labels, binBreakpoints);

	return (
		<HorizontalBarGraph
			width={width}
			height={height}
			marginTop={marginTop}
			marginRight={marginRight}
			marginBottom={marginBottom}
			marginLeft={marginLeft}
			bins={bins}
			labels={binLabels}
			barColor={barColor}
			binSpacing={binSpacing}
		/>
	);
}

export function VerticalHistogram(props: HistogramProps) {
	const {
		width,
		height,
		marginTop,
		marginRight,
		marginBottom,
		marginLeft,
		counts,
		labels,
		binBreakpoints,
		barColor,
		binSpacing,
	} = props;

	const { bins, binLabels } = generateBins(counts, labels, binBreakpoints);

	return (
		<VerticalBarGraph
			width={width}
			height={height}
			marginTop={marginTop}
			marginRight={marginRight}
			marginBottom={marginBottom}
			marginLeft={marginLeft}
			bins={bins}
			labels={binLabels}
			barColor={barColor}
			binSpacing={binSpacing}
		/>
	);
}

function generateBins(
	counts: number[],
	labels: string[],
	binBreakpoints: number[],
) {
	const numericLabels = labels.map((label) => parseFloat(label));
	// Assuming sorted order...
	const numBins = binBreakpoints.length - 1;

	const binLabels = [];
	for (let i = 0; i < numBins - 1; ++i) {
		binLabels.push(`[${binBreakpoints[i]}, ${binBreakpoints[i + 1]})`);
	}
	binLabels.push(
		`[${binBreakpoints[numBins - 1]}, ${binBreakpoints[numBins]}]`,
	);

	const bins = new Array(numBins).fill(0);
	let binIndex = 0;
	for (let i = 0; i < counts.length; ++i) {
		// Assuming labels and counts are in ascending order,
		// we can just traverse forward through the available bins whenever
		// we see a data point that would fall outside of the current one.
		// Right?
		while (
			binIndex < numBins - 1 &&
			numericLabels[i] > binBreakpoints[binIndex + 1]
		) {
			++binIndex;
		}

		// For some reason, the bins don't contain our points anymore, so we give up
		if (numericLabels[i] > binBreakpoints[binIndex + 1]) {
			break;
		}

		bins[binIndex] += counts[i];
	}

	return {
		bins,
		binLabels,
	};
}

export const histoBreakpoints = {
	"What was your high school adjustment factor?": [
		7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
	],
	"What was your high school admissions average?": [
		88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98, 99, 100,
	],
} satisfies Partial<Record<SURVEY_QUESTION, number[]>>;

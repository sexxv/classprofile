import { scaleQuantile } from "d3";

export type BoxPlotStats = {
	min: string;
	max: string;
	range: string;
	median: string;
	mean: string;
	q1: string;
	q3: string;
};

// replacing roundNumbersToTwoDecimalPlaces with roundAndFormatNumber which should be more generalized
// export function roundNumbersToTwoDecimalPlaces(
// 	num: number,
// 	fmtLargeNumbers: boolean = false,
// ): string {
// 	if (Number.isInteger(num) || fmtLargeNumbers) {
// 		return new Intl.NumberFormat("en", {
// 			notation: "compact",
// 			compactDisplay: "short",
// 			maximumFractionDigits: 0,
// 		}).format(num);
// 	}
// 	return Math.round(num * 100) / 100 + "";
// }

export function roundAndFormatNumber(
	num: number,
	isFinance: boolean = false,
	numDecimals: number = 2,
	fmtLargeNumbers: boolean = true,
): string {
	if (num % 1 === 0) {
		numDecimals = 0; // if the number is an integer, no decimals are needed
	}

	if (num % 100 === 0) {
		return new Intl.NumberFormat("en", {
			notation: "compact",
			compactDisplay: "short",
			maximumFractionDigits: 1,
		}).format(num);
	}

	if (num >= 100_000 && fmtLargeNumbers) {
		return new Intl.NumberFormat("en", {
			notation: "compact",
			compactDisplay: "short",
			maximumFractionDigits: 0,
		}).format(num);
	}

	if (isFinance) return (Math.round(num * 100) / 100).toFixed(numDecimals);
	return Math.round(num * 100) / 100 + "";
}

export function calculateBoxPlotStats(
	dataSet: number[],
	isFinance: boolean = false,
): BoxPlotStats {
	const sortedData = dataSet.sort((a, b) => a - b);
	const N = sortedData.length;
	const min = sortedData[0];
	const max = sortedData[N - 1];

	// https://stackoverflow.com/questions/48719873/how-to-get-median-and-quartiles-percentiles-of-an-array-in-javascript-or-php
	type validQuantile = 0 | 0.25 | 0.5 | 0.75 | 1;
	const quantile = (q: validQuantile) => {
		const pos = (sortedData.length - 1) * q;
		const base = Math.floor(pos);
		const rest = pos - base;
		if (sortedData[base + 1] !== undefined) {
			return (
				sortedData[base] + rest * (sortedData[base + 1] - sortedData[base])
			);
		} else {
			return sortedData[base];
		}
	};

	const q1 = quantile(0.25);
	const q2 = quantile(0.5); // median
	const q3 = quantile(0.75);
	const mean = sortedData.reduce((acc, val) => acc + val, 0) / N;

	return {
		min: roundAndFormatNumber(min, isFinance),
		max: roundAndFormatNumber(max, isFinance),
		range: roundAndFormatNumber(max - min, isFinance),
		median: roundAndFormatNumber(q2, isFinance),
		mean: roundAndFormatNumber(mean, isFinance),
		q1: roundAndFormatNumber(q1, isFinance),
		q3: roundAndFormatNumber(q3, isFinance),
	};
}

// generates box plot stats without outliers, and returns the necessary data
export function removeOutliers(
	dataSet: number[],
	isFinance: boolean = false,
): [number[], BoxPlotStats] {
	const quantileScale = scaleQuantile(dataSet, [0.25, 0.5, 0.75, 1]);
	const [q1, , q3] = quantileScale.quantiles();
	const iqr = q3 - q1;
	const lowOutlierMax = q1 - 1.5 * iqr;
	const highOutlierMin = q3 + 1.5 * iqr;

	const dataSetWithoutOutliers = dataSet.filter(
		(x) => x >= lowOutlierMax && x <= highOutlierMin,
	);
	const boxPlotStatsWithoutOutliers = calculateBoxPlotStats(
		dataSetWithoutOutliers,
		isFinance,
	);

	return [dataSetWithoutOutliers, boxPlotStatsWithoutOutliers];
}

export function makeCalcBoxplotTable(stats: BoxPlotStats): string {
	const tableElement = `<table style="width: 100%; border-collapse: collapse;">
			<tbody>
				<tr>
					<td style="font-weight: bold">Min</td>
					<td style="text-align: center">${stats.min}</td>
				</tr>
				<tr>
					<td style="font-weight: bold">Max</td>
					<td style="text-align: center">${stats.max}</td>
				</tr>
				<tr>
					<td style="font-weight: bold">Range</td>
					<td style="text-align: center">${stats.range}</td>
				</tr>
				<tr>
					<td style="font-weight: bold; padding-right: 8px;">Median</td>
					<td style="text-align: center">${stats.median}</td>
				</tr>
				<tr>
					<td style="font-weight: bold">Q1</td>
					<td style="text-align: center">${stats.q1}</td>
				</tr>
				<tr>
					<td style="font-weight: bold">Q3</td>
					<td style="text-align: center">${stats.q3}</td>
				</tr>
			</tbody>
		</table>`;

	return tableElement;
}

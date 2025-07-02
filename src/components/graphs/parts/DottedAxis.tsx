type HorizontalDashLinesProps = {
	xMin: number;
	xMax: number;
	ticks: number[];
	scale: (arg: number) => number;

	dashSize?: number;
	dashGap?: number;

	stroke: string;
};

export function HorizontalDashLines(props: HorizontalDashLinesProps) {
	const {
		xMin,
		xMax,
		ticks,
		scale,
		dashSize = 5,
		dashGap = dashSize,
		stroke,
	} = props;

	return (
		<g>
			{ticks.map((tick) => (
				<line
					key={tick}
					stroke={stroke}
					strokeDasharray={`${dashSize},${dashGap}`}
					strokeDashoffset={dashGap}
					x1={xMin}
					x2={xMax}
					y1={scale(tick)}
					y2={scale(tick)}
				/>
			))}
		</g>
	);
}

type VerticalDashLinesProps = {
	yMin: number;
	yMax: number;
	ticks: number[];
	scale: (arg: number) => number;

	dashSize?: number;
	dashGap?: number;

	stroke: string;
};

export function VerticalDashLines(props: VerticalDashLinesProps) {
	const {
		yMin,
		yMax,
		ticks,
		scale,
		dashSize = 5,
		dashGap = dashSize,
		stroke,
	} = props;

	return (
		<g>
			{ticks.map((tick) => (
				<line
					key={tick}
					stroke={stroke}
					strokeDasharray={`${dashSize},${dashGap}`}
					strokeDashoffset={dashGap}
					x1={scale(tick)}
					x2={scale(tick)}
					y1={yMax}
					y2={yMin}
				/>
			))}
		</g>
	);
}

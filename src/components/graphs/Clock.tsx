import { max } from "d3";
import ScaledSVG from "./parts/ScaledSVG";

type HourMinute = {
	hour: number;
	minute: number;
};

type ClockProps = {
	times: HourMinute[];
	counts: number[];

	width: number;
	height: number;
	marginLeft: number;
	marginRight: number;
	marginTop: number;
	marginBottom: number;

	clockColor: string;

	tickSize?: number;
	fontSize?: number;
	handLength?: number;
};

const ticks = new Array(12).fill(0).map((_, i) => i + 1);

const arrowAngle = Math.PI / 4;
const arrowheadLength = 3;

export default function Clock(props: ClockProps) {
	const {
		times,
		counts,
		width,
		height,
		marginLeft,
		marginRight,
		marginTop,
		marginBottom,
		clockColor,
		tickSize = 10,
		fontSize = 16,
	} = props;

	const clockRadius = Math.min(
		(width - marginLeft - marginRight) / 2,
		(height - marginTop - marginBottom) / 2,
	);
	const cx = width / 2;
	const cy = height / 2;

	const handLength =
		props.handLength ?? clockRadius - tickSize - fontSize * 1.5;

	const maxCount = max(counts) || 1;

	return (
		<ScaledSVG height={height} width={width}>
			<circle
				fill={"none"}
				stroke={clockColor}
				cx={cx}
				cy={cy}
				r={clockRadius}
			/>
			<path
				d={`M ${cx} ${cy - clockRadius}
					A ${clockRadius} ${clockRadius} 0 0 0 ${cx} ${cy + clockRadius}`}
				fill={"#b3044f"}
			/>

			<path
				d={`M ${cx} ${cy - clockRadius}
					A ${clockRadius} ${clockRadius} 0 0 1 ${cx} ${cy + clockRadius}`}
				fill={"#320180"}
			/>
			<text
				x={cx - 20}
				y={cy + clockRadius - tickSize - fontSize - 30}
				textAnchor="middle"
				alignmentBaseline="middle"
				fill={clockColor}
			>
				PM
			</text>
			<text
				x={cx + 20}
				y={cy + clockRadius - tickSize - fontSize - 30}
				textAnchor="middle"
				alignmentBaseline="middle"
				fill={clockColor}
			>
				AM
			</text>
			{ticks.map((hour) => {
				// Don't forget! +y is down!
				const theta = -Math.PI / 2 + (hour / 6.0) * Math.PI;
				const c = Math.cos(theta);
				const s = Math.sin(theta);

				return (
					<g key={hour}>
						<line
							x1={cx + c * clockRadius}
							y1={cy + s * clockRadius}
							x2={cx + c * (clockRadius - tickSize)}
							y2={cy + s * (clockRadius - tickSize)}
							stroke={clockColor}
						/>
						<text
							x={cx + c * (clockRadius - tickSize - fontSize)}
							y={cy + s * (clockRadius - tickSize - fontSize)}
							textAnchor="middle"
							alignmentBaseline="middle"
							fontSize={fontSize}
							fill={clockColor}
						>
							{hour}
						</text>
					</g>
				);
			})}
			{times.map(({ hour, minute }, index) => {
				// (Still) don't forget! +y is down!
				const theta = -Math.PI / 2 + (hour / 6.0 + minute / 360.0) * Math.PI;
				const c = Math.cos(theta);
				const s = Math.sin(theta);
				const arrowEndX = cx + (c * handLength * counts[index]) / maxCount;
				const arrowEndY = cy + (s * handLength * counts[index]) / maxCount;

				return (
					<polyline
						key={`${hour}:${minute}`}
						points={`${cx},${cy} 
							${arrowEndX},${arrowEndY} 
							${arrowEndX + Math.cos(theta + Math.PI + arrowAngle) * arrowheadLength},${arrowEndY + Math.sin(theta + Math.PI + arrowAngle) * arrowheadLength}
							${arrowEndX},${arrowEndY} 
							${arrowEndX + Math.cos(theta + Math.PI - arrowAngle) * arrowheadLength},${arrowEndY + Math.sin(theta + Math.PI - arrowAngle) * arrowheadLength}`}
						stroke={clockColor}
						strokeLinejoin="round"
						fill={"none"}
					/>
				);
			})}
		</ScaledSVG>
	);
}

export function parseStringTimes(times: string[]): HourMinute[] {
	return times.map((time) => {
		const parts = time.split(":");
		const [hourStr, minuteStr] = parts;

		return {
			hour: parseInt(hourStr),
			minute: parseInt(minuteStr),
		};
	});
}

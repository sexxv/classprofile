import {
	GraphBounds,
	LabelFormat,
	TextStyle,
} from "@/components/graphs/GraphBase";

import styles from "@/components/graphs/custom/ColourDisplay.module.css";

export type ColourProps = {
	n: number;
	colour: string;
};

type ColourDisplayProps = LabelFormat &
	TextStyle &
	GraphBounds & {
		favouriteColours: { [key: string]: ColourProps }[];
	};

const getBorderStyle = (n: number) => {
	if (n <= 1) return {};
	const borderWidth = Math.min(1 + (n - 1) * 2, 5);
	return {
		outline: `${borderWidth}px solid white`,
		outlineOffset: `-${borderWidth}px`, // Negative offset makes the outline go inward
	};
};

export default function ColourDisplay(props: ColourDisplayProps) {
	const {
		width,
		height,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,

		favouriteColours,
	} = props;
	return (
		<div
			className={styles.coloursContainer}
			style={{
				width: width,
				height: height,
				marginTop: marginTop,
				marginBottom: marginBottom,
				marginLeft: marginLeft,
				marginRight: marginRight,
			}}
		>
			{favouriteColours.map((row, i: number) => (
				<div className={styles.coloursRow} key={`row-${i}`}>
					{Object.keys(row).map((colour, j) => (
						<div
							className={styles.colourBlock}
							key={`block-${j}`}
							style={{
								backgroundColor: colour,
								color: row[colour].colour,
								...getBorderStyle(row[colour].n),
							}}
						>
							<p className={styles.colourCode}>{`${colour}`}</p>
							<p>{`n=${row[colour].n}`}</p>
						</div>
					))}
					{i == favouriteColours.length - 1 && (
						<div className={styles.colourBlock} key={`block-final`}>
							{"#SE2025"}
						</div>
					)}
				</div>
			))}
		</div>
	);
}

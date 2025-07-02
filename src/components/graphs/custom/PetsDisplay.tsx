import { Emoji } from "@/components/Emoji";
import {
	GraphBounds,
	LabelFormat,
	TextStyle,
} from "@/components/graphs/GraphBase";

import styles from "@/components/graphs/custom/ColourDisplay.module.css";

export type PetsProps = {
	n: number;
	emoji: string;
};

type PetsDisplayProps = LabelFormat &
	TextStyle &
	GraphBounds & {
		petsCount: { [key: string]: PetsProps }[];
	};

const getBorderStyle = (n: number) => {
	if (n <= 1) return {};
	const borderWidth = Math.min(1 + (n - 1) * 2, 5);
	return {
		outline: `${borderWidth}px solid white`,
		outlineOffset: `-${borderWidth}px`, // Negative offset makes the outline go inward
	};
};

export default function PetsDisplay(props: PetsDisplayProps) {
	const {
		width,
		height,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,

		petsCount,
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
			{petsCount.map((row, i: number) => (
				<div className={styles.coloursRow} key={`row-${i}`}>
					{Object.keys(row).map((colour, j) => (
						<div
							className={styles.colourBlock}
							key={`block-${j}`}
							style={{
								backgroundColor: colour,
								// color: row[colour].colour,
								...getBorderStyle(row[colour].n),
							}}
						>
							<p className={styles.colourCode}>{`${colour}`}</p>
							<p>
								<Emoji>{`${row[colour].emoji}`}</Emoji>
							</p>
							<p>{`n=${row[colour].n}`}</p>
						</div>
					))}
				</div>
			))}
		</div>
	);
}

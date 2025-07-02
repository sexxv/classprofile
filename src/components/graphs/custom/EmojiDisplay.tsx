import { Emoji } from "@/components/Emoji";
import {
	GraphBounds,
	LabelFormat,
	TextStyle,
} from "@/components/graphs/GraphBase";

import styles from "@/components/graphs/custom/ColourDisplay.module.css";

export type EmojiProps = {
	n: number;
	emoji: string;
};

type EmojiDisplayProps = LabelFormat &
	TextStyle &
	GraphBounds & {
		favouriteEmojis: { [key: string]: EmojiProps }[];
	};

const getBorderStyle = (n: number) => {
	if (n <= 1) return {};
	const borderWidth = Math.min(1 + (n - 1) * 2, 5);
	return {
		outline: `${borderWidth}px solid white`,
		outlineOffset: `-${borderWidth}px`, // Negative offset makes the outline go inward
	};
};

export default function EmojiDisplay(props: EmojiDisplayProps) {
	const {
		width,
		height,
		marginTop,
		marginBottom,
		marginLeft,
		marginRight,

		favouriteEmojis,
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
			{favouriteEmojis.map((row, i: number) => (
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
							<p className={styles.emojiText}>
								{/* For some godforsaken reason, the interrobang is massive with the Noto font */}
								{colour === "‽" ? `${colour}` : <Emoji>{`${colour}`}</Emoji>}
							</p>
							<p>{`n=${row[colour].n}`}</p>
						</div>
					))}
				</div>
			))}
		</div>
	);
}

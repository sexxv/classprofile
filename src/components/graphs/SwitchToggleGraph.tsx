"use client";

import { useState } from "react";
import styles from "./SwitchToggleGraph.module.css";

type ToggleGraph = {
	initial: React.ReactNode;
	alternate: React.ReactNode;

	initialLabel: React.ReactNode;
	alternateLabel: React.ReactNode;
};

export default function SwitchToggleGraph(props: ToggleGraph) {
	const [toggled, setToggled] = useState<boolean>(false);
	const { initial, alternate, initialLabel, alternateLabel } = props;

	return (
		<div>
			<div className={styles.graphWrapper}>
				<div
					className={`${styles.fader} ${!toggled ? styles.fadeIn : styles.fadeOut}`}
				>
					{initial}
				</div>
				<div
					className={`${styles.fader} ${toggled ? styles.fadeIn : styles.fadeOut}`}
				>
					{alternate}
				</div>
			</div>
			<div className={styles.labelledSlider}>
				<span className={styles.leftLabel}>{initialLabel}</span>
				<label className={styles.switch}>
					<input
						type="checkbox"
						checked={toggled}
						onChange={(e) => setToggled(e.target.checked)}
					/>
					<span className={styles.slider} />
				</label>
				<span className={styles.rightLabel}>{alternateLabel}</span>
			</div>
		</div>
	);
}

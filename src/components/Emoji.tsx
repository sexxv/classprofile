import { PropsWithChildren } from "react";

import styles from "./Emoji.module.css";

export function Emoji(props: PropsWithChildren<unknown>) {
	return <span className={styles.emoji}>{props.children}</span>;
}

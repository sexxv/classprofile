import { PropsWithChildren } from "react";

import styles from "./Footnotes.module.css";

type FootnotesProps = PropsWithChildren<object>;

/**
 * WIP
 *
 * (this doesn't actually work)
 *
 * TODO: Make footnotes section actually nice and work
 */
export function Footnotes(props: FootnotesProps) {
	const { children } = props;
	return (
		<div className={styles.footnote}>
			<hr />
			<small>{children}</small>
		</div>
	);
}

import { PropsWithChildren } from "react";
import styles from "./InlineList.module.css";

type InlineListProps = PropsWithChildren<{
	indent?: number;
}>;

export function InlineUL(props: InlineListProps) {
	const { children, indent } = props;

	return (
		<ul
			className={styles.inlineUL}
			style={{
				paddingLeft: indent,
			}}
		>
			{children}
		</ul>
	);
}

export function InlineOL(props: InlineListProps) {
	const { children, indent } = props;

	return (
		<ol
			className={styles.inlineUL}
			style={{
				paddingLeft: indent,
			}}
		>
			{children}
		</ol>
	);
}

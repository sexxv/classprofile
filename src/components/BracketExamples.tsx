import styles from "./BracketExamples.module.css";

// This is basically the output that prism.js would spit out,
// except I don't want to import the entire parsing library and stylesheet just for this

export function KAndRExample() {
	return (
		<pre className={styles.codeBlockPre}>
			<code
				className={styles.codeBlock}
				dangerouslySetInnerHTML={{
					__html: `int <span class="${styles.token} ${styles.function}">main</span><span class="${styles.token} ${styles.punctuation}">(</span><span class="${styles.token} ${styles.punctuation}">)</span> <span class="${styles.token} ${styles.punctuation}">{</span>
    <span class="${styles.token} ${styles.comment}">// statements</span>
<span class="${styles.token} ${styles.punctuation}">}</span>`,
				}}
			/>
		</pre>
	);
}

export function AllmanExample() {
	return (
		<pre className={styles.codeBlockPre}>
			<code
				className={styles.codeBlock}
				dangerouslySetInnerHTML={{
					__html: `int <span class="${styles.token} ${styles.function}">main</span><span class="${styles.token} ${styles.punctuation}">(</span><span class="${styles.token} ${styles.punctuation}">)</span> 
<span class="${styles.token} ${styles.punctuation}">{</span>
    <span class="${styles.token} ${styles.comment}">// statements</span>
<span class="${styles.token} ${styles.punctuation}">}</span>`,
				}}
			/>
		</pre>
	);
}

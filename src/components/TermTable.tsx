import styles from "./Tables.module.css";

export enum Sequence {
	STREAM_8 = "Stream 8",
	STREAM_8X = "Stream 8X",
	STREAM_8Y = "Stream 8Y",
}

type TermTableProps = {
	stream?: Sequence;
};

export default function TermTable(props: TermTableProps) {
	const { stream = Sequence.STREAM_8 } = props;

	return (
		<table className={styles.termTable}>
			<thead>
				<tr>
					<th className={styles.noBorder} />
					<th className={styles.noBorder} title="Jan-Apr">
						Winter
					</th>
					<th className={styles.noBorder} title="May-Aug">
						Spring
					</th>
					<th className={styles.noBorder} title="Sep-Dec">
						Fall
					</th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<th className={styles.noBorder}>2020</th>
					<td />
					<td />
					<td>1A</td>
				</tr>
				<tr>
					<th className={styles.noBorder}>2021</th>
					<td>1B</td>
					<td>Co-op</td>
					<td>2A</td>
				</tr>
				<tr>
					<th className={styles.noBorder}>2022</th>
					<td>Co-op</td>
					<td>2B</td>
					<td>Co-op</td>
				</tr>
				<tr>
					<th className={styles.noBorder}>2023</th>
					<td>3A</td>
					<td>Co-op</td>
					<td>3B</td>
				</tr>
				{fourthYearSequence(stream)}
				<tr>
					<th className={styles.noBorder}>2025</th>
					<td>4B</td>
					<td />
					<td />
				</tr>
			</tbody>
		</table>
	);
}

function fourthYearSequence(stream: Sequence) {
	switch (stream) {
		case Sequence.STREAM_8:
			return (
				<tr>
					<th className={styles.noBorder}>2024</th>
					<td>Co-op</td>
					<td>4A</td>
					<td>Co-op</td>
				</tr>
			);
		case Sequence.STREAM_8X:
			return (
				<tr>
					<th className={styles.noBorder}>2024</th>
					<td>Co-op</td>
					<td>Co-op</td>
					<td>4A</td>
				</tr>
			);
		case Sequence.STREAM_8Y:
			return (
				<tr>
					<th className={styles.noBorder}>2024</th>
					<td>4A</td>
					<td>Co-op</td>
					<td>Co-op</td>
				</tr>
			);
	}
}

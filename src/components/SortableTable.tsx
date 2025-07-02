"use client";
import React from "react";
import styles from "./Tables.module.css";

type SortableTableProps = {
	keys: string[];
	data: Record<string, string>[];
};

// this is not a reflection of my typescript ability. please do not reference this code ever.
export default function SortableTable({ keys, data }: SortableTableProps) {
	const [sortKey, setSortKey] = React.useState<string>(keys[0]);
	const [sortOrder, setSortOrder] = React.useState<"asc" | "desc">("asc");

	const sortedData = React.useMemo(() => {
		const sorted = [...data].sort((a, b) => {
			const aValue = a[sortKey];
			const bValue = b[sortKey];

			if (aValue < bValue) {
				return sortOrder === "asc" ? -1 : 1;
			}
			if (aValue > bValue) {
				return sortOrder === "asc" ? 1 : -1;
			}
			return 0;
		});
		return sorted;
	}, [data, sortKey, sortOrder]);

	return (
		<table className={styles.sortableTable}>
			<thead>
				<tr>
					{keys.map((key) => (
						<th
							key={key}
							onClick={() => {
								if (sortKey === key) {
									setSortOrder(sortOrder === "asc" ? "desc" : "asc");
									return;
								}
								setSortKey(key);
								setSortOrder("asc");
							}}
						>
							{key}
							<span
								style={{
									display: "inline-block",
									width: "1.5em",
									textAlign: "center",
								}}
							>
								{sortKey === key ? (sortOrder === "asc" ? " ▲" : " ▼") : "   -"}
							</span>
						</th>
					))}
				</tr>
			</thead>
			<tbody>
				{sortedData.map((row, index) => (
					<tr key={index}>
						{keys.map((key) => (
							<td key={key}>{row[key]}</td>
						))}
					</tr>
				))}
			</tbody>
		</table>
	);
}

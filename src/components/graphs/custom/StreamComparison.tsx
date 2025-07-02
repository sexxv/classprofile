import { defaultGraphBounds } from "@/components/AllGraphs";
import { streamColors } from "@/components/common/color";
import {
	DescriptionPart,
	NPart,
	TitlePart,
} from "@/components/layout/SurveyComponents";
import PieGraph from "../PieGraph";
import styles from "./StreamComparison.module.css";

type StreamComparisonProps = {
	counts: number[];
	labels: string[];
	n: number;
	description: React.ReactNode;
	overrides?: object;
	title: string;
};

export function StreamComparison(props: StreamComparisonProps) {
	const { counts, description, labels, n, overrides, title } = props;
	return (
		<section className={styles.sectionWrapper}>
			<div className={styles.description}>
				<TitlePart>{title}</TitlePart>
				<NPart>{n}</NPart>
				<div className={styles.thePartWithCursedOrdering}>
					<div className={styles.graph}>
						<PieGraph
							{...defaultGraphBounds}
							height={240}
							slices={counts}
							colors={streamColors}
							radius={100}
							labels={labels as string[]}
							labelSize={10}
							labelMargin={10}
							{...overrides}
						/>
					</div>
					<DescriptionPart>{description}</DescriptionPart>
				</div>
			</div>
		</section>
	);
}

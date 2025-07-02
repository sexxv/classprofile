import { defaultBarColor } from "@/components/common/color";
import { VerticalBarGraph } from "../BarGraph";
import { GraphBounds } from "../GraphBase";

import { formatCourseCode } from "@/components/common/surveyData";
import survey2Data from "@/data/cleaned/survey2.json";

type ProfGraphProps = GraphBounds & {};

export function ProfGraph(props: ProfGraphProps) {
	const profData = survey2Data["Favourite core course professor?"];

	const { marginTop, marginBottom, marginRight } = props;

	const profCourseMap = {
		"Armin Jamshidpey": {
			course: "CS341",
			term: "3A",
		},
		"Brenda Lee": {
			course: "ECE106",
			term: "1B",
		},
		"Firas Mansour": {
			course: "ECE105",
			term: "1A",
		},
		"Gennaro Notomista": {
			course: "SE380",
			term: "3B",
		},
		"Jeff Zarnett": {
			course: "SE350",
			term: "3B",
		},
		"Jim Geelen": {
			course: "MATH239",
			term: "2B",
		},
		"Nancy Day": {
			course: "SE212",
			term: "2B",
		},
		"Peter Buhr": {
			course: "CS343",
			term: "3B",
		},
		"Rob Hackman": {
			course: "CS247",
			term: "2B",
		},
		"Surya Banerjee": {
			course: "STAT206",
			term: "2A",
		},
		"Victoria Sakhnini": {
			course: "CS137",
			term: "1A",
		},
		"Zack Cramer": {
			course: "MATH119",
			term: "1B",
		},
	};

	const courseList = Object.values(profCourseMap).map((course) =>
		formatCourseCode(course.course),
	);
	const termList = Object.values(profCourseMap).map((course) => course.term);

	return (
		<VerticalBarGraph
			bins={profData.counts}
			labels={profData.labels}
			barColor={defaultBarColor}
			binSpacing={5}
			height={300}
			width={800}
			fontSize={7} // ehm how does one text wrap :sob:
			marginTop={marginTop}
			marginLeft={40}
			marginBottom={marginBottom}
			marginRight={marginRight}
			multiLineLabels={[courseList, termList]}
		/>
	);
}

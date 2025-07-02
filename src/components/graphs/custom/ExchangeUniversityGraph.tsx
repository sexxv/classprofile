import { allSurveyData } from "@/components/common/surveyData";
import { BubbleMap, CoordinateData } from "../BubbleMap";
import { GraphBounds } from "../GraphBase";

const DATA = allSurveyData["Which university did you go to on exchange?"]!;

// const SCHOOL_TO_COUNTRY: {
// 	[key: string]: string;
// } = {
// 	"Charles III University of Madrid (UC3M)": "Spain",
// 	"ETH Zurich": "Switzerland",
// 	"Hong Kong University (HKU)": "Hong Kong",
// 	"Hong Kong University of Science and Technology (HKUST)": "Hong Kong",
// 	"Korea Advanced Institute of Science & Technology (KAIST)": "South Korea",
// 	"National University of Singapore (NUS)": "Singapore",
// 	"Norwegian University of Science and Technology (NTNU)": "Norway",
// 	"Singapore University of Technology and Design (SUTD)": "Singapore",
// 	"Technical University of Denmark (DTU)": "Denmark",
// 	"University College London (UCL)": "UK",
// 	"University of Liverpool (UOL)": "UK",
// 	"\u00c9cole Polytechnique F\u00e9d\u00e9rale de Lausanne (EPFL)":
// 		"Switzerland",
// };

const SCHOOL_TO_LAT_LONG: {
	[key: string]: [lat: number, lon: number];
} = {
	"Charles III University of Madrid (UC3M)": [40.317471, -3.726692],
	"ETH Zurich": [47.376515, 8.548538],
	"Hong Kong University (HKU)": [22.283278, 114.136513],
	"Hong Kong University of Science and Technology (HKUST)": [
		22.338149, 114.263725,
	],
	"Korea Advanced Institute of Science & Technology (KAIST)": [
		36.372351, 127.359515,
	],
	"National University of Singapore (NUS)": [1.298179, 103.776878],
	"Norwegian University of Science and Technology (NTNU)": [
		63.419598, 10.401736,
	],
	"Singapore University of Technology and Design (SUTD)": [
		1.341167, 103.963783,
	],
	"Technical University of Denmark (DTU)": [55.785868, 12.523263],
	"University College London (UCL)": [51.524404, -0.134419],
	"University of Liverpool (UOL)": [53.404812, -2.965465],
	"\u00c9cole Polytechnique F\u00e9d\u00e9rale de Lausanne (EPFL)": [
		46.518962, 6.567598,
	],
};

export function ExchangeUniversityGraph(props: GraphBounds) {
	const { width, height } = props;
	return (
		<BubbleMap
			excludeCalifornia={true}
			excludeOntario={true}
			excludeNorthAmerica={true}
			height={height}
			width={width}
			data={(() => {
				const locations: CoordinateData[] = [];

				const m = DATA?.counts.length;
				for (let i = 0; i < m; ++i) {
					const city = DATA.labels[i].toString();
					const location = SCHOOL_TO_LAT_LONG[city];
					locations.push({
						name: city,
						latitude: location[0],
						longitude: location[1],
						n: DATA.counts[i],
					});
				}

				return locations;
			})()}
		/>
	);
}

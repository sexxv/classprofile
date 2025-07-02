import { allSurveyData } from "@/components/common/surveyData";
// import { Choropleth } from "../Choropleth";
import { BubbleMap, CoordinateData } from "../BubbleMap";
import { GraphBounds } from "../GraphBase";

const DATA =
	allSurveyData["What city will you be living in full-time after graduation?"]!;

// // I'm mapping to country for now since I'm too lazy to do lookup rn
// const CITY_TO_LOCATION: {
// 	[key: string]: string;
// } = {
// 	Austin: "USA",
// 	Chicago: "USA",
// 	Cupertino: "USA",
// 	"London (UK)": "UK",
// 	"Menlo Park": "USA",
// 	Miami: "USA",
// 	"New York": "USA",
// 	"Palo Alto": "USA",
// 	"San Francisco": "USA",
// 	"San Mateo": "USA",
// 	Seattle: "USA",
// 	Sunnyvale: "USA",
// 	Toronto: "Canada",
// 	Vancouver: "Canada",
// 	Waterloo: "Canada",
// };

const CITY_TO_LAT_LONG: {
	[key: string]: [lat: number, lon: number];
} = {
	"Austin, TX": [30.287, -97.743],
	"Chicago, IL": [41.878, -87.63],
	"Cupertino, CA": [37.323, -122.0322],
	"London (UK)": [51.5072, -0.1276],
	"Menlo Park, CA": [37.453, -122.1817],
	"Miami, FL": [25.7617, -80.1918],
	"New York, NY": [40.7128, -74.006],
	"Palo Alto, CA": [37.4419, -122.143],
	"San Francisco, CA": [37.7749, -122.4194],
	"San Mateo, CA": [37.563, -122.3255],
	"Seattle, WA": [47.6061, -122.3328],
	"Sunnyvale, CA": [37.3688, -122.0363],
	"Toronto, ON": [43.6532, -79.3832],
	"Vancouver, BC": [49.2827, -123.1207],
	"Waterloo, ON": [43.471869, -80.542359],
};

export function FTCityGraph(props: GraphBounds) {
	const { width, height } = props;
	return (
		<BubbleMap
			excludeAsia={true}
			excludeOntario={true}
			height={height}
			width={width}
			data={(() => {
				const locations: CoordinateData[] = [];

				const m = DATA?.counts.length;
				for (let i = 0; i < m; ++i) {
					const city = DATA.labels[i].toString();
					const location = CITY_TO_LAT_LONG[city];
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

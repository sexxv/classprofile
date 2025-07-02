import { allSurveyData } from "@/components/common/surveyData";
// import { Choropleth } from "../Choropleth";
import { BubbleMap, CoordinateData } from "../BubbleMap";
import { GraphBounds } from "../GraphBase";

const DATA = allSurveyData["Where is your family's home located?"]!;

const CITY_TO_LAT_LONG: {
	[key: string]: [lat: number, lon: number];
} = {
	"Aurora, ON": [44.007, -79.45],
	"Beijing, China": [39.904, 116.407],
	"Boston, MA": [42.356, -71.057],
	"Brampton, ON": [43.732, -79.762],
	"Calgary, AB": [51.045, -114.072],
	"Cambridge, ON": [43.362, -80.314],
	"Coquitlam, BC": [49.2838, -122.7932],
	"Kingston, ON": [44.2334, -76.493],
	"Lakefield, ON": [44.423, -78.2714],
	"London, ON": [42.9849, -81.2453],
	"Markham, ON": [43.8599, -79.335],
	"Mississauga, ON": [43.5853, -79.645],
	"Montreal, QC": [45.5019, -73.5674],
	"New Delhi, India": [28.6139, 77.2088],
	"Newmarket, ON": [44.0592, -79.4613],
	"Niagara Falls, ON": [43.0896, -79.0849],
	"Oakville, ON": [43.4675, -79.6877],
	"Ottawa, ON": [45.4201, -75.7003],
	"Pickering, ON": [43.8384, -79.0869],
	"Richmond Hill, ON": [43.8828, -79.4403],
	"St. Catharines, ON": [43.1594, -79.2469],
	"Sunnyvale, CA": [37.3688, -122.0363],
	"Surrey, BC": [49.1913, -122.849],
	"Tabriz, Iran": [38.0792, 46.2887],
	"Toronto, ON": [43.6532, -79.3832],
	"Vancouver, BC": [49.2827, -123.1207],
	"Vaughan, ON": [43.8262, -79.5562],
	"Victoria, BC": [48.4284, -123.3656],
	"Waterloo, ON": [43.471869, -80.542359],
	"Whitby, ON": [43.8988, -78.9401],
	"Windsor, ON": [42.3149, -83.0364],
	"Winnipeg, MB": [49.8954, -97.1385],
};

export function FamilyHomeGraph(props: GraphBounds) {
	const { width, height } = props;
	return (
		<BubbleMap
			excludeCalifornia={true}
			excludeEurope={true}
			width={width}
			height={height}
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
				// const map = new Map<string, number>();

				// const m = DATA?.counts.length;
				// for (let i = 0; i < m; ++i) {
				// 	const label = DATA.labels[i].toString();
				// 	const parts = label.split(", ");
				// 	map.set(parts[1], DATA.counts[i]);
				// }

				// return map;
			})()}
		/>
	);
}

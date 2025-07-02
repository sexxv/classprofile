import { TERMS } from "../mappings/QuestionDescriptions";

// Darkish purple
export const defaultBarColor = "#9562D8";

// https://www.w3schools.com/colors/colors_picker.asp
export const TasteDaRainbow = {
	red: "#c43b5d",
	orange: "#E09165",
	yellow: "#e6e600",
	green: "#3bc469",
	blue: "#3b80c4",
	purple: defaultBarColor,
	black: "#373737", // but not really
	white: "#FFFFFF",
	gray: "#8c8c8c",
	brown: "#993300",
	pink: "#ff66ff",

	// 35%
	darkRed: "#892941",
	darkGreen: "#298949",
	darkBlue: "#295989",
	darkPurple: "#52248f",

	teal: "hsl(180, 74%, 42%)",
	gradOrange: "#fca65c",
	gradRed: "#f25d72",

	// really dark blue
	reallyDarkBlue: "#021A2F",
	reallyDarkPurple: "#170636",
};

export const facultyColors = {
	arts: {
		one: "#EFD2AB",
		two: "#F7BF0A",
		three: "#ED8C00",
		four: "#E3530F",
		fourD: "#D93F00",

		print: "#ED8C00",
		digital: "#D93F00",
	},
	engineering: {
		one: "#C2A8F0",
		two: "#A05DCB",
		three: "#865DA4",
		four: "#5D0096",

		print: "#865DA4",
		digital: "#5D0096",
	},
	environment: {
		one: "#D4ED98",
		oneD: "#DAF582",
		two: "#CEDE00",
		three: "#B6BF00",
		four: "#778921",
		fourD: "#607000",

		print: "#B6BF00",
		digital: "#607000",
	},
	health: {
		one: "#A4DBF7",
		two: "#00C2DE",
		three: "#009CAB",
		four: "#115E6B",

		print: "#009CAB",
		digital: "#115E6B",
	},
	math: {
		one: "#EFBBF0",
		two: "#EF60AD",
		three: "#DF1AA0",
		four: "#A2006E",

		print: "#DF1AA0",
		digital: "#A2006E",
	},
	science: {
		one: "#B9CDFB",
		two: "#7E9CCC",
		three: "#0072DA",
		four: "#003599",

		print: "#0072DA",
		digital: "#003599",
	},
};

// Purple gradient. I couldn't think of a better colour set so this is the debug one.
// (Note thaat because of the gradient, it's kinda hard to tell between slices)

// https://colordesigner.io/gradient-generator
// https://mycolor.space/?hex=%239562D8&sub=1
const defaultColorGradient = [
	TasteDaRainbow.purple,
	"#af61dc",
	"#cb60e0",
	"#e45fde",
	"#e85ec6",
	"#eb5eac",
	"#ef5d90",
	TasteDaRainbow.gradRed,
	"#f6655c",
	"#f9855c",
	"#fca65c",
	"#ffc95c",
];

export function chooseColors(numColors: number, skipYellow?: boolean) {
	if (numColors <= 1) {
		return [defaultColorGradient[0]];
	}

	if (numColors == 3 && !skipYellow) {
		return [
			TasteDaRainbow.teal,
			TasteDaRainbow.gradOrange,
			TasteDaRainbow.gradRed,
		];
	}

	const colors = [];
	const defaultColorGradientLength =
		defaultColorGradient.length - (skipYellow ? 1 : 0);

	for (let i = 0; i < numColors; i++) {
		const jump = i / (numColors - 1);
		const index = Math.ceil(jump * (defaultColorGradientLength - 1));
		colors.push(defaultColorGradient[index]);
	}

	return colors;
}

export const termColors = [
	TasteDaRainbow.red, //1A
	TasteDaRainbow.darkRed, //1B
	TasteDaRainbow.green, //2A
	TasteDaRainbow.darkGreen, //2B
	TasteDaRainbow.blue, // 3A
	TasteDaRainbow.darkBlue, // 3B
	TasteDaRainbow.purple, //4A
	TasteDaRainbow.darkPurple, //4B
];

export function buildTermColors(labels: string[]) {
	const colorArr = [];

	for (let i = 0; i < labels.length; i++) {
		const termColorIndex = TERMS.findIndex((term) => term === labels[i]);

		colorArr.push(termColors[termColorIndex]);
	}

	return colorArr;
}

export const streamColors = [
	TasteDaRainbow.gradOrange, // orange, other
	TasteDaRainbow.gradRed, // red, stream 8
	TasteDaRainbow.purple, // purple, stream 8x
	TasteDaRainbow.blue, // blue, stream 8y
];

export const yesNoColors = [
	TasteDaRainbow.red, // no
	TasteDaRainbow.green, // yes
	TasteDaRainbow.gray, // unsure
	TasteDaRainbow.orange, // prefer not to answer
];

export const lightModeDarkModeColors = [
	TasteDaRainbow.black, // dark mode
	TasteDaRainbow.white, // light mode
	TasteDaRainbow.orange, // depends how i feel
];

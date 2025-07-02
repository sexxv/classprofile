export type GraphBounds = {
	width: number;
	height: number;
	marginTop: number;
	marginRight: number;
	marginBottom: number;
	marginLeft: number;
};

export type TextStyle = {
	fontFamily?: string;
	titleSize?: number;
	fontSize?: number;
	color?: string;
};

export type LabelFormat = {
	title?: string;
	xAxisTitle?: string;
	yAxisTitle?: string;
	titleOffset?: number;
	xLabelOffset?: number;
	yLabelOffset?: number;
};

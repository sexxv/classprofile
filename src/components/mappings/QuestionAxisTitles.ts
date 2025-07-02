import { SURVEY_QUESTION } from "./QuestionsList";

// type object with optional yAxisTitle property and xAxisTitle property
type AxisLabels = {
	yAxisTitle?: string;
	xAxisTitle?: string;
};

export const AXIS_TITLES: Partial<Record<SURVEY_QUESTION, AxisLabels>> = {
	"How many full-time offers have you received so far?": {
		yAxisTitle: "Full-Time Offers Received",
		xAxisTitle: "Number of Respondents",
	},
	"How many siblings do you have?": {
		yAxisTitle: "Number of Respondents",
		xAxisTitle: "Number of Siblings",
	},
	"How many hackathons did you attend in high school?": {
		yAxisTitle: "Number of Respondents",
		xAxisTitle: "Number of Hackathons",
	},
	"Out of all of the university programs you applied to, how would you rank Waterloo SE?":
	{
		yAxisTitle: "Number of Respondents",
		xAxisTitle: "Ranking",
	},
	"How many classes did you fail?": {
		yAxisTitle: "Classes Failed",
		xAxisTitle: "Number of Respondents",
	},
	"How many midterms did you fail?": {
		yAxisTitle: "Midterms Failed",
		xAxisTitle: "Number of Respondents",
	},
	"How many finals did you fail?": {
		yAxisTitle: "Finals Failed",
		xAxisTitle: "Number of Respondents",
	},
	"How many technical side projects did you complete during university?": {
		yAxisTitle: "Number of Side Projects",
		xAxisTitle: "Number of Respondents",
	},
	"How many hours of sleep do you get on average?": {
		yAxisTitle: "Number of Respondents",
		xAxisTitle: "Hours of Sleep",
	},
	"How many times have you gotten COVID?": {
		yAxisTitle: "Number of Respondents",
		xAxisTitle: "COVID Count",
	},
	"How many school terms were you affected by struggles associated with mental health?":
	{
		yAxisTitle: "Number of Respondents",
		xAxisTitle: "Number of School Terms",
	},
	"How many times did you ask for a deadline extension due to illness/injury?":
	{
		yAxisTitle: "Extension Count",
		xAxisTitle: "Number of Respondents",
	},
	"How many romantic relationships have you been in during your degree?": {
		yAxisTitle: "Number of Respondents",
		xAxisTitle: "Number of Relationships",
	},
	"How many months of your degree have you spent in a romantic relationship?": {
		yAxisTitle: "Number of Months",
	},
	"How many sexual partners did you have during your degree?": {
		yAxisTitle: "Number of Sexual Partners",
		xAxisTitle: "Number of Respondents",
	},
	"How satisfied are you about your current financial situation?": {
		yAxisTitle: "Number of Respondents",
		xAxisTitle: "Satisfaction Level",
	},
	"What would you rate your co-op experience?": {
		yAxisTitle: "Co-op Experience Rating",
		xAxisTitle: "Number of Respondents",
	},
	"How many grad school offers have you received so far?": {
		yAxisTitle: "Offer Count",
		xAxisTitle: "Number of Respondents",
	},
	"How many days per week do you plan to work remotely?": {
		yAxisTitle: "Number of Respondents",
		xAxisTitle: "Number of Remote Days",
	},
};

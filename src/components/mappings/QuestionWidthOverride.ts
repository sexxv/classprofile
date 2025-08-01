import { SURVEY_QUESTION } from "./QuestionsList";

export enum DisplayWidth {
	FULL_WIDTH,
	HALF_WIDTH, // for a half width display, put both questions in WIDTH_OVERRIDES and the first occuring one as the key
	// in HALF_WIDTH_PAIRS and the second one as the value
}

export const WIDTH_OVERRIDES: Partial<Record<SURVEY_QUESTION, DisplayWidth>> = {
	"What terms did you commit SEcest with another SE25?":
		DisplayWidth.FULL_WIDTH,
	"What were the 3 most important motivators in your full-time decision?":
		DisplayWidth.FULL_WIDTH,
	"How many roommates did you have in each school term?":
		DisplayWidth.FULL_WIDTH,
	"How many hackathons did you attend in university?": DisplayWidth.FULL_WIDTH,

	"Are you an out-of-province student?": DisplayWidth.HALF_WIDTH,
	"Are you an international student?": DisplayWidth.HALF_WIDTH,
	"In first year?": DisplayWidth.HALF_WIDTH,
	"In 4B?": DisplayWidth.HALF_WIDTH,
	"Have you ever been late to a co-op interview?": DisplayWidth.HALF_WIDTH,
	"Have you ever missed a co-op interview?": DisplayWidth.HALF_WIDTH,
	"Are you the eldest, youngest, or in the middle?": DisplayWidth.HALF_WIDTH,
	"Have any of them also studied at Waterloo?": DisplayWidth.HALF_WIDTH,
	// "What is the value of your first-year stock grant?": DisplayWidth.HALF_WIDTH,
	"What is your total stock grant value?": DisplayWidth.HALF_WIDTH,
	"What is your annual base salary?": DisplayWidth.HALF_WIDTH,
	"What is your one-time sign-on bonus?": DisplayWidth.HALF_WIDTH,
	"What is your total first-year compensation?": DisplayWidth.HALF_WIDTH,
	// "What is your end-of-year/recurring annual compensation?":
	// 	DisplayWidth.HALF_WIDTH,
	"Which school?": DisplayWidth.HALF_WIDTH,
	"What is your research topic or program?": DisplayWidth.HALF_WIDTH,

	"Average Hourly Co-op Salary vs Gender": DisplayWidth.FULL_WIDTH,
	// "Average Hourly Co-op Salary vs Family Income": DisplayWidth.FULL_WIDTH,
	"First-year Total Compensation vs Gender": DisplayWidth.FULL_WIDTH,
	"First-year Total Compensation vs Grades": DisplayWidth.FULL_WIDTH,
	"First-year Total Compensation vs Family Income": DisplayWidth.FULL_WIDTH,

	"Drank alcohol, taken an edible, or done another drug in class?":
		DisplayWidth.HALF_WIDTH,
	"Written a final drunk, hungover, high or on another drug?":
		DisplayWidth.HALF_WIDTH,

	"What company did you work at?": DisplayWidth.FULL_WIDTH,

	"During school terms?": DisplayWidth.HALF_WIDTH,
	"During co-op terms?": DisplayWidth.HALF_WIDTH,

	"How many times have you gotten COVID?": DisplayWidth.HALF_WIDTH,
	"Have you ever experienced long COVID symptoms?": DisplayWidth.HALF_WIDTH,

	"How high was your workload during exchange?": DisplayWidth.HALF_WIDTH,

	"How stressed were you during exchange?": DisplayWidth.HALF_WIDTH,
};

export const HALF_WIDTH_PAIRS: Partial<
	Record<SURVEY_QUESTION, SURVEY_QUESTION>
> = {
	"Are you an out-of-province student?": "Are you an international student?",
	"In first year?": "In 4B?",
	"Have you ever been late to a co-op interview?":
		"Have you ever missed a co-op interview?",
	"Are you the eldest, youngest, or in the middle?":
		"Have any of them also studied at Waterloo?",
	"What is your total first-year compensation?":
		"What is your annual base salary?",
	//"What is your end-of-year/recurring annual compensation?":
	"What is your one-time sign-on bonus?":
		//"What is the value of your first-year stock grant?":
		"What is your total stock grant value?",
	"Which school?": "What is your research topic or program?",
	"Drank alcohol, taken an edible, or done another drug in class?":
		"Written a final drunk, hungover, high or on another drug?",

	"During school terms?": "During co-op terms?",
	"How many times have you gotten COVID?":
		"Have you ever experienced long COVID symptoms?",

	"How high was your workload during exchange?":
		"How stressed were you during exchange?",
};

// If you want your half-width questions to have an overall title, put it here (then change the original question)
// key should be the same as HALF_WIDTH_PAIRS
export const HALF_WIDTH_TITLES: Partial<Record<SURVEY_QUESTION, string>> = {
	"Are you the eldest, youngest, or in the middle?": "If you have siblings...",
	"In first year?": "How often did you have imposter syndrome...",
	"Which school?":
		"If you have accepted or are planning to accept a grad school offer...",

	"Drank alcohol, taken an edible, or done another drug in class?":
		"Have you ever...",

	"During school terms?":
		"How many times do you cook or go out to eat per week...",
	"How many times have you gotten COVID?": "If you have gotten COVID...",

	"How high was your workload during exchange?":
		"In comparison to an average UW term...",
};

// alright folks in order to make mobile work... put here. trust me bro.
export const APPLY_MOBILE_REVERSE_PADDING_TO_THESE_QUESTIONS: Partial<
	SURVEY_QUESTION[]
> = [
	"Most useful core course?",
	"Least useful core course?",
	"What year were you born?",
	"What languages do you speak at home?",
	"What is your religious and/or spiritual affiliation?",
	"What racial or ethnic groups describe you?",
	"What languages do you speak?",
	"How many siblings do you have?",
	"What was your parents' total income at the time that you were admitted into university?",
	"Did you participate in any high school enrichment programs?",
	"Did you play any sports in high school?",
	"How many volunteer hours did you complete in high school?",
	"How many hackathons did you attend in high school?",
	"First programming language?",
	"Out of all of the university programs you applied to, how would you rank Waterloo SE?",
	"How many people did you know from high school that also went to Waterloo?",
	"Did you do any specializations as part of your degree?",
	"Favourite core course?",
	"Least favourite core course?",
	"Which List 1 ATE did you take?",
	"Which List 2 ATE did you take?",
	"If you failed a class, which class did you fail?",
	"If you have taken an academic course during a co-op term, when?",
	"If you have overloaded a term, when?",
	"How much did you enjoy working on your FYDP?",
	"Favourite study spot?",
	"What note-taking software do you use?",
	"Which intramurals did you participate in?",
	"Which terms did you participate in intramurals?",
	"Did you train in a sport competitively during your undergrad?",
	"How many hours of sleep do you get on average?",
	"How many times have you gotten COVID?",
	"How many school terms were you affected by struggles associated with mental health?",
	"How many times did you ask for a deadline extension due to illness/injury?",
	"In first year?",
	"In 4B?",
	"What mental health issues have you faced?",
	"What dating apps did you use while in university?",
	"How high was your workload during exchange?",
	"How stressed were you during exchange?",
	"How satisfied are you about your current financial situation?",
	"What language do you use for programming interviews?",
	"Favourite overall co-op city?",
	"How large is the company that extended your full-time offer (number of employees)?",
	"When are you starting full-time work?",
	"How many days per week do you plan to work remotely?",
	"If you are returning to a previous co-op, when did you work for that company?",
	"How content are you with your post-grad plans?",
	"Favourite programming language?",
	"Which OS do you use for schoolwork?",
	"How many hours did you spend on social media platforms per week during your degree?",
	"How many hours did you play video games per week during your degree?",
	"What social media/messaging apps do you use?",
	"Favourite shawarma restaurant around UW?",
	"Favourite boba shop around UW?",
	"How many romantic relationships have you been in during your degree?",
];

export const APPLY_BIG_MOBILE_REVERSE_PADDING_TO_THESE_QUESTIONS: Partial<
	SURVEY_QUESTION[]
> = [
	"How many grad school offers have you received so far?",
	"How many full-time offers have you received so far?",
	"How many sexual partners did you have during your degree?",
	"How many technical side projects did you complete during university?",
	"How many classes did you fail?",
	"How many finals did you fail?",
	"How many midterms did you fail?",
];

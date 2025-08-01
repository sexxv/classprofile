import { SURVEY_QUESTION } from "./QuestionsList";

export const SURVEY_SECTIONS = [
	"Demographics",
	"Pre-University",
	"University Academics",
	"University Life",
	"Health",
	"Friends, Relationships & Drugs",
	"Exchange",
	"Finance",
	"Co-op",
	"On Switching Out of UW SE",
	"Future",
	"Correlations",
	"Misc",
	"From: SE25",
] as const;

export type SURVEY_SECTIONS = (typeof SURVEY_SECTIONS)[number];

export const PAGE_SECTIONS = [
	"Introduction",
	...SURVEY_SECTIONS,
	"Acknowledgements",
] as const;

export type PAGE_SECTIONS = (typeof PAGE_SECTIONS)[number];

// Map subsection to order. Questions within a subsection are ordered by the order of the question.
// No this isn't good code. Yes sometimes I chose random numbers that worked. sowwie.
export const SUB_SECTIONS_TO_SECTION = {
	"SE25 Switch Out Survey": { order: 6, section: "On Switching Out of UW SE" },
	"About FYDP": { order: 27, section: "University Academics" },
	"Future: Grad School": {
		order: 3,
		section: "Future",
	},
	"Future: Employment": {
		order: 7,
		section: "Future",
	},
	"About SE Cost": {
		order: 0,
		section: "Finance",
	},
	"A Note on Full-Time Compensation": {
		order: 20,
		section: "Future",
	},
	"Advanced Technical Electives (ATEs)": {
		order: 10,
		section: "University Academics",
	},
} as const;

export type SUB_SECTIONS = keyof typeof SUB_SECTIONS_TO_SECTION;

export function isSubSection(title: string): title is SUB_SECTIONS {
	return title in SUB_SECTIONS_TO_SECTION;
}

export const QUESTIONS_TO_SECTIONS: {
	[key in SURVEY_QUESTION]?: {
		section: SURVEY_SECTIONS | "SKIP";
		order?: number;
		subSection?: SUB_SECTIONS;
	};
} = {
	"Which university did you go to on exchange?": { section: "Exchange" },
	"Which term did you go on exchange?": { section: "Exchange" },
	"Which OS do you use for schoolwork?": { section: "Misc", order: 10 },
	"Which extracurriculars were you part of in high school?": {
		section: "Pre-University",
		order: 7,
	},
	"Where is your family's home located?": { section: "Demographics" },
	"What year were you born?": { section: "Demographics", order: 1 },
	"What was your high school admissions average?": {
		section: "Pre-University",
		order: 2,
	},
	"What was your high school adjustment factor?": {
		section: "Pre-University",
		order: 3,
	},
	"First programming language?": {
		section: "Pre-University",
		order: 11,
	},
	"Favourite overall co-op city?": { section: "Co-op" },
	"Favourite part of going on exchange?": { section: "Exchange" },
	"Most valuable thing you took away from exchange?": {
		section: "Exchange",
	},
	"Hardest thing about going on exchange?": {
		section: "Exchange",
	},
	"What social media/messaging apps do you use?": {
		section: "Misc",
		order: 13,
	},
	"What racial or ethnic groups describe you?": { section: "Demographics" },
	"What pets do you have?": { section: "Misc", order: 0 },
	"What other universities did you apply to?": {
		section: "Pre-University",
		order: 15,
	},
	"What language do you use for programming interviews?": {
		section: "Co-op",
		order: 1,
	},
	"What is your daily browser?": { section: "Misc", order: 9 },
	"What is the highest level of education of your parents?": {
		section: "Demographics",
	},
	"Stream 8 vs 8x vs 8y": { section: "University Academics", order: 1 },
	"What languages do you speak at home?": {
		section: "Demographics",
		order: 7,
	},
	"Out of all of the university programs you applied to, how would you rank Waterloo SE?":
		{ section: "Pre-University", order: 16 },
	"On average, when do you go to sleep?": {
		section: "University Life",
		order: 14,
	},
	"How stressed were you during exchange?": { section: "Exchange" },
	"How high was your workload during exchange?": { section: "Exchange" },
	"Have any of them also studied at Waterloo?": {
		section: "Demographics",
	},
	"Are you the eldest, youngest, or in the middle?": {
		section: "Demographics",
	},
	"If you had to start again, what school/program would you enrol in?": {
		section: "On Switching Out of UW SE",
		order: 3,
	},
	"Which term did you switch out of SE25?": {
		section: "On Switching Out of UW SE",
		subSection: "SE25 Switch Out Survey",
		order: 1,
	},
	"Why did you choose to switch out of SE25?": {
		section: "On Switching Out of UW SE",
		subSection: "SE25 Switch Out Survey",
		order: 2,
	},
	"Which program did you switch to?": {
		section: "On Switching Out of UW SE",
		subSection: "SE25 Switch Out Survey",
		order: 3,
	},
	"Is there anything else you'd like to add?": {
		section: "On Switching Out of UW SE",
		subSection: "SE25 Switch Out Survey",
		order: 4,
	},
	"What languages do you speak?": {
		section: "Demographics",
		order: 6,
	},
	"How many years of programming experience did you have prior to starting 1A?":
		{ section: "Pre-University", order: 12 },
	"How many siblings do you have?": { section: "Demographics" },
	"How many people did you know from high school that also went to Waterloo?": {
		section: "Pre-University",
	},
	"How many hackathons did you attend in high school?": {
		section: "Pre-University",
		order: 10,
	},
	"Did you go on exchange?": { section: "Exchange" },
	"Have you ever missed a co-op interview?": { section: "Co-op", order: 7 },
	"Have you ever considered switching out of SE? If so, to which program/school?":
		{ section: "On Switching Out of UW SE", order: 2 },
	"Have you ever been late to a co-op interview?": {
		section: "Co-op",
		order: 6,
	},
	"Have you ever considered dropping out?": {
		section: "On Switching Out of UW SE",
		order: 1,
	},
	"Favourite Emoji?": { section: "Misc", order: 2 },
	"Favourite colour (as a hex code)?": { section: "Misc", order: 1 },
	"Did you train in a sport competitively during your undergrad?": {
		section: "University Life",
		order: 13,
	},
	"Did you take a gap year between high school and university?": {
		section: "Pre-University",
		order: 5,
	},
	"If you took a gap year, why did you choose to take one?": {
		section: "Pre-University",
		order: 5.1,
	},
	"Did you play any sports in high school?": {
		section: "Pre-University",
		order: 8,
	},
	"Did you participate in any high school enrichment programs?": {
		section: "Pre-University",
		order: 6,
	},
	"Did you minor in anything as part of your degree?": {
		section: "University Academics",
		order: 5,
	},
	"What other job experience did you have prior to starting 1A?": {
		section: "Pre-University",
		order: 14,
	},
	"Did you have any job experience relevant to SE prior to starting 1A?": {
		section: "Pre-University",
		order: 13,
	},
	"Did you do any specializations as part of your degree?": {
		section: "University Academics",
		order: 3,
	},
	"Did you do any options as part of your degree?": {
		section: "University Academics",
		order: 4,
	},
	"Did you attend CEGEP?": { section: "Pre-University", order: 4 },
	"Are you multilingual?": { section: "Demographics", order: 5 },
	"Are you an out-of-province student?": { section: "Demographics" },
	"Are you an international student?": { section: "Demographics" },
	"Anything else you’d like to add?": { section: "From: SE25" },
	"Anything else co-op related you'd like to add?": { section: "Co-op" },
	"Any fun interview stories?": { section: "Co-op", order: 5 },
	"Any feedback on this survey?": { section: "Misc" },
	"(Second co-op term) Which industry was your co-op employer in?": {
		section: "Co-op",
	},
	"How did you find your co-op?": { section: "Co-op", order: 11 },
	"What was your co-op role?": { section: "Co-op", order: 12 },
	"What company did you work at?": { section: "Co-op", order: 13 },
	"How many employees worked at your company?": { section: "Co-op", order: 14 },
	"Which industry was your co-op employer in?": { section: "Co-op", order: 15 },
	"What was your hourly co-op salary?": { section: "Co-op", order: 16 },
	// "Average Hourly Co-op Salary vs Gender": { section: "Co-op", order: 17 },
	"What programming languages did you use at your co-op?": {
		section: "Co-op",
	},
	"Where was your co-op?": { section: "Co-op", order: 18 },
	"Co-op Regions - Flow over Terms": { section: "Co-op", order: 19 },
	"What would you rate your co-op experience?": { section: "Co-op" },
	"Have you ever had a co-op term without a placement?": {
		section: "Co-op",
		order: 10,
	},
	"How many co-op offers did you have rescinded?": {
		section: "Co-op",
		order: 9,
	},
	"Have you ever been banned from WaterlooWorks for reneging an offer/match?": {
		section: "Co-op",
		order: 8,
	},
	"What is your gender?": { section: "Demographics", order: 2 },
	"What was your parents' total income at the time that you were admitted into university?":
		{ section: "Demographics" },
	"Have you been contacted by the CRA for tax-related reasons?": {
		section: "Finance",
		order: 5,
	},
	"Have you ever unintentionally committed tax fraud?": {
		section: "Finance",
		order: 6,
	},
	"Have you ever intentionally committed tax fraud?": {
		section: "Finance",
		order: 7,
	},
	"What is your current net worth?": { section: "Finance", order: 3 },
	"What percentage of your net worth is invested?": {
		section: "Finance",
		order: 2,
	},
	"How much did you borrow in student loans throughout university?": {
		section: "Finance",
		order: 1,
	},
	"How satisfied are you about your current financial situation?": {
		section: "Finance",
		order: 4,
	},
	"How often do you keep in touch with high school friends?": {
		section: "Friends, Relationships & Drugs",
		order: 1,
	},
	"How many people in SE25 have you ever met and spoken to in-person?": {
		section: "Friends, Relationships & Drugs",
		order: 3,
	},
	"How many close friends do you have that you first met in high school?": {
		section: "Friends, Relationships & Drugs",
		order: 2,
	},
	"How many close friends do you have that you first met through co-op?": {
		section: "SKIP",
	},
	"How many close friends do you have that you first met on campus residence?":
		{
			section: "SKIP",
		},
	"How many close friends do you have that you first met through being part of the SE25 cohort (i.e. by taking the same core courses or attending cohort events)?":
		{
			section: "SKIP",
		},
	"How many close friends do you have that you first met through being part of SE (other cohorts)?":
		{
			section: "SKIP",
		},
	"How many close friends do you have that you first met in extracurriculars (e.g. clubs, sports)?":
		{
			section: "SKIP",
		},
	"How many close friends do you have that you first met through other means (e.g. parties, Aphrodite project, mutual friends)":
		{
			section: "SKIP",
		},
	"Do you plan on getting your P. Eng?": { section: "Future", order: 1 },
	"What are your post graduation plans?": { section: "Future", order: 2 },
	"How many grad school offers have you received so far?": {
		section: "Future",
		subSection: "Future: Grad School",
		order: 1,
	},
	"Which school?": {
		section: "Future",
		subSection: "Future: Grad School",
		order: 2,
	},
	"What is your research topic or program?": {
		section: "Future",
		subSection: "Future: Grad School",
		order: 3,
	},
	"Why did you choose to pursue grad school over full-time employment?": {
		section: "Future",
		subSection: "Future: Grad School",
		order: 4,
	},
	"How many full-time offers have you received so far?": {
		section: "Future",
		subSection: "Future: Employment",
		order: 1,
	},
	"If you have accepted an offer, which company?": {
		section: "Future",
		subSection: "Future: Employment",
		order: 2,
	},
	"How large is the company that extended your full-time offer (number of employees)?":
		{ section: "Future", subSection: "Future: Employment", order: 3 },
	"Which industry is the company that extended your full-time offer in?": {
		section: "Future",
		subSection: "Future: Employment",
		order: 4,
	},
	"When are you starting full-time work?": {
		section: "Future",
		subSection: "Future: Employment",
		order: 5,
	},
	"How many days per week do you plan to work remotely?": {
		section: "Future",
		subSection: "Future: Employment",
		order: 6,
	},
	"Are you returning to a previous co-op?": {
		section: "Future",
		subSection: "Future: Employment",
		order: 7,
	},
	"If you are returning to a previous co-op, when did you work for that company?":
		{ section: "Future", subSection: "Future: Employment", order: 8 },
	"What is your total first-year compensation?": {
		section: "Future",
		subSection: "A Note on Full-Time Compensation",
		order: 1,
	},
	"What is your annual base salary?": {
		section: "Future",
		subSection: "A Note on Full-Time Compensation",
		order: 2,
	},
	"What is your one-time sign-on bonus?": {
		section: "Future",
		subSection: "A Note on Full-Time Compensation",
		order: 3,
	},
	"What is the value of your first-year stock grant?": {
		section: "SKIP", // "Future",
		subSection: "Future: Employment",
	},
	"What is your total stock grant value?": {
		section: "Future",
		subSection: "A Note on Full-Time Compensation",
		order: 4,
	},
	"What is your end-of-year/recurring annual compensation?": {
		section: "SKIP", //"Future",
		subSection: "Future: Employment",
	},
	"How content are you with your post-grad plans?": {
		section: "Future",
		subSection: "Future: Employment",
		order: 30,
	},
	"What city will you be living in full-time after graduation?": {
		section: "Future",
		subSection: "Future: Employment",
		order: 20,
	},
	"What were the 3 most important motivators in your full-time decision?": {
		section: "Future",
		subSection: "Future: Employment",
		order: 22,
	},
	"What were the 3 most important motivators in your full-time decision?  [Compensation]":
		{ section: "SKIP" },
	"What were the 3 most important motivators in your full-time decision?  [Proximity to Friends]":
		{
			section: "SKIP",
		},
	"What were the 3 most important motivators in your full-time decision?  [Proximity to Family]":
		{
			section: "SKIP",
		},
	"What were the 3 most important motivators in your full-time decision?  [Proximity to Significant Other]":
		{
			section: "SKIP",
		},
	"What were the 3 most important motivators in your full-time decision?  [City choice]":
		{
			section: "SKIP",
		},
	"What were the 3 most important motivators in your full-time decision?  [Cost of Living]":
		{
			section: "SKIP",
		},
	"What were the 3 most important motivators in your full-time decision?  [Interest in Work]":
		{
			section: "SKIP",
		},
	"What were the 3 most important motivators in your full-time decision?  [Interest in Team]":
		{
			section: "SKIP",
		},
	"What were the 3 most important motivators in your full-time decision?  [Interest in Product]":
		{
			section: "SKIP",
		},
	"What were the 3 most important motivators in your full-time decision?  [Company Fit (WLB, Culture)]":
		{
			section: "SKIP",
		},
	"What were the 3 most important motivators in your full-time decision?  [Remote Work]":
		{
			section: "SKIP",
		},
	"What were the 3 most important motivators in your full-time decision?  [In-Person Work]":
		{
			section: "SKIP",
		},
	"What were the 3 most important motivators in your full-time decision?  [Vibes]":
		{
			section: "SKIP",
		},
	"Anything else to add about full-time?": {
		section: "SKIP",
	},
	"Have you ever gotten COVID?": { section: "Health", order: 1 },
	"How many times have you gotten COVID?": {
		section: "Health",
		order: 2,
	},
	"Have you ever experienced long COVID symptoms?": {
		section: "Health",
		order: 3,
	},
	"How often did you exercise during your undergrad?": {
		section: "Health",
		order: 4,
	},
	"What types of exercise did you do during your undergrad?": {
		section: "Health",
		order: 5,
	},
	"If you experienced burnout during SE, what factors contributed?": {
		section: "Health",
		order: 25,
	},
	"How is your self-esteem now compared to before starting university?": {
		section: "Health",
		order: 10,
	},
	"In first year?": {
		section: "Health",
		order: 8,
	},
	"In 4B?": {
		section: "Health",
		order: 9,
	},
	"How many times did you ask for a deadline extension due to illness/injury?":
		{ section: "Health", order: 7.6 },
	"Are you left-handed, right-handed, or ambidextrous?": {
		section: "Misc",
		order: 18,
	},
	"Favourite SE25-related memory?": { section: "From: SE25" },
	"What countries did you travel to during your degree?": {
		section: "Misc",
		order: 26,
	},
	"How many volunteer hours did you complete in high school?": {
		section: "Pre-University",
		order: 9,
	},
	"Why did you choose Waterloo SE?": {
		section: "Pre-University",
		order: 17,
	},
	"If you have taken an academic course during a co-op term, when?": {
		section: "University Academics",
		order: 26,
	},
	"If you have taken an academic course during a co-op term, why?": {
		section: "University Academics",
		order: 26.5,
	},
	"If you have overloaded a term, when?": {
		section: "University Academics",
		order: 26.6,
	},
	"If you have overloaded, which course(s) did you overload, and did you complete the course(s)?":
		{ section: "University Academics", order: 26.7 },
	"What device do you most frequently use to take notes?": {
		section: "University Life",
		order: 4,
	},
	"What note-taking software do you use?": {
		section: "University Life",
		order: 5,
	},
	"Which List 1 ATE did you take?": {
		section: "University Academics",
		subSection: "Advanced Technical Electives (ATEs)",
		order: 1,
	},
	"Opinions on List 1 ATEs": {
		section: "University Academics",
		order: 1,
		subSection: "Advanced Technical Electives (ATEs)",
	},
	"Which List 2 ATE did you take?": {
		section: "University Academics",
		order: 3,
		subSection: "Advanced Technical Electives (ATEs)",
	},
	"Opinions on List 2 ATEs": {
		section: "University Academics",
		order: 4,
		subSection: "Advanced Technical Electives (ATEs)",
	},
	"Which List 3 ATE did you take?": {
		section: "University Academics",
		order: 6,
		subSection: "Advanced Technical Electives (ATEs)",
	},
	"Opinions on List 3 ATEs": {
		section: "University Academics",
		order: 7,
		subSection: "Advanced Technical Electives (ATEs)",
	},
	"How useful did you find your List 3 ATE?": {
		section: "University Academics",
		order: 8,
		subSection: "Advanced Technical Electives (ATEs)",
	},
	"Why did you think this course was useful?": {
		section: "SKIP",
	},
	"Why did you think this course wasn't useful?": {
		section: "SKIP",
	},
	"Favourite core course?": {
		section: "University Academics",
		order: 6.5,
	},
	"Most useful core course?": {
		section: "University Academics",
		order: 7,
	},
	"Least favourite core course?": {
		section: "University Academics",
		order: 6.6,
	},
	"Least useful core course?": {
		section: "University Academics",
		order: 8,
	},
	"Favourite core course professor?": {
		section: "University Academics",
		order: 6.4,
	},
	"Favourite elective course (no ATEs), and why?": {
		section: "University Academics",
		order: 19,
	},
	"Easiest study term?": {
		section: "University Academics",
		order: 5,
	},
	"Hardest study term?": {
		section: "University Academics",
		order: 6,
	},
	"Which school term did you spend the most time working on your FYDP?": {
		section: "University Academics",
		order: 1,
		subSection: "About FYDP",
	},
	"Will you continue working on your FYDP after symposium?": {
		section: "University Academics",
		order: 3,
		subSection: "About FYDP",
	},
	"How much did you enjoy working on your FYDP?": {
		section: "University Academics",
		order: 28,
	},
	"What category is your FYDP?": {
		section: "University Academics",
		order: 1,
		subSection: "About FYDP",
	},
	"Did you transfer into SE from another program?": {
		section: "University Academics",
		order: 2,
	},
	"What was your term average?": {
		section: "University Academics",
		order: 20,
	},
	"What was your term average in 1A?": {
		section: "SKIP",
	},
	"What was your term average in 1B?": {
		section: "SKIP",
	},
	"What was your term average in 2A?": {
		section: "SKIP",
	},
	"What was your term average in 2B?": {
		section: "SKIP",
	},
	"What was your term average in 3A?": {
		section: "SKIP",
	},
	"What was your term average in 3B?": {
		section: "SKIP",
	},
	"What was your term average in 4A?": {
		section: "SKIP",
	},
	"What was your term average in 4B?": {
		section: "SKIP",
	},
	"What is your cumulative average?": {
		section: "University Academics",
		order: 21,
	},
	"Anything else you'd like to add about academics? (courses, FYDP, etc.)": {
		section: "University Academics",
	},
	"How many roommates did you have in each school term?": {
		section: "University Life",
		order: 2,
	},
	"How many roommates did you have in each school term? [1A]": {
		section: "SKIP",
	},
	"How many roommates did you have in each school term? [1B]": {
		section: "SKIP",
	},
	"How many roommates did you have in each school term? [2A]": {
		section: "SKIP",
	},
	"How many roommates did you have in each school term? [2B]": {
		section: "SKIP",
	},
	"How many roommates did you have in each school term? [3A]": {
		section: "SKIP",
	},
	"How many roommates did you have in each school term? [3B]": {
		section: "SKIP",
	},
	"How many roommates did you have in each school term? [4A]": {
		section: "SKIP",
	},
	"How many roommates did you have in each school term? [4B]": {
		section: "SKIP",
	},
	"Where did you live during your school terms?": {
		section: "University Life",
		order: 1,
	},
	"What technical extracurriculars did you actively participate in?": {
		section: "University Life",
		order: 8,
	},
	"What non-technical extracurriculars did you actively participate in?": {
		section: "University Life",
		order: 9,
	},
	"Are there any extracurriculars you regret not joining? Why?": {
		section: "University Life",
		order: 10,
	},
	"Which intramurals did you participate in?": {
		section: "University Life",
		order: 11,
	},
	"Which terms did you participate in intramurals?": {
		section: "University Life",
		order: 12,
	},
	"How many technical side projects did you complete during university?": {
		section: "University Life",
		order: 6,
	},
	"How many hackathons did you attend in university?": {
		section: "University Life",
		order: 7,
	},
	"How many hackathons did you attend in university? [1A]": {
		section: "SKIP",
	},
	"How many hackathons did you attend in university? [1B]": {
		section: "SKIP",
	},
	"How many hackathons did you attend in university? [2A]": {
		section: "SKIP",
	},
	"How many hackathons did you attend in university? [2B]": {
		section: "SKIP",
	},
	"How many hackathons did you attend in university? [3A]": {
		section: "SKIP",
	},
	"How many hackathons did you attend in university? [3B]": {
		section: "SKIP",
	},
	"How many hackathons did you attend in university? [4A]": {
		section: "SKIP",
	},
	"How many hackathons did you attend in university? [4B]": {
		section: "SKIP",
	},
	"How often do you go out/party on average?": {
		section: "University Life",
		order: 23,
	},
	"How many hours of sleep do you get on average?": {
		section: "University Life",
		order: 15,
	},
	/*
	"How many times do you cook/go out to eat per week?": {
		section: "University Life",
		order: 16,
	},
	*/
	"During school terms?": {
		section: "University Life",
		order: 16,
	},
	"During co-op terms?": {
		section: "University Life",
		order: 16.1,
	},
	"How many meals do you cook per week on average during school terms?": {
		section: "SKIP",
	},
	"How many meals do you cook per week on average during co-op terms?": {
		section: "SKIP",
	},
	"How many times do you go out to eat per week on average during school terms?":
		{ section: "SKIP" },
	"How many times do you go out to eat per week on average during co-op terms?":
		{ section: "SKIP" },
	"Favourite study spot?": {
		section: "University Life",
		order: 3,
	},
	"What grocery store did you most frequently shop at?": {
		section: "Misc",
		order: 21,
	},
	"What is your religious and/or spiritual affiliation?": {
		section: "Demographics",
		order: 4,
	},
	"What is your sexual orientation?": { section: "Demographics", order: 3 },
	"How many classes did you fail?": {
		section: "University Academics",
		order: 22,
	},
	"If you failed a class, which class did you fail?": {
		section: "University Academics",
		order: 23,
	},
	"How many midterms did you fail?": {
		section: "University Academics",
		order: 24,
	},
	"How many finals did you fail?": {
		section: "University Academics",
		order: 25,
	},
	"Have you ever been arrested?": { section: "Misc", order: 16 },
	"What counselling resources did you use during your undergrad?": {
		section: "Health",
		order: 13,
	},
	"Have you ever been to therapy?": { section: "Health", order: 12 },
	"How many school terms were you affected by struggles associated with mental health?":
		{ section: "Health", order: 7.5 },
	// grouped hbg vv
	"What mental health issues have you faced?": {
		section: "Health",
		order: 20,
	},
	"What mental health issues have you faced? [Anxiety]": {
		section: "SKIP",
	},
	"What mental health issues have you faced? [Body Dysmorphia]": {
		section: "SKIP",
	},
	"What mental health issues have you faced? [Burnout]": { section: "SKIP" },
	"What mental health issues have you faced? [Depression]": {
		section: "SKIP",
	},
	"What mental health issues have you faced? [Eating Disorders]": {
		section: "SKIP",
	},
	"What mental health issues have you faced? [Grief]": { section: "SKIP" },
	"What mental health issues have you faced? [OCD]": { section: "SKIP" },
	"What mental health issues have you faced? [Neurodivergence (ADHD, Autism, etc.)]":
		{ section: "SKIP" },
	"What mental health issues have you faced? [Post-traumatic Stress Disorder (PTSD) / Complex post-traumatic Stress Disorder (CPTSD)]":
		{ section: "SKIP" },
	"What mental health issues have you faced? [Social Anxiety Disorder]": {
		section: "SKIP",
	},
	"What mental health issues have you faced? [None]": { section: "SKIP" },
	"What mental health issues have you faced? [PMDD]": { section: "SKIP" },
	"What mental health issues have you faced? [Body-Focused Repetitive Behaviour]":
		{ section: "SKIP" },
	"How many times did you need to visit the ER during your undergrad?": {
		section: "Health",
		order: 26,
	},
	// also grouped hbg vv
	"Which drugs have you used?": {
		section: "Friends, Relationships & Drugs",
	},
	"Which drugs have you used? [Alcohol]": {
		section: "SKIP",
	},
	"Which drugs have you used? [Caffeine]": {
		section: "SKIP",
	},
	"Which drugs have you used? [Nicotine and Tobacco]": {
		section: "SKIP",
	},
	"Which drugs have you used? [Weed (THC)]": {
		section: "SKIP",
	},
	"Which drugs have you used? [Adderall/Ritalin (unprescribed)]": {
		section: "SKIP",
	},
	"Which drugs have you used? [Mushrooms]": {
		section: "SKIP",
	},
	"Which drugs have you used? [LSD]": {
		section: "SKIP",
	},
	"Which drugs have you used? [Cocaine]": {
		section: "SKIP",
	},
	"Drank alcohol, taken an edible, or done another drug in class?": {
		section: "Friends, Relationships & Drugs",
	},
	"Written a final drunk, hungover, high or on another drug?": {
		section: "Friends, Relationships & Drugs",
	},
	"How many romantic relationships have you been in during your degree?": {
		section: "Friends, Relationships & Drugs",
		order: 6,
	},
	"How many months of your degree have you spent in a romantic relationship?": {
		section: "Friends, Relationships & Drugs",
		order: 7,
	},
	"What dating apps did you use while in university?": {
		section: "Friends, Relationships & Drugs",
		order: 4,
	},
	"Did you ever participate in the Aphrodite project?": {
		section: "Friends, Relationships & Drugs",
		order: 5,
	},
	// grouped hbg
	"Which relationship/intimacy actions have you performed?": {
		section: "Friends, Relationships & Drugs",
		order: 11,
	},
	"Which relationship/intimacy actions have you performed? [Held hands romantically]":
		{ section: "SKIP" },
	"Which relationship/intimacy actions have you performed? [Been on a date]": {
		section: "SKIP",
	},
	"Which relationship/intimacy actions have you performed? [Kissed someone romantically]":
		{ section: "SKIP" },
	"Which relationship/intimacy actions have you performed? [Been in a committed relationship]":
		{ section: "SKIP" },
	"Which relationship/intimacy actions have you performed? [Been in a long-distance relationship]":
		{ section: "SKIP" },
	"Which relationship/intimacy actions have you performed? [Been in a situationship]":
		{ section: "SKIP" },
	"Which relationship/intimacy actions have you performed? [Sent/received nudes]":
		{ section: "SKIP" },
	"Which relationship/intimacy actions have you performed? [Engaged in sexual intercourse]":
		{ section: "SKIP" },
	"Which relationship/intimacy actions have you performed? [Hooked up with someone]":
		{ section: "SKIP" },
	"Which relationship/intimacy actions have you performed? [Had a threesome]": {
		section: "SKIP",
	},
	"Have you been involved in romantic cheating during your degree?": {
		section: "Friends, Relationships & Drugs",
		order: 10,
	},
	"How many sexual partners did you have during your degree?": {
		section: "Friends, Relationships & Drugs",
		order: 8,
	},
	"Have you ever done a naughty act in the SE Lounge/Labs?": {
		section: "Friends, Relationships & Drugs",
		order: 9,
	},
	// error bar thingy ? vv
	"Rice purity test score?": {
		section: "Friends, Relationships & Drugs",
	},
	// Included with the above graph
	"What was your rice purity test before university?": {
		section: "SKIP",
	},
	"What is your iron ring size?": { section: "Misc", order: 19 }, // hbg or sized circles
	"If you received an iron ring, have you lost your iron ring as of doing this survey?":
		{ section: "Misc", order: 20 },
	"Have you ever physically fought someone outside of controlled martial arts environments (with intent to cause physical harm)?":
		{ section: "Misc", order: 17 },
	"Do you use tabs or spaces when indenting your code?": {
		section: "Misc",
		order: 7,
	},
	"Where do you put your function brackets?": { section: "Misc", order: 6 },
	"Favourite programming language?": { section: "Misc", order: 3 },
	"Favourite text editor or IDE?": { section: "Misc", order: 4 },
	"Do you capitalize letters while typing with Caps Lock or Shift?": {
		section: "Misc",
		order: 8,
	},
	"Do you use your chosen IDE in light or dark mode?": {
		section: "Misc",
		order: 5,
	},
	"Which phone OS do you use?": { section: "Misc", order: 11 },
	// grouped hbg vv
	"How many Leetcode problems have you solved?": {
		section: "Co-op",
		order: 2,
	},
	"How many Leetcode Easy problems have you solved?": {
		section: "SKIP",
	},
	"How many Leetcode Medium problems have you solved?": {
		section: "SKIP",
	},
	"How many Leetcode Hard problems have you solved?": {
		section: "SKIP",
	},
	"What video games did you frequently play during your degree?": {
		section: "Misc",
		order: 15,
	},
	"How many hours did you play video games per week during your degree?": {
		section: "Misc",
		order: 14,
	},
	"How many hours did you spend on social media platforms per week during your degree?":
		{ section: "Misc", order: 12 },
	"Favourite boba shop around UW?": {
		section: "Misc",
		order: 25,
	},
	"Favourite restaurant in Waterloo?": {
		section: "Misc",
		order: 23,
	},
	"Favourite shawarma restaurant around UW?": {
		section: "Misc",
		order: 24,
	},
	"Favourite inspirational quote/words to live by?": {
		section: "From: SE25",
	},
	"Best life hack/tip?": { section: "From: SE25" },
	"Advice you'd give your first-year self?": {
		section: "From: SE25",
	},
	"Did you ever commit SEcest with another SE25?": {
		section: "Friends, Relationships & Drugs",
		order: 7.1,
	},
	"Did you at any point want to commit SEcest with an SE25?": {
		section: "Friends, Relationships & Drugs",
		order: 7.2,
	},
	"What terms did you commit SEcest with another SE25?": {
		section: "Friends, Relationships & Drugs",
		order: 7.3,
	},
	"Average Hourly Co-op Salary vs Gender": {
		section: "Correlations",
		order: 10,
	},
	"First-year Total Compensation vs Gender": {
		section: "Correlations",
		order: 11,
	},
	"First-year Total Compensation vs Grades": {
		section: "Correlations",
		order: 13,
	},
	// "Average Hourly Co-op Salary vs Family Income": {
	// 	section: "Correlations",
	// 	order: 14,
	// },
	"First-year Total Compensation vs Family Income": {
		section: "Correlations",
		order: 15,
	},
	"Anything else you'd like to add?": { section: "From: SE25" },
};

export const COMPLETE_SECTION_LOOKUP: {
	[key in SURVEY_QUESTION | SUB_SECTIONS]?: {
		section: SURVEY_SECTIONS | "SKIP";
		order?: number;
		subSection?: SUB_SECTIONS;
	};
} = {
	...QUESTIONS_TO_SECTIONS,
	...SUB_SECTIONS_TO_SECTION,
};

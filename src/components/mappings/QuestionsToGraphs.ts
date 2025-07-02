import { SURVEY_QUESTION } from "./QuestionsList";

export enum GraphType {
	// Vertical Bar Graph
	VBG,
	// Horizontal Bar Graph
	HBG,
	// Pie Graph
	PG,
	// World Map
	MAP,
	// Word Cloud
	WORD_CLOUD,
	// Toggled Horizontal Bar Graph
	TOGGLED_HBG,
	// Line
	LINE,
	// Single Vertical Box Plot
	BOX_PLOT,

	// Horizontal Histogram
	HHIST,

	COURSES_WITH_REVIEWS,

	// Colour hex code display
	COLOUR_DISPLAY,

	//emoji display because pain
	EMOJI_DISPLAY,

	//oh god we need another one
	PETS_DISPLAY,

	//aaaaaa
	TOGGLED_WORD_CLOUD,

	// TODO GRAPHS
	// Scatter Plot
	SCATTER_PLOT,
	TEXT_DISPLAY,
	GROUPED_HBG,
	GROUPED_VBG,

	// Custom 💀
	CUSTOM,
}

/**
 * Mapping of questions to what type of graph to use with them.
 */
export const SURVEY_GRAPH_MAPPINGS = {
	"What year were you born?": GraphType.VBG,
	"What racial or ethnic groups describe you?": GraphType.HBG,
	"Are you an out-of-province student?": GraphType.PG,
	"Are you an international student?": GraphType.PG,
	"Are you multilingual?": GraphType.PG,
	"What languages do you speak?": GraphType.HBG,
	"What languages do you speak at home?": GraphType.HBG,
	"Where is your family's home located?": GraphType.CUSTOM,
	"How many siblings do you have?": GraphType.VBG,
	"Are you the eldest, youngest, or in the middle?": GraphType.HBG,
	"Have any of them also studied at Waterloo?": GraphType.PG,
	"What is the highest level of education of your parents?": GraphType.HBG,
	"How many hackathons did you attend in high school?": GraphType.VBG,
	"First programming language?": GraphType.HBG,
	"Did you attend CEGEP?": GraphType.PG,
	"If you attended CEGEP, what program did you attend?": GraphType.CUSTOM,
	"Did you have any job experience relevant to SE prior to starting 1A?":
		GraphType.PG,
	"What other job experience did you have prior to starting 1A?":
		GraphType.WORD_CLOUD,
	"What other universities did you apply to?": GraphType.HBG,
	"Out of all of the university programs you applied to, how would you rank Waterloo SE?":
		GraphType.VBG,
	"Which extracurriculars were you part of in high school?": GraphType.HBG,
	"How many years of programming experience did you have prior to starting 1A?":
		GraphType.PG,
	"Did you participate in any high school enrichment programs?": GraphType.HBG,
	"How many people did you know from high school that also went to Waterloo?":
		GraphType.VBG,
	"Did you take a gap year between high school and university?": GraphType.PG,
	"If you took a gap year, why did you choose to take one?":
		GraphType.TEXT_DISPLAY,
	"What was your high school adjustment factor?": GraphType.HHIST,
	"What was your high school admissions average?": GraphType.HHIST,
	"Did you play any sports in high school?": GraphType.HBG,
	"Have you ever considered dropping out?": GraphType.PG,
	"Have you ever considered switching out of SE? If so, to which program/school?":
		GraphType.HBG,
	"If you had to start again, what school/program would you enrol in?":
		GraphType.HBG,
	"Did you do any options as part of your degree?": GraphType.PG,
	"Did you do any specializations as part of your degree?": GraphType.VBG,
	"Did you minor in anything as part of your degree?": GraphType.HBG,
	"Did you train in a sport competitively during your undergrad?":
		GraphType.VBG,
	"On average, when do you go to sleep?": GraphType.CUSTOM,
	"Did you go on exchange?": GraphType.PG,
	"Which term did you go on exchange?": GraphType.PG,
	"Which university did you go to on exchange?": GraphType.CUSTOM,
	"How high was your workload during exchange?": GraphType.HBG,
	"How stressed were you during exchange?": GraphType.HBG,
	"Favourite part of going on exchange?": GraphType.TEXT_DISPLAY,
	"Hardest thing about going on exchange?": GraphType.TEXT_DISPLAY,
	"Most valuable thing you took away from exchange?": GraphType.TEXT_DISPLAY,
	"Stream 8 vs 8x vs 8y": GraphType.CUSTOM,
	"What language do you use for programming interviews?": GraphType.VBG,
	"Have you ever been late to a co-op interview?": GraphType.PG,
	"Have you ever missed a co-op interview?": GraphType.PG,
	"Any fun interview stories?": GraphType.TEXT_DISPLAY,
	"How did you find your co-op?": GraphType.TOGGLED_HBG,
	"What was your co-op role?": GraphType.TOGGLED_HBG,
	"What company did you work at?": GraphType.TOGGLED_WORD_CLOUD, // ??? toggled wordcloud ???
	"How many employees worked at your company?": GraphType.TOGGLED_HBG,
	"Which industry was your co-op employer in?": GraphType.TOGGLED_WORD_CLOUD, // ??? toggled wordcloud ???
	"What was your hourly co-op salary?": GraphType.CUSTOM, // ??? toggled scatter plot ???
	"Where was your co-op?": GraphType.TOGGLED_HBG,
	"What programming languages did you use at your co-op?":
		GraphType.TOGGLED_HBG,
	"What would you rate your co-op experience?": GraphType.TOGGLED_HBG,
	"Favourite overall co-op city?": GraphType.HBG,
	"Anything else co-op related you'd like to add?": GraphType.TEXT_DISPLAY,
	"Favourite colour (as a hex code)?": GraphType.COLOUR_DISPLAY,
	"What social media/messaging apps do you use?": GraphType.HBG,
	"Favourite Emoji?": GraphType.EMOJI_DISPLAY,
	"What pets do you have?": GraphType.PETS_DISPLAY,
	"Which OS do you use for schoolwork?": GraphType.HBG,
	"What is your daily browser?": GraphType.PG,
	"How many volunteer hours did you complete in high school?": GraphType.VBG,
	"Why did you choose Waterloo SE?": GraphType.HBG,
	"What is your gender?": GraphType.PG,
	"What was your parents' total income at the time that you were admitted into university?":
		GraphType.HBG,
	"How many roommates did you have in each school term? [1A]":
		GraphType.GROUPED_HBG,
	"How many roommates did you have in each school term? [1B]":
		GraphType.GROUPED_HBG,
	"How many roommates did you have in each school term? [2A]":
		GraphType.GROUPED_HBG,
	"How many roommates did you have in each school term? [2B]":
		GraphType.GROUPED_HBG,
	"How many roommates did you have in each school term? [3A]":
		GraphType.GROUPED_HBG,
	"How many roommates did you have in each school term? [3B]":
		GraphType.GROUPED_HBG,
	"How many roommates did you have in each school term? [4A]":
		GraphType.GROUPED_HBG,
	"How many roommates did you have in each school term? [4B]":
		GraphType.GROUPED_HBG,
	"Where did you live during your school terms?": GraphType.TOGGLED_HBG,
	"If you have taken an academic course during a co-op term, when?":
		GraphType.HBG,
	"If you have taken an academic course during a co-op term, why?":
		GraphType.TEXT_DISPLAY,
	"If you have overloaded a term, when?": GraphType.HBG,
	"If you have overloaded, which course(s) did you overload, and did you complete the course(s)?":
		GraphType.CUSTOM,
	"What device do you most frequently use to take notes?": GraphType.HBG,
	"What note-taking software do you use?": GraphType.HBG,
	"Which List 1 ATE did you take?": GraphType.HBG,
	"Opinions on List 1 ATEs": GraphType.TOGGLED_HBG,
	"Which List 2 ATE did you take?": GraphType.HBG,
	"Opinions on List 2 ATEs": GraphType.TOGGLED_HBG /* */,
	"Which List 3 ATE did you take?": GraphType.HBG,
	"Opinions on List 3 ATEs": GraphType.TOGGLED_HBG,
	"Favourite core course?": GraphType.HBG,
	"Least favourite core course?": GraphType.HBG,
	"Most useful core course?": GraphType.COURSES_WITH_REVIEWS,
	"Least useful core course?": GraphType.COURSES_WITH_REVIEWS,
	"Favourite core course professor?": GraphType.CUSTOM,
	"Favourite elective course (no ATEs), and why?":
		GraphType.COURSES_WITH_REVIEWS,
	"Easiest study term?": GraphType.PG,
	"Hardest study term?": GraphType.PG,
	"Do you plan on getting your P. Eng?": GraphType.PG,
	"Which school term did you spend the most time working on your FYDP?":
		GraphType.PG,
	"Will you continue working on your FYDP after symposium?": GraphType.PG,
	"How much did you enjoy working on your FYDP?": GraphType.HBG,
	"What category is your FYDP?": GraphType.PG,
	"Did you transfer into SE from another program?": GraphType.PG,
	"What was your term average in 1A?": GraphType.CUSTOM,
	"What is your cumulative average?": GraphType.BOX_PLOT,
	"Anything else you'd like to add about academics? (courses, FYDP, etc.)":
		GraphType.TEXT_DISPLAY,
	"What technical extracurriculars did you actively participate in?":
		GraphType.HBG,
	"What non-technical extracurriculars did you actively participate in?":
		GraphType.HBG,
	"Are there any extracurriculars you regret not joining? Why?":
		GraphType.TEXT_DISPLAY,
	"Which intramurals did you participate in?": GraphType.HBG,
	"Which terms did you participate in intramurals?": GraphType.VBG,
	"How many technical side projects did you complete during university?":
		GraphType.HBG,
	// grouped vbg vv
	"How many hackathons did you attend in university? [1A]":
		GraphType.GROUPED_VBG,
	"How many hackathons did you attend in university? [1B]":
		GraphType.GROUPED_VBG,
	"How many hackathons did you attend in university? [2A]":
		GraphType.GROUPED_VBG,
	"How many hackathons did you attend in university? [2B]":
		GraphType.GROUPED_VBG,
	"How many hackathons did you attend in university? [3A]":
		GraphType.GROUPED_VBG,
	"How many hackathons did you attend in university? [3B]":
		GraphType.GROUPED_VBG,
	"How many hackathons did you attend in university? [4A]":
		GraphType.GROUPED_VBG,
	"How many hackathons did you attend in university? [4B]":
		GraphType.GROUPED_VBG,
	"How often do you go out/party on average?": GraphType.HBG,
	"How many hours of sleep do you get on average?": GraphType.VBG,
	"How many meals do you cook per week on average during school terms?":
		GraphType.BOX_PLOT,
	"How many meals do you cook per week on average during co-op terms?":
		GraphType.BOX_PLOT,
	"How many times do you go out to eat per week on average during school terms?":
		GraphType.BOX_PLOT,
	"How many times do you go out to eat per week on average during co-op terms?":
		GraphType.BOX_PLOT,
	"Have you ever had a co-op term without a placement?": GraphType.PG,
	"How many co-op offers did you have rescinded?": GraphType.PG,
	"Have you ever been banned from WaterlooWorks for reneging an offer/match?":
		GraphType.PG,
	"Have you ever gotten COVID?": GraphType.PG,
	"How many times have you gotten COVID?": GraphType.VBG,
	"Have you ever experienced long COVID symptoms?": GraphType.PG,
	"How often did you exercise during your undergrad?": GraphType.HBG,
	"What types of exercise did you do during your undergrad?": GraphType.HBG,
	"If you experienced burnout during SE, what factors contributed?":
		GraphType.HBG,
	"How is your self-esteem now compared to before starting university?":
		GraphType.PG,
	"In first year?": GraphType.HBG,
	"In 4B?": GraphType.HBG,
	"How many times did you ask for a deadline extension due to illness/injury?":
		GraphType.HBG,
	"How many times did you need to visit the ER during your undergrad?":
		GraphType.PG,
	"How often do you keep in touch with high school friends?": GraphType.HBG,
	"How many people in SE25 have you ever met and spoken to in-person?":
		GraphType.BOX_PLOT,
	"How many close friends do you have that you first met in high school?":
		GraphType.CUSTOM,
	"How many close friends do you have that you first met through co-op?":
		GraphType.GROUPED_VBG,
	"How many close friends do you have that you first met on campus residence?":
		GraphType.GROUPED_VBG,
	"How many close friends do you have that you first met through being part of the SE25 cohort (i.e. by taking the same core courses or attending cohort events)?":
		GraphType.GROUPED_VBG,
	"How many close friends do you have that you first met through being part of SE (other cohorts)?":
		GraphType.GROUPED_VBG,
	"How many close friends do you have that you first met in extracurriculars (e.g. clubs, sports)?":
		GraphType.GROUPED_VBG,
	"How many close friends do you have that you first met through other means (e.g. parties, Aphrodite project, mutual friends)":
		GraphType.GROUPED_VBG,
	"Have you been contacted by the CRA for tax-related reasons?": GraphType.PG,
	"Have you ever unintentionally committed tax fraud?": GraphType.PG,
	"Have you ever intentionally committed tax fraud?": GraphType.PG,
	"What is your current net worth?": GraphType.BOX_PLOT,
	"What percentage of your net worth is invested?": GraphType.PG,
	"How much did you borrow in student loans throughout university?":
		GraphType.BOX_PLOT,
	"How satisfied are you about your current financial situation?":
		GraphType.VBG,
	"What are your post graduation plans?": GraphType.HBG,
	"How many grad school offers have you received so far?": GraphType.HBG,
	"Which school?": GraphType.CUSTOM,
	"What is your research topic or program?": GraphType.CUSTOM,
	"Why did you choose to pursue grad school over full-time employment?":
		GraphType.TEXT_DISPLAY,
	"How many full-time offers have you received so far?": GraphType.HBG,
	"If you have accepted an offer, which company?": GraphType.WORD_CLOUD,
	"How large is the company that extended your full-time offer (number of employees)?":
		GraphType.HBG,
	"Which industry is the company that extended your full-time offer in?":
		GraphType.HBG,
	"When are you starting full-time work?": GraphType.VBG,
	"How many days per week do you plan to work remotely?": GraphType.VBG,
	"Are you returning to a previous co-op?": GraphType.PG,
	"If you are returning to a previous co-op, when did you work for that company?":
		GraphType.HBG,
	"What is your total first-year compensation?": GraphType.CUSTOM,
	"What is your annual base salary?": GraphType.CUSTOM,
	"What is your one-time sign-on bonus?": GraphType.CUSTOM,
	"What is the value of your first-year stock grant?": GraphType.CUSTOM,
	"What is your total stock grant value?": GraphType.CUSTOM,
	// Surprisingly, this one has no wacky outliers, then numbers are just big
	"What is your end-of-year/recurring annual compensation?": GraphType.BOX_PLOT,
	"How content are you with your post-grad plans?": GraphType.HBG,
	"What city will you be living in full-time after graduation?":
		GraphType.CUSTOM,
	// "grouped horizontal graph" vv
	"What were the 3 most important motivators in your full-time decision?  [Compensation]":
		GraphType.GROUPED_VBG,
	"What were the 3 most important motivators in your full-time decision?  [Proximity to Friends]":
		GraphType.CUSTOM,
	"What were the 3 most important motivators in your full-time decision?  [Proximity to Family]":
		GraphType.CUSTOM,
	"What were the 3 most important motivators in your full-time decision?  [Proximity to Significant Other]":
		GraphType.CUSTOM,
	"What were the 3 most important motivators in your full-time decision?  [City choice]":
		GraphType.CUSTOM,
	"What were the 3 most important motivators in your full-time decision?  [Cost of Living]":
		GraphType.CUSTOM,
	"What were the 3 most important motivators in your full-time decision?  [Interest in Work]":
		GraphType.CUSTOM,
	"What were the 3 most important motivators in your full-time decision?  [Interest in Team]":
		GraphType.CUSTOM,
	"What were the 3 most important motivators in your full-time decision?  [Interest in Product]":
		GraphType.CUSTOM,
	"What were the 3 most important motivators in your full-time decision?  [Company Fit (WLB, Culture)]":
		GraphType.CUSTOM,
	"What were the 3 most important motivators in your full-time decision?  [Remote Work]":
		GraphType.CUSTOM,
	"What were the 3 most important motivators in your full-time decision?  [In-Person Work]":
		GraphType.CUSTOM,
	"What were the 3 most important motivators in your full-time decision?  [Vibes]":
		GraphType.CUSTOM,
	"Are you left-handed, right-handed, or ambidextrous?": GraphType.PG,
	"Favourite SE25-related memory?": GraphType.TEXT_DISPLAY,
	"What countries did you travel to during your degree?": GraphType.MAP,
	"Favourite study spot?": GraphType.HBG,
	"What grocery store did you most frequently shop at?": GraphType.HBG,
	// I kind of feel this question requires a custom display based on grocery store but that is kind of a lot of effort
	// and the payoff feels low compared to just the question above
	// "What factors make you frequent that grocery store?": GraphType.HBG,
	"What is your religious and/or spiritual affiliation?": GraphType.HBG,
	"What is your sexual orientation?": GraphType.HBG,
	"How many classes did you fail?": GraphType.HBG,
	"If you failed a class, which class did you fail?": GraphType.HBG,
	"How many midterms did you fail?": GraphType.HBG,
	"How many finals did you fail?": GraphType.HBG,
	"Have you ever been arrested?": GraphType.PG,
	"What counselling resources did you use during your undergrad?":
		GraphType.HBG,
	"Have you ever been to therapy?": GraphType.PG,
	"How many school terms were you affected by struggles associated with mental health?":
		GraphType.VBG,
	"What mental health issues have you faced? [Anxiety]": GraphType.CUSTOM,
	"What mental health issues have you faced? [Body Dysmorphia]":
		GraphType.GROUPED_HBG,
	"What mental health issues have you faced? [Burnout]": GraphType.GROUPED_HBG,
	"What mental health issues have you faced? [Depression]":
		GraphType.GROUPED_HBG,
	"What mental health issues have you faced? [Eating Disorders]":
		GraphType.GROUPED_HBG,
	"What mental health issues have you faced? [Grief]": GraphType.GROUPED_HBG,
	"What mental health issues have you faced? [OCD]": GraphType.GROUPED_HBG,
	"What mental health issues have you faced? [Neurodivergence (ADHD, Autism, etc.)]":
		GraphType.GROUPED_HBG,
	"What mental health issues have you faced? [Post-traumatic Stress Disorder (PTSD) / Complex post-traumatic Stress Disorder (CPTSD)]":
		GraphType.GROUPED_HBG,
	"What mental health issues have you faced? [Social Anxiety Disorder]":
		GraphType.GROUPED_HBG,
	"What mental health issues have you faced? [None]": GraphType.GROUPED_HBG,
	"What mental health issues have you faced? [PMDD]": GraphType.GROUPED_HBG,
	"What mental health issues have you faced? [Body-Focused Repetitive Behaviour]":
		GraphType.GROUPED_HBG,
	"Which drugs have you used? [Alcohol]": GraphType.GROUPED_HBG,
	"Which drugs have you used? [Caffeine]": GraphType.GROUPED_HBG,
	"Which drugs have you used? [Nicotine and Tobacco]": GraphType.GROUPED_HBG,
	"Which drugs have you used? [Weed (THC)]": GraphType.GROUPED_HBG,
	"Which drugs have you used? [Adderall/Ritalin (unprescribed)]":
		GraphType.GROUPED_HBG,
	"Which drugs have you used? [Mushrooms]": GraphType.GROUPED_HBG,
	"Which drugs have you used? [LSD]": GraphType.GROUPED_HBG,
	"Which drugs have you used? [Cocaine]": GraphType.GROUPED_HBG,
	"Drank alcohol, taken an edible, or done another drug in class?":
		GraphType.HBG,
	"Written a final drunk, hungover, high or on another drug?": GraphType.HBG,
	"How many romantic relationships have you been in during your degree?":
		GraphType.VBG,
	"How many months of your degree have you spent in a romantic relationship?":
		// Honestly want to do a bar graph but I'm too lazy to do the binning :P
		GraphType.BOX_PLOT,
	"What dating apps did you use while in university?": GraphType.HBG,
	"Did you ever participate in the Aphrodite project?": GraphType.HBG,
	"Which relationship/intimacy actions have you performed? [Held hands romantically]":
		GraphType.GROUPED_HBG,
	"Which relationship/intimacy actions have you performed? [Been on a date]":
		GraphType.GROUPED_HBG,
	"Which relationship/intimacy actions have you performed? [Kissed someone romantically]":
		GraphType.GROUPED_HBG,
	"Which relationship/intimacy actions have you performed? [Been in a committed relationship]":
		GraphType.GROUPED_HBG,
	"Which relationship/intimacy actions have you performed? [Been in a long-distance relationship]":
		GraphType.GROUPED_HBG,
	"Which relationship/intimacy actions have you performed? [Been in a situationship]":
		GraphType.GROUPED_HBG,
	"Which relationship/intimacy actions have you performed? [Sent/received nudes]":
		GraphType.GROUPED_HBG,
	"Which relationship/intimacy actions have you performed? [Engaged in sexual intercourse]":
		GraphType.GROUPED_HBG,
	"Which relationship/intimacy actions have you performed? [Hooked up with someone]":
		GraphType.GROUPED_HBG,
	"Which relationship/intimacy actions have you performed? [Had a threesome]":
		GraphType.GROUPED_HBG,
	"Have you been involved in romantic cheating during your degree?":
		GraphType.PG,
	"How many sexual partners did you have during your degree?": GraphType.HBG,
	"Have you ever done a naughty act in the SE Lounge/Labs?": GraphType.PG,
	// error bar thingy ? vv
	"Rice purity test score?": GraphType.CUSTOM,
	"What was your rice purity test before university?": GraphType.CUSTOM,
	"What is your iron ring size?": GraphType.CUSTOM, // hbg or sized circles
	"If you received an iron ring, have you lost your iron ring as of doing this survey?":
		GraphType.PG,
	"Have you ever physically fought someone outside of controlled martial arts environments (with intent to cause physical harm)?":
		GraphType.PG,
	"Do you use tabs or spaces when indenting your code?": GraphType.PG,
	"Where do you put your function brackets?": GraphType.PG,
	"Favourite programming language?": GraphType.HBG,
	"Favourite text editor or IDE?": GraphType.HBG,
	"Do you capitalize letters while typing with Caps Lock or Shift?":
		GraphType.PG,
	"Do you use your chosen IDE in light or dark mode?": GraphType.PG,
	"Which phone OS do you use?": GraphType.PG,
	"How many Leetcode Easy problems have you solved?": GraphType.CUSTOM,
	"How many Leetcode Medium problems have you solved?": GraphType.GROUPED_HBG,
	"How many Leetcode Hard problems have you solved?": GraphType.GROUPED_HBG,
	"What video games did you frequently play during your degree?": GraphType.HBG,
	"How many hours did you play video games per week during your degree?":
		GraphType.VBG,
	"How many hours did you spend on social media platforms per week during your degree?":
		GraphType.VBG,
	"Favourite boba shop around UW?": GraphType.HBG,
	"Favourite restaurant in Waterloo?": GraphType.HBG,
	"Favourite shawarma restaurant around UW?": GraphType.HBG,
	"Favourite inspirational quote/words to live by?": GraphType.TEXT_DISPLAY,
	"Best life hack/tip?": GraphType.TEXT_DISPLAY,
	"Advice you'd give your first-year self?": GraphType.TEXT_DISPLAY,
	"Did you ever commit SEcest with another SE25?": GraphType.PG,
	"Did you at any point want to commit SEcest with an SE25?": GraphType.PG,
	"What terms did you commit SEcest with another SE25?": GraphType.LINE,
	"Which term did you switch out of SE25?": GraphType.VBG,
	"Why did you choose to switch out of SE25?": GraphType.TEXT_DISPLAY,
	"Which program did you switch to?": GraphType.VBG,
	"Anything else you'd like to add?": GraphType.TEXT_DISPLAY,
	"Is there anything else you'd like to add?": GraphType.TEXT_DISPLAY,

	"1A": GraphType.CUSTOM,
	"1B": GraphType.CUSTOM,
	"2A": GraphType.CUSTOM,
	"2B": GraphType.CUSTOM,
	"3A": GraphType.CUSTOM,
	"3B": GraphType.CUSTOM,
	"4A": GraphType.CUSTOM,
	"4B": GraphType.CUSTOM,
	"Anything else you’d like to add?": GraphType.CUSTOM,
	"Any feedback on this survey?": GraphType.CUSTOM,
	"(Second co-op term) Which industry was your co-op employer in?":
		GraphType.CUSTOM,
	"Anything else to add about full-time?": GraphType.CUSTOM,
	"How useful did you find your List 3 ATE?": GraphType.CUSTOM,
	"Why did you think this course was useful?": GraphType.CUSTOM,
	"Why did you think this course wasn't useful?": GraphType.CUSTOM,
	"What was your term average in 1B?": GraphType.CUSTOM,
	"What was your term average in 2A?": GraphType.CUSTOM,
	"What was your term average in 2B?": GraphType.CUSTOM,
	"What was your term average in 3A?": GraphType.CUSTOM,
	"What was your term average in 3B?": GraphType.CUSTOM,
	"What was your term average in 4A?": GraphType.CUSTOM,
	"What was your term average in 4B?": GraphType.CUSTOM,

	// Titles that are meant for grouped survey results
	"How many roommates did you have in each school term?": GraphType.GROUPED_VBG,
	"Which drugs have you used?": GraphType.GROUPED_HBG,
	"Which relationship/intimacy actions have you performed?":
		GraphType.GROUPED_HBG,

	"How many hackathons did you attend in university?": GraphType.GROUPED_VBG,
	"What were the 3 most important motivators in your full-time decision?":
		GraphType.GROUPED_VBG,

	"What was your term average?": GraphType.CUSTOM,
	"How many Leetcode problems have you solved?": GraphType.CUSTOM,
	// "How many times do you cook/go out to eat per week?": GraphType.CUSTOM,
	"During school terms?": GraphType.CUSTOM,
	"During co-op terms?": GraphType.CUSTOM,

	"What mental health issues have you faced?": GraphType.CUSTOM,

	"Average Hourly Co-op Salary vs Gender": GraphType.CUSTOM,
	// "Average Hourly Co-op Salary vs Family Income": GraphType.CUSTOM,
	"Full-time Total Compensation vs Gender": GraphType.CUSTOM,
	"Full-time Total Compensation vs Grades": GraphType.CUSTOM,
	"Full-time Total Compensation vs Family Income": GraphType.CUSTOM,

	"Co-op Regions - Flow over Terms": GraphType.CUSTOM,
} as const satisfies {
	[key in SURVEY_QUESTION]: GraphType;
};

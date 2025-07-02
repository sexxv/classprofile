# parse data to json from uh .csv?
from pandas import *
from collections import defaultdict
import json
import sys

multiselect_questions = set([
    "What racial or ethnic groups describe you?",
    "What languages do you speak?",
    "What languages do you speak at home?",
    "What other job experience did you have prior to starting 1A?",
    "What other universities did you apply to?",
    "Which extracurriculars were you part of in high school?",
    "Did you participate in any high school enrichment programs?",
    "Did you play any sports in high school?",
    "Did you minor in anything as part of your degree?",
    "Did you train in a sport competitively during your undergrad?",
    "Which term did you go on exchange?",
    "What language do you use for programming interviews?",
    "(First co-op term) How did you find your co-op?",
    "(First co-op term) What was your job role?",
    "(First co-op term) What programming languages did you use at your co-op?",
    "(Second co-op term) How did you find your co-op?",
    "(Second co-op term) What was your job role?",
    "(Second co-op term) What programming languages did you use at your co-op?",
    "(Third co-op term) How did you find your co-op?",
    "(Third co-op term) What was your job role?",
    "(Third co-op term) What programming languages did you use at your co-op?",
    "(Fourth co-op term) How did you find your co-op?",
    "(Fourth co-op term) What was your job role?",
    "(Fourth co-op term) What programming languages did you use at your co-op?",
    "(Fifth co-op term) How did you find your co-op?",
    "(Fifth co-op term) What was your job role?",
    "(Fifth co-op term) What programming languages did you use at your co-op?",
    "(Sixth co-op term) How did you find your co-op?",
    "(Sixth co-op term) What was your job role?",
    "(Sixth co-op term) What programming languages did you use at your co-op?",
    "Favourite overall co-op city?",
    "What social media/messaging apps do you use?",
    "What pets do you have?",
    "Which OS do you use for schoolwork?",
    "Why did you choose Waterloo SE?",
    "If you have taken an academic course during a co-op term, when?",
    "If you have overloaded a term, when?",
    "What note-taking software do you use?",
    "If you had to start again, what school/program would you enrol in?",
    "What technical extracurriculars did you actively participate in?",
    "What non-technical extracurriculars did you actively participate in?",
    "Which intramurals did you participate in?",
    "Which terms did you participate in intramurals?",
    "What types of exercise did you do during your undergrad?",
    "If you experienced burnout during SE, what factors contributed?",
    "If you are returning to a previous co-op, when did you work for that company?",
    "What countries did you travel to during your degree?",
    "What is your religious and/or spiritual affiliation?",
    "What is your sexual orientation?",
    "If you failed a class, which class did you fail?",
    "What counselling resources did you use during your undergrad?",
    "What dating apps did you use while in university?",
    "Did you ever participate in the Aphrodite project?",
    "Which relationship/intimacy actions have you performed? [Held hands romantically]",
    "Which relationship/intimacy actions have you performed? [Been on a date]",
    "Which relationship/intimacy actions have you performed? [Kissed someone romantically]",
    "Which relationship/intimacy actions have you performed? [Been in a committed relationship]",
    "Which relationship/intimacy actions have you performed? [Been in a long-distance relationship]",
    "Which relationship/intimacy actions have you performed? [Been in a situationship]",
    "Which relationship/intimacy actions have you performed? [Sent/received nudes]",
    "Which relationship/intimacy actions have you performed? [Engaged in sexual intercourse]",
    "Which relationship/intimacy actions have you performed? [Hooked up with someone]",
    "Which relationship/intimacy actions have you performed? [Had a threesome]",
    "What video games did you frequently play during your degree?",
    "Favourite restaurant in Waterloo?",
])

# check if command line argument was provided
if len(sys.argv) < 2:
    print("Usage: python3 parse_data.py <input csv> <output json>")
    sys.exit(1)

# get input & output files from args
# this script assumes that inputs are in src/data/raw, and stores outputs in src/data/cleaned
input_file = sys.argv[1]
output_file = sys.argv[2]

file_folder_prefix = ".." if False else "src" # on mac for some reason .. doesn't work. so change to false if needed
 
# reading CSV file
survey_data_csv = read_csv(file_folder_prefix + f"/data/raw/{input_file}", dtype=object)
survey_data = {}

# thanks SO
def is_numeric(string: str) -> bool:
    try:
        float(string)
        return True
    except ValueError:
        return False

# populating data json
for prop in survey_data_csv:
    data = survey_data_csv[prop].dropna().to_list()
    og_data_for_n = data
    if prop in multiselect_questions:
        data = [item for string in data for item in string.split(", ")] # nested list comprehension whee
    counts = defaultdict(int)
    for val in data:
        counts[val] += 1

    ########################################
    # START CUSTOM SORTING
    ########################################

    # if all keys are numbers
    sort_key = key=lambda item: item[0]
    if all(is_numeric(k) for k in counts.keys()):
        sort_key = key=lambda item: float(item[0])

    # if likert scale sort (idt this is actually a likert scale but uh close enough)
    likert_scale_answers = ["Significantly less", "Somewhat less", "About the same", "Somewhat more", "Significantly more"]
    if all(str(k) in likert_scale_answers for k in counts.keys()):
        sort_key = key=lambda item: likert_scale_answers.index(str(item[0]))

        # we always want to include labels for all likert scale answers
        for i in range(len(likert_scale_answers)):
            if likert_scale_answers[i] not in counts:
                counts[likert_scale_answers[i]] = 0

    # if number range
    number_range_answers = ["2-10", "11-50", "51-200", "201-500", "501-1k", "1k-5k", "5k-10k", "10k+"]
    if all(str(k) in number_range_answers for k in counts.keys()):
        sort_key = key=lambda item: number_range_answers.index(str(item[0]))

        # we always want to include labels for all number range answers
        for i in range(len(number_range_answers)):
            if number_range_answers[i] not in counts:
                counts[number_range_answers[i]] = 0

    # if its... the other number range
    other_number_range_answers = ["0-1", "2-5", "6-10", "11-20", ">20"]
    if all(str(k) in other_number_range_answers for k in counts.keys()):
        sort_key = key=lambda item: other_number_range_answers.index(str(item[0]))

        # we always want to include labels for all number range answers
        for i in range(len(other_number_range_answers)):
            if other_number_range_answers[i] not in counts:
                counts[other_number_range_answers[i]] = 0

    # if parent's education level
    parent_education_answers = ["Some postsecondary", "Postsecondary Diploma (Undergraduates, community college, etc...)", "Masters", "Doctorate", "Prefer not to answer"]
    if all(str(k) in parent_education_answers for k in counts.keys()):
        sort_key = key=lambda item: parent_education_answers.index(str(item[0]))

    # if sibling
    sibling_age = ["Youngest", "Middle", "Eldest", "Prefer not to answer"]
    if all(str(k) in sibling_age for k in counts.keys()):
        sort_key = key=lambda item: sibling_age.index(str(item[0]))

    # if yes/no/prefer not to answer/unsure
    yes_no_answers = ["No", "Yes", "Prefer not to answer", "Unsure"]
    if all(str(k) in yes_no_answers for k in counts.keys()):
        sort_key = key=lambda item: yes_no_answers.index(str(item[0]))
    
    # if volunteer hours
    volunteer_hour_answers = ["0-39", "40-99", "100-149", "150-199", "200-249", ">250"]
    if all(str(k) in volunteer_hour_answers for k in counts.keys()):
        sort_key = key=lambda item: volunteer_hour_answers.index(str(item[0]))

        # we always want to include labels for all number range answers
        for i in range(len(volunteer_hour_answers)):
            if volunteer_hour_answers[i] not in counts:
                counts[volunteer_hour_answers[i]] = 0
    
    # if scale from 1 to 5 (e.g. ATEs)
    easy_useful_answers = ["1", "2", "3", "4", "5"]
    if all(str(k) in easy_useful_answers for k in counts.keys()) and prop != "How many grad school offers have you received so far?":
        sort_key = key=lambda item: easy_useful_answers.index(str(item[0]))

        # we always want to include labels for all number range answers
        for i in range(len(easy_useful_answers)):
            if easy_useful_answers[i] not in counts:
                counts[easy_useful_answers[i]] = 0

    # if long covid
    long_covid_answers = ["No", "Yes", "Unsure", "Have never had COVID"]
    if all(str(k) in long_covid_answers for k in counts.keys()):
        sort_key = key=lambda item: long_covid_answers.index(str(item[0]))

    # if months
    months_answers = ["May", "June", "July", "August", "September", "October"]
    if all(str(k) in months_answers for k in counts.keys()):
        sort_key = key=lambda item: months_answers.index(str(item[0]))

    # if highschool friends
    highschool_friends_answers = ["Never", "Rarely (less than 1x / month)", "Sometimes (around 1x / month)", "Often (around 1x / week)", "Always (more than 1x / week)"]
    if all(str(k) in highschool_friends_answers for k in counts.keys()):
        sort_key = key=lambda item: highschool_friends_answers.index(str(item[0]))

    # if imposter
    imposter_answers = ["Almost always", "Most of the time", "Sometimes", "Rarely", "Never"]
    if all(str(k) in imposter_answers for k in counts.keys()):
        sort_key = key=lambda item: imposter_answers.index(str(item[0]))

        # we always want to include labels for all answers
        for i in range(len(imposter_answers)):
            if imposter_answers[i] not in counts:
                counts[imposter_answers[i]] = 0

    exercise_answers = ["Daily or almost daily (5-7x a week)", "Often (>=3x a week)", "Sometimes (1-2x a week)", "Occasionally (>=1x every 2 weeks)", "Rarely (>= 1x a month)", "Never or almost never"]
    if all(str(k) in exercise_answers for k in counts.keys()):
        sort_key = key=lambda item: exercise_answers.index(str(item[0]))

        # we always want to include labels for all answers
        for i in range(len(exercise_answers)):
            if exercise_answers[i] not in counts:
                counts[exercise_answers[i]] = 0

    party_answers = ["Multiple times a week", "Multiple times a month", "A few times per term", "A few times per year", "Never"]

    if all(str(k) in party_answers for k in counts.keys()):
        sort_key = key=lambda item: party_answers.index(str(item[0]))

        # we always want to include labels for all answers
        for i in range(len(party_answers)):
            if party_answers[i] not in counts:
                counts[party_answers[i]] = 0

    parents_income_answers = ["0-49k / year", "50k-99k / year", "100k-149k / year", "150k-199k / year", "200k-249k / year", "250k-299k / year", "300k-349k / year", "350k-399k/year", "400k+ / year", "Prefer not to say", "Unsure"]
    if all(str(k) in parents_income_answers for k in counts.keys()):
        sort_key = key=lambda item: parents_income_answers.index(str(item[0]))

        # we always want to include labels for all answers
        for i in range(len(parents_income_answers)):
            if parents_income_answers[i] not in counts:
                counts[parents_income_answers[i]] = 0

    invested_income_answers = ["0", "<10%", "<25%", "<50%", "<75%", "<90%", "<100%"]
    if all(str(k) in invested_income_answers for k in counts.keys()):
        sort_key = key=lambda item: invested_income_answers.index(str(item[0]))

        # we always want to include labels for all answers
        for i in range(len(invested_income_answers)):
            if invested_income_answers[i] not in counts:
                counts[invested_income_answers[i]] = 0
    
    dating_app_answers = ["Bumble", "Grindr", "Hinge", "Salams", "Tinder", "Did not use dating apps during university"]
    if all(str(k) in dating_app_answers for k in counts.keys()):
        sort_key = key=lambda item: dating_app_answers.index(str(item[0]))
    
    aphrodite_answers = ["Yes - relationship pool", "Yes - friendship pool", "Never participated in Aphrodite"]
    if all(str(k) in aphrodite_answers for k in counts.keys()):
        sort_key = key=lambda item: aphrodite_answers.index(str(item[0]))

    # this is for all of the ide/shift v.s. caps/brackets qs
    # sorts everything alphabetically & puts "Depends on how I feel" last
    typing_pref_answers = ["Depends on how I feel"]
    if any(str(k) in typing_pref_answers for k in counts.keys()):
        sort_key = key=lambda item: (1 if item[0] == typing_pref_answers[0] else 0, item[0])
    
    # sorts everything alphabetically & puts "I have not experienced burnout" last
    burnout_answers = ["I have not experienced burnout"]
    if any(str(k) in burnout_answers for k in counts.keys()):
        sort_key = key=lambda item: (1 if item[0] == burnout_answers[0] else 0, item[0])

    switch_out_answers = ["1A",
            "1B",
            "1st co-op",
            "2A",
            "2nd co-op",
            "2B",
            "3rd co-op",
            "3A",
            "4th co-op",
            "3B"]
    if all(str(k) in switch_out_answers for k in counts.keys()):
        sort_key = key=lambda item: switch_out_answers.index(str(item[0]))

        # we always want to include labels for all answers
        for i in range(len(switch_out_answers)):
            if switch_out_answers[i] not in counts:
                counts[switch_out_answers[i]] = 0

    ########################################
    # END CUSTOM SORTING
    ########################################

    counts = dict(sorted(counts.items(), key=sort_key))

    survey_data[prop] = { "labels": list(counts.keys()), "counts": list(counts.values()), "n": len(og_data_for_n) }

with open(file_folder_prefix + f"/data/cleaned/{output_file}", "w") as f:
    json.dump(survey_data, f, indent=4)

# parse data to json from uh .csv?
from pandas import *
from collections import defaultdict
import json
import random 

# get input & output files from args
# this script assumes that inputs are in src/data/raw, and stores outputs in src/data/cleaned
# input_file = sys.argv[1]
# output_file = sys.argv[2]

input_file = "correlations.csv"

file_folder_prefix = ".." if False else "src" # on mac for some reason .. doesn't work. so change to false if needed
 
# reading CSV file
survey_data_csv = read_csv(file_folder_prefix + f"/data/raw/{input_file}", dtype=object)
survey_data = []


for index, row in survey_data_csv.iterrows():
    row_dict = {}
    for col in survey_data_csv.columns:
        # skip rows with no FT salary
        if col == "Full-Time Salary" and isna(row[col]):
            break 

        if not isna(row[col]):
            if str(row[col]).isnumeric():
                row_dict[col] = float(row[col])
            row_dict[col] = row[col]
    
    # if row_dict is empty, skip this row
    if not row_dict:
        continue

    survey_data.append(row_dict)


FT_gender = []
FT_familyIncome = []
FT_gpa = []

for row in survey_data:
    FT = row.get("Full-Time Salary")
    gender = row.get("Gender")
    family_income = row.get("Family Income")
    gpa = row.get("University Average")
    print(row)

    if gender:
        FT_gender.append({"Gender": gender, "Full-Time Salary": FT})
    if family_income and family_income != "Prefer not to answer" and family_income != "Unsure":
        FT_familyIncome.append({"Family Income": family_income, "Full-Time Salary": FT})
    if gpa:
        FT_gpa.append({"GPA": gpa, "Full-Time Salary": FT})

random.shuffle(FT_gender)
random.shuffle(FT_familyIncome)
random.shuffle(FT_gpa)

with open(file_folder_prefix + "/data/cleaned/correlations.csv", "w") as f:
    json.dump({
        "Full-Time Salary vs. Gender": FT_gender,
        "Full-Time Salary vs. Family Income": FT_familyIncome,
        "Full-Time Salary vs. GPA": FT_gpa
    }, f, indent=4)


print(f"Parsed {len(survey_data)} rows from {input_file}.")
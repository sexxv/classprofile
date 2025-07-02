# generates a json file of the format needed for sankey, like https://d3-graph-gallery.com/graph/sankey_basic.html

from pandas import read_csv
from collections import defaultdict
import json
import os

input_file = "coop_cities.csv"

file_folder_prefix = ".." if False else "src"

survey_data_csv = read_csv(f"{file_folder_prefix}/data/raw/{input_file}", header=None)
survey_data = survey_data_csv.values.tolist()

# im lazy, i did this grouping manually in typescript but we need the reverse
# here... so im just reverseing it...
SF_BAY_AREA = [
    "San Francisco", "Oakland", "San Jose", "Mountain View",
    "Palo Alto", "San Mateo", "Sunnyvale", "Cupertino",
]
CALIFORNIA = SF_BAY_AREA + ["Los Angeles"]
NEW_YORK = ["New York"]
FLORIDA = ["Miami"]
TEXAS = ["Austin"]
WASHINGTON = ["Seattle"]
ONTARIO = ["Toronto", "Waterloo", "Mississauga", "Milton", "Markham", "Ottawa"]
QUEBEC = ["Montreal", "Quebec City"]
ALBERTA = ["Calgary"]
BRITISH_COLUMBIA = ["Vancouver"]
MASSACHUSETTS = ["Boston", "Cambridge, MA", "Lexington, MA"]

COOP_AREA_GROUPS = {
    "by_country": {
        "USA 🇺🇸": CALIFORNIA + NEW_YORK + MASSACHUSETTS + TEXAS + FLORIDA + WASHINGTON,
        "Canada 🇨🇦": BRITISH_COLUMBIA + ONTARIO + QUEBEC + ALBERTA,
        "Germany 🇩🇪": ["Cologne", "Hamburg"],
        "Japan 🇯🇵": ["Tokyo"],
        "Singapore 🇸🇬": ["Singapore"],
        "Remote 🌐": ["Remote"],
    },
    "by_state_or_province": {
        "California": CALIFORNIA,
        "New York": NEW_YORK,
        "Texas": TEXAS,
        "Massachusetts": MASSACHUSETTS,
        "British Columbia": BRITISH_COLUMBIA,
        "Florida": FLORIDA,
        "Ontario": ONTARIO,
        "Québec": QUEBEC,
        "Washington": WASHINGTON,
        "Alberta": ALBERTA,
    },
}

# === REVERSE MAPPING (city -> group name) ===
# i was too lazy to do this the reversed way
reverse_mapping = {}
all_group_keys = ["by_country", "by_state_or_province"]

for group_key in all_group_keys:
    for group_name, cities in COOP_AREA_GROUPS[group_key].items():
        for city in cities:
            if city not in reverse_mapping:
                reverse_mapping[city] = {k: None for k in all_group_keys}
            reverse_mapping[city][group_key] = group_name

for cur_grouping in all_group_keys:
    list_of_city_keys = set()

    # create nodes
    for row in survey_data:
        for i, city in enumerate(row):
            if str(city).lower() != "nan":
                if city in reverse_mapping and reverse_mapping[city][cur_grouping]:
                    group_label = reverse_mapping[city][cur_grouping]
                else:
                    group_label = city

                node_name = f"{group_label}{i + 1}" # co-op number, dont be 0 based
                list_of_city_keys.add(node_name)

    # node_index lets us key in node for id. 
    node_index = {name: idx for idx, name in enumerate(sorted(list_of_city_keys))}
    nodes = [{"node": idx, "name": name} for name, idx in node_index.items()]

    links_count = defaultdict(int)

    # create links between nodes
    # i wanna say there's a way to not repeat this but...
    for row in survey_data:
        node_ids_in_row = []
        for i, city in enumerate(row):
            if str(city).lower() != "nan":
                if city in reverse_mapping and reverse_mapping[city][cur_grouping]:
                    group_label = reverse_mapping[city][cur_grouping]
                else:
                    group_label = city

                node_name = f"{group_label}{i + 1}" # co-op number, dont be 0 based
                # basically converts the current row into a list of node id numbers
                node_ids_in_row.append(node_index[node_name])

        for i in range(len(node_ids_in_row) - 1):
            src, tgt = node_ids_in_row[i], node_ids_in_row[i + 1]

            # skip nodes that are not between subsequent cities. this means that the last index of the name of src is one less than the last index of the name in tgt
            src_name = nodes[src]["name"]
            tgt_name = nodes[tgt]["name"]
            if src_name[-1] != str(int(tgt_name[-1]) - 1):
                continue
           
            links_count[(src, tgt)] += 1

    links = [
        {"source": src, "target": tgt, "value": count}
        for (src, tgt), count in sorted(links_count.items(), key=lambda x: x[1], reverse=True)
    ]

    graph_data = {
        "nodes": nodes,
        "links": links
    }

    output_file = f"coop_cities_{cur_grouping}.json"
    output_path = f"{file_folder_prefix}/data/cleaned/{output_file}"
    os.makedirs(os.path.dirname(output_path), exist_ok=True)

    with open(output_path, 'w') as f:
        json.dump(graph_data, f, indent=4)


# make a file with counts for each co-op term for both current grouping
counts_output = defaultdict(lambda: int(0))
for cur_grouping_k in all_group_keys:
    for row in survey_data:
        for i, city in enumerate(row):
            if str(city).lower() != "nan":
                if cur_grouping_k and city in reverse_mapping and reverse_mapping[city][cur_grouping_k]:
                    group_label = reverse_mapping[city][cur_grouping_k]
                else:
                    group_label = city

                node_name = f"{group_label}{i + 1}"
                counts_output[node_name] += 1

counts_output_path = f"{file_folder_prefix}/data/cleaned/coop_cities_fixed_counts.json"
os.makedirs(os.path.dirname(counts_output_path), exist_ok=True)
with open(counts_output_path, 'w') as f:
    json.dump(counts_output, f, indent=4)
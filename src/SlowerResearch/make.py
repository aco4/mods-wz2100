import os
import json
import zipfile
import urllib.request

base_dir = os.path.dirname(__file__)

url_structure = "https://raw.githubusercontent.com/Warzone2100/warzone2100/master/data/mp/stats/structure.json"

with urllib.request.urlopen(url_structure) as response:
    json_structure = json.loads(response.read().decode())

for modifier in [2, 3, 4, 5]:

    multiplier = 1 - (modifier / 6)

    diff_structure = {
        "A0ResearchFacility": {
            "researchPoints": round(json_structure["A0ResearchFacility"]["researchPoints"] * multiplier),
            "moduleResearchPoints": round(json_structure["A0ResearchFacility"]["moduleResearchPoints"] * multiplier),
        }
    }

    archive_name = f'{modifier}xSlowerResearch'
    archive_path = os.path.join(base_dir, archive_name)

    with zipfile.ZipFile(archive_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipf.writestr(f'diffs/{archive_name}/stats/structure.json', json.dumps(diff_structure))

    print(archive_path)

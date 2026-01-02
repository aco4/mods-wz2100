import os
import json
import zipfile
import urllib.request

base_dir = os.path.dirname(__file__)

structure_url = "https://raw.githubusercontent.com/Warzone2100/warzone2100/master/data/mp/stats/structure.json"

with urllib.request.urlopen(structure_url) as response:
    structure_json = json.loads(response.read().decode())

for modifier in [2, 3, 4, 5, 6, 7, 8, 9, 10]:

    diff = {
        "A0ResearchFacility": {
            "researchPoints": structure_json["A0ResearchFacility"]["researchPoints"] * modifier,
            "moduleResearchPoints": structure_json["A0ResearchFacility"]["moduleResearchPoints"] * modifier
        }
    }

    archive_name = f'{modifier}xResearchSpeed'
    archive_path = os.path.join(base_dir, archive_name)

    with zipfile.ZipFile(archive_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipf.writestr(f'diffs/{archive_name}/stats/structure.json', json.dumps(diff, indent=2))

    print(archive_path)

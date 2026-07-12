import os
import json
import zipfile
import urllib.request

base_dir = os.path.dirname(__file__)

for x in [1, 2, 3, 4, 5, 6, 7, 8, 9]:
    diff = {
        f'R-Struc-Research-Upgrade0{x}': {
            "researchPoints": 65535
        }
    }

    archive_name = f'TechLimit{x}'
    archive_path = os.path.join(base_dir, archive_name)

    with zipfile.ZipFile(archive_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipf.writestr(f'diffs/{archive_name}/stats/research.json', json.dumps(diff))

    print(archive_path)

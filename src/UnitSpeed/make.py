import os
import json
import zipfile
import urllib.request

base_dir = os.path.dirname(__file__)

structure_url = "https://raw.githubusercontent.com/Warzone2100/warzone2100/master/data/mp/stats/propulsion.json"

with urllib.request.urlopen(structure_url) as response:
    propulsion_json = json.loads(response.read().decode())

for modifier in [2, 3, 4, 5, 6, 7, 8, 9, 10]:

    diff = {
        "CyborgLegs": {
            "speed": propulsion_json["CyborgLegs"]["speed"] * modifier,
        },
        "HalfTrack": {
            "speed": propulsion_json["HalfTrack"]["speed"] * modifier,
        },
        "hover01": {
            "speed": propulsion_json["hover01"]["speed"] * modifier,
        },
        "tracked01": {
            "speed": propulsion_json["tracked01"]["speed"] * modifier,
        },
        "wheeled01": {
            "speed": propulsion_json["wheeled01"]["speed"] * modifier,
        }
    }

    terraintable = {
        "sand": {
            "speedFactor": {
                "wheeled": 100 * modifier,
                "tracked": 100 * modifier,
                "legged": 100 * modifier,
                "hover": 150 * modifier,
                "lift": 250 * modifier,
                "propellor": 100 * modifier,
                "half-tracked": 100 * modifier,
            }
        },
        "sandybrush": {
            "speedFactor": {
                "wheeled": 100 * modifier,
                "tracked": 100 * modifier,
                "legged": 100 * modifier,
                "hover": 80 * modifier,
                "lift": 250 * modifier,
                "propellor": 100 * modifier,
                "half-tracked": 100 * modifier,
            }
        },
        "bakedearth": {
            "speedFactor": {
                "wheeled": 80 * modifier,
                "tracked": 90 * modifier,
                "legged": 100 * modifier,
                "hover": 100 * modifier,
                "lift": 250 * modifier,
                "propellor": 100 * modifier,
                "half-tracked": 80 * modifier,
            }
        },
        "greenmud": {
            "speedFactor": {
                "wheeled": 80 * modifier,
                "tracked": 100 * modifier,
                "legged": 100 * modifier,
                "hover": 150 * modifier,
                "lift": 250 * modifier,
                "propellor": 100 * modifier,
                "half-tracked": 100 * modifier,
            }
        },
        "redbrush": {
            "speedFactor": {
                "wheeled": 100 * modifier,
                "tracked": 100 * modifier,
                "legged": 100 * modifier,
                "hover": 80 * modifier,
                "lift": 250 * modifier,
                "propellor": 100 * modifier,
                "half-tracked": 100 * modifier,
            }
        },
        "pinkrock": {
            "speedFactor": {
                "wheeled": 80 * modifier,
                "tracked": 100 * modifier,
                "legged": 100 * modifier,
                "hover": 50 * modifier,
                "lift": 250 * modifier,
                "propellor": 100 * modifier,
                "half-tracked": 90 * modifier,
            }
        },
        "road": {
            "speedFactor": {
                "wheeled": 150 * modifier,
                "tracked": 120 * modifier,
                "legged": 100 * modifier,
                "hover": 150 * modifier,
                "lift": 250 * modifier,
                "propellor": 100 * modifier,
                "half-tracked": 135 * modifier,
            }
        },
        "water": {
            "speedFactor": {
                "wheeled": 60 * modifier,
                "tracked": 60 * modifier,
                "legged": 60 * modifier,
                "hover": 150 * modifier,
                "lift": 250 * modifier,
                "propellor": 100 * modifier,
                "half-tracked": 60 * modifier,
            }
        },
        "cliff_face": {
            "speedFactor": {
                "wheeled": 60 * modifier,
                "tracked": 60 * modifier,
                "legged": 60 * modifier,
                "hover": 80 * modifier,
                "lift": 250 * modifier,
                "propellor": 100 * modifier,
                "half-tracked": 60 * modifier,
            }
        },
        "rubble": {
            "speedFactor": {
                "wheeled": 80 * modifier,
                "tracked": 80 * modifier,
                "legged": 100 * modifier,
                "hover": 80 * modifier,
                "lift": 250 * modifier,
                "propellor": 100 * modifier,
                "half-tracked": 50 * modifier,
            }
        },
        "sheetice": {
            "speedFactor": {
                "wheeled": 70 * modifier,
                "tracked": 90 * modifier,
                "legged": 100 * modifier,
                "hover": 150 * modifier,
                "lift": 250 * modifier,
                "propellor": 100 * modifier,
                "half-tracked": 100 * modifier,
            }
        },
        "slush": {
            "speedFactor": {
                "wheeled": 60 * modifier,
                "tracked": 100 * modifier,
                "legged": 75 * modifier,
                "hover": 80 * modifier,
                "lift": 250 * modifier,
                "propellor": 100 * modifier,
                "half-tracked": 80 * modifier,
            }
        }
    }

    archive_name = f'{modifier}xUnitSpeed'
    archive_path = os.path.join(base_dir, archive_name)

    with zipfile.ZipFile(archive_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipf.writestr(f'diffs/{archive_name}/stats/propulsion.json', json.dumps(diff))
        zipf.writestr(f'diffs/{archive_name}/stats/terraintable.json', json.dumps(terraintable))

    print(archive_path)

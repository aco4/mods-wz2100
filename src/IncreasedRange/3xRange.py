import json
import os

def multiply_range(file_path, keys_to_double):
    if not os.path.exists(file_path):
        print(f"Error: {file_path} not found.")
        return

    with open(file_path, 'r') as f:
        data = json.load(f)

    for item in data.values():
        for key in keys_to_double:
            if key in item and isinstance(item[key], (int, float)):
                item[key] *= FACTOR

    with open(file_path, 'w') as f:
        json.dump(data, f, indent=4)

    print(f"Updated {file_path} successfully.")


FACTOR            = 3
FILE_PATH_WEAPONS = "3xRange/stats/weapons.json"
FILE_PATH_SENSOR  = "3xRange/stats/sensor.json"

multiply_range(FILE_PATH_WEAPONS, ["shortRange", "longRange"])
multiply_range(FILE_PATH_SENSOR, ["range"])

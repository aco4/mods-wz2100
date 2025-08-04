import os
import zipfile

base_dir = os.path.dirname(__file__)
template_path = os.path.join(base_dir, 'nUnitsLimit', 'multiplay', 'script', 'rules', 'setup', 'droidlimits.js')

# Read the template content
with open(template_path, 'r') as f:
    template = f.read()

for i in [50, 100, 200, 250, 300, 350, 400, 450, 500]:
    modifier = str(i)
    replaced = template.replace('%%MODIFIER%%', modifier)

    # Output zip path (no .zip extension)
    archive_name = f'{modifier}UnitsLimit'
    archive_path = os.path.join(base_dir, archive_name)

    # Create the zip archive (with no .zip extension)
    with zipfile.ZipFile(archive_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipf.writestr('multiplay/script/rules/setup/droidlimits.js', replaced)

    print(f'Created mod: {archive_path}')

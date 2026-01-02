import os
import zipfile

base_dir = os.path.dirname(__file__)
template_path = os.path.join(base_dir, 'nxFactorySpeed', 'multiplay', 'script', 'mods', 'init.js')

# Read the template content
with open(template_path, 'r') as f:
    template = f.read()

for i in [2, 3, 4, 5, 6, 7, 8, 9, 10]:
    modifier = str(i)
    replaced = template.replace('%%MODIFIER%%', modifier)

    # Output zip path (no .zip extension)
    archive_name = f'{modifier}xFactorySpeed'
    archive_path = os.path.join(base_dir, archive_name)

    # Create the zip archive (with no .zip extension)
    with zipfile.ZipFile(archive_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipf.writestr('multiplay/script/mods/init.js', replaced)

    print(f'Created mod: {archive_path}')

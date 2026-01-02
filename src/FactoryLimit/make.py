import os
import zipfile

base_dir = os.path.dirname(__file__)
template_path = os.path.join(base_dir, 'nFactoryLimit', 'multiplay', 'script', 'rules', 'setup', 'structurelimits.js')

# Read the template content
with open(template_path, 'r') as f:
    template = f.read()

for i in [1, 2, 3, 4]:
    modifier = str(i)
    replaced = template.replace('%%MODIFIER%%', modifier)

    # Output zip path (no .zip extension)
    archive_name = f'{modifier}FactoryLimit'
    archive_path = os.path.join(base_dir, archive_name)

    # Create the zip archive (with no .zip extension)
    with zipfile.ZipFile(archive_path, 'w', zipfile.ZIP_DEFLATED) as zipf:
        zipf.writestr('multiplay/script/rules/setup/structurelimits.js', replaced)
        zipf.writestr('multiplay/script/rules/events/gameinit.js', replaced)

    print(f'Created mod: {archive_path}')
